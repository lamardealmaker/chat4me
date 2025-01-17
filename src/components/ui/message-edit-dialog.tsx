"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "./button";
import { Input } from "./input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { toast } from "sonner";

interface MessageEditDialogProps {
  messageId: Id<"messages">;
  initialText: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MessageEditDialog({ messageId, initialText, isOpen, onClose }: MessageEditDialogProps) {
  const [text, setText] = useState(initialText);
  const updateMessage = useMutation(api.messages.updateMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim() === "") return;
    
    try {
      await updateMessage({
        messageId,
        text: text.trim()
      });
      toast.success("Message updated");
      onClose();
    } catch (error) {
      toast.error("Failed to update message");
      console.error("Error updating message:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogDescription>
              Make changes to your message below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
              placeholder="Type your message"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={text.trim() === "" || text === initialText}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 