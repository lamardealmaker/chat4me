import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const send = mutation({
  args: {
    channelId: v.id("channels"),
    text: v.string(),
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, { channelId, text, parentMessageId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check that channel exists
    const channel = await ctx.db.get(channelId);
    if (!channel) throw new Error("Channel not found");

    // Verify user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) throw new Error("You are not a member of this workspace");

    // Insert the message
    return await ctx.db.insert("messages", {
      channelId,
      userId,
      text,
      createdAt: Date.now(),
      parentMessageId,
    });
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

      results.push({
        ...msg,
        userName: userDoc?.name || "Unknown",
        reactions: reactionGroups,
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

      results.push({
        ...msg,
        userName: userDoc?.name || "Unknown",
        reactions: reactionGroups,
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