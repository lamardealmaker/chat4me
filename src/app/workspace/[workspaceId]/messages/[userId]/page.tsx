import { DmChat } from "../../dm/[userId]/components/dm-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage({ 
  params 
}: { 
  params: { userId: string; workspaceId: string } 
}) {
  return (
    <div className="h-full">
      <DmChat userId={params.userId} workspaceId={params.workspaceId} />
    </div>
  );
} 