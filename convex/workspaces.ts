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

    // Initialize presence for admin
    await ctx.db.insert("userPresence", {
      userId,
      workspaceId,
      status: "online",
      lastSeen: Date.now(),
    });

    // Create default general channel
    await ctx.db.insert("channels", {
      name: "general",
      workspaceId,
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

export const newJoinCode = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check if user is admin
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member || member.role !== "admin") {
      throw new Error("Only admins can generate new join codes");
    }

    // Generate new join code
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Update workspace with new code
    await ctx.db.patch(args.id, { joinCode });

    return args.id;
  },
});

export const update = mutation({
  args: { 
    id: v.id("workspaces"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check if user is admin
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member || member.role !== "admin") {
      throw new Error("Only admins can update workspace settings");
    }

    // Update workspace
    await ctx.db.patch(args.id, { name: args.name });

    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Check if user is admin
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (!member || member.role !== "admin") {
      throw new Error("Only admins can delete workspaces");
    }

    // Get all channels in workspace
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
      .collect();

    // Delete all messages in each channel
    for (const channel of channels) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_channel_id", (q) => q.eq("channelId", channel._id))
        .collect();

      // Delete reactions for each message
      for (const message of messages) {
        await ctx.db
          .query("reactions")
          .withIndex("by_message_id", (q) => q.eq("messageId", message._id))
          .collect()
          .then((reactions) => {
            reactions.forEach((reaction) => ctx.db.delete(reaction._id));
          });
        await ctx.db.delete(message._id);
      }
      await ctx.db.delete(channel._id);
    }

    // Delete all members
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
      .collect();
    
    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    // Finally delete the workspace
    await ctx.db.delete(args.id);

    return args.id;
  },
});

/**
 * getInfoById - Get public workspace info by ID (for invite links)
 */
export const getInfoById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    if (!workspace) return null;

    // Return only public info needed for invite page
    return {
      _id: workspace._id,
      name: workspace.name,
      joinCode: workspace.joinCode,
    };
  },
});

/**
 * join - Join a workspace using its ID and join code
 */
export const join = mutation({
  args: {
    id: v.id("workspaces"),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return { success: false, message: "Unauthorized", workspaceId: null };
    }

    // Get the workspace
    const workspace = await ctx.db.get(args.id);
    if (!workspace) {
      return { success: false, message: "Workspace not found", workspaceId: null };
    }

    // Check if join code matches
    if (workspace.joinCode !== args.code) {
      return { success: false, message: "Invalid join code", workspaceId: null };
    }

    // Check if user is already a member
    const existingMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_and_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .first();

    if (existingMember) {
      return { success: true, message: "Already a member", workspaceId: args.id };
    }

    // Add user as a member
    await ctx.db.insert("members", {
      workspaceId: args.id,
      userId,
      role: "member",
    });

    // Initialize presence
    await ctx.db.insert("userPresence", {
      userId,
      workspaceId: args.id,
      status: "online",
      lastSeen: Date.now(),
    });

    return { success: true, message: "", workspaceId: args.id };
  },
});

// The rest of your existing code remains unchanged...