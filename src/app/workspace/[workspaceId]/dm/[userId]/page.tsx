"use client";

import { DmChat } from "./components/dm-chat";
import { useParams } from "next/navigation";

export default function DmPage() {
  const params = useParams();
  const userId = params.userId as string;
  const workspaceId = params.workspaceId as string;

  return (
    <div className="h-full">
      <DmChat userId={userId} workspaceId={workspaceId} />
    </div>
  );
}  