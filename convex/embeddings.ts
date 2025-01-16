import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery } from "./_generated/server";
import OpenAI from "openai";
import { internal, api } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

// Type for search results
type SearchResult = Doc<"messages"> & {
  userName: string;
  _score: number;
};

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is required");
  }
  return new OpenAI({ apiKey });
}

export const generateEmbedding = internalAction({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const openai = getOpenAIClient();
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
    console.log("Generating embedding for message:", messageId);
    
    const message = await ctx.runQuery(internal.embeddings.getMessage, { messageId });
    if (!message) {
      console.log("Message not found:", messageId);
      return;
    }

    console.log("Generating vector for text:", message.text.slice(0, 50) + "...");
    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text: message.text,
    });

    console.log("Storing vector of length:", vector.length);
    await ctx.runMutation(internal.embeddings.storeEmbedding, {
      messageId,
      vector,
    });
    console.log("Successfully stored embedding for message:", messageId);
  },
});

export const findSimilarMessages = action({
  args: {
    text: v.string(),
    limit: v.optional(v.number()),
    userId: v.id("users"),
  },
  handler: async (ctx, { text, limit = 4, userId }): Promise<SearchResult[]> => {
    // Generate embedding for the search text
    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text,
    });

    // Use vector index to find similar messages
    const results = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
      vector,
      limit: limit * 3, // Get more results since we'll filter
    });

    // Fetch messages using internal query
    const messages = await ctx.runQuery(internal.embeddings.fetchMessages, {
      ids: results.map(r => r._id),
    });

    // Filter to only messages from specified user and take requested limit
    const userMessages = messages
      .filter(msg => msg.userId === userId)
      .slice(0, limit);

    // Map results scores to filtered messages
    const resultScores = new Map(results.map(r => [r._id.toString(), r._score]));
    return userMessages.map(msg => ({
      ...msg,
      _score: resultScores.get(msg._id.toString()) ?? 0,
    }));
  },
});

export type SearchResultType = Doc<"messages"> & {
  userName: string;
  channelName: string;
  _score: number;
};

interface Channel {
  _id: Id<"channels">;
  name: string;
  workspaceId: Id<"workspaces">;
  type: "public" | "private" | "dm";
  userIds?: Id<"users">[];
}

export const getChannels = internalQuery({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
      .collect();
  },
});

