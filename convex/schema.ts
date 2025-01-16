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
    format: v.optional(v.union(v.literal("text"), v.literal("dalle"), v.literal("markdown"))),
    storageId: v.optional(v.string()),
    formattedText: v.optional(v.string()),
    createdAt: v.number(),
    parentMessageId: v.optional(v.id("messages")),
    isAI: v.optional(v.boolean()),
  })
    .index("by_channel_id", ["channelId"])
    .index("by_user_id", ["userId"])
    .index("by_parent_message_id", ["parentMessageId"]),

  messageEmbeddings: defineTable({
    messageId: v.id("messages"),
    vector: v.array(v.number()),
    createdAt: v.number(),
  })
    .index("by_message_id", ["messageId"])
    .vectorIndex("by_vector", {
      vectorField: "vector",
      dimensions: 1536,
    }),

  aiTasks: defineTable({
    channelId: v.id("channels"),
    userId: v.id("users"),
    messageId: v.id("messages"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed")
    ),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
    error: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_channel", ["channelId"])
    .index("by_user", ["userId"]),

  reactions: defineTable({
    messageId: v.id("messages"),
    userId: v.id("users"),
    emoji: v.string(),
  })
    .index("by_message_id", ["messageId"])
    .index("by_message_and_user", ["messageId", "userId"]),
});

export default schema;