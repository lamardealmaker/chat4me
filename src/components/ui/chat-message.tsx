"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { ReactionPicker } from "@/components/ui/reaction-picker";
import { MessageActions } from "@/components/ui/message-actions";
import { Markdown } from "@/components/ui/markdown";
import Image from "next/image";
import { MessageWithExtras } from "@/lib/types";
import { ImageGenerationDialog } from "@/components/ui/image-generation-dialog";
import { Doc } from "../../../convex/_generated/dataModel";

interface ChatMessageProps {
  message: MessageWithExtras & Doc<"messages">;
  isLast?: boolean;
  onReply?: () => void;
}

export function ChatMessage({ message, isLast, onReply }: ChatMessageProps) {
  const { data: user } = useCurrentUser();
  const isCurrentUser = user?._id === message.userId;
  const [imageError, setImageError] = React.useState(false);
  const [showImageDialog, setShowImageDialog] = React.useState(false);

  return (
    <>
      <div className={cn("flex items-start gap-4 relative group", {
        "opacity-50": message.isAI || message.isDeleted,
      })}>
        <UserAvatar
          userId={message.userId}
          name={message.userName}
          className="w-8 h-8 mt-1"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {message.userName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(message.createdAt).toLocaleTimeString()}
              {message.isEdited && (
                <span className="ml-1 text-muted-foreground">(edited)</span>
              )}
            </span>
          </div>
          
          <div className="space-y-2">
            {message.isDeleted ? (
              <div className="italic text-muted-foreground text-sm">
                This message was deleted
              </div>
            ) : message.format === "dalle" && message.imageUrl && !imageError ? (
              <div className="relative aspect-square w-64 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={message.imageUrl}
                  alt={message.text}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => setImageError(true)}
                  priority={isLast}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-xs text-white line-clamp-2">{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {message.formattedText ? (
                  <Markdown>{message.formattedText}</Markdown>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            )}
          </div>

          {!message.isDeleted && (
            <div className="flex items-center gap-2">
              <ReactionPicker message={message} />
              <MessageActions
                message={message}
                onReply={onReply}
                isLast={isLast}
                onGenerateImage={() => setShowImageDialog(true)}
              />
            </div>
          )}
        </div>
      </div>

      <ImageGenerationDialog
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        channelId={message.channelId}
        threadId={message.parentMessageId}
      />
    </>
  );
} 