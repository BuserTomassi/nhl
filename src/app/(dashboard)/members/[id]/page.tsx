import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail, MessageCircle } from "lucide-react";

interface MemberProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: member } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!member || !member.is_public) {
    notFound();
  }

  const initials = member.full_name
    ? member.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : member.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/members"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Directory
      </Link>

      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {member.full_name || "Member"}
              </h1>
              <TierBadge tier={member.tier} className="mt-2" />

              {(member.title || member.company) && (
                <p className="mt-3 text-muted-foreground">
                  {[member.title, member.company].filter(Boolean).join(" at ")}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                <Link href={`/messages?to=${member.id}`}>
                  <Button>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </Link>

                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="mt-8 pt-6 border-t">
              <h2 className="font-semibold mb-3">About</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {member.bio}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
