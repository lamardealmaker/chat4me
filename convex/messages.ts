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
      parentMessageId: parentMessageId || undefined,
    });
  },
});

export const list = query({
  args: { channelId: v.optional(v.id("channels")) },
  handler: async (ctx, { channelId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId || !channelId) return [];

    const channel = await ctx.db.get(channelId);
    if (!channel) return [];

    // Check membership
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return [];

    // Fetch messages
    return await ctx.db
      .query("messages")
      .withIndex("by_channel_id", (q) => q.eq("channelId", channelId))
      .order("asc")
      .collect();
  },
});