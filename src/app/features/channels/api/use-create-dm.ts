import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export function useCreateDM() {
  const createDM = useMutation(api.channels.createDM);
  const router = useRouter();

  return async (workspaceId: Id<"workspaces">, otherUserId: Id<"users">) => {
    try {
      const channelId = await createDM({ workspaceId, otherUserId });
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
      return channelId;
    } catch (error) {
      console.error("Failed to create DM:", error);
      throw error;
    }
  };
} 