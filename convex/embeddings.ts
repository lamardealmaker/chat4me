import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery } from "./_generated/server";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

const openai = new OpenAI();

// Type for search results
type SearchResult = Doc<"messages"> & {
  userName: string;
  _score: number;
};

export const generateEmbedding = internalAction({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  },
});

export const storeEmbedding = internalMutation({
  args: {
    messageId: v.id("messages"),
    vector: v.array(v.float64()),
  },
  handler: async (ctx, { messageId, vector }) => {
    await ctx.db.insert("messageEmbeddings", {
      messageId,
      vector,
      createdAt: Date.now(),
    });
  },
});

export const getMessage = internalQuery({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    return await ctx.db.get(messageId);
  },
});

export const getUser = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});

export const fetchMessages = internalQuery({
  args: { ids: v.array(v.id("messageEmbeddings")) },
  handler: async (ctx, { ids }) => {
    const results = [];
    for (const id of ids) {
      const embedding = await ctx.db.get(id);
      if (!embedding) continue;

      const message = await ctx.db.get(embedding.messageId);
      if (!message) continue;

      const user = await ctx.db.get(message.userId);
      if (!user) continue;

      results.push({
        ...message,
        userName: user.name ?? "Unknown",
      });
    }
    return results;
  },
});

export const generateAndStoreEmbedding = action({
  args: { messageId: v.id("messages") },
  handler: async (ctx, { messageId }) => {
    const message = await ctx.runQuery(internal.embeddings.getMessage, { messageId });
    if (!message) return;

    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text: message.text,
    });

    await ctx.runMutation(internal.embeddings.storeEmbedding, {
      messageId,
      vector,
    });
  },
});

export const findSimilarMessages = action({
  args: {
    text: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { text, limit = 4 }): Promise<SearchResult[]> => {
    // Generate embedding for the search text
    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text,
    });

    // Use vector index to find similar messages
    const results = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
      vector,
      limit,
    });

    // Fetch messages using internal query
    const messages = await ctx.runQuery(internal.embeddings.fetchMessages, {
      ids: results.map(r => r._id),
    });

    // Add scores to messages
    return messages.map((msg, i) => ({
      ...msg,
      _score: results[i]._score,
    }));
  },
}); 