"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VerificationInput from "react-verification-input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/app/features/workspaces/api/use-get-workspace-info";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useJoin } from "@/app/features/workspaces/api/use-join";
import { newJoinCode } from "../../../../convex/workspaces";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoadingState = () => {
    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
            <Skeleton className="h-[60px] w-[60px] rounded-md" />
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-5 w-[250px]" />
                </div>
                <Skeleton className="h-12 w-[300px]" />
                <Skeleton className="h-8 w-[100px]" />
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
        const cleanCode = value.trim();
        console.error("CLIENT - Sending join code:", {
            originalValue: value,
            cleanedValue: cleanCode,
            length: cleanCode.length
        });
        
        mutate({ id: workspaceId, code: cleanCode }, {
            onSuccess: (id) => {
                if (id) {
                    toast.success("You have joined the workspace!");
                    router.push(`/workspace/${id}`);
                }
            },
            onError: (error) => {
                console.error("JOIN ERROR:", error.message);
                if (error.message.includes("Invalid join code")) {
                    toast.error("Invalid workspace code. Please try again.");
                } else if (error.message === "You are already a member of this workspace") {
                    toast.error("You are already a member of this workspace");
                    router.push(`/workspace/${workspaceId}`);
                } else {
                    toast.error("Failed to join the workspace");
                }
            },
            throwError: false
        });
    };

    if (isLoading) {
        return (
            <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
                <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
            <Image 
                src="/placeholder.svg" 
                width={60} 
                height={60} 
                alt="Logo" 
            />
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">
                        Join {data?.name}
                    </h1>
                    <p className="text-md text-muted-foreground">
                        Enter the workspace code to join
                    </p>
                </div>
                <VerificationInput
                    onComplete={handleComplete}
                />
                <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                    <Link href="/">
                        Back to home
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default JoinPage;