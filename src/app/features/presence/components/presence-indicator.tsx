import { cn } from "@/lib/utils";
import { PresenceStatus } from "../hooks/use-presence";

interface PresenceIndicatorProps {
  status: PresenceStatus;
  className?: string;
}

export function PresenceIndicator({ status, className }: PresenceIndicatorProps) {
  return (
    <div
      className={cn(
        "h-2.5 w-2.5 rounded-full",
        {
          "bg-emerald-400": status === "online",
          "bg-amber-400": status === "away",
          "bg-red-400": status === "offline",
        },
        className
      )}
    />
  );
}

interface PresenceWithStatusProps {
  status: PresenceStatus;
  customStatus?: string;
  userName: string;
  className?: string;
}

export function PresenceWithStatus({
  status,
  customStatus,
  userName,
  className,
}: PresenceWithStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PresenceIndicator status={status} />
      <div>
        <div className="font-medium text-sm text-white">{userName}</div>
        {customStatus && (
          <div className="text-xs text-zinc-400">{customStatus}</div>
        )}
      </div>
    </div>
  );
} 