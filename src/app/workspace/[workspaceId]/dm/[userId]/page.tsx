// File: src/app/workspace/[workspaceId]/messages/[userId]/page.tsx

import { DmChat } from "./components/dm-chat";

// 1) Define the expected type of `params`.
type MessagesPageProps = {
  params: {
    workspaceId: string;
    userId: string;
  };
};

// 2) Use the type in your default export function signature.
export default function MessagesByUserPage({ params }: MessagesPageProps) {
  const { workspaceId, userId } = params;

  return (
    <div className="h-full">
      <DmChat userId={userId} workspaceId={workspaceId} />
    </div>
  );
}
