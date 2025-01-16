"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import OpenAI from "openai";
import { internal } from "../_generated/api";
import { ActionCtx } from "../_generated/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default action({
  args: {
    prompt: v.string(),
    channelId: v.id("channels"),
    threadId: v.optional(v.id("messages")),
    size: v.optional(v.union(v.literal("1024x1024"), v.literal("1024x1792"), v.literal("1792x1024"), v.literal("512x512"))),
  },
  handler: async (ctx: ActionCtx, args) => {
    // Check content moderation
    const moderation = await openai.moderations.create({
      input: args.prompt,
    });

    if (moderation.results[0].flagged) {
      throw new Error("Prompt was flagged by content moderation");
    }

    // Generate image
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: args.prompt,
      n: 1,
      size: "512x512",
      quality: "standard",
      response_format: "url",
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error("No image URL returned from OpenAI");
    }

    // Download image
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();

    // Store in Convex storage
    const storageId = await ctx.storage.store(imageBlob);

    // Return both the storage ID and temporary URL
    return {
      storageId,
      imageUrl
    };
  },
}); 