import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "@/app/features/channels/api/use-create-channel";
import { toast } from "sonner";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModal = () => {
    const workspaceId = useWorkspaceId();
    const [open, setOpen] = useCreateChannelModal();
    const { mutate, isPending } = useCreateChannel();
    const [name, setName] = useState("");

    const handleClose = () => {
        setOpen(false);
        setName("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ workspaceId, name }, {
            onSuccess: () => {
                handleClose();
                toast.success("Channel created! 🎉");
            },
            onError: (error: Error) => {
                toast.error("Failed to create channel");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Channel</DialogTitle>
                    <DialogDescription>
                        Create a new channel to start collaborating with your team.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input 
                            placeholder="e.g. marketing, design, engineering"
                            value={name}
                            onChange={(e) => setName(e.target.value.replace(/\s+/g, '-'))}
                            disabled={isPending}
                            required
                            autoFocus
                            minLength={1}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            Create Channel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};