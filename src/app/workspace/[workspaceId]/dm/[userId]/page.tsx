
import { DmChat } from "./components/dm-chat";
import { useParams } from "next/navigation";

export default function MessagesPage() {
  // Access dynamic route segments using Next.js 13's useParams():
  const params = useParams();
  const userId = params.userId as string;
  const workspaceId = params.workspaceId as string;

  // Render your DM chat component
  return (
    <div className="h-full">
      <DmChat userId={userId} workspaceId={workspaceId} />
    </div>
  );
}
