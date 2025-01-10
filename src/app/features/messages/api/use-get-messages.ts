import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";

export function useGetMessages(channelId: Id<"channels">) {
  const data = useQuery(api.messages.list, { channelId });
  const isLoading = data === undefined;

  return { data, isLoading };
}