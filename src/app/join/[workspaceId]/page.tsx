"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import VerificationInput from "react-verification-input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/app/features/workspaces/api/use-get-workspace-info";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, MessageCircle } from "lucide-react";
import { useJoin } from "@/app/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoadingState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-emerald-50/30">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
        <div className="p-3 bg-emerald-100 rounded-full mb-4">
          <Loader className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px] mx-auto" />
          <Skeleton className="h-5 w-[250px] mx-auto" />
          <Skeleton className="h-12 w-[300px] mx-auto" />
          <Skeleton className="h-8 w-[100px] mx-auto" />
        </div>
      </div>
    </div>
  );
};

const JoinPage = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate, isPending } = useJoin();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

  const handleComplete = (value: string) => {
    const cleanCode = value.trim().toUpperCase();

    // Enforce 6 digits
    if (cleanCode.length !== 6) {
      toast.error("Invalid workspace code. Must be 6 characters.");
      return;
    }

    mutate(
      { id: workspaceId, code: cleanCode },
      {
        onSuccess: (res: any) => {
          if (!res?.success) {
            if (res?.message) {
              toast.error(res.message);
            } else {
              toast.error("Failed to join. Please try again.");
            }
            return;
          }
          router.push(`/workspace/${res.workspaceId}`);
          toast.success("Welcome to the workspace!");
        },
        onError: (error) => {
          console.error("JOIN ERROR:", error.message);
          toast.error("Failed to join workspace. Please try again.");
        },
        throwError: false
      }
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-emerald-50/30">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
        <div className="p-3 bg-emerald-100 rounded-full mb-4">
          <MessageCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <div className="flex flex-col gap-y-2 items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold text-emerald-900">
            Join the "{data?.name}" Workspace
          </h1>
          <p className="text-emerald-600">
            Enter the workspace code to join the conversation
          </p>
        </div>
        <div className="mb-6">
          <VerificationInput
            length={6}
            onComplete={handleComplete}
            classNames={{
              container: "gap-2",
              character: "w-10 h-12 rounded-md border-2 border-emerald-200 text-emerald-900 font-medium text-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
              characterInactive: "border-emerald-100",
              characterSelected: "border-emerald-500",
            }}
          />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" 
          asChild
        >
          <Link href="/">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;