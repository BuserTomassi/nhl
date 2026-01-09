"use client";

import { useState } from "react";
import { revokeInvitation } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import type { Invitation } from "@/lib/supabase/types";
import { Copy, X, Loader2, Check } from "lucide-react";

interface InvitationActionsProps {
  invitation: Invitation;
}

export function InvitationActions({ invitation }: InvitationActionsProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/signup?token=${invitation.token}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRevoke = async () => {
    setIsRevoking(true);
    await revokeInvitation(invitation.id);
    setIsRevoking(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-1"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy Link
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRevoke}
        disabled={isRevoking}
        className="text-destructive hover:text-destructive"
      >
        {isRevoking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <X className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
