"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  userId: string;
  name: string;
}

export function UserAvatar({ userId, name, className, ...props }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={cn(className)} {...props}>
      <AvatarImage src={`https://avatar.vercel.sh/${userId}`} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
} 