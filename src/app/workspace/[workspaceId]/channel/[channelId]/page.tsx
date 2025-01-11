"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGetMessages } from "@/app/features/messages/api/use-get-messages";
import { useSendMessage } from "@/app/features/messages/api/use-send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThreadPanel } from "./thread-panel";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { EmojiPicker } from "@/components/emoji-picker";
import { MessageSquare, Users, UserPlus, Smile } from "lucide-react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { MessagePresence } from "@/app/features/presence/components/message-presence";
import { usePresence } from "@/app/features/presence/hooks/use-presence";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { InviteModal } from "../../invite-modal";

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

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.channelId as string;
  const workspaceId = params.workspaceId as Id<"workspaces">;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  
  // Initialize presence
  usePresence(workspaceId);

  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  const { data: members } = useGetMembers({ workspaceId });
  const messages = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
  const sendMessage = useMutation(api.messages.send);
  const toggleReaction = useMutation(api.messages.toggleReaction);

  const [text, setText] = useState("");
  const [selectedThread, setSelectedThread] = useState<Id<"messages"> | null>(null);

  // Initial scroll to bottom without animation
  useEffect(() => {
    if (messages && isFirstLoad) {
      messagesEndRef.current?.scrollIntoView();
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad]);

  // Smooth scroll to bottom for new messages
  useEffect(() => {
    if (!isFirstLoad && messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isFirstLoad]);

  const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
    try {
      await toggleReaction({ messageId, emoji });
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
  };

  const handleSend = async () => {
    if (!text) return;
    try {
      await sendMessage({ 
        channelId: channelId as Id<"channels">, 
        text 
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const Message = ({ msg }: { msg: any }) => {
    const replyCount = useQuery(api.messages.getReplyCount, { messageId: msg._id }) ?? 0;
    const params = useParams();
    const workspaceId = params.workspaceId as Id<"workspaces">;
    
    return (
      <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
        <div className="text-sm text-emerald-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <strong className="font-medium text-emerald-900">{msg.userName}</strong>
            <MessagePresence 
              workspaceId={workspaceId} 
              userId={msg.userId} 
              className="h-2 w-2 shrink-0" 
            />
            <span className="text-xs text-emerald-500">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {replyCount > 0 && (
              <button
                className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                onClick={() => setSelectedThread(msg._id)}
              >
                <MessageSquare className="h-3 w-3" />
                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="py-1 h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => setSelectedThread(msg._id)}
            >
              Reply
            </Button>
          </div>
        </div>
        <div className="text-sm mt-2 text-emerald-900 leading-relaxed">{msg.text}</div>

        {/* Reactions */}
        <div className="mt-3 flex flex-wrap gap-1">
          {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
            <button
              key={code}
              onClick={() => handleReaction(msg._id, code)}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
            >
              <span>{EMOJI_MAP[code] || code}</span>
              <span className="text-xs text-emerald-600">{data.count}</span>
            </button>
          ))}
          
          {/* Add reaction button */}
          <EmojiPicker
            onEmojiSelect={(code) => handleReaction(msg._id, code)}
            trigger={
              <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
                <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
              </button>
            }
          />
        </div>
      </div>
    );
  };

  // Show empty state if only one member (admin)
  if (members && members.length <= 1) {
    return (
      <>
        <InviteModal 
          open={inviteModalOpen}
          onOpenChange={setInviteModalOpen}
          name={workspace?.name || ""}
          joinCode={workspace?.joinCode || ""}
        />
        <div className="flex flex-col items-center justify-center h-full bg-emerald-50/30">
          <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-emerald-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
              Invite Team Members
            </h2>
            <p className="text-emerald-600 mb-6">
              This channel is looking a bit empty. Invite your teammates to join the conversation!
            </p>
            <Button
              onClick={() => setInviteModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Invite People
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (messages === undefined) {
    return <div className="p-4 text-emerald-600">Loading messages...</div>;
  }

  // Sort messages by creation time, newest first
  const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="flex h-full">
      {/* Left section: main channel messages */}
      <div className="flex flex-col flex-1 relative bg-emerald-50/30">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedMessages?.length === 0 ? (
            <div className="text-sm text-emerald-600 italic">
              No messages yet. Start the conversation!
            </div>
          ) : (
            sortedMessages?.map((msg) => (
              <Message key={msg._id} msg={msg} />
            ))
          )}
          {/* Invisible div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed input at bottom */}
        <div className="p-2 border-t bg-white">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              onClick={handleSend}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Right section: Thread panel (conditionally shown) */}
      {selectedThread && (
        <div className="w-[320px] border-l bg-white">
          <ThreadPanel parentMessageId={selectedThread} onClose={() => setSelectedThread(null)} />
        </div>
      )}
    </div>
  );
}