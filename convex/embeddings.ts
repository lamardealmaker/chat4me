import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, ActionCtx } from "./_generated/server";
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
    // Batch fetch all embeddings
    const embeddings = await ctx.db
      .query("messageEmbeddings")
      .filter(q => q.or(...ids.map(id => q.eq(q.field("_id"), id))))
      .collect();
    
    if (embeddings.length === 0) return [];

    // Get unique message IDs
    const messageIds = [...new Set(embeddings.map(e => e.messageId))];
    
    // Batch fetch all messages
    const messages = await ctx.db
      .query("messages")
      .filter(q => q.or(...messageIds.map(id => q.eq(q.field("_id"), id))))
      .collect();

    if (messages.length === 0) return [];

    // Create message lookup map
    const messageMap = new Map(messages.map(m => [m._id.toString(), m]));

    // Get unique user IDs
    const userIds = [...new Set(messages.map(m => m.userId))];

    // Batch fetch all users
    const users = await ctx.db
      .query("users")
      .filter(q => q.or(...userIds.map(id => q.eq(q.field("_id"), id))))
      .collect();

    // Create user lookup map
    const userMap = new Map(users.map(u => [u._id.toString(), u]));

    // Assemble results maintaining original order
    return embeddings
      .map(embedding => {
        const message = messageMap.get(embedding.messageId.toString());
        if (!message) return null;

        const user = userMap.get(message.userId.toString());
        if (!user) return null;

        return {
          ...message,
          userName: user.name ?? "Unknown",
        };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null);
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
  isAIRanked: boolean;
  relevanceExplanation?: string;
};

type AIEnhancedSearchResult = SearchResultType;

type AIRankingResponse = {
  rerankedResults: {
    messageId: string;
    score: number;
    explanation: string;
  }[];
};

