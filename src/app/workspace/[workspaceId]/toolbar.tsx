"use client";

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { Search, Info } from "lucide-react";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  if (!data) {
    return null;
  }

  return (
    <nav 
      className="bg-[#014421] flex items-center justify-between h-10 p-1.5"
    >
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button 
          size="sm" 
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-8"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">
            Search {data?.name} Workspace
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button 
          variant="transparent" 
          size="iconSm"
        >
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
