import { DmChat } from "./components/dm-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Message",
};

export default function DmPage({ 
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