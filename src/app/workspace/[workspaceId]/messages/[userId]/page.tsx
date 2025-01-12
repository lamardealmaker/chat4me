import { MessagesContent } from "./components/messages-content";
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
  return <MessagesContent userId={params.userId} workspaceId={params.workspaceId} />;
} 