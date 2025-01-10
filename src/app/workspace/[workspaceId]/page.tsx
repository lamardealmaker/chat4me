"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSendMessage } from "@/app/features/messages/api/use-send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";
import { Id } from "../../../../convex/_generated/dataModel";

const EMOJI_MAP: Record<string, string> = {
  thumbs_up: "👍",
  heart: "❤️",
  smile: "😊",
  party: "🎉",
  fire: "🔥",
  eyes: "👀",
  "100": "💯",
  sparkles: "✨",
  raised_hands: "🙌",
  clap: "👏",
};

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();

  // Load workspace & channels
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({ workspaceId });

  // Identify "General" channel
  const generalChannelId = useMemo(() => {
    if (!channels) return undefined;
    const chan = channels.find((c) => c.name.toLowerCase() === "general");
    return chan?._id; // if none found, this will be undefined
  }, [channels]);

  // Instead of null, pass undefined to skip the query until we have an ID
  const messages = useQuery(
    api.messages.list,
    generalChannelId ? { channelId: generalChannelId } : "skip"
  );

  const sendMessage = useSendMessage();
  const [text, setText] = useState("");

  const toggleReaction = useMutation(api.messages.toggleReaction);

  const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
    try {
      await toggleReaction({ messageId, emoji });
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
  };

  const handleSend = async () => {
    const cleaned = text.trim();
    if (!cleaned || !generalChannelId) return;
    try {
      await sendMessage({ channelId: generalChannelId, text: cleaned });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isWorkspaceLoading || isChannelsLoading) {
    return <div>Loading workspace...</div>;
  }
  if (!workspace) {
    return <div>Workspace not found.</div>;
  }
  if (generalChannelId === undefined) {
    // We haven't found or don't have a channel ID yet
    return <div>No "General" channel found in this workspace.</div>;
  }
  if (messages === undefined) {
    // The query is being skipped (or hasn't loaded) because generalChannelId was undefined previously
    return <div>Loading messages...</div>;
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {hasMessages ? (
          messages.map((msg) => (
            <div key={msg._id} className="rounded border p-2">
              <div className="text-xs text-gray-500">
                <strong>{msg.userName}</strong> •{" "}
                {new Date(msg.createdAt).toLocaleString()}
              </div>
              <div className="mt-1">{msg.text}</div>
              
              {/* Reactions */}
              <div className="mt-2 flex flex-wrap gap-1">
                {Object.entries(msg.reactions || {}).map(([code, data]) => (
                  <button
                    key={code}
                    onClick={() => handleReaction(msg._id, code)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <span>{EMOJI_MAP[code] || code}</span>
                    <span className="text-xs text-gray-600">{data.count}</span>
                  </button>
                ))}
                
                {/* Add reaction button */}
                <EmojiPicker
                  onEmojiSelect={(code) => handleReaction(msg._id, code)}
                  trigger={
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </button>
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground italic">
            Be the first to drop a message in "{workspace.name}"!
          </div>
        )}
      </div>
      <div className="border-t p-2">
        <div className="flex gap-2">
          <Input
            placeholder={`Message ${workspace.name}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}