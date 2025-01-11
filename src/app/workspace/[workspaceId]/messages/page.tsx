"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function MessagesPage() {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: members } = useGetMembers({ workspaceId });
  const sendMessage = useMutation(api.directMessages.send);

  const handleStartRandomDM = async () => {
    if (!members || members.length <= 1) return;
    
    // Get a random member that isn't the current user
    const otherMembers = members.filter(m => m.user?._id);
    const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
    
    if (randomMember && randomMember.user?._id) {
      try {
        // Create conversation with empty message
        await sendMessage({
          recipientId: randomMember.user._id as Id<"users">,
          workspaceId: workspaceId as Id<"workspaces">,
          content: "",
        });
        // Navigate to the new conversation
        router.push(`/workspace/${workspaceId}/messages/${randomMember.user._id}`);
      } catch (error) {
        console.error("Failed to start DM:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-emerald-50/30">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
        <div className="p-3 bg-emerald-100 rounded-full mb-4">
          <MessageSquareMore className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
          Start a Conversation
        </h2>
        <p className="text-emerald-600 mb-6">
          You haven't started any direct messages yet. Connect with your teammates through private conversations.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => router.push(`/workspace/${workspaceId}`)}
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Users className="mr-2 h-4 w-4" />
            View Members
          </Button>
          <Button
            onClick={handleStartRandomDM}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <MessageSquareMore className="mr-2 h-4 w-4" />
            Start Random Chat
          </Button>
        </div>
      </div>
    </div>
  );
} 