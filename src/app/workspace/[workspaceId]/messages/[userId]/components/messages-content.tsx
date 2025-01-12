"use client";

import { DmChat } from "./dm-chat";

interface MessagesContentProps {
  userId: string;
  workspaceId: string;
}

export function MessagesContent({ userId, workspaceId }: MessagesContentProps) {
  return (
    <div className="h-full">
      <DmChat userId={userId} workspaceId={workspaceId} />
    </div>
  );
} 