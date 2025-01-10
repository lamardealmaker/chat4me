"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetMessages } from "@/app/features/messages/api/use-get-messages";
import { useSendMessage } from "@/app/features/messages/api/use-send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.channelId;
  const { data: messages, isLoading } = useGetMessages(channelId);
  const sendMessage = useSendMessage();
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text) return;
    try {
      await sendMessage({ channelId, text });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        {messages?.map((msg) => (
          <div key={msg._id} className="border p-2 rounded">
            <p className="text-sm text-gray-700">
              <strong>{msg.userId}</strong>:
            </p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}