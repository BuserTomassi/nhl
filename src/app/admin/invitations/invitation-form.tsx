"use client";

import { useActionState } from "react";
import { createInvitation, type AdminResult } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Check } from "lucide-react";

export function InvitationForm() {
  const [state, formAction, isPending] = useActionState<AdminResult | null, FormData>(
    createInvitation,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="person@company.com"
            required
          />
        </div>

        {/* Tier */}
        <div className="space-y-2">
          <Label htmlFor="tier">Membership tier</Label>
          <select
            id="tier"
            name="tier"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="diamond">Diamond</option>
          </select>
        </div>
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="member">Member</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Personal message (optional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Add a personal note to the invitation..."
          maxLength={500}
        />
      </div>

      {/* Status messages */}
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="h-4 w-4" />
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Invitation
          </>
        )}
      </Button>
    </form>
  );
}
