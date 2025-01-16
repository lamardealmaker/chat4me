import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { api, internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import { MutationCtx, QueryCtx, DatabaseReader, DatabaseWriter } from "./_generated/server";

export const getById = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const message = await ctx.db.get(messageId);
    if (!message) return null;

    const user = await ctx.db.get(message.userId);
    return {
      ...message,
      userName: user?.name || "Unknown",
    };
  },
});

export const send = mutation({
  args: {
    channelId: v.id("channels"),
    text: v.string(),
    parentMessageId: v.optional(v.id("messages")),
    isAI: v.optional(v.boolean()),
    userId: v.optional(v.id("users")), // For AI responses
  },
  handler: async (ctx, { channelId, text, parentMessageId, isAI, userId: overrideUserId }) => {
    const currentUserId = await auth.getUserId(ctx);
    const effectiveUserId = overrideUserId || currentUserId;
    
    if (!effectiveUserId) throw new Error("Unauthorized");
    if (!isAI && overrideUserId) throw new Error("Cannot override userId without AI flag");

    // Check that channel exists
    const channel = await ctx.db.get(channelId);
    if (!channel) throw new Error("Channel not found");

    // Verify user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", effectiveUserId)
      )
      .first();
    if (!member) throw new Error("You are not a member of this workspace");

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      channelId,
      userId: effectiveUserId,
      text,
      createdAt: Date.now(),
      parentMessageId,
      isAI,
    });

    // Generate and store embedding asynchronously
    await ctx.scheduler.runAfter(0, api.embeddings.generateAndStoreEmbedding, {
      messageId,
    });

    // Only check for AI responses if this isn't already an AI message
    if (!isAI) {
      // Handle offline users based on channel type
      const TWO_MINUTES = 2 * 60 * 1000;
      const now = Date.now();

      if (channel.type === "dm" && channel.userIds) {
        // For DM channels, check all other users
        const otherUserIds = channel.userIds.filter(id => id !== effectiveUserId);
        
        for (const otherUserId of otherUserIds) {
          // Check user's presence
          const presence = await ctx.db
            .query("userPresence")
            .withIndex("by_workspace_and_user", (q) =>
              q.eq("workspaceId", channel.workspaceId).eq("userId", otherUserId)
            )
            .first();

          // If user is offline, queue AI response
          const isOffline = !presence || (now - presence.lastSeen > TWO_MINUTES);
          if (isOffline) {
            await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
              channelId,
              userId: otherUserId,
              messageId,
            });
          }
        }
      } else if (parentMessageId) {
        // For channel messages, always respond if replying to someone else's message
        const parentMessage = await ctx.db.get(parentMessageId);
        if (parentMessage && parentMessage.userId !== effectiveUserId) {
          await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
            channelId,
            userId: parentMessage.userId,
            messageId,
          });
        }
      }
    }

    return messageId;
  },
});

/**
 * list() - fetch main channel messages, including user name
 */
export const list = query({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel_id", (q) => q.eq("channelId", args.channelId))
      .filter((q) => q.eq(q.field("parentMessageId"), undefined))
      .collect();

    const results = [];
    for (const msg of messages) {
      const userDoc = await ctx.db.get(msg.userId);
      
      const reactions = await ctx.db
        .query("reactions")
        .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
        .collect();

      const reactionGroups = reactions.reduce((acc, reaction) => {
        const code = encodeURIComponent(reaction.emoji);
        if (!acc[code]) {
          acc[code] = { count: 0, users: [], emoji: reaction.emoji };
        }
        acc[code].count++;
        acc[code].users.push(reaction.userId);
        return acc;
      }, {} as Record<string, { count: number; users: string[]; emoji: string }>);

      // Handle image URLs for DALL-E images
      let imageUrl = undefined;
      if (msg.format === "dalle" && msg.storageId) {
        imageUrl = await ctx.storage.getUrl(msg.storageId);
      }

      results.push({
        ...msg,
        userName: userDoc?.name || "Unknown",
        reactions: reactionGroups,
        imageUrl,
      });
    }

    return results;
  },
});

/**
 * listThread() - fetch all replies to a specified parentMessageId
 */
