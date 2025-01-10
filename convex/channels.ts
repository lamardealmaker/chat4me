import { v } from "convex/values";
import { auth } from "./auth";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      throw new Error("Unauthorized");
    }

    if (member.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const parsedName = args.name.replace(/\s+/g, '-').toLowerCase();

    const channelId = await ctx.db.insert("channels", {
      workspaceId: args.workspaceId,
      name: parsedName,
      type: "public",
      userIds: [],
    });

    return channelId;
  },
});

export const createDM = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    userIds: v.array(v.id("users")),
  },
  handler: async (ctx, { workspaceId, userIds }) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Must be a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      throw new Error("Unauthorized");
    }

    // (Optional) Check that each userId is also a member
    for (const uid of userIds) {
      const m = await ctx.db
        .query("members")
        .withIndex("by_workspace_id_and_user_id", (q) =>
          q.eq("workspaceId", workspaceId).eq("userId", uid)
        )
        .first();
      if (!m) {
        throw new Error("One of the userIds is not a member of this workspace");
      }
    }

    // Insert channel with type="dm"
    const channelId = await ctx.db.insert("channels", {
      workspaceId,
      name: "", // or something like "DM"
      type: "dm",
      userIds,
    });

    return channelId;
  },
});

export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    // Retrieve the member entry
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return [];
    }

    // Fetch all channels for that workspace
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    return channels;
  },
});