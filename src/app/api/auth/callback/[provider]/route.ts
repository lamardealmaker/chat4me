import { NextRequest } from "next/server";
import { auth } from "@convex-dev/auth/nextjs/server";

export async function GET(request: NextRequest) {
  return auth.handleCallback(request);
} 