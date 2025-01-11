"use client";

import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarButtonProps) => {
  return (
    <div 
      className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group"
      onClick={onClick}
    >
      <Button
        variant="transparent"
        className={cn(
          "size-11 p-2.5 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
      >
        <Icon className="size-6 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
}; 