export const searchMessages = action({
  args: {
    workspaceId: v.id("workspaces"),
    query: v.string(),
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { workspaceId, query, cursor, limit = 10 }): Promise<{ results: SearchResultType[], nextCursor?: string }> => {
    console.log("Searching messages with query:", query);
    
    // Generate embedding for vector search
    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text: query,
    });
    console.log("Generated search vector of length:", vector.length);

    // Get all channels in workspace (do this once)
    const channels = await ctx.runQuery(internal.embeddings.getChannels, { workspaceId }) as Channel[];
    console.log("Found channels:", channels.length);
    const channelIds = channels.map((c: Channel) => c._id);
    const channelMap = new Map(channels.map((c: Channel) => [c._id.toString(), c]));

    // Vector search with higher limit since we'll filter more aggressively
    const vectorResults = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
      vector,
      limit: 30, // Increased from 20 to account for filtering
    });
    console.log("Vector search results:", vectorResults.length);

    // Get message data for all results
    const messageData = await Promise.all(
      vectorResults.map(async r => {
        const data = await ctx.runQuery(internal.embeddings.getEmbeddingAndMessage, { 
          embeddingId: r._id 
        });
        return { score: r._score, data };
      })
    );

    // Log semantic search results with channel info
    console.log("\n=== Semantic Search Results ===");
    messageData
      .filter(r => r.data?.message)
      .sort((a, b) => b.score - a.score)
      .forEach((result, i) => {
        const msg = result.data?.message;
        const channel = msg ? channelMap.get(msg.channelId.toString()) : null;
        console.log(`\n#${i + 1} (Score: ${result.score.toFixed(4)} | Channel: ${channel?.name || 'unknown'})\n"${msg?.text || 'N/A'}"`);
      });
    console.log("\n=== End Semantic Results ===\n");

    // Track seen message IDs to avoid duplicates
    const seenMessageIds = new Set<string>();
    const combinedResults: SearchResultType[] = [];
    
    // Function to check if a message is worth including
    const isQualityMatch = (text: string, score: number) => {
      const words = query.trim().split(/\s+/);
      const isOneWord = words.length === 1;
      
      if (isOneWord) {
        // For single-word queries, require high score or exact match
        const exactMatch = text.toLowerCase().includes(query.toLowerCase());
        return exactMatch || score > 0.95;
      }
      
      // For multi-word queries, use normal scoring
      return true;
    };

    // Add semantic search results
    for (const [index, result] of vectorResults.entries()) {
      const data = messageData[index].data?.message;
      const score = messageData[index].score;
      
      if (!data) continue;
      
      // Apply quality filter
      if (!isQualityMatch(data.text, score)) {
        console.log(`Filtering out low-quality match: "${data.text.slice(0, 100)}${data.text.length > 100 ? '...' : ''}" (score: ${score})`);
        continue;
      }

      seenMessageIds.add(data._id.toString());
      
      // Check if message is in any workspace channel
      const channel = channelMap.get(data.channelId.toString());
      if (!channel) {
        console.log(`Skipping message from unknown channel: "${data.text.slice(0, 100)}${data.text.length > 100 ? '...' : ''}"`);
        continue;
      }

      // Get user info
      const user = await ctx.runQuery(internal.embeddings.getUser, { userId: data.userId });
      if (!user) continue;

      combinedResults.push({
        ...data,
        userName: user.name ?? "Unknown",
        channelName: channel.name,
        _score: score,
      });
    }

    // Keyword search
    const startTime = cursor ? parseInt(cursor) : Date.now();
    const keywordMessages = await ctx.runQuery(api.messages.search, {
      workspaceId,
      query,
      startTime,
      limit: 20,
    });

    console.log("\n=== Keyword Search Results ===");
    // Add keyword results (only if they pass quality filter)
    for (const msg of keywordMessages) {
      if (seenMessageIds.has(msg._id.toString())) {
        console.log(`Skipping duplicate message: "${msg.text.slice(0, 100)}${msg.text.length > 100 ? '...' : ''}"`);
        continue;
      }

      // Apply quality filter for keyword results too
      if (!isQualityMatch(msg.text, 0)) {
        console.log(`Filtering out low-quality keyword match: "${msg.text.slice(0, 100)}${msg.text.length > 100 ? '...' : ''}"`);
        continue;
      }

      seenMessageIds.add(msg._id.toString());

      const channel = channelMap.get(msg.channelId.toString());
      if (!channel) {
        console.log(`Skipping keyword match from unknown channel: "${msg.text.slice(0, 100)}${msg.text.length > 100 ? '...' : ''}"`);
        continue;
      }

      const user = await ctx.runQuery(internal.embeddings.getUser, { userId: msg.userId });
      if (!user) continue;

      console.log(`\nKeyword match in ${channel.name}: "${msg.text}"`);

      combinedResults.push({
        ...msg,
        userName: user.name ?? "Unknown",
        channelName: channel.name,
        _score: 0, // Keyword results get lower priority
      });
    }
    console.log("\n=== End Keyword Results ===\n");

    // Sort results - semantic matches first, then by date
    combinedResults.sort((a, b) => {
      if (a._score !== b._score) {
        return b._score - a._score;
      }
      return b.createdAt - a.createdAt;
    });

    // Log channel distribution
    const channelCounts = new Map<string, number>();
    for (const result of combinedResults) {
      channelCounts.set(result.channelName, (channelCounts.get(result.channelName) || 0) + 1);
    }
    console.log("\nResults by channel:");
    for (const [channel, count] of channelCounts.entries()) {
      console.log(`${channel}: ${count} results`);
    }

    console.log(`\nTotal results: ${combinedResults.length} (${vectorResults.length} semantic + ${keywordMessages.length} keyword - ${seenMessageIds.size} unique)\n`);

    return {
      results: combinedResults,
      nextCursor: undefined
    };
  },
});

export const getEmbeddingAndMessage = internalQuery({
  args: { embeddingId: v.id("messageEmbeddings") },
  handler: async (ctx, { embeddingId }) => {
    const embedding = await ctx.db.get(embeddingId);
    if (!embedding) return null;
    
    const message = await ctx.db.get(embedding.messageId);
    if (!message) return null;
    
    return { message, embedding };
  },
}); 