"use client";

import { DmChat } from "./components/dm-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Messages",
  description: "Chat directly with workspace members"
};

interface MessagesPageProps {
  params: {
    userId: string;
    workspaceId: string;
  }
}

export default function MessagesPage({ params }: MessagesPageProps) {
  return (
    <div className="h-full">
      <DmChat userId={params.userId} workspaceId={params.workspaceId} />
    </div>
  );
} 