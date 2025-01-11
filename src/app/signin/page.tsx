'use client';


import { AuthScreen } from "../features/auth/components/auth-screen";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#014421]">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-white text-center">chat4me</h1>
        <AuthScreen />
      </div>
    </div>
  );
} 