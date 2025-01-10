import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";


export const join = mutation({
  args: {
    id: v.id("workspaces"),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const workspace = await ctx.db.get(args.id);

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    // Debug logging
    const debugInfo = {
      storedCode: workspace.joinCode,
      providedCode: args.code,
      storedCodeUpper: workspace.joinCode.toUpperCase(),
      providedCodeUpper: args.code.toUpperCase(),
      doTheyMatch: workspace.joinCode.toUpperCase() === args.code.toUpperCase()
    };
    
    console.error("DEBUG JOIN CODES:", JSON.stringify(debugInfo, null, 2));

    if (workspace.joinCode.toUpperCase() !== args.code.toUpperCase()) {
      throw new Error(`Invalid join code: ${JSON.stringify(debugInfo)}`);
    }

    const existingMember = await ctx.db.query("members")
      .withIndex("by_workspace_id_and_user_id", (q) => 
        q.eq("workspaceId", args.id).eq("userId", userId)
      ).first();

    if (existingMember) {
      throw new Error("You are already a member of this workspace");
    }

    await ctx.db.insert("members", {
      workspaceId: args.id,
      userId,
      role: "member",
    });

    return args.id;
  },
});

export const newJoinCode = mutation({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
    .query("members").withIndex("by_workspace_id_and_user_id", (q) => q
    .eq("workspaceId", args.id)
    .eq("userId", userId))
    .unique();
    
    if (!member || member.role !== "admin") {
      throw new Error("Access denied: Admin privileges required");
    }

    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    await ctx.db.patch(args.id, {
      joinCode,
    });

    return args.id;
  },
});



export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
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

    await ctx.db.insert("channels", {
      workspaceId,
      name: "General",
      type: "public",
    });

    return workspaceId;   
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return [];
    }

    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const workspaceIds = members.map((member) => member.workspaceId);
    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
  },
}); 



 

export const getById = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) => 
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member) {
      throw new Error("Access denied: You are not a member of this workspace");
    }

    const workspace = await ctx.db.get(args.id);
    
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace;
  },
}); 

export const update = mutation({
  args: {
    id: v.id("workspaces"),
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
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member || member.role !== "admin") {
      throw new Error("Access denied: Admin privileges required");
    }

    return await ctx.db.patch(args.id, {
      name: args.name
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member || member.role !== "admin") {
      throw new Error("Access denied: Admin privileges required");
    }

    // Delete all members
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
      .collect();

    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    // Delete the workspace
    await ctx.db.delete(args.id);
  },
});

export const getInfoById = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    const workspace = await ctx.db.get(args.id);

    return {
      name: workspace?.name,
      isMember: !!member,
    };
  },
});