"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SummaryDialog } from "@/components/ui/summary-dialog";
import { ImageGenerationDialog } from "@/components/ui/image-generation-dialog";
import { Id } from "../../../convex/_generated/dataModel";

interface SummaryDropdownProps {
  channelId: Id<"channels">;
  isThread?: boolean;
  isDM?: boolean;
  threadId?: Id<"messages">;
}

export const SummaryDropdown = ({ channelId, isThread, isDM, threadId }: SummaryDropdownProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [summaryType, setSummaryType] = useState<"channel" | "dm" | "thread">("channel");

  const handleSummaryClick = (type: "channel" | "dm" | "thread") => {
    setSummaryType(type);
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" className="w-48">
          <DropdownMenuItem onClick={() => setImageDialogOpen(true)}>
            Generate Image
          </DropdownMenuItem>
          {!isThread && !isDM && (
            <DropdownMenuItem onClick={() => handleSummaryClick("channel")}>
              Summarize channel
            </DropdownMenuItem>
          )}
          {isDM && (
            <DropdownMenuItem onClick={() => handleSummaryClick("dm")}>
              Summarize conversation
            </DropdownMenuItem>
          )}
          {isThread && (
            <DropdownMenuItem onClick={() => handleSummaryClick("thread")}>
              Summarize thread
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <SummaryDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        summaryType={summaryType}
        channelId={channelId}
        threadId={threadId}
      />

      <ImageGenerationDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        channelId={channelId}
        threadId={threadId}
      />
    </>
  );
}; 