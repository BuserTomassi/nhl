"use client";

import { useActionState } from "react";
import { signUpWithInvite, type AuthResult } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  User,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { MembershipTier } from "@/lib/supabase/types";

interface SignupFormProps {
  inviteToken?: string;
  invitedEmail?: string;
  invitedTier?: MembershipTier;
}

export function SignupForm({
  inviteToken,
  invitedEmail,
  invitedTier,
}: SignupFormProps) {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    signUpWithInvite,
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
            We&apos;ve sent you a verification link. Click the link in your
            email to complete your registration.
          </p>
        </div>
      </div>
    );
  }

  const isInvited = !!inviteToken;

  return (
    <form action={formAction} className="space-y-5">
      {inviteToken && (
        <input type="hidden" name="inviteToken" value={inviteToken} />
      )}

      {/* Email */}
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
            defaultValue={invitedEmail}
            readOnly={isInvited && !!invitedEmail}
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jane Smith"
            className="pl-10"
            required
            autoComplete="name"
          />
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Acme Corp"
            className="pl-10"
            autoComplete="organization"
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Job title</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Chief People Officer"
            className="pl-10"
            autoComplete="organization-title"
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
            Creating account...
          </>
        ) : (
          <>
            {isInvited ? "Accept Invitation" : "Request Access"}
            <ArrowRight className="ml-2 h-4 w-4 btn-arrow-icon" />
          </>
        )}
      </Button>

      {!isInvited && (
        <p className="text-xs text-center text-muted-foreground">
          NHL is an invite-only community. Submit your request and we'll review
          your application.
        </p>
      )}

      {isInvited && invitedTier && (
        <p className="text-xs text-center text-muted-foreground">
          You'll join as a {invitedTier} member with immediate access to
          exclusive content and community.
        </p>
      )}
    </form>
  );
}
