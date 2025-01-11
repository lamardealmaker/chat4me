'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const getErrorMessage = (error: any) => {
  if (error?.message?.includes("password")) {
    return "Incorrect password. Please try again.";
  }
  if (error?.message?.includes("email")) {
    return "Email not found. Please check your email or sign up.";
  }
  if (error?.message?.includes("redirect")) {
    return "Authentication failed. Please try again.";
  }
  return "Sign in failed. Please try again.";
};

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGithubSignIn = async () => {
    setError(null);
    try {
      setIsPending("github");
      await signIn("github");
      // Redirect on success:
      router.push("/");
    } catch (error) {
      setError("GitHub authentication failed. Please try again.");
    } finally {
      setIsPending(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      setIsPending("google");
      await signIn("google");
      // Redirect on success:
      router.push("/");
    } catch (error) {
      setError("Google authentication failed. Please try again.");
    } finally {
      setIsPending(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      setIsPending("password");
      const formData = new FormData(event.currentTarget);
      formData.append("flow", "signIn");
      await signIn("password", formData);
      // Redirect on success:
      router.push("/");
    } catch (error: any) {
      setError(getErrorMessage(error));
    } finally {
      setIsPending(null);
    }
  };

  return (
    <Card className="w-full h-full p-6">
      <CardHeader className="px-0 pt-0 space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold">Login to continue</CardTitle>
        <CardDescription className="text-gray-500">
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            disabled={!!isPending}
            placeholder="Email"
            type="email"
            required
            className="h-12"
          />
          <Input
            name="password"
            disabled={!!isPending}
            placeholder="Password"
            type="password"
            required
            className="h-12"
          />
          <Button 
            type="submit" 
            className="w-full bg-[#0f172a] hover:bg-[#1e293b]" 
            size="lg"
            disabled={!!isPending}
          >
            {isPending === "password" ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
                Signing in...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <Button 
          variant="outline" 
          className="w-full h-12" 
          type="button"
          onClick={handleGoogleSignIn}
          disabled={!!isPending}
        >
          {isPending === "google" ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
              Signing in...
            </div>
          ) : (
            <>
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </>
          )}
        </Button>

        <Button 
          variant="outline" 
          className="w-full h-12" 
          type="button"
          onClick={handleGithubSignIn}
          disabled={!!isPending}
        >
          {isPending === "github" ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
              Signing in...
            </div>
          ) : (
            <>
              <FaGithub className="mr-2 h-5 w-5" />
              Continue with GitHub
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground text-center">
          Don't have an account?{" "}
          <Button 
            variant="link" 
            className="p-0" 
            onClick={() => setState("signUp")}
            disabled={!!isPending}
          >
            Sign Up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};