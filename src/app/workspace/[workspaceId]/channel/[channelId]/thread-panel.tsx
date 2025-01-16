"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { EmojiPicker } from "@/components/emoji-picker";
import { Smile, Plus, ImageIcon } from "lucide-react";
import { MessagePresence } from "@/app/features/presence/components/message-presence";
import { useParams } from "next/navigation";
import { SummaryDropdown } from "@/components/ui/summary-dropdown";
import { ImageGenerationDialog } from "@/components/ui/image-generation-dialog";
import Image from "next/image";
import { useSendMessage } from "@/app/features/messages/api/use-send-message";

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

export function ThreadPanel({
  parentMessageId,
  onClose,
}: {
  parentMessageId: Id<"messages">;
  onClose: () => void;
}) {
  const params = useParams();
  const workspaceId = params.workspaceId as Id<"workspaces">;
  const [text, setText] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const parentMessage = useQuery(api.messages.get, {
    messageId: parentMessageId,
  });
  const threadMessages = useQuery(api.messages.listThread, {
    parentMessageId,
  });
  const [showImageDialog, setShowImageDialog] = useState(false);
  const sendMessage = useSendMessage();
  const toggleReaction = useMutation(api.messages.toggleReaction);

  // Initial scroll to bottom without animation
  useEffect(() => {
    if (threadMessages && isFirstLoad) {
      messagesEndRef.current?.scrollIntoView();
      setIsFirstLoad(false);
    }
  }, [threadMessages, isFirstLoad]);

  // Smooth scroll to bottom for new messages
  useEffect(() => {
    if (!isFirstLoad && threadMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [threadMessages, isFirstLoad]);

  const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
    try {
      await toggleReaction({ messageId, emoji });
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
  };

  const handleReply = async () => {
    if (!text || !parentMessage) return;
    try {
      await sendMessage({
        channelId: parentMessage.channelId,
        text,
        parentMessageId,
      });
      setText("");
    } catch (error) {
      console.error("Error replying to thread:", error);
    }
  };

  const MessageWithReactions = ({ message }: { message: any }) => (
    <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <strong className="font-medium text-emerald-900">{message.userName}</strong>
          {message.isAI && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="inline-block w-3 h-3">🤖</span>
              <span className="opacity-75">AI</span>
            </span>
          )}
          <MessagePresence 
            workspaceId={workspaceId} 
            userId={message.userId} 
            className="h-2 w-2 shrink-0" 
          />
          <span className="text-xs text-emerald-500">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      {message.format === "dalle" && message.imageUrl ? (
        <div className="relative aspect-square w-64 rounded-lg overflow-hidden bg-muted">
          <Image
            src={message.imageUrl}
            alt={message.text}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
            <p className="text-xs text-white line-clamp-2">{message.text}</p>
          </div>
        </div>
      ) : (
        <div className="text-sm text-emerald-900 leading-relaxed">{message.text}</div>
      )}
      
      {/* Reactions */}
      <div className="mt-3 flex flex-wrap gap-1">
        {Object.entries(message.reactions || {}).map(([code, data]: [string, any]) => (
          <button
            key={code}
            onClick={() => handleReaction(message._id, code)}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
          >
            <span>{EMOJI_MAP[code] || code}</span>
            <span className="text-xs text-emerald-600">{data.count}</span>
          </button>
        ))}
        
        {/* Add reaction button */}
        <EmojiPicker
          onEmojiSelect={(code) => handleReaction(message._id, code)}
          trigger={
            <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
              <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
            </button>
          }
        />
      </div>
    </div>
  );

  if (!threadMessages || !parentMessage) {
    return (
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="mt-4 text-emerald-700">Loading thread...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex justify-between items-center shrink-0 border-b border-emerald-100">
        <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* All messages in one scrollable section */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Parent message */}
          <MessageWithReactions message={parentMessage} />
          
          {/* Thread replies */}
          {threadMessages.length > 0 && threadMessages.map((msg) => (
            <MessageWithReactions key={msg._id} message={msg} />
          ))}
          
          {/* Invisible div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply input - fixed at bottom */}
      <div className="px-4 py-6 border-t border-emerald-100 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <SummaryDropdown 
            channelId={parentMessage.channelId} 
            isThread={true}
            threadId={parentMessageId}
          />
          <div className="relative flex-1">
            <Input
              placeholder="Reply to thread"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleReply();
                }
              }}
              className="rounded-full bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-4"
            />
          </div>
          <Button 
            onClick={() => setShowImageDialog(true)}
            variant="outline"
            className="shrink-0"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleReply}
            className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
          >
            Reply
          </Button>
        </div>
      </div>

      <ImageGenerationDialog
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        channelId={parentMessage.channelId}
        threadId={parentMessageId}
      />
    </div>
  );
} 