"use client";

import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useEffect } from "react";

export default function WorkspaceIdPage() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: channels } = useGetChannels({ workspaceId });

  useEffect(() => {
    if (channels) {
      const generalChannel = channels.find((c) => c.name.toLowerCase() === "general");
      if (generalChannel) {
        router.push(`/workspace/${workspaceId}/channel/${generalChannel._id}`);
      }
    }
  }, [channels, workspaceId, router]);

  return <div>Redirecting to general channel...</div>;
}