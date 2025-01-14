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
        const message = await ctx.runQuery(api.messages.getById, {
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
        });
        console.log(`[${timestamp}] 🤖 CRON: Found ${similarMessages.length} similar messages`);

        // Generate AI response based on context
        const response = await generateAIResponse(ctx, message, similarMessages);
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
  similarMessages: Array<Doc<"messages"> & { userName: string }>
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable not set");
  }

  // Get user's recent messages for style matching
  const recentMessages = await ctx.runQuery(internal.ai.getRecentMessages, {
    userId: message.userId,
  });

  // Build the prompt
  const prompt = `Please respond to this message: "${message.text}"

Here is context of possible answers:
${similarMessages.map(m => `- ${m.text}`).join('\n')}

Here is the user's writing style and tone (examples from their 25 latest messages):
${recentMessages.map((m: Doc<"messages">) => `- ${m.text}`).join('\n')}

Output answer using the user's style and personality.`;

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
          content: "You are an AI assistant responding on behalf of a user. Match their writing style, tone, and personality while providing helpful responses.",
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

    // 6. Queue AI response
    await ctx.db.insert("aiTasks", {
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