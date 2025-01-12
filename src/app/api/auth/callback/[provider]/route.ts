import { NextRequest } from "next/server";
import { handleCallback } from "@convex-dev/auth/nextjs/server";

export async function GET(request: NextRequest) {
  return handleCallback(request);
} 