import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";

interface SidebarItemProps {
    label: string;
    icon: LucideIcon | IconType;
    id: string;
}

export const SidebarItem = ({ label, icon: Icon, id }: SidebarItemProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <Button asChild variant="transparent" size="sm" className="gap-x-2">
            <Link href={`/workspace/${workspaceId}/channel/${id}`}>
                <Icon className="size-5" />
                <span className="truncate">{label}</span>
            </Link>
        </Button>
    );
};