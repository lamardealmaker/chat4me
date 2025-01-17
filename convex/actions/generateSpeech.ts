"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";

const voices = [
  { name: "Alice", id: "Xb7hH8MSUJpSbSDYk0k2" },
  { name: "Aria", id: "9BWtsMINqrJLrRacOk9x" },
  { name: "Bill", id: "pqHfZKP75CvOlQylNhV4" },
  { name: "Brian", id: "nPczCjzI2devNBz1zQrb" },
  { name: "Callum", id: "N2lVS1w4EtoT3dr4eOWO" },
  { name: "Charlie", id: "IKne3meq5aSn9XLyUdCD" },
  { name: "Charlotte", id: "XB0fDUnXU5powFXDhCwa" },
  { name: "Chris", id: "iP95p4xoKVk53GoZ742B" },
  { name: "Daniel", id: "onwK4e9ZLuTAKqWW03F9" },
  { name: "Eric", id: "cjVigY5qzO86Huf0OWal" },
  { name: "George", id: "JBFqnCBsd6RMkjVDRZzb" },
  { name: "Jessica", id: "cgSgspJ2msm6clMCkdW9" },
  { name: "Laura", id: "FGY2WhTYpPnrIDTdsKH5" },
  { name: "Liam", id: "TX3LPaxmHKxFdv7VOQHJ" },
  { name: "Lily", id: "pFZP5JQG7iQjIQuC4Bku" },
  { name: "Matilda", id: "XrExE9yKIg1WjnnlVkGX" },
  { name: "River", id: "SAz9YHcvj6GT2YYXdXww" },
  { name: "Roger", id: "CwhRBWXzGAHq8TQ4Fs17" },
  { name: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" },
  { name: "Will", id: "bIHbv24MWmeRgasZH58o" }
];

export default action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, { text }) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error("ElevenLabs API key not found in environment variables");
    }

    const client = new ElevenLabsClient({
      apiKey,
    });

    try {
      // Log API key length for debugging (safely)
      console.log(`API key present (length: ${apiKey.length})`);
      
      // Randomly select a voice
      const randomVoice = voices[Math.floor(Math.random() * voices.length)];
      console.log(`Using voice: ${randomVoice.name}`);

      const audioStream = await client.textToSpeech.convert(
        randomVoice.id,
        {
          text,
          model_id: "eleven_multilingual_v2",
        }
      );

      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(Buffer.from(chunk));
      }
      const audioBuffer = Buffer.concat(chunks);
      const base64Audio = audioBuffer.toString('base64');
      
      // Return both the audio and voice info
      return {
        audio: base64Audio,
        voiceName: randomVoice.name
      };
    } catch (error) {
      console.error("Failed to generate speech:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate audio: ${error.message}`);
      }
      throw new Error("Failed to generate audio: Unknown error");
    }
  },
}); 