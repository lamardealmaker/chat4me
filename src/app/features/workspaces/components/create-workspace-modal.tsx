"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, isPending } = useCreateWorkspace();
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({name}, {
      onSuccess: (id) => {
        router.push(`/workspace/${id}`);
        handleClose();
        toast.success("Workspace created! 🎉");
      },
      onError: (error) => {
        toast.error("Failed to create workspace");
      }
    })
  };

  return <Dialog open={open} onOpenChange={handleClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a workspace</DialogTitle>
      </DialogHeader>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isPending}
          required
          autoFocus
          minLength={3}
          placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
          className="h-12"
        />
        <DialogFooter className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}