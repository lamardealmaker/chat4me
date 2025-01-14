'use client';

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "./features/auth/components/user-button";
import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal";
import { useEffect } from "react";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();

  useEffect(() => {
    if (isLoading) return;

    const workspaceId = workspaces?.[0]?._id;
    if (workspaceId) {
      router.push(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaces, isLoading, open, setOpen, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <UserButton />
      <h1 className="text-2xl font-bold">Welcome</h1>
      <Button 
        variant="outline"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
}
