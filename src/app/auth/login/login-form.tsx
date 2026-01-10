"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithMagicLink,
  signInWithPassword,
  type AuthResult,
} from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  KeyRound,
} from "lucide-react";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const router = useRouter();
  const [usePassword, setUsePassword] = useState(false);

  // Magic link form state
  const [magicLinkState, magicLinkAction, magicLinkPending] = useActionState<
    AuthResult | null,
    FormData
  >(signInWithMagicLink, null);

  // Password form state
  const [passwordState, passwordAction, passwordPending] = useActionState<
    AuthResult | null,
    FormData
  >(signInWithPassword, null);

  const state = usePassword ? passwordState : magicLinkState;
  const isPending = usePassword ? passwordPending : magicLinkPending;

  // Handle successful password login - redirect
  useEffect(() => {
    if (passwordState?.success && passwordState?.redirectTo) {
      router.push(passwordState.redirectTo);
    }
  }, [passwordState, router]);

  // Show success state for magic link
  if (magicLinkState?.success && !usePassword) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent you a magic link to sign in. Click the link in your
            email to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form
        action={usePassword ? passwordAction : magicLinkAction}
        className="space-y-4"
      >
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="pl-10"
              required
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>

        {usePassword && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
        )}

        {state?.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button
          type="submit"
          className="w-full btn-gradient group"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {usePassword ? "Signing in..." : "Sending link..."}
            </>
          ) : (
            <>
              {usePassword ? "Sign In" : "Continue with Email"}
              <ArrowRight className="ml-2 h-4 w-4 btn-arrow-icon" />
            </>
          )}
        </Button>
      </form>

      {!usePassword && (
        <p className="text-xs text-center text-muted-foreground">
          We&apos;ll send you a magic link for password-free sign in.
        </p>
      )}

      {/* Toggle between magic link and password */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setUsePassword(!usePassword)}
      >
        <KeyRound className="mr-2 h-4 w-4" />
        {usePassword ? "Use magic link instead" : "Sign in with password"}
      </Button>

      {usePassword && (
        <p className="text-xs text-center text-muted-foreground">
          For test accounts, use password: <code className="bg-muted px-1 py-0.5 rounded text-xs">SeedPassword123!</code>
        </p>
      )}
    </div>
  );
}
