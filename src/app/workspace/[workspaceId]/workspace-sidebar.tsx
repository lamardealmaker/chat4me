"use client";

import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { Hash, Plus, Loader, AlertTriangle, MessageSquareText, SendHorizonal } from "lucide-react";
import { WorkspaceSection } from "./workspace-section";
import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";
import { WorkspaceHeader } from "./workspace-header";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const WorkspacesSidebar = () => {
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();

  // DM creation
  const createDM = useMutation(api.channels.createDM);
  const [dmUserId, setDmUserId] = useState<string | null>(null);

  const { data: currentMember, isLoading: isCurrentMemberLoading } =
    useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } =
    useGetChannels({ workspaceId });
  const { data: members, isLoading: isMembersLoading } =
    useGetMembers({ workspaceId });

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

  // Example function to pick a user from the members list and create a DM
  const handleCreateDM = async (otherUserId: string) => {
    try {
      await createDM({ workspaceId, userIds: [otherUserId, currentMember[0]._id] });
      console.log("DM created!");
      // Refresh or handle channel load
    } catch (error) {
      console.error("Failed to create DM:", error);
    }
  };

  return (
    <div className="flex flex-col h-full text-white">
      <div className="p-3">
        <WorkspaceHeader
          workspace={workspace}
          isAdmin={currentMember[0]?.role === "admin"}
        />

        <div className="space-y-4 mt-4">
          <div>
            <div className="space-y-1">
              <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
              <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
            </div>

            <WorkspaceSection
              label="Channels"
              hint={currentMember[0]?.role === "admin" ? "+" : ""}
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
                  />
                ))}
            </WorkspaceSection>

            <WorkspaceSection label="Direct Messages" hint="+" onNew={() => {}}>
              {members?.map((member) => (
                <div key={member._id} className="flex items-center">
                  <UserItem
                    id={member._id}
                    label={member.user?.name}
                    image={member.user?.image}
                  />
                  {member._id !== currentMember[0]._id && (
                    <button
                      className="ml-auto text-xs hover:underline"
                      onClick={() => handleCreateDM(member._id)}
                    >
                      DM
                    </button>
                  )}
                </div>
              ))}
            </WorkspaceSection>
          </div>
        </div>
      </div>
    </div>
  );
};