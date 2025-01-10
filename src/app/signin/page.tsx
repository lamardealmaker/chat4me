'use client';


import { AuthScreen } from "../features/auth/components/auth-screen";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5C3B58]">
      <div className="w-full max-w-md">
        <AuthScreen />
      </div>
    </div>
  );
} 