"use client";

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <div>
      Workspace ID Page area
    </div>
  );
};

export default WorkspaceIdPage; 