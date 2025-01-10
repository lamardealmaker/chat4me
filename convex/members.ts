import { query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) => 
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }

    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => 
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    const users = [];

    for (const member of members) {
      const user = await ctx.db.get(member.userId);
      if (user) {
        users.push({
          ...user,
          role: member.role
        });
      }
    }

    return users;
  },
});

