import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

// OpenAI API for generating embeddings
const OPENAI_API_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-ada-002";

type MessageWithUser = Doc<"messages"> & { userName: string };
type SearchResult = { _id: Id<"messageEmbeddings">; _score: number };

// Action to generate embedding from OpenAI
export const generateEmbedding = action({
  args: { 
    messageId: v.id("messages"),
    text: v.string(),
  },
  handler: async (ctx, { messageId, text }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: text,
        model: EMBEDDING_MODEL,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const embedding = result.data[0].embedding;

    // Store the embedding using a mutation
    await ctx.runMutation(api.embeddings.storeEmbedding, {
      messageId,
      vector: embedding,
    });

    return embedding;
  },
});

// Mutation to store embedding in the database
export const storeEmbedding = mutation({
  args: {
    messageId: v.id("messages"),
    vector: v.array(v.number()),
  },
  handler: async (ctx, { messageId, vector }) => {
    return await ctx.db.insert("messageEmbeddings", {
      messageId,
      vector,
      createdAt: Date.now(),
    });
  },
});

// Query to fetch messages from search results
export const fetchSearchResults = query({
  args: {
    results: v.array(v.object({
      _id: v.id("messageEmbeddings"),
      _score: v.number(),
    })),
  },
  handler: async (ctx, { results }): Promise<MessageWithUser[]> => {
    const messages: MessageWithUser[] = [];
    
    for (const { _id } of results) {
      const embedding = await ctx.db.get(_id);
      if (!embedding) continue;

      const message = await ctx.db.get(embedding.messageId);
      if (!message) continue;

      const user = await ctx.db.get(message.userId);
      if (!user) continue;

      messages.push({
        ...message,
        userName: user.name ?? "Unknown",
      });
    }

    return messages;
  },
});

// Action to generate embedding and find similar messages
export const findSimilarMessages = action({
  args: {
    text: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { text, limit = 5 }): Promise<MessageWithUser[]> => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: text,
        model: EMBEDDING_MODEL,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const queryEmbedding = result.data[0].embedding;

    // Do vector search in the action
    const searchResults = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
      vector: queryEmbedding,
      limit,
    });

    // Fetch the actual messages using a query
    return await ctx.runQuery(api.embeddings.fetchSearchResults, {
      results: searchResults,
    });
  },
}); 