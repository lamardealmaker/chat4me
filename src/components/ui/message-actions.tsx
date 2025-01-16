"use client";

import * as React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Reply, Image } from "lucide-react";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";

interface MessageActionsProps {
  message: Doc<"messages">;
  onReply?: () => void;
  isLast?: boolean;
  onGenerateImage?: () => void;
}

export function MessageActions({ message, onReply, isLast, onGenerateImage }: MessageActionsProps) {
  const { data: user } = useCurrentUser();
  const isCurrentUser = user?._id === message.userId;

  return (
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top">
          {onReply && (
            <DropdownMenuItem onClick={onReply}>
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </DropdownMenuItem>
          )}
          {onGenerateImage && (
            <DropdownMenuItem onClick={onGenerateImage}>
              <Image className="h-4 w-4 mr-2" />
              Generate Image
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 