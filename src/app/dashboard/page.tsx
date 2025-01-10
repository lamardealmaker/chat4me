'use client';

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button 
        variant="outline"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
} 