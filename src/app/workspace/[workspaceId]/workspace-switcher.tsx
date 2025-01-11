"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/app/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/app/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [_isOpen, setIsOpen] = useCreateWorkspaceModal();

  const { data: currentWorkspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: workspaces, isLoading: isWorkspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter((w) => w?._id !== workspaceId) ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 
          text-slate-800 font-semibold text-xl">
          {isWorkspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            currentWorkspace?.name?.charAt(0).toUpperCase() || "W"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className="cursor-pointer flex-col justify-start items-start capitalize">
          {currentWorkspace?.name}
          <span className="text-xs text-muted-foreground">
            Current workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces.map((ws) => {
          if (!ws) return null;
          return (
            <DropdownMenuItem 
              key={ws._id} 
              onClick={() => router.push(`/workspace/${ws._id}`)} 
              className="cursor-pointer flex items-center"
            >
              <div className="size-9 relative overflow-hidden bg-[#1C2A24] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                {ws.name.charAt(0).toUpperCase()}
              </div>
              <span className="capitalize truncate max-w-[150px]">{ws.name}</span>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsOpen(true)} className="cursor-pointer">
          <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <Plus className="h-4 w-4" />
          </div>
          Create New Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};