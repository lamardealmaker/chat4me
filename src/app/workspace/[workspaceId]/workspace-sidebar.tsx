"use client";

import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { Hash, Plus, Loader, AlertTriangle, MessageSquareText, SendHorizonal, X, ChevronDown, ChevronRight, Circle } from "lucide-react";
import { WorkspaceSection } from "./workspace-section";
import { SidebarItem } from "./sidebar-item";
import { UserItem } from "./user-item";
import { WorkspaceHeader } from "./workspace-header";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { WorkspacePresence } from "@/app/features/presence/components/workspace-presence";
import { Id, Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useCreateDM } from "@/app/features/channels/api/use-create-dm";

export const WorkspacesSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();
  const createDM = useCreateDM();
  const cleanupDMs = useMutation(api.channels.cleanupDuplicateDMs);

  // Run cleanup when workspace loads
  useEffect(() => {
    if (workspaceId) {
      cleanupDMs({ workspaceId: workspaceId as Id<"workspaces"> });
    }
  }, [workspaceId]);

  const { data: currentMember, isLoading: isCurrentMemberLoading } =
    useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: isWorkspaceLoading } =
    useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } =
    useGetChannels({ workspaceId });
  const { data: members, isLoading: isMembersLoading } =
    useGetMembers({ workspaceId });

  const regularChannels = channels?.filter(c => c.type !== "dm") ?? [];
  const dmChannels = channels?.filter(c => c.type === "dm" && c.name?.trim()) ?? [];

  // Filter out current user from members list
  const otherMembers = members?.filter(m => m.user?._id !== currentMember?.user?._id) ?? [];

  const handleUserClick = async (userId: Id<"users">) => {
    if (!workspaceId) return;
    await createDM(workspaceId, userId);
  };

  // Get online presence
  const presence = useQuery(api.presence.list, {
    workspaceId: workspaceId as Id<"workspaces">,
  }) ?? [];

  // Filter members to only show online ones
  const onlineMembers = members?.filter(member => 
    member.user?._id !== currentMember?.user?._id && // Not current user
    presence.some((p: Doc<"userPresence">) => 
      p.userId === member.user?._id && 
      p.status === "online"
    )
  ) ?? [];

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
                    href={`/workspace/${workspaceId}/channel/${channelItem._id}`}
                    variant={pathname === `/workspace/${workspaceId}/channel/${channelItem._id}` ? "active" : "default"}
                  />
                ))}
            </WorkspaceSection>

            <WorkspaceSection 
              label="Direct Messages"
              hint="+"
            >
              {dmChannels.length === 0 ? (
                <div className="px-2 py-1 text-sm text-zinc-400">
                  No direct messages yet
                </div>
              ) : (
                dmChannels.map((channel) => (
                  <SidebarItem
                    key={channel._id}
                    label={channel.name}
                    id={channel._id}
                    icon={Circle}
                    iconClassName="h-2 w-2 mt-1 text-emerald-500"
                    href={`/workspace/${workspaceId}/channel/${channel._id}`}
                    variant={pathname === `/workspace/${workspaceId}/channel/${channel._id}` ? "active" : "default"}
                  />
                ))
              )}

              <div className="mt-2 pt-2 border-t border-white/10">
                {otherMembers.map((member) => (
                  <button
                    key={member._id}
                    onClick={() => handleUserClick(member.user?._id as Id<"users">)}
                    className="flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md text-sm"
                  >
                    <span>{member.user?.name}</span>
                  </button>
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