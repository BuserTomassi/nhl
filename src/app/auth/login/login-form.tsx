"use client";

import { useActionState } from "react";
import { signInWithMagicLink, type AuthResult } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    signInWithMagicLink,
    null
  );

  if (state?.success) {
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
    <form action={formAction} className="space-y-6">
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
            Sending link...
          </>
        ) : (
          <>
            Continue with Email
            <ArrowRight className="ml-2 h-4 w-4 btn-arrow-icon" />
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We&apos;ll send you a magic link for password-free sign in.
      </p>
    </form>
  );
}
