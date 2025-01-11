"use client";

import { Id } from "../../../../../convex/_generated/dataModel";
import { useUserPresence } from "../hooks/use-presence";
import { PresenceIndicator } from "./presence-indicator";
import { cn } from "@/lib/utils";

interface MessagePresenceProps {
  workspaceId: Id<"workspaces">;
  userId: Id<"users">;
  className?: string;
}

export function MessagePresence({ workspaceId, userId, className }: MessagePresenceProps) {
  const presence = useUserPresence(workspaceId, userId);

  if (!presence) return null;

  return (
    <PresenceIndicator 
      status={presence.status} 
      className={cn("h-2 w-2 shrink-0 ring-1 ring-white/50", className)} 
    />
  );
} 