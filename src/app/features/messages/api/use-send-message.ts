import { api } from "../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";

export function useSendMessage() {
  const sendMessage = useMutation(api.messages.send);

  return async ({ channelId, text, parentMessageId }: {
    channelId: Id<"channels">;
    text: string;
    parentMessageId?: Id<"messages">;
  }) => {
    try {
      await sendMessage({ channelId, text, parentMessageId });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };
}