import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return { success: false, message: "Unauthorized", workspaceId: null };
    }

    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    await ctx.db.insert("members", {
      workspaceId,
      userId,
      role: "admin",
    });

    // Use "General" channel name
    await ctx.db.insert("channels", {
      workspaceId,
      name: "General",
      type: "public",
    });

    return {
      success: true,
      message: "",
      workspaceId,
    };
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    return workspace;
  },
});

export const get = query({
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return [];

    const members = await ctx.db
      .query("members")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    const workspaceIds = members.map(member => member.workspaceId);
    const workspaces = await Promise.all(
      workspaceIds.map(id => ctx.db.get(id))
    );

    return workspaces.filter(Boolean);
  },
});

// The rest of your existing code remains unchanged...