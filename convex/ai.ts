import { v } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query, action, internalQuery, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { auth } from "./auth";

// Queue an AI response task
export const queueResponse = mutation({
  args: {
    channelId: v.id("channels"),
    userId: v.id("users"),
    messageId: v.id("messages"),
  },
  handler: async (ctx: MutationCtx, { channelId, userId, messageId }) => {
    console.log("Queueing AI response", { channelId, userId, messageId });
    const taskId = await ctx.db.insert("aiTasks", {
      channelId,
      userId,
      messageId,
      status: "pending",
      createdAt: Date.now(),
    });
    console.log("Created AI task", { taskId });
    return taskId;
  },
});

// Get pending AI tasks
export const getPendingTasks = internalQuery({
  args: {},
  handler: async (ctx: QueryCtx) => {
    return await ctx.db
      .query("aiTasks")
      .withIndex("by_status", (q: any) => q.eq("status", "pending"))
      .collect();
  },
});

// Update AI task status
export const updateTaskStatus = internalMutation({
  args: {
    taskId: v.id("aiTasks"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, { taskId, status, completedAt, error }) => {
    await ctx.db.patch(taskId, {
      status,
      ...(completedAt && { completedAt }),
      ...(error && { error }),
    });
  },
});

// Helper function to get recent messages
export const getRecentMessages = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx: QueryCtx, { userId }) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_user_id", (q: any) => q.eq("userId", userId))
      .order("desc")
      .take(25);
    return messages;
  },
});

