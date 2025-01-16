"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useGetMessages } from "@/app/features/messages/api/use-get-messages";
import { useSendMessage } from "@/app/features/messages/api/use-send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThreadPanel } from "./thread-panel";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { EmojiPicker } from "@/components/emoji-picker";
import { MessageSquare, Users, UserPlus, Smile, Hash, Circle, Plus, ImageIcon } from "lucide-react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { MessagePresence } from "@/app/features/presence/components/message-presence";
import { usePresence } from "@/app/features/presence/hooks/use-presence";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { InviteModal } from "../../invite-modal";
import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { SummaryDropdown } from "@/components/ui/summary-dropdown";
import { UserActionMenu } from "@/components/ui/user-action-menu";
import { ImageGenerationDialog } from "../../../../../components/ui/image-generation-dialog";
import Image from "next/image";

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

const ChannelHeader = ({ channel }: { channel: any }) => {
  const isDM = channel.type === "dm";
  const params = useParams();
  const workspaceId = params.workspaceId as Id<"workspaces">;
  const { data: currentUser } = useCurrentUser();
  const otherUserId = isDM ? channel.userIds?.find((id: string) => id !== currentUser?._id) : null;
  
  return (
    <div className="flex items-center px-6 py-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {isDM ? (
          <>
            {otherUserId && (
              <MessagePresence 
                workspaceId={workspaceId} 
                userId={otherUserId as Id<"users">} 
                className="h-3 w-3" 
              />
            )}
            <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
          </>
        ) : (
          <>
            <Hash className="h-5 w-5 text-emerald-700 shrink-0" />
            <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default function ChannelPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const messageId = searchParams.get("messageId");
  const channelId = params.channelId as string;
  const workspaceId = params.workspaceId as Id<"workspaces">;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement>>({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  
  // Check if message is in a thread
  const parentMessage = useQuery(api.messages.get, messageId ? {
    messageId: messageId as Id<"messages">
  } : "skip");

  // Initialize presence
  usePresence(workspaceId);

  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  const { data: members } = useGetMembers({ workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const messages = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
  const sendMessage = useMutation(api.messages.send);
  const toggleReaction = useMutation(api.messages.toggleReaction);
  const { data: currentUser } = useCurrentUser();

  const currentChannel = channels?.find(c => c._id === channelId);

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

  // Handle message ID in URL - check if it's a thread message
  useEffect(() => {
    if (!messageId || !messages) return;

    // First check if message is in main channel
    if (messageRefs.current[messageId]) {
      messageRefs.current[messageId].scrollIntoView({ behavior: "smooth" });
      messageRefs.current[messageId].classList.add("bg-emerald-100");
      setTimeout(() => {
        messageRefs.current[messageId]?.classList.remove("bg-emerald-100");
      }, 2000);
      return;
    }

    // If not in main channel and we have parent message info, it's in a thread
    if (parentMessage?.parentMessageId) {
      setSelectedThread(parentMessage.parentMessageId);
    }
  }, [messageId, messages, parentMessage]);

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
        text,
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
    const currentChannel = channels?.find(c => c._id === channelId);
    const isDM = currentChannel?.type === "dm";
    const { data: currentUser } = useCurrentUser();
    const isSentByMe = msg.userId === currentUser?._id;
    
    if (!isDM) {
      return (
        <div 
          ref={el => {
            if (el) messageRefs.current[msg._id] = el;
          }}
          className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm"
        >
          <div className="text-sm text-emerald-800 flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <UserActionMenu 
                userId={msg.userId as Id<"users">}
                userName={msg.userName}
              >
                <strong className="font-medium text-emerald-900">{msg.userName}</strong>
              </UserActionMenu>
              {msg.isAI && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="inline-block w-3 h-3">🤖</span>
                  <span className="opacity-75">AI</span>
                </span>
              )}
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
          {msg.format === "dalle" && msg.imageUrl ? (
            <div className="relative aspect-square w-64 rounded-lg overflow-hidden bg-muted">
              <Image
                src={msg.imageUrl}
                alt={msg.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-xs text-white line-clamp-2">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-emerald-900 leading-relaxed">{msg.text}</div>
          )}
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
    }

    // DM Message Style
    return (
      <div className={cn(
        "flex flex-col max-w-[60%] space-y-1 mb-4",
        isSentByMe ? "ml-auto" : ""
      )}>
        <div className={cn(
          "flex items-center gap-2",
          isSentByMe ? "justify-end mr-2" : "ml-2"
        )}>
          <span className="text-xs text-emerald-500">
            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {msg.isAI && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="inline-block w-3 h-3">🤖</span>
              <span className="opacity-75">AI</span>
            </span>
          )}
        </div>
        <div className={cn(
          "px-3.5 py-2 rounded-[18px] shadow-sm",
          isSentByMe 
            ? "bg-emerald-600 text-white rounded-br-none" 
            : "bg-gray-100 text-emerald-900 rounded-bl-none"
        )}>
          {msg.format === "dalle" && msg.imageUrl ? (
            <div className="relative aspect-square w-64 rounded-lg overflow-hidden bg-muted">
              <Image
                src={msg.imageUrl}
                alt={msg.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-xs text-white line-clamp-2">{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm leading-relaxed break-words">
              {msg.text}
            </div>
          )}
          {(replyCount > 0 || msg.reactions) && (
            <div className={cn(
              "mt-2 pt-2",
              isSentByMe ? "border-t border-emerald-500/30" : "border-t border-gray-200"
            )}>
              {replyCount > 0 && (
                <button
                  className={cn(
                    "text-xs flex items-center gap-1 mb-2",
                    isSentByMe ? "text-emerald-100 hover:text-white" : "text-emerald-600 hover:text-emerald-700"
                  )}
                  onClick={() => setSelectedThread(msg._id)}
                >
                  <MessageSquare className="h-3 w-3" />
                  {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                </button>
              )}
              {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
                <button
                  key={code}
                  onClick={() => handleReaction(msg._id, code)}
                  className={cn(
                    "inline-flex items-center gap-1 mr-1 px-2 py-0.5 rounded-full text-sm transition-colors",
                    isSentByMe 
                      ? "bg-emerald-500/20 hover:bg-emerald-500/30" 
                      : "bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  <span>{EMOJI_MAP[code] || code}</span>
                  <span className={cn(
                    "text-xs",
                    isSentByMe ? "text-emerald-100" : "text-emerald-600"
                  )}>{data.count}</span>
                </button>
              ))}
              <EmojiPicker
                onEmojiSelect={(code) => handleReaction(msg._id, code)}
                trigger={
                  <button className={cn(
                    "p-1.5 rounded-full transition-colors inline-flex",
                    isSentByMe 
                      ? "hover:bg-emerald-500/20 text-emerald-100" 
                      : "hover:bg-gray-200 text-emerald-400"
                  )}>
                    <Smile className="h-4 w-4" />
                  </button>
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show empty state if only one member (admin) and not a DM
  if (members && members.length <= 1 && currentChannel?.type !== "dm") {
    return (
      <>
        <InviteModal 
          open={inviteModalOpen}
          onOpenChange={setInviteModalOpen}
          name={workspace?.name || ""}
          joinCode={workspace?.joinCode || ""}
        />
        <div className="flex flex-col h-full">
          <ChannelHeader channel={currentChannel} />
          <div className="flex flex-col items-center justify-center flex-1 bg-emerald-50/30">
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
        </div>
      </>
    );
  }

  if (messages === undefined || !currentChannel) {
    return <div className="p-4 text-emerald-600">Loading...</div>;
  }

  // Sort messages by creation time, newest first
  const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="flex h-full">
      {/* Left section: main channel messages */}
      <div className="flex flex-col flex-1 relative">
        <ChannelHeader channel={currentChannel} />
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-emerald-50/30">
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
            <SummaryDropdown 
              channelId={channelId as Id<"channels">}
              isThread={!!selectedThread}
              isDM={currentChannel?.type === "dm"}
              threadId={selectedThread || undefined}
            />
            <div className="relative flex-1">
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
                className="rounded-full bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-4"
              />
            </div>

            <Button 
              onClick={handleSend}
              className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
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

      <ImageGenerationDialog
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        channelId={channelId as Id<"channels">}
      />
    </div>
  );
}