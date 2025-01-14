"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { EmojiPicker } from "@/components/emoji-picker";
import { Smile } from "lucide-react";
import { MessagePresence } from "@/app/features/presence/components/message-presence";
import { useParams } from "next/navigation";

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

  const sendMessage = useMutation(api.messages.send);
  const toggleReaction = useMutation(api.messages.toggleReaction);

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
      <div className="text-sm text-emerald-900 leading-relaxed">{message.text}</div>
      
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
      <div className="p-4 flex justify-between items-center shrink-0">
        <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Parent message */}
      <div className="px-4 pb-4 border-b border-emerald-100 shrink-0">
        <MessageWithReactions message={parentMessage} />
      </div>

      {/* Thread messages - will grow to fill available space */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <div className="py-4 space-y-4">
          {threadMessages.length === 0 ? (
            <p className="text-sm text-emerald-600 italic">
              No replies yet. Be the first to reply.
            </p>
          ) : (
            threadMessages.map((msg) => (
              <MessageWithReactions key={msg._id} message={msg} />
            ))
          )}
          {/* Invisible div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply input - fixed at bottom */}
      <div className="p-4 border-t border-emerald-100 bg-white shrink-0">
        <div className="flex gap-2">
          <Input
            placeholder="Reply in thread..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleReply();
              }
            }}
          />
          <Button 
            onClick={handleReply}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
} 