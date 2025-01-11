import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  userPresence: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("away")
    ),
    customStatus: v.optional(v.string()),
    lastSeen: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_user", ["userId"])
    .index("by_workspace_and_user", ["workspaceId", "userId"]),

  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),

  members: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_workspace_id", ["workspaceId"])
    .index("by_workspace_id_and_user_id", ["workspaceId", "userId"]),

  // Channels table now supports "dm" and userIds
  channels: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    type: v.union(
      v.literal("public"),
      v.literal("private"),
      v.literal("dm")
    ),
    userIds: v.optional(v.array(v.id("users"))),
  }).index("by_workspace_id", ["workspaceId"]),

  messages: defineTable({
    channelId: v.id("channels"),
    userId: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
    parentMessageId: v.optional(v.id("messages")),
  })
    .index("by_channel_id", ["channelId"])
    .index("by_user_id", ["userId"])
    .index("by_parent_message_id", ["parentMessageId"]),

  reactions: defineTable({
    messageId: v.id("messages"),
    userId: v.id("users"),
    emoji: v.string(),
  })
    .index("by_message_id", ["messageId"])
    .index("by_message_and_user", ["messageId", "userId"]),

  // New table for DM conversations
  directMessages: defineTable({
    senderId: v.id("users"),
    recipientId: v.id("users"),
    workspaceId: v.id("workspaces"),
    content: v.string(),
    createdAt: v.number(),
    deleted: v.optional(v.boolean()), // For message deletion
  }).index("by_workspace_participants", ["workspaceId", "senderId", "recipientId"])
    .index("by_conversation", ["senderId", "recipientId"])
    .index("by_workspace", ["workspaceId"]),

  // Table to track DM conversations (for sidebar)
  dmConversations: defineTable({
    workspaceId: v.id("workspaces"),
    participant1: v.id("users"),
    participant2: v.id("users"),
    lastMessageAt: v.number(),
  }).index("by_workspace_user", ["workspaceId", "participant1"])
    .index("by_participants", ["participant1", "participant2"])
});

export default schema;