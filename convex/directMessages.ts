import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const send = mutation({
  args: {
    recipientId: v.id("users"),
    workspaceId: v.id("workspaces"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const senderId = await auth.getUserId(ctx);
    if (!senderId) throw new Error("Unauthorized");

    // Verify both users are workspace members
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => 
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    
    const memberIds = members.map(m => m.userId);
    if (!memberIds.includes(senderId) || !memberIds.includes(args.recipientId)) {
      throw new Error("Users must be workspace members");
    }

    // Create/Update conversation tracker
    const existing = await ctx.db
      .query("dmConversations")
      .withIndex("by_participants", (q) => 
        q.eq("participant1", senderId).eq("participant2", args.recipientId)
      )
      .first();

    if (!existing) {
      await ctx.db.insert("dmConversations", {
        workspaceId: args.workspaceId,
        participant1: senderId,
        participant2: args.recipientId,
        lastMessageAt: Date.now(),
      });
    } else {
      await ctx.db.patch(existing._id, {
        lastMessageAt: Date.now(),
      });
    }

    // Send message
    return await ctx.db.insert("directMessages", {
      senderId,
      recipientId: args.recipientId,
      workspaceId: args.workspaceId,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {
    workspaceId: v.id("workspaces"),
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    // Verify both users are workspace members first
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => 
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    
    const memberIds = members.map(m => m.userId);
    if (!memberIds.includes(userId) || !memberIds.includes(args.otherUserId)) {
      return [];
    }

    // Get messages where user is either sender or recipient
    const messages = await ctx.db
      .query("directMessages")
      .withIndex("by_workspace_participants", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), userId),
            q.eq(q.field("recipientId"), args.otherUserId)
          ),
          q.and(
            q.eq(q.field("senderId"), args.otherUserId),
            q.eq(q.field("recipientId"), userId)
          )
        )
      )
      .filter((q) => q.neq(q.field("deleted"), true))
      .order("desc")
      .collect();

    // Populate sender info
    const results = await Promise.all(
      messages.map(async (msg) => {
        const sender = await ctx.db.get(msg.senderId);
        return {
          ...msg,
          senderName: sender?.name || "Unknown",
        };
      })
    );

    return results;
  },
});

export const deleteMessage = mutation({
  args: {
    messageId: v.id("directMessages"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error("Message not found");

    // Only sender can delete their message
    if (message.senderId !== userId) {
      throw new Error("Can only delete your own messages");
    }

    await ctx.db.patch(args.messageId, { deleted: true });
  },
});

export const listConversations = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    const conversations = await ctx.db
      .query("dmConversations")
      .withIndex("by_workspace_user", (q) =>
        q.eq("workspaceId", args.workspaceId)
          .eq("participant1", userId)
      )
      .order("desc")
      .collect();

    // Populate other user's info
    const results = await Promise.all(
      conversations.map(async (conv) => {
        const otherUser = await ctx.db.get(conv.participant2);
        return {
          ...conv,
          otherUser: {
            _id: otherUser?._id,
            name: otherUser?.name,
            image: otherUser?.image,
          },
        };
      })
    );

    return results;
  },
}); 