export const listThread = query({
  args: { parentMessageId: v.id("messages") },
  handler: async (ctx, { parentMessageId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    // Retrieve the parent message
    const parentMsg = await ctx.db.get(parentMessageId);
    if (!parentMsg) return [];

    const channel = await ctx.db.get(parentMsg.channelId);
    if (!channel) return [];

    // Check membership
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return [];

    // Query replies
    const replies = await ctx.db
      .query("messages")
      .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", parentMessageId))
      .order("asc")
      .collect();

    // Populate user name and reactions
    const results = [];
    for (const msg of replies) {
      const userDoc = await ctx.db.get(msg.userId);
      
      // Get reactions
      const reactions = await ctx.db
        .query("reactions")
        .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
        .collect();

      // Group reactions
      const reactionGroups = reactions.reduce((acc, reaction) => {
        const code = encodeURIComponent(reaction.emoji);
        if (!acc[code]) {
          acc[code] = { count: 0, users: [], emoji: reaction.emoji };
        }
        acc[code].count++;
        acc[code].users.push(reaction.userId);
        return acc;
      }, {} as Record<string, { count: number; users: string[]; emoji: string }>);

      // Handle image URLs for DALL-E images
      let imageUrl = undefined;
      if (msg.format === "dalle" && msg.storageId) {
        imageUrl = await ctx.storage.getUrl(msg.storageId);
      }

      results.push({
        ...msg,
        userName: userDoc?.name || "Unknown",
        reactions: reactionGroups,
        imageUrl,
      });
    }
    return results;
  },
});

/**
 * toggleReaction - Add or remove an emoji reaction from a message
 */
export const toggleReaction = mutation({
  args: {
    messageId: v.id("messages"),
    emoji: v.string(),
  },
  handler: async (ctx, { messageId, emoji }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Get the message to check channel access
    const message = await ctx.db.get(messageId);
    if (!message) throw new Error("Message not found");

    const channel = await ctx.db.get(message.channelId);
    if (!channel) throw new Error("Channel not found");

    // Verify user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) throw new Error("Not a member of this workspace");

    // Check if reaction already exists
    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_message_and_user", (q) =>
        q.eq("messageId", messageId).eq("userId", userId)
      )
      .filter((q) => q.eq(q.field("emoji"), emoji))
      .first();

    if (existing) {
      // Remove reaction
      await ctx.db.delete(existing._id);
    } else {
      // Add reaction
      await ctx.db.insert("reactions", {
        messageId,
        userId,
        emoji,
      });
    }
  },
});

/**
 * get() - fetch a single message by ID, including user name
 */
export const get = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    const message = await ctx.db.get(messageId);
    if (!message) return null;

    const channel = await ctx.db.get(message.channelId);
    if (!channel) return null;

    // Check membership
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return null;

    // Get user info
    const user = await ctx.db.get(message.userId);

    // Get reactions
    const reactions = await ctx.db
      .query("reactions")
      .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
      .collect();

    // Group reactions
    const reactionGroups = reactions.reduce((acc, reaction) => {
      const code = encodeURIComponent(reaction.emoji);
      if (!acc[code]) {
        acc[code] = { count: 0, users: [], emoji: reaction.emoji };
      }
      acc[code].count++;
      acc[code].users.push(reaction.userId);
      return acc;
    }, {} as Record<string, { count: number; users: string[]; emoji: string }>);

    return {
      ...message,
      userName: user?.name || "Unknown User",
      reactions: reactionGroups,
    };
  },
});

/**
 * getReplyCount - Get the number of replies for a message
 */
export const getReplyCount = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return 0;

    const message = await ctx.db.get(messageId);
    if (!message) return 0;

    const channel = await ctx.db.get(message.channelId);
    if (!channel) return 0;

    // Check membership
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return 0;

    // Count replies using the index
    const replies = await ctx.db
      .query("messages")
      .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", messageId))
      .collect();
    
    return replies.length;
  },
});

export const getMessage = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    return await ctx.db.get(messageId);
  },
});

export const listRecent = query({
  args: { 
    channelId: v.id("channels"),
    hours: v.number()
  },
  handler: async (ctx, { channelId, hours }) => {
    const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel_id", (q) => q.eq("channelId", channelId))
      .filter((q) => q.gt(q.field("createdAt"), cutoffTime))
      .collect();

    const results = [];
    for (const msg of messages) {
      const userDoc = await ctx.db.get(msg.userId);
      results.push({
        ...msg,
        userName: userDoc?.name || "Unknown"
      });
    }

    return results;
  }
});

export const sendImageMessage = internalMutation({
  args: {
    channelId: v.id("channels"),
    threadId: v.optional(v.id("messages")),
    storageId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const message = await ctx.db.insert("messages", {
      channelId: args.channelId,
      userId,
      text: args.prompt,
      format: "dalle",
      storageId: args.storageId,
      formattedText: `![${args.prompt}](${args.storageId})`,
      createdAt: Date.now(),
      parentMessageId: args.threadId,
      isAI: false,
    });

    return message;
  },
});

export const getStorageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url;
  },
});