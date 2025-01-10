"use client";

import { Button } from "@/components/ui/button";
import { useRemoveWorkspace } from "@/app/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/app/features/workspaces/api/use-update-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface PreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue: string;
}

export const PreferencesModal = ({ open, setOpen, initialValue }: PreferencesModalProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [value, setValue] = useState(initialValue);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace(); 
    const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (value === initialValue) {
            setEditOpen(false);
            return;
        }

        await updateWorkspace(
            { id: workspaceId, name: value },
            {
                onSuccess: () => {
                    toast.success("Workspace name updated successfully");
                    setEditOpen(false);
                },
                onError: () => {
                    toast.error("Failed to update workspace name");
                }
            }
        );
    }

    const handleDelete = async () => {
        try {
            setDeleteOpen(false);
            
            await removeWorkspace(
                { id: workspaceId },
                {
                    onSuccess: () => {
                        toast.success("Workspace deleted successfully");
                        setOpen(false);
                        router.push("/");
                    },
                    onError: (error) => {
                        setDeleteOpen(true);
                        toast.error("Failed to delete workspace: " + error.message);
                    }
                }
            );
        } catch (error) {
            setDeleteOpen(true);
            toast.error("Failed to delete workspace");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 bg-white overflow-hidden max-w-sm">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="text-lg font-medium">{value}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild>
                            <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        Workspace name
                                    </span>
                                    <span className="text-sm text-blue-600">Edit</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{value}</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleEdit}>
                                <DialogHeader>
                                    <DialogTitle>Edit workspace name</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <Input
                                        value={value}
                                        disabled={isUpdatingWorkspace}
                                        onChange={(e) => setValue(e.target.value)}
                                        required
                                        autoFocus
                                        minLength={3}
                                        maxLength={80}
                                        placeholder="Workspace name e.g. 'Work', 'Home', 'School', etc."
                                    />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline" disabled={isUpdatingWorkspace}>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={isUpdatingWorkspace || value === initialValue}>
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                        <DialogTrigger asChild>
                            <div className="px-6 py-4">
                                <button className="text-sm text-red-600 font-medium flex items-center gap-2 hover:opacity-80">
                                    <Trash2 className="size-4" />
                                    Delete workspace
                                </button>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Workspace</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this workspace? This action cannot be undone 
                                    and all data will be permanently deleted.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" disabled={isRemovingWorkspace}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button 
                                    type="button" 
                                    variant="destructive"
                                    disabled={isRemovingWorkspace}
                                    onClick={handleDelete}
                                >
                                    {isRemovingWorkspace ? "Deleting..." : "Delete Workspace"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </DialogContent>
        </Dialog>
    );
};
