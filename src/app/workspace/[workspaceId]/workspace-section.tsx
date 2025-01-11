"use client";

import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

interface WorkspaceSectionProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  onNew?: () => void;
  className?: string;
}

export function WorkspaceSection({ label, children, hint, onNew, className }: WorkspaceSectionProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-white">
          {label}
        </span>
        {hint && onNew && (
          <button
            onClick={onNew}
            className="text-xs text-zinc-400 hover:text-white transition"
          >
            {hint}
          </button>
        )}
      </div>
      <div className="space-y-[2px]">{children}</div>
    </div>
  );
}
