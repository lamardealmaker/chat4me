'use client';

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "./features/auth/components/user-button";
import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces";
import { useMemo, useEffect } from "react";
import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal";

export default function Home() {

  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.push(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <UserButton />
      <h1 className="text-2xl font-bold">Logged in</h1>
      {isLoading && <p>Loading workspaces...</p>}
      {data?.map((workspace) => (
        <div key={workspace._id}>
          <p>{workspace.name}</p>
        </div>
      ))}
      <Button 
        variant="outline"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
}
