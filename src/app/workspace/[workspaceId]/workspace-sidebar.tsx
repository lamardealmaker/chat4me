"use client";

import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Hash, Settings, Plus, Loader, AlertTriangle, MessageSquareText, SendHorizonal } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";

interface ItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Item = ({
  label,
  icon,
  onClick
}: ItemProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md text-zinc-600 dark:text-zinc-300 text-sm font-medium"
    >
      {icon}
      {label}
    </button>
  );
};

const SectionHeader = ({
  label,
  icon,
  sideIcon
}: {
  label: string;
  icon?: React.ReactNode;
  sideIcon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-x-2">
        {icon}
        <p className="text-sm font-semibold text-zinc-500">
          {label}
        </p>
      </div>
      {sideIcon}
    </div>
  );
};

export const WorkspacesSidebar = () => {
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateChannelModal();



  const { data: currentMember, isLoading: isCurrentMemberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({ workspaceId });
  const { data: members, isLoading: isMembersLoading } = useGetMembers({ workspaceId });


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
        <WorkspaceHeader workspace={workspace} isAdmin={currentMember[0]?.role === "admin"} />
        <div className="space-y-4 mt-4">
          <div>
            <div className="space-y-1">
              <SidebarItem
                label="Threads"
                icon={MessageSquareText}
                id="threads"
                
              />
              <SidebarItem
                label="Drafts & Sent"
                icon={SendHorizonal}
                id="drafts"
                
              /></ div>
            <WorkspaceSection
            label="Channels"
            hint={currentMember[0]?.role === "admin" ? "+" : ""}
            onNew={() => setOpen(true)}
            >
            {channels?.map((channelItem) => (
            <SidebarItem
                label={channelItem.name}
                icon={Hash}
                key={channelItem._id}
                id={channelItem._id}
            />
            ))}
            </WorkspaceSection>
            <WorkspaceSection
            label="Direct Messages"
            hint="+"
            onNew={() => {}}
            >
            {members?.map((item) => (
              <UserItem 
              key={item._id}
              id={item._id}
              label={item.user?.name}
              image={item.user?.image}
            
              />
            ))}
            </WorkspaceSection>
          </div>
        </div>
      </div>
    </div>
  );
};