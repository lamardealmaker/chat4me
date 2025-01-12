import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  id: string;
  href?: string;
  variant?: "default" | "active";
  iconClassName?: string;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  id,
  href,
  variant = "default",
  iconClassName,
}: SidebarItemProps) => {
  const router = useRouter();

  const onClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 px-2 py-1 w-full transition rounded-md",
        variant === "default" && "text-white hover:bg-white/10",
        variant === "active" && "bg-white text-emerald-700"
      )}
    >
      <Icon className={cn("h-4 w-4", iconClassName)} />
      <span className="text-sm font-medium truncate">{label}</span>
    </button>
  );
};