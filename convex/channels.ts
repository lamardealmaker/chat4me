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

    const member = await ctx.db.query("members").withIndex("by_workspace_id_and_user_id", (q) =>
      q.eq("workspaceId", args.workspaceId).eq("userId", userId)
    ).unique();

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
      type: "public"
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

    // Check if the user is authenticated
    if (!userId) {
      return [];
    }

    // Retrieve the member entry based on the workspace and user
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    // If the member does not exist, return an empty array
    if (!member) {
      return [];
    }

    // Fetch and return the list of items or relevant data (example structure)
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    return channels;
  },
});