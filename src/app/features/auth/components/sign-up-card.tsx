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
  if (error?.message?.includes("email")) {
    return "This email is already registered. Please sign in instead.";
  }
  if (error?.message?.includes("password")) {
    return "Password must be at least 8 characters long, contain uppercase, lowercase, and numbers.";
  }
  if (error?.message?.includes("redirect")) {
    return "Authentication failed. Please try again.";
  }
  return "Sign up failed. Please try again.";
};

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(formData.password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/\d/.test(formData.password)) {
      setError("Password must contain at least one number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsPending("password");
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("flow", "signUp");
      data.append("name", formData.name);

      await signIn("password", data);
      router.push("/");
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsPending(null);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);
    try {
      setIsPending("github");
      await signIn("github");
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
      router.push("/");
    } catch (error) {
      setError("Google authentication failed. Please try again.");
    } finally {
      setIsPending(null);
    }
  };

  return (
    <Card className="w-full h-full p-6">
      <CardHeader className="px-0 pt-0 space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-gray-500">
          Enter your details to create a new account
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!!isPending}
            placeholder="Full Name"
            type="text"
            required
            className="h-12"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!!isPending}
            placeholder="Email"
            type="email"
            required
            className="h-12"
          />
          <Input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={!!isPending}
            placeholder="Password"
            type="password"
            required
            className="h-12"
          />
          <Input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={!!isPending}
            placeholder="Confirm Password"
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
                Creating Account...
              </div>
            ) : (
              "Create Account"
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
          Already have an account?{" "}
          <Button 
            variant="link" 
            className="p-0" 
            onClick={() => setState("signIn")}
            disabled={!!isPending}
          >
            Sign In
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}; 