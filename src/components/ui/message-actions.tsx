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
import { MoreHorizontal, Reply, Image, Trash2, Pencil } from "lucide-react";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { DeleteMessageDialog } from "@/components/ui/delete-message-dialog";
import { MessageEditDialog } from "@/components/ui/message-edit-dialog";
import { useDeleteMessage } from "@/hooks/use-delete-message";

interface MessageActionsProps {
  message: Doc<"messages">;
  onReply?: () => void;
  isLast?: boolean;
  onGenerateImage?: () => void;
}

export function MessageActions({ message, onReply, isLast, onGenerateImage }: MessageActionsProps) {
  const { data: user } = useCurrentUser();
  const isCurrentUser = user?._id === message.userId;
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const deleteMessage = useDeleteMessage();

  const handleDelete = async () => {
    try {
      await deleteMessage(message._id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <>
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
            {isCurrentUser && (
              <>
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Message
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Message
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteMessageDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />

      <MessageEditDialog
        messageId={message._id}
        initialText={message.text}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      />
    </>
  );
} 