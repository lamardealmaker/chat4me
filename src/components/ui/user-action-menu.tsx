"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare } from "lucide-react";
import { useCreateDM } from "@/app/features/channels/api/use-create-dm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { useState } from "react";

interface UserActionMenuProps {
  userId: Id<"users">;
  userName: string;
  children: React.ReactNode;
}

export function UserActionMenu({ userId, userName, children }: UserActionMenuProps) {
  const workspaceId = useWorkspaceId();
  const createDM = useCreateDM();
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleStartDM = async () => {
    if (!workspaceId) return;
    const channelId = await createDM(workspaceId, userId);
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    }
  };

  // If this is the current user, just render the children without the dropdown
  if (userId === currentUser?._id) {
    return <>{children}</>;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <span 
          className="cursor-pointer hover:underline group relative"
          onMouseEnter={() => {
            hoverTimeout = setTimeout(() => setIsOpen(true), 500); // 500ms delay
          }}
          onMouseLeave={() => {
            clearTimeout(hoverTimeout);
          }}
        >
          {children}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        side="right" 
        align="start" 
        className="w-48"
        onMouseLeave={() => setIsOpen(false)}
      >
        <DropdownMenuItem onClick={handleStartDM} className="cursor-pointer">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message {userName}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 