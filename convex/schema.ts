import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

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
});

export default schema;