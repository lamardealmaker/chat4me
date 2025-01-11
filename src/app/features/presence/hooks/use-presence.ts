import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useEffect } from "react";

export type PresenceStatus = "online" | "offline" | "away";

export function usePresence(workspaceId: Id<"workspaces">) {
  const updatePresence = useMutation(api.presence.updatePresence);
  const presenceData = useQuery(api.presence.getWorkspacePresence, { workspaceId });

  // Update presence on mount and set interval
  useEffect(() => {
    const updateStatus = () => {
      updatePresence({
        workspaceId,
        status: "online",
      });
    };

    // Update immediately
    updateStatus();

    // Set up interval to update presence
    const interval = setInterval(updateStatus, 30000); // Every 30 seconds

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updatePresence({
          workspaceId,
          status: "away",
        });
      } else {
        updateStatus();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      // Set status to offline when unmounting
      updatePresence({
        workspaceId,
        status: "offline",
      });
    };
  }, [workspaceId, updatePresence]);

  return presenceData;
}

export function useUserPresence(workspaceId: Id<"workspaces">, userId: Id<"users">) {
  return useQuery(api.presence.getUserPresence, { workspaceId, userId });
}

export function useUpdatePresence() {
  return useMutation(api.presence.updatePresence);
} 