'use client';

import { useEffect, useState } from "react";
import { CreateWorkspaceModal } from "@/app/features/workspaces/components/create-workspace-modal";
import { CreateChannelModal } from "@/app/features/channels/components/create-channel-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};