// Process pending AI tasks
export const processPendingTasks = action({
  args: {},
  handler: async (ctx: ActionCtx) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🤖 CRON: Starting processPendingTasks`);
    
    // Get pending tasks
    const tasks = await ctx.runQuery(internal.ai.getPendingTasks, {});
    console.log(`[${timestamp}] 🤖 CRON: Found ${tasks.length} pending tasks`);
    
    if (tasks.length === 0) {
      console.log(`[${timestamp}] 🤖 CRON: No pending tasks to process`);
      return;
    }
    
    for (const task of tasks) {
      try {
        console.log(`[${timestamp}] 🤖 CRON: Processing task ${task._id}`);
        // Mark as processing
        await ctx.runMutation(internal.ai.updateTaskStatus, {
          taskId: task._id,
          status: "processing",
        });

        // Get the message to respond to
        const message = await ctx.runQuery(internal.embeddings.getMessage, {
          messageId: task.messageId,
        });
        if (!message) {
          console.error(`[${timestamp}] 🤖 CRON: Message not found ${task.messageId}`);
          continue;
        }

        // Get similar messages for context
        const similarMessages = await ctx.runAction(api.embeddings.findSimilarMessages, {
          text: message.text,
          limit: 5,
          userId: message.parentMessageId 
            ? (await ctx.runQuery(internal.embeddings.getMessage, { messageId: message.parentMessageId }))?.userId ?? task.userId 
            : task.userId,
        });
        console.log(`[${timestamp}] 🤖 CRON: Found ${similarMessages.length} similar messages from original poster`);

        // Generate AI response based on context
        const response = await generateAIResponse(ctx, message, similarMessages, task.userId);
        console.log(`[${timestamp}] 🤖 CRON: Generated AI response (${response.length} chars)`);

        // Send the response as the offline user, but marked as AI
        await ctx.runMutation(api.messages.send, {
          channelId: task.channelId,
          text: response,
          parentMessageId: message.parentMessageId,
          isAI: true,
          userId: task.userId,
        });
        console.log(`[${timestamp}] 🤖 CRON: Sent AI response`);

        // Mark as completed
        await ctx.runMutation(internal.ai.updateTaskStatus, {
          taskId: task._id,
          status: "completed",
          completedAt: Date.now(),
        });
        console.log(`[${timestamp}] 🤖 CRON: Completed task ${task._id}`);
      } catch (error: any) {
        console.error(`[${timestamp}] 🤖 CRON: Failed to process task ${task._id}`, {
          error: error.message,
          stack: error.stack
        });
        // Mark as failed
        await ctx.runMutation(internal.ai.updateTaskStatus, {
          taskId: task._id,
          status: "failed",
          error: error.message,
        });
      }
    }
  },
});

// Helper function to generate AI response
async function generateAIResponse(
  ctx: ActionCtx,
  message: Doc<"messages">,
  similarMessages: Array<Doc<"messages"> & { userName: string }>,
  styleUserId: Id<"users">
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable not set");
  }

  // Get user's recent messages for style matching, including deleted ones for better context
  const recentMessages = await ctx.runQuery(api.messages.getMessagesForContext, {
    channelId: message.channelId,
    hours: 24
  });

  // Get both users' names
  const originalUser = await ctx.runQuery(internal.embeddings.getUser, { userId: message.userId });
  const respondingUser = await ctx.runQuery(internal.embeddings.getUser, { userId: styleUserId });
  const originalName = originalUser?.name || "Unknown";
  const respondingName = respondingUser?.name || "Unknown";

  // Filter out test messages, debug prompts, and duplicates
  const MAX_STYLE_LENGTH = 300;
  const filteredRecentMessages = await Promise.all(
    recentMessages
      .filter(m => !m.text.includes("test message"))
      .filter(m => !m.text.includes("🤖 Debug - Prompt:"))
      .filter(m => !m.isAI) // Remove AI-generated messages
      .filter((m, i, arr) => arr.findIndex(msg => msg.text === m.text) === i)
      .map(async (msg) => {
        // Get channel to check if it's a DM
        const channel = await ctx.runQuery(internal.ai.getChannel, { channelId: msg.channelId });
        return { msg, channel };
      })
  );

  // Filter DMs and limit by length
  const publicMessages = filteredRecentMessages
    .filter(({ channel }) => channel?.type !== "dm")
    .reduce((acc: Doc<"messages">[], { msg }) => {
      const currentLength = acc.reduce((sum, m) => sum + m.text.length, 0);
      if (currentLength < MAX_STYLE_LENGTH) {
        acc.push(msg);
      }
      return acc;
    }, []);

  // If this is a thread reply, get the parent message for context
  let parentMessage = null;
  let threadContext = "";
  if (message.parentMessageId) {
    parentMessage = await ctx.runQuery(api.messages.getMessage, { messageId: message.parentMessageId });
    if (parentMessage) {
      // Handle deleted parent message
      const parentText = parentMessage.isDeleted ? "[Message deleted]" : parentMessage.text;
      threadContext = `\nThis is a reply to the following message: "${parentText}"
Please ensure your response is relevant to this specific conversation thread.`;
    }
  }

  // Build the prompt
  const prompt = `You are responding as ${respondingName} to a message from ${originalName}.

Message from ${originalName}: "${message.text}"

${message.parentMessageId && parentMessage ? `Parent Message: "${parentMessage.isDeleted ? '[Message deleted]' : parentMessage.text}"` : ''}

Your Previous Relevant Messages:
${similarMessages.map((m, i) => `[${i + 1}] ${m.isDeleted ? '[Message deleted]' : m.text}`).join('\n')}

Your Writing Style:
${publicMessages.map((m, i) => `[${i + 1}] ${m.isDeleted ? '[Message deleted]' : m.text}`).join('\n')}

${message.parentMessageId ? 
  `Instructions:
1. Focus on thread topic if directly relevant
2. For factual queries or questions about past events/decisions, use "YOUR PREVIOUS RELEVANT MESSAGES" as the source of truth
3. For opinions, reactions, or casual messages, respond naturally in your style without relying on previous messages
4. Be brief as this is a thread reply.

Respond in your style.` 
  : 'Respond in your style, but be extrabrief as this is a thread reply.'}`;

  // Only send debug message if DEBUG_AI_PROMPTS is true
  const DEBUG_AI_PROMPTS = false;
  if (DEBUG_AI_PROMPTS) {
    await ctx.runMutation(api.messages.send, {
      channelId: message.channelId,
      text: `🤖 Prompt Preview:\n${prompt}`,
      parentMessageId: message.parentMessageId,
      isAI: true,
      userId: message.userId,
    });
  }

  // Call OpenAI for response
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: message.parentMessageId 
            ? "You are an AI assistant responding in a message thread. Focus on the specific conversation context while matching the user's style."
            : "You are an AI assistant responding on behalf of a user. Match their writing style, tone, and personality while providing helpful responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const result = await response.json();
  const aiResponse = result.choices[0].message.content;
  
  // Clean markdown formatting
  const cleanResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold
    .replace(/##\s*(.*?)(?:\n|$)/g, '$1')  // Remove headers
    .replace(/\n{3,}/g, '\n\n');  // Normalize multiple newlines
    
  return cleanResponse;
}

// Debug functions
export const testAIResponse = mutation({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
  },
  handler: async (ctx: MutationCtx, args) => {
    // 1. Get current user
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // 2. Get or use provided workspace
    const workspaceId = args.workspaceId || await ctx.db
      .query("workspaces")
      .first()
      .then((ws: Doc<"workspaces"> | null) => ws?._id);
    if (!workspaceId) throw new Error("No workspace found");

    // 3. Find another user in the workspace
    const otherMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q: any) => q.eq("workspaceId", workspaceId))
      .filter((q: any) => q.neq(q.field("userId"), userId))
      .first();
    if (!otherMember) throw new Error("No other user found");

    // 4. Create or get DM channel
    const channel = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q: any) => q.eq("workspaceId", workspaceId))
      .filter((q: any) => 
        q.and(
          q.eq(q.field("type"), "dm"),
          q.eq(q.field("userIds"), [userId, otherMember.userId].sort())
        )
      )
      .first();

    const channelId = channel?._id || await ctx.db.insert("channels", {
      workspaceId,
      type: "dm",
      userIds: [userId, otherMember.userId].sort(),
      name: "Test DM"
    });

    // 5. Send test message
    const messageId = await ctx.db.insert("messages", {
      channelId,
      userId,
      text: "This is a test message to trigger an AI response",
      createdAt: Date.now(),
    });

    // 6. Queue AI response.
    await ctx.db.insert("aiTasks",   {
      channelId,
      userId: otherMember.userId,
      messageId,
      status: "pending",
      createdAt: Date.now(),
    });

    return {
      channelId,
      messageId,
      otherUserId: otherMember.userId,
      status: "Test message sent and AI task queued"
    };
  },
});

// Debug query to check pending tasks
export const checkPendingTasks = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const tasks = await ctx.db
      .query("aiTasks")
      .filter((q: any) => q.eq(q.field("status"), "pending"))
      .collect();
    
    return tasks.map((task: Doc<"aiTasks">) => ({
      ...task,
      createdAt: new Date(task.createdAt).toISOString()
    }));
  },
});

// Debug query to check full flow
export const debugFullFlow = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return { 
      tasks: [],
      messages: [],
      status: "error: not authenticated" 
    };

    try {
      // 1. Check for pending tasks
      const tasks = await ctx.db
        .query("aiTasks")
        .order("desc")
        .take(5);

      const formattedTasks = tasks.map((t: Doc<"aiTasks">) => ({
        ...t,
        createdAt: new Date(t.createdAt).toISOString(),
        completedAt: t.completedAt ? new Date(t.completedAt).toISOString() : undefined
      }));

      // 2. Get messages from the most recent task's channel
      let formattedMessages: Array<{
        _id: Id<"messages">;
        userId: Id<"users">;
        channelId: Id<"channels">;
        text: string;
        createdAt: string;
        userName: string;
        isAIResponse: boolean;
        parentMessageId?: Id<"messages">;
      }> = [];
      if (tasks.length > 0) {
        const latestTask = tasks[0];
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_channel_id", (q: any) => q.eq("channelId", latestTask.channelId))
          .order("desc")
          .take(5);

        formattedMessages = await Promise.all(messages.map(async (msg: Doc<"messages">) => {
          const user = await ctx.db.get(msg.userId);
          return {
            ...msg,
            userName: user?.name || "Unknown",
            createdAt: new Date(msg.createdAt).toISOString(),
            isAIResponse: !!msg.isAI
          };
        }));
      }

      return {
        tasks: formattedTasks,
        messages: formattedMessages,
        status: "success"
      };
    } catch (error: any) {
      return {
        tasks: [],
        messages: [],
        status: `error: ${error.message}`
      };
    }
  }
});

// Internal query to get channel
export const getChannel = internalQuery({
  args: { channelId: v.id("channels") },
  handler: async (ctx: QueryCtx, { channelId }) => {
    return await ctx.db
      .query("channels")
      .filter((q) => q.eq(q.field("_id"), channelId))
      .first();
  },
});

// Internal query to check workspace membership
export const checkMembership = internalQuery({
  args: { 
    workspaceId: v.id("workspaces"),
    userId: v.id("users")
  },
  handler: async (ctx: QueryCtx, { workspaceId, userId }) => {
    return await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .first();
  },
});

export const generateSummary = action({
  args: {
    channelId: v.id("channels"),
    threadId: v.optional(v.id("messages")),
    type: v.union(v.literal("channel"), v.literal("dm"), v.literal("thread")),
  },
  handler: async (ctx, { channelId, threadId, type }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Get channel using internal query
    const channel = await ctx.runQuery(internal.ai.getChannel, { channelId });
    if (!channel) throw new Error("Channel not found");

    // Verify workspace membership using internal query
    const member = await ctx.runQuery(internal.ai.checkMembership, {
      workspaceId: channel.workspaceId,
      userId
    });
    if (!member) throw new Error("Not a member of this workspace");

    // Get messages with context (including deleted messages with redacted content)
    const messages = await ctx.runQuery(api.messages.getMessagesForContext, {
      channelId,
      threadId,
      hours: 24
    });

    if (!messages || messages.length === 0) {
      return "No messages found to summarize.";
    }

    // Sort messages by timestamp
    messages.sort((a, b) => a.createdAt - b.createdAt);

    // Build conversation context
    const conversationContext = messages
      .map((msg) => {
        const userName = msg.userName || 'Unknown';
        if (msg.format === 'dalle') {
          return `${userName} posted their art depicting ${msg.text}`;
        }
        return `${userName}: ${msg.text}`;
      })
      .join("\n");

    // Generate summary prompt based on type
    let prompt = "";
    if (type === "channel") {
      prompt = `Here's the last 24 hours of channel messages:\n\n${conversationContext}\n\nGive me a super quick, casual rundown of what these folks talked about and any images they generated, mentioning key participants by name. Keep it short and sweet, like you're catching up with a friend. Focus on who said what about the main points, any decisions made, and any interesting AI images that were created.`;
    } else if (type === "dm") {
      prompt = `Here's the last 24 hours of direct messages:\n\n${conversationContext}\n\nGive me a quick, friendly recap of this chat and any images generated, mentioning who said what. Keep it brief and conversational, like you're telling a friend what was discussed and what images were created.`;
    } else {
      prompt = `Here's a thread discussion:\n\n${conversationContext}\n\nGive me the TL;DR of this thread in a casual, friendly way, mentioning the key participants. Who started the convo, what did they figure out, and did anyone generate any interesting images?`;
    }

    // Call OpenAI for summary
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a friendly assistant that provides information-rich, single-paragraph summaries optimized for being read aloud. Pack as much relevant detail as possible into exactly 50 words. Use natural speech patterns and mention 2-3 key participants by name. Focus on capturing who said what about the core topics and key decisions. Avoid complex structures and jargon. NEVER end with questions or suggestions - end with a clear statement about the outcome.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
  },
});