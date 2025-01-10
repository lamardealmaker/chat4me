"use client";



import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
import { WorkspacesSidebar } from "./workspace-sidebar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout = ({
  children,
}: WorkspaceLayoutProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="workspace-layout">
          <ResizablePanel defaultSize={20} minSize={10} maxSize={20} className="bg-[#025632]">
            <WorkspacesSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayout; 