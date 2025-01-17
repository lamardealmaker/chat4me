import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useConvex } from "convex/react";

export function useDeleteMessage() {
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const utils = useConvex();
  const { toast } = useToast();

  return async (messageId: Id<"messages">) => {
    try {
      await deleteMessage({ messageId });
      toast({
        title: "Message deleted",
        description: "Your message has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete message",
        variant: "destructive",
      });
      throw error;
    }
  };
} 