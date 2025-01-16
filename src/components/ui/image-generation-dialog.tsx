"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2, AlertCircle } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ImageGenerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelId: Id<"channels">;
  threadId?: Id<"messages">;
}

export function ImageGenerationDialog({ open, onOpenChange, channelId, threadId }: ImageGenerationDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const generateImage = useAction(api.actions.generateDalleImage.default);
  const getStorageUrl = useMutation(api.messages.getStorageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const storageId = await generateImage({
        prompt: prompt.trim(),
        channelId,
        threadId,
      });
      
      // Get the actual URL from Convex
      const url = await getStorageUrl({ storageId });
      setPreviewImage(url);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error("Failed to generate image:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate image";
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    // Close both dialogs and reset state
    setShowConfirmDialog(false);
    onOpenChange(false);
    setPrompt("");
    setPreviewImage(null);
    
    toast({
      title: "Image Sent",
      description: "Your DALL·E image has been added to the chat",
    });
  };

  const handleCancel = () => {
    // Just close the confirm dialog and keep the generation dialog open
    setShowConfirmDialog(false);
    setPreviewImage(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Image</DialogTitle>
            <DialogDescription>
              Enter a prompt to generate an image using DALL·E
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPrompt(e.target.value);
                setError(null);
              }}
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preview Generated Image</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to send this image to the chat?
            </AlertDialogDescription>
          </AlertDialogHeader>
          {previewImage && (
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden bg-muted my-4">
              <img 
                src={previewImage}
                alt={prompt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Send to Chat</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 