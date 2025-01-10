import { api } from "../../../../../convex/_generated/api";
import { useMutation } from "convex/react";

export function useSendMessage() {
  return useMutation(api.messages.send);
}