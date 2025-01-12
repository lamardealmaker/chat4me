"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { usePresence } from "@/app/features/presence/hooks/use-presence";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
interface DirectMessage {
  _id: Id<"directMessages">;
  content: string;
  senderId: Id<"users">;
  senderName: string;
  createdAt: number;
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

  return (
    <div className="flex flex-col h-full">
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages?.map((msg) => (
          <div key={msg._id} className="mb-4">
            <div className="font-medium">{msg.senderName}</div>
            <div>{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
      </form>
    </div>
  );
}; 