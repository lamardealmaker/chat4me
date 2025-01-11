"use client";

import { Id } from "../../../../../convex/_generated/dataModel";
import { usePresence } from "../hooks/use-presence";
import { PresenceWithStatus } from "./presence-indicator";
import { WorkspaceSection } from "@/app/workspace/[workspaceId]/workspace-section";

interface WorkspacePresenceProps {
  workspaceId: Id<"workspaces">;
  className?: string;
}

export function WorkspacePresence({ workspaceId, className }: WorkspacePresenceProps) {
  const presenceData = usePresence(workspaceId);

  if (!presenceData) return null;

  // Sort by status: online first, then away, then offline
  const sortedPresence = [...presenceData].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <WorkspaceSection label="Members" className={className}>
      {sortedPresence.map((presence) => (
        <PresenceWithStatus
          key={presence.userId}
          status={presence.status}
          customStatus={presence.customStatus}
          userName={presence.userName}
          className="px-2 py-1.5 rounded-md hover:bg-emerald-900/50 transition-colors"
        />
      ))}
    </WorkspaceSection>
  );
} 