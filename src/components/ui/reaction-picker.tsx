"use client";

import * as React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConvexAuth } from "convex/react";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface ReactionPickerProps {
  message: Doc<"messages"> & {
    reactions: Record<string, { count: number; users: string[]; emoji: string }>;
  };
}

interface EmojiData {
  native: string;
}

export function ReactionPicker({ message }: ReactionPickerProps) {
  const { isAuthenticated } = useConvexAuth();
  const { data: user } = useCurrentUser();
  const toggleReaction = useMutation(api.messages.toggleReaction);
  const [open, setOpen] = React.useState(false);

  const handleEmojiSelect = async (emoji: EmojiData) => {
    if (!isAuthenticated || !user) return;
    
    await toggleReaction({
      messageId: message._id,
      emoji: emoji.native,
    });
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {Object.entries(message.reactions).map(([key, { emoji, count, users }]) => (
        <Button
          key={key}
          variant={users.includes(user?._id || "") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleReaction({ messageId: message._id, emoji })}
          className="h-6 px-2 text-xs gap-1"
          disabled={!isAuthenticated}
        >
          <span>{emoji}</span>
          <span>{count}</span>
        </Button>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={!isAuthenticated}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-none" align="start">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 