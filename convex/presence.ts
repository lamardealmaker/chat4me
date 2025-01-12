import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

// Update user's presence status
export const updatePresence = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    status: v.union(v.literal("online"), v.literal("offline"), v.literal("away")),
    customStatus: v.optional(v.string()),
  },
  handler: async (ctx, { workspaceId, status, customStatus }) => {
    const userId = await auth.getUserId(ctx);
    // If no user ID, just return silently
    if (!userId) return;

    // Try to get member status - if not a member, just return silently
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return;

    // Try to update or create presence record
    try {
      const existing = await ctx.db
        .query("userPresence")
        .withIndex("by_workspace_and_user", (q) =>
          q.eq("workspaceId", workspaceId).eq("userId", userId)
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          status,
          customStatus,
          lastSeen: Date.now(),
        });
      } else {
        await ctx.db.insert("userPresence", {
          userId,
          workspaceId,
          status,
          customStatus,
          lastSeen: Date.now(),
        });
      }
    } catch {
      // Silently handle any DB operation failures
      return;
    }
  },
});

// Get presence for all users in a workspace
export const getWorkspacePresence = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    // Verify user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return null;

    // Get all presence records for the workspace
    const presenceRecords = await ctx.db
      .query("userPresence")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    // Mark users as offline if they haven't been seen in 2 minutes
    const TWO_MINUTES = 2 * 60 * 1000;
    const now = Date.now();

    const enhancedRecords = await Promise.all(
      presenceRecords.map(async (record) => {
        const user = await ctx.db.get(record.userId);
        return {
          ...record,
          status:
            now - record.lastSeen > TWO_MINUTES ? "offline" : record.status,
          userName: user?.name || "Unknown User",
        };
      })
    );

    return enhancedRecords;
  },
});

// Get presence for a specific user in a workspace
export const getUserPresence = query({
  args: {
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
  },
  handler: async (ctx, { workspaceId, userId: targetUserId }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return null;

    // Verify user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .first();
    if (!member) return null;

    // Get presence record for the target user
    const presence = await ctx.db
      .query("userPresence")
      .withIndex("by_workspace_and_user", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", targetUserId)
      )
      .first();

    if (!presence) return null;

    // Check if user is offline based on last seen
    const TWO_MINUTES = 2 * 60 * 1000;
    const now = Date.now();
    const status = now - presence.lastSeen > TWO_MINUTES ? "offline" : presence.status;

    const user = await ctx.db.get(targetUserId);
    return {
      ...presence,
      status,
      userName: user?.name || "Unknown User",
    };
  },
});

export const list = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const presence = await ctx.db
      .query("userPresence")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => q.eq(q.field("status"), "online"))
      .collect();

    return presence;
  },
}); 