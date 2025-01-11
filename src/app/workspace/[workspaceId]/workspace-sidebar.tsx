"use client";

import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { Hash, Plus, Loader, AlertTriangle, MessageSquareText, SendHorizonal, X } from "lucide-react";
import { WorkspaceSection } from "./workspace-section";
import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";
import { WorkspaceHeader } from "./workspace-header";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { WorkspacePresence } from "@/app/features/presence/components/workspace-presence";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

// Update conversation interface
interface Conversation {
  _id: Id<"dmConversations">;
  otherUser: {
    _id: Id<"users">;
    name: string;
    image?: string;
  };
}

export const WorkspacesSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();

  const { data: currentMember, isLoading: isCurrentMemberLoading } =
    useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } =
    useGetChannels({ workspaceId });
  const { data: members, isLoading: isMembersLoading } =
    useGetMembers({ workspaceId });

  const conversations = useQuery(api.directMessages.listConversations, {
    workspaceId: workspaceId as Id<"workspaces">,
  }) as Conversation[] | undefined;

  const sendMessage = useMutation(api.directMessages.send);

  const handleStartDM = async (memberId: Id<"users">) => {
    try {
      // Create conversation with empty message
      await sendMessage({
        recipientId: memberId,
        workspaceId: workspaceId as Id<"workspaces">,
        content: "",
      });
      // Then navigate
      router.push(`/workspace/${workspaceId}/messages/${memberId}`);
    } catch (error) {
      console.error("Failed to start DM:", error);
    }
  };

  if (isCurrentMemberLoading || isWorkspaceLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-white" />
      </div>
    );
  }

  if (!currentMember || !workspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-y-2">
          <AlertTriangle className="text-white h-8 w-8" />
          <span className="text-white text-sm">Workspace not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white">
      <div className="p-3">
        <WorkspaceHeader
          workspace={workspace}
          isAdmin={currentMember.role === "admin"}
        />

        <div className="space-y-8 mt-6">
          <div className="space-y-6">
            <div className="space-y-1">
              {/* TODO: Implement threads */}
              {/* <SidebarItem label="Threads" icon={MessageSquareText} id="threads" /> */}
              {/* TODO: Implement drafts */}
              {/* <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" /> */}
            </div>

            <WorkspaceSection
              label="Channels"
              hint={currentMember.role === "admin" ? "+" : ""}
              onNew={() => setOpen(true)}
            >
              {channels
                ?.filter((c) => c.type !== "dm")
                .map((channelItem) => (
                  <SidebarItem
                    label={channelItem.name}
                    icon={Hash}
                    key={channelItem._id}
                    id={channelItem._id}
                    variant={pathname === `/workspace/${workspaceId}/channel/${channelItem._id}` ? "active" : "default"}
                  />
                ))}
            </WorkspaceSection>

            <WorkspaceSection label="Direct Messages">
              {conversations?.map((conv: Conversation) => (
                <SidebarItem
                  key={conv._id}
                  label={conv.otherUser.name}
                  id={conv.otherUser._id}
                  icon={MessageSquareText}
                  href={`/workspace/${workspaceId}/messages/${conv.otherUser._id}`}
                  variant={pathname === `/workspace/${workspaceId}/messages/${conv.otherUser._id}` ? "active" : "default"}
                />
              ))}
              
              <div className="mt-2 pt-2 border-t border-white/10">
                {members?.filter(m => m.user?._id !== currentMember.user?._id).map((member) => (
                  <div key={member._id} className="flex items-center justify-between py-1">
                    <span className="text-sm">{member.user?.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStartDM(member.user?._id as Id<"users">)}
                    >
                      Message
                    </Button>
                  </div>
                ))}
              </div>
            </WorkspaceSection>
          </div>

          <WorkspacePresence workspaceId={workspaceId} />
        </div>
      </div>
    </div>
  );
};