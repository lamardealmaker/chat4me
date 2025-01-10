import {Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useNewJoinCode } from "@/app/features/workspaces/api/use-new-join-code";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InviteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name: string;
    joinCode: string;
}

export const InviteModal = ({open, onOpenChange, name, joinCode}: InviteModalProps) => {
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useNewJoinCode();
    const [copied, setCopied] = useState(false);

    const handleNewCode = () => {
        mutate({ id: workspaceId }, {
            onSuccess: () => {
                toast.success("New join code generated!");
            },
            onError: () => {
                toast.error("Failed to generate new join code");
            }
        });
    };

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`;
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopied(true);
            toast.success("Invite link copied!");
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            toast.error("Failed to copy invite link!");
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="text-center">
                    <DialogTitle>Invite people to {name}</DialogTitle>
                    <DialogDescription>
                        Share this invite link with people you want to invite to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="bg-muted p-4 rounded-md w-full text-center">
                            <div className="text-xs text-muted-foreground">
                                Join Code
                            </div>
                            <div className="mt-2 text-3xl font-semibold tracking-wider font-mono">
                                {joinCode}
                            </div>
                        </div>
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            className="w-full"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2 text-emerald-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Invite Link
                                </>
                            )}
                        </Button>
                        <div className="flex w-full gap-x-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        disabled={isPending}
                                        className="flex-1"
                                    >
                                        <RefreshCw className={cn(
                                            "h-4 w-4 mr-2",
                                            isPending && "animate-spin"
                                        )} />
                                        Generate New Code
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Generate New Join Code?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will invalidate the current join code. Anyone with the old code won't be able to join the workspace.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleNewCode}
                                            className="bg-black hover:bg-black/90"
                                        >
                                            Generate New Code
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Button
                                onClick={() => onOpenChange(false)}
                                variant="default"
                                className="flex-1 bg-black hover:bg-black/90"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}