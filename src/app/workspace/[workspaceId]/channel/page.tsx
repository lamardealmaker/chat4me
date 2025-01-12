"use client";

import { useParams } from "next/navigation";
import { useGetMembers } from "@/app/features/members/api/use-get-members";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function EmptyDMPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as Id<"workspaces">;
  
  const { data: workspace } = useGetWorkspace({ id: workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  // Filter out current user from members list
  const otherMembers = members?.filter(m => m.user) ?? [];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-emerald-50/30">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
        <div className="p-3 bg-emerald-100 rounded-full mb-4">
          <MessageSquare className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
          No Direct Messages Yet
        </h2>
        <p className="text-emerald-600 mb-6">
          {otherMembers.length > 0 
            ? "Start a conversation by clicking on a team member in the sidebar."
            : "Invite team members to start direct messaging with them."}
        </p>
        {otherMembers.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <Users className="h-4 w-4" />
              <span>No other members in this workspace</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 