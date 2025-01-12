import { DmChat } from "./components/dm-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Message",
};

export default async function DmPage({ 
  params 
}: { 
  params: Promise<{ userId: string; workspaceId: string }> 
}) {
  const resolvedParams = await params;
  return (
    <div className="h-full">
      <DmChat userId={resolvedParams.userId} workspaceId={resolvedParams.workspaceId} />
    </div>
  );
} 