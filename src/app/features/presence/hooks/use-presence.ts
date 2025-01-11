import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useEffect, useCallback, useRef } from "react";

export type PresenceStatus = "online" | "offline" | "away";

export function usePresence(workspaceId: Id<"workspaces">) {
  const updatePresence = useMutation(api.presence.updatePresence);
  const presenceData = useQuery(api.presence.getWorkspacePresence, { workspaceId });
  const user = useQuery(api.users.current);
  const mountedRef = useRef(true);

  const updateStatus = useCallback(async (status: PresenceStatus) => {
    if (!mountedRef.current) return;
    try {
      await updatePresence({
        workspaceId,
        status,
      });
    } catch (e) {
      // Silently handle errors
    }
  }, [workspaceId, updatePresence]);

  // Update presence on mount and set interval
  useEffect(() => {
    if (!user) return;

    // Set initial status
    updateStatus("online");

    // Set up interval for updates
    const interval = setInterval(() => {
      if (mountedRef.current) {
        updateStatus("online");
      }
    }, 30000);

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (!mountedRef.current) return;
      updateStatus(document.hidden ? "away" : "online");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user, updateStatus]);

  return presenceData;
}

export function useUserPresence(workspaceId: Id<"workspaces">, userId: Id<"users">) {
  return useQuery(api.presence.getUserPresence, { workspaceId, userId });
}

export function useUpdatePresence() {
  return useMutation(api.presence.updatePresence);
} 