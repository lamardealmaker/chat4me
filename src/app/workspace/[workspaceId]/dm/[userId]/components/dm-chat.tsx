"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader, SendHorizonal } from "lucide-react";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { MessagePresence } from "@/app/features/presence/components/message-presence";
import { usePresence } from "@/app/features/presence/hooks/use-presence";
import { useParams } from "next/navigation";

interface DirectMessage {
  _id: Id<"directMessages">;
  senderId: Id<"users">;
  recipientId: Id<"users">;
  content: string;
  createdAt: number;
  senderName: string;
}

export const DmChat = ({ 
  userId, 
  workspaceId 
}: { 
  userId: string;
  workspaceId: string;
}) => {
  const { data: user } = useCurrentUser();
  const [message, setMessage] = useState("");
  const params = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize presence
  usePresence(workspaceId as Id<"workspaces">);
  
  const messages = useQuery(api.directMessages.list, {
    workspaceId: workspaceId as Id<"workspaces">,
    otherUserId: userId as Id<"users">,
  }) as DirectMessage[] | undefined;

  const members = useQuery(api.members.get, { 
    workspaceId: workspaceId as Id<"workspaces"> 
  });

  const otherUser = members?.find(m => m.user?._id === userId)?.user;

  const sendMessage = useMutation(api.directMessages.send);
  const deleteMessage = useMutation(api.directMessages.deleteMessage);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        recipientId: userId as Id<"users">,
        workspaceId: workspaceId as Id<"workspaces">,
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      await deleteMessage({ messageId: messageId as Id<"directMessages"> });
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (!messages || !members) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  // Sort messages by creation time, oldest first
  const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);

  // Group messages by date
  const messagesByDate = sortedMessages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, DirectMessage[]>);

  return (
    <div className="flex flex-col h-full">
      {/* Header with user info */}
      <div className="border-b p-4 flex items-center gap-3 bg-white">
        <Avatar>
          <AvatarFallback>{otherUser?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{otherUser?.name}</span>
          <MessagePresence 
            workspaceId={workspaceId as Id<"workspaces">}
            userId={userId as Id<"users">}
            className="h-2 w-2 shrink-0" 
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-emerald-50/30">
        {Object.keys(messagesByDate).length === 0 ? (
          <div className="text-sm text-emerald-600 italic text-center">
            No messages yet. Start the conversation!
          </div>
        ) : (
          Object.entries(messagesByDate).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="text-xs text-center text-emerald-600">
                {new Date(date).toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              {dateMessages.map((msg: DirectMessage) => (
                <div
                  key={msg._id}
                  className={`flex items-start gap-2 ${
                    msg.senderId === user?._id ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback>{msg.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`group relative max-w-[70%] rounded-lg p-3 ${
                      msg.senderId === user?._id
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-emerald-100"
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-sm">{msg.content}</div>
                    
                    {msg.senderId === user?._id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(msg._id)}
                      >
                        <span className="sr-only">Delete message</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <Button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}; 