async function rerankedWithAI(
  ctx: ActionCtx,
  query: string,
  results: SearchResultType[]
): Promise<AIEnhancedSearchResult[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY required");

  // Prepare context for GPT-4o-mini
  const searchContext = {
    query,
    results: results.map(r => ({
      id: r._id,
      text: r.text,
      userName: r.userName,
      channelName: r.channelName,
      score: r._score,
      createdAt: new Date(r.createdAt).toISOString()
    }))
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert search result ranker. Analyze and rerank search results based on relevance.

IMPORTANT: Return ONLY raw JSON without any markdown formatting, backticks, or explanation text.
DO NOT include results with low relevance (score < 0.5) in the response.

Example response format:
{"rerankedResults":[{"messageId":"abc","score":0.95,"explanation":"Exact topic match"}]}

Search Pattern Analysis:
1. Literal Search (when query looks like a specific phrase or word to find):
   - Prioritize exact or close matches in the text
   - Consider word variations and substrings
   - Look for similar phrases or typo-like variations
   - Score based on match precision and completeness

2. Semantic Search (when query looks like a topic or concept):
   - Focus on meaning and context
   - Consider related concepts and synonyms
   - Look at overall message context
   - Score based on topical relevance

For each message, evaluate BOTH patterns and use the higher score.
Example scenarios:
- Query "how to deploy" -> Semantic search, look for deployment discussions
- Query "thanks everyone" -> Literal search, find messages containing thanks
- Query "error 404" -> Both literal (exact error) and semantic (error discussions)

Instructions:
1. Analyze message content for:
   - Exact/near matches (literal search)
   - Semantic relevance (meaning search)
   - Channel context
   - Recency

2. For each relevant result provide:
   - messageId (string)
   - score (number 0-1)
   - explanation (string, max 50 chars)

3. Return only high-relevance matches (score >= 0.5)

Scoring:
0.9-1.0 = Perfect match (exact phrase or perfect semantic match)
0.7-0.9 = Strong relevance (partial phrase or strong semantic match)
0.5-0.7 = Moderate relevance (related phrase or moderate semantic match)
< 0.5 = Do not include in results`
        },
        {
          role: "user",
          content: JSON.stringify(searchContext)
        }
      ],
      temperature: 0.1, // Reduced temperature for more consistent output
    })
  });

  if (!response.ok) {
    throw new Error("OpenAI API error");
  }

  const aiResponse = await response.json();
  let ranking: AIRankingResponse;
  
  try {
    const content = aiResponse.choices[0].message.content;
    // Remove any potential markdown or backticks
    const cleanJson = content.replace(/```json\n?|\n?```/g, '').trim();
    ranking = JSON.parse(cleanJson);
    
    // Validate response structure
    if (!ranking.rerankedResults || !Array.isArray(ranking.rerankedResults)) {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Failed to parse AI response:", aiResponse.choices[0].message.content);
    throw new Error("Failed to parse AI ranking response");
  }

  // Map AI rankings back to original results
  const rankedResults = new Map(
    ranking.rerankedResults.map(r => [r.messageId, r])
  );

  return results
    .map(result => {
      const ranking = rankedResults.get(result._id.toString());
      if (!ranking) return null;
      
      return {
        ...result,
        _score: ranking.score,
        relevanceExplanation: ranking.explanation,
        isAIRanked: true
      };
    })
    .filter((result): result is NonNullable<typeof result> => result !== null)
    .sort((a, b) => b._score - a._score);
}

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
  handler: async (ctx, args) => {
    console.log("Searching messages with query:", args.query);
    
    // Generate embedding for vector search
    const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
      text: args.query,
    });
    console.log("Generated search vector of length:", vector.length);

    // Get all channels in workspace (do this once)
    const channels = await ctx.runQuery(internal.embeddings.getChannels, { workspaceId: args.workspaceId }) as Channel[];
    console.log("Found channels:", channels.length);
    const channelIds = channels.map((c: Channel) => c._id);
    const channelMap = new Map(channels.map((c: Channel) => [c._id.toString(), c]));

    // Vector search with reduced limit
    const vectorResults = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
      vector,
      limit: 7,
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

    // Track seen message IDs to avoid duplicates
    const seenMessageIds = new Set<string>();
    const combinedResults: SearchResultType[] = [];
    
    // Function to check if a message is worth including
    const isQualityMatch = (text: string, score: number) => {
      return true;
    };

    // Add semantic search results
    for (const [index, result] of vectorResults.entries()) {
      const data = messageData[index].data?.message;
      const score = messageData[index].score;
      
      if (!data) continue;

      seenMessageIds.add(data._id.toString());
      
      const channel = channelMap.get(data.channelId.toString());
      if (!channel) continue;

      const user = await ctx.runQuery(internal.embeddings.getUser, { userId: data.userId });
      if (!user) continue;

      combinedResults.push({
        ...data,
        userName: user.name ?? "Unknown",
        channelName: channel.name,
        _score: score,
        isAIRanked: false,
      });
    }

    // Keyword search with reduced limit
    const startTime = args.cursor ? parseInt(args.cursor) : Date.now();
    const keywordMessages = await ctx.runQuery(api.messages.search, {
      workspaceId: args.workspaceId,
      query: args.query,
      startTime,
      limit: 5,
    });

    // Add keyword results
    for (const msg of keywordMessages) {
      if (seenMessageIds.has(msg._id.toString())) continue;

      seenMessageIds.add(msg._id.toString());

      const channel = channelMap.get(msg.channelId.toString());
      if (!channel) continue;

      const user = await ctx.runQuery(internal.embeddings.getUser, { userId: msg.userId });
      if (!user) continue;

      combinedResults.push({
        ...msg,
        userName: user.name ?? "Unknown",
        channelName: channel.name,
        _score: 0,
        isAIRanked: false,
      });
    }

    try {
      // Apply AI reranking
      const aiRankedResults = await rerankedWithAI(ctx, args.query, combinedResults);
      return {
        results: aiRankedResults.map(result => ({
          ...result,
          isAIRanked: true
        })),
        nextCursor: undefined,
        isAIRanked: true
      };
    } catch (error) {
      console.error("AI ranking failed, using default ranking:", error);
      // Fallback to original ranking
      combinedResults.sort((a, b) => {
        if (a._score !== b._score) {
          return b._score - a._score;
        }
        return b.createdAt - a.createdAt;
      });
      
      return {
        results: combinedResults.map(result => ({
          ...result,
          isAIRanked: false
        })),
        nextCursor: undefined,
        isAIRanked: false
      };
    }
  }
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

export const getChannel = internalQuery({
  args: { channelId: v.id("channels") },
  handler: async (ctx, { channelId }) => {
    return await ctx.db.get(channelId);
  },
}); 