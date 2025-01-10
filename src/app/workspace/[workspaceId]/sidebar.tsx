"use client";

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { UserButton } from "@/app/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import { Hash, Settings, File, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

interface ItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Item = ({
  label,
  icon,
  onClick
}: ItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md",
        "text-zinc-600 dark:text-zinc-300 text-sm font-medium"
      )}
    >
      {icon}
      {label}
    </button>
  );
};

const SectionHeader = ({
  label,
  icon,
  sideIcon
}: {
  label: string;
  icon?: React.ReactNode;
  sideIcon?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-x-2">
        {icon}
        <p className="text-sm font-semibold text-zinc-500">
          {label}
        </p>
      </div>
      {sideIcon}
    </div>
  );
};

export const Sidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  const pathname = usePathname();

  return (
    <aside 
      className="flex flex-col items-center w-[70px] h-full pt-9 pb-4 gap-y-4"
      style={{ backgroundColor: "#014421" }}
    >
        <WorkspaceSwitcher />
        <SidebarButton icon={Home} label="Home" isActive={pathname.includes("workspace")} /> 
        <SidebarButton icon={MessagesSquare} label="DMs" isActive={pathname.includes("dm")} />
        <SidebarButton icon={File} label="Files" isActive={pathname.includes("files")} />
        <SidebarButton icon={MoreHorizontal} label="Settings" isActive={pathname.includes("settings")} />
        <div className="flex flex-col items-center justify-center mt-auto">
          <UserButton />
        </div>
    </aside>
  );
};
