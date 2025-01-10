"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ListFilter, Plus, SquarePen } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PreferencesModal } from "./preferences-modal";
import { useState } from "react";
import { InviteModal } from "./invite-modal";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  return (
    <>
    <InviteModal 
      open={inviteOpen}
      onOpenChange={setInviteOpen}
      name={workspace.name}
      joinCode={workspace.joinCode}
    

    />
    <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />
    <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="transparent" size="sm" className="font-semibold text-lg w-auto p-1.5 overflow-hidden focus:ring-0 focus-visible:ring-0">
            <span className="truncate">{workspace.name}</span>
            <ChevronDown className="size-4 ml-1 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64 border-none">
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="size-9 relative overflow-hidden bg-[#616161] text-white font-semibold 
            text-xl flex items-center justify-center rounded-md mr-2">{workspace.name.charAt(0).toUpperCase()}</div>
            <div className="flex flex-col">
              <p className="font-bold">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">Active Workspace</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setInviteOpen(true)}>
                <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                  <Plus className="h-4 w-4" />
                </div>
                Invite People to {workspace.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => setPreferencesOpen(true)}>
                <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                  <Plus className="h-4 w-4" />
                </div>
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
        <DropdownMenuSeparator />
      <div className="flex items-center gap-0.5">
        <Button variant="transparent" size="iconSm">
          <ListFilter className="size-4" />
        </Button>
        <Button variant="transparent" size="iconSm">
          <SquarePen className="size-4" />
        </Button>
      </div>
      </DropdownMenu>
    </div></>
  );
};
