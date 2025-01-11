import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    label: string;
    icon: LucideIcon | IconType;
    id: string;
    variant?: VariantProps<typeof sidebarItemVariants>["variant"];
    href?: string;
}

const sidebarItemVariants = cva(
  "flex items-center gap-2 justify-start font-medium h-8 px-[18px] text-sm overflow-hidden hover:bg-white/10 transition-colors rounded-sm",
  {
    variants: {
      variant: {
        default: "text-[#f9edfc] hover:text-white",
        active: "bg-white text-emerald-600 hover:bg-white/90",
        title: "text-white font-bold text-base",
      },
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface SidebarItemVariants extends VariantProps<typeof sidebarItemVariants> {}





export const SidebarItem = ({ label, icon: Icon, id, variant, href }: SidebarItemProps) => {
    const workspaceId = useWorkspaceId();

    const itemHref = href || `/workspace/${workspaceId}/channel/${id}`;

    return (
        <Button asChild variant="transparent" size="sm" className={cn(sidebarItemVariants({ variant }))}>
            <Link href={itemHref}>
                <Icon className="size-4 mr-2 shrink-0" />
                <span className="text-sm font-medium truncate">{label}</span>
            </Link>
        </Button>
    );
};