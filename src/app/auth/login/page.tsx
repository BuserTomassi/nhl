import { Metadata } from "next";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Next Horizon Leadership account",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params.redirectTo || "/dashboard";
  const error = params.error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <Logo size="lg" />
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to access your community
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {decodeURIComponent(error)}
          </div>
        )}

        {/* Login Form */}
        <div className="card-surface p-6 sm:p-8">
          <LoginForm redirectTo={redirectTo} />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Request access
          </Link>
        </p>
      </div>
    </div>
  );
}
