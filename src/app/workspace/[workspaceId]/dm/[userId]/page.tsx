"use client";

import { DmChat } from "./components/dm-chat";
import { useParams } from "next/navigation";

/**
 * A client component page for rendering DMs between the logged-in user
 * and another user (identified by [userId]) within a particular workspace ([workspaceId]).
 */
export default function MessagesPage() {
  // Grab dynamic route params from Next.js:
  const params = useParams();
  const userId = params.userId as string;
  const workspaceId = params.workspaceId as string;

  return (
    <div className="h-full">
      <DmChat userId={userId} workspaceId={workspaceId} />
    </div>
  );
}
