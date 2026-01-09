import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import type { Profile } from "@/lib/supabase/types";
import { Linkedin } from "lucide-react";

interface MemberCardProps {
  member: Profile;
}

export function MemberCard({ member }: MemberCardProps) {
  const initials = member.full_name
    ? member.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : member.email[0].toUpperCase();

  return (
    <Link href={`/members/${member.id}`}>
      <Card className="card-lift h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={member.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">
                  {member.full_name || "Member"}
                </h3>
                {member.linkedin_url && (
                  <Linkedin className="h-4 w-4 text-[#0077B5] shrink-0" />
                )}
              </div>
              <TierBadge tier={member.tier} size="sm" className="mt-1" />
            </div>
          </div>

          {(member.title || member.company) && (
            <p className="mt-3 text-sm text-muted-foreground">
              {[member.title, member.company].filter(Boolean).join(" at ")}
            </p>
          )}

          {member.bio && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {member.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
