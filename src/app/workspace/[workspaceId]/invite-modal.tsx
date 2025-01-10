import {Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface InviteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name: string;
    joinCode: string;
}

export const InviteModal = ({open, onOpenChange, name, joinCode}: InviteModalProps) => {
    const workspaceId = useWorkspaceId();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}?joinCode=${joinCode}`;
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopied(true);
            toast.success("Invite link copied!");
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            toast.error("Failed to copy invite link!");
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
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
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}