import { Doc, Id } from "../../convex/_generated/dataModel";

export interface MessageWithExtras extends Doc<"messages"> {
  _id: Id<"messages">;
  channelId: Id<"channels">;
  userId: Id<"users">;
  text: string;
  format?: "text" | "dalle" | "markdown";
  storageId?: string;
  formattedText?: string;
  createdAt: number;
  parentMessageId?: Id<"messages">;
  isAI?: boolean;
  userName: string;
  imageUrl?: string;
  reactions: Record<string, { count: number; users: string[]; emoji: string }>;
}

export interface EmojiData {
  native: string;
  id: string;
  name: string;
  unified: string;
} 