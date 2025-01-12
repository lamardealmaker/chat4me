import { v } from "convex/values";
import { auth } from "./auth";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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
    otherUserId: v.id("users"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Get both users' info
    const [currentUser, otherUser] = await Promise.all([
      ctx.db.get(userId),
      ctx.db.get(args.otherUserId)
    ]);
    if (!currentUser || !otherUser) throw new Error("User not found");

    // Check if DM channel already exists
    const existingChannel = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => 
        q.and(
          q.eq(q.field("type"), "dm"),
          q.eq(q.field("userIds"), [userId, args.otherUserId].sort())
        )
      )
      .first();

    if (existingChannel) {
      // Update name if it was empty
      if (!existingChannel.name) {
        await ctx.db.patch(existingChannel._id, {
          name: otherUser.name || "Unknown User"
        });
      }
      return existingChannel._id;
    }

    // Create new DM channel
    const channelId = await ctx.db.insert("channels", {
      workspaceId: args.workspaceId,
      name: otherUser.name || "Unknown User",
      type: "dm",
      userIds: [userId, args.otherUserId].sort(),
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

    // Debug log
    console.log("All channels:", channels);
    console.log("Current userId:", userId);

    // Filter DM channels to only include ones where user is a participant
    const filteredChannels = channels.filter(channel => {
      if (channel.type === "dm") {
        console.log("DM channel:", channel);
        console.log("Has userIds:", !!channel.userIds);
        console.log("Includes user:", channel.userIds?.includes(userId));
      }
      return channel.type !== "dm" || 
        (channel.userIds && channel.userIds.includes(userId));
    });

    return filteredChannels;
  },
});

export const cleanupDuplicateDMs = mutation({
  args: {
    workspaceId: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    // Get all DM channels for this workspace
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .filter((q) => q.eq(q.field("type"), "dm"))
      .collect();

    // Group channels by their userIds
    const channelGroups = new Map<string, Doc<"channels">[]>();
    channels.forEach(channel => {
      if (!channel.userIds) return;
      const key = channel.userIds.sort().join(',');
      if (!channelGroups.has(key)) {
        channelGroups.set(key, []);
      }
      channelGroups.get(key)?.push(channel);
    });

    // For each group of duplicate channels, keep the newest one
    for (const [_, duplicates] of channelGroups) {
      if (duplicates.length <= 1) continue;
      
      // Sort by creation time, newest first
      duplicates.sort((a: Doc<"channels">, b: Doc<"channels">) => b._creationTime - a._creationTime);
      
      // Keep the first one (newest), delete the rest
      const [keep, ...remove] = duplicates;
      
      // Update the kept channel if it has an empty name
      if (!keep.name) {
        const otherUserId = keep.userIds?.find((id: Id<"users">) => id !== userId);
        if (otherUserId) {
          const otherUser = await ctx.db.get(otherUserId);
          if (otherUser?.name) {
            await ctx.db.patch(keep._id, { name: otherUser.name });
          }
        }
      }
      
      // Delete the duplicates
      for (const channel of remove) {
        await ctx.db.delete(channel._id);
      }
    }
  },
});