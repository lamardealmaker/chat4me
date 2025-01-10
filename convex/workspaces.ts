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
      // Return a standard shape with success and message
      return { success: false, message: "Unauthorized", workspaceId: null };
    }

    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newWorkspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    await ctx.db.insert("members", {
      workspaceId: newWorkspaceId,
      userId,
      role: "admin",
    });
    await ctx.db.insert("channels", {
      workspaceId: newWorkspaceId,
      name: "General",
      type: "public",
    });

    // Return the string ID instead of the entire object
    return {
      success: true,
      message: "",
      workspaceId: newWorkspaceId.id,
    };
  },
});

// ... other existing code remains unchanged ...