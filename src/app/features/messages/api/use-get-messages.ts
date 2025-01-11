import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";

export function useGetMessages(channelId: string) {
  const data = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
  const isLoading = data === undefined;

  return { data, isLoading };
}