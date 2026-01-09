import { Metadata } from "next";
import { SignupForm } from "./signup-form";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { verifyInvitationToken } from "@/lib/actions/auth";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Join",
  description: "Join the Next Horizon Leadership community",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;
  const invitation = token ? await verifyInvitationToken(token) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {invitation ? "You're Invited" : "Request Access"}
            </h1>
            {invitation ? (
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  You&apos;ve been invited to join as a{" "}
                  <Badge variant="secondary" className="capitalize">
                    {invitation.tier}
                  </Badge>{" "}
                  member
                </p>
                {invitation.message && (
                  <p className="text-sm italic text-muted-foreground">
                    &ldquo;{invitation.message}&rdquo;
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Join the premier community for forward-looking leaders
              </p>
            )}
          </div>
        </div>

        {/* Signup Form */}
        <div className="card-surface p-6 sm:p-8">
          <SignupForm
            inviteToken={token}
            invitedEmail={invitation?.email}
            invitedTier={invitation?.tier}
          />
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
