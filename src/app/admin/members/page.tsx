import { getMembers } from "@/lib/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import type { MembershipTier } from "@/lib/supabase/types";

interface MembersPageProps {
  searchParams: Promise<{ tier?: MembershipTier }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const params = await searchParams;
  const { data: members, total } = await getMembers(1, 50, params.tier);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-muted-foreground">{total} total members</p>
        </div>
      </div>

      {/* Tier filter */}
      <div className="flex gap-2">
        <TierFilterLink href="/admin/members" active={!params.tier}>
          All
        </TierFilterLink>
        <TierFilterLink
          href="/admin/members?tier=silver"
          active={params.tier === "silver"}
        >
          Silver
        </TierFilterLink>
        <TierFilterLink
          href="/admin/members?tier=gold"
          active={params.tier === "gold"}
        >
          Gold
        </TierFilterLink>
        <TierFilterLink
          href="/admin/members?tier=platinum"
          active={params.tier === "platinum"}
        >
          Platinum
        </TierFilterLink>
        <TierFilterLink
          href="/admin/members?tier=diamond"
          active={params.tier === "diamond"}
        >
          Diamond
        </TierFilterLink>
      </div>

      {/* Members list */}
      <Card>
        <CardHeader>
          <CardTitle>Member List</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No members found
            </p>
          ) : (
            <div className="divide-y">
              {members.map((member) => {
                const initials = member.full_name
                  ? member.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : member.email?.[0]?.toUpperCase() ?? "?";

                return (
                  <div
                    key={member.id}
                    className="py-4 flex items-center gap-4"
                  >
                    <Avatar>
                      <AvatarImage src={member.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">
                          {member.full_name || "Unnamed"}
                        </p>
                        <TierBadge tier={member.tier} size="sm" />
                        {member.role !== "member" && (
                          <Badge variant="outline" className="capitalize">
                            {member.role}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.email}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{member.company || "—"}</p>
                      <p>
                        Joined{" "}
                        {formatDistanceToNow(new Date(member.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TierFilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      }`}
    >
      {children}
    </Link>
  );
}
