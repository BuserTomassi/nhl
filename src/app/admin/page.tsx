import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Building2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get counts
  const [
    { count: memberCount },
    { count: pendingInvites },
    { count: partnerCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("invitations")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("partners").select("*", { count: "exact", head: true }),
  ]);

  // Get tier distribution
  const { data: tierDistribution } = await supabase
    .from("profiles")
    .select("tier");

  const tierCounts = tierDistribution?.reduce(
    (acc, p) => {
      acc[p.tier] = (acc[p.tier] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage members, invitations, and platform settings
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          href="/admin/members"
          icon={Users}
          label="Total Members"
          value={memberCount || 0}
        />
        <StatsCard
          href="/admin/invitations"
          icon={Mail}
          label="Pending Invites"
          value={pendingInvites || 0}
        />
        <StatsCard
          href="/admin/partners"
          icon={Building2}
          label="Partners"
          value={partnerCount || 0}
        />
        <StatsCard
          href="/admin/analytics"
          icon={MessageSquare}
          label="Posts Today"
          value={0}
        />
      </div>

      {/* Tier distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Membership Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <TierStat tier="silver" count={tierCounts?.silver || 0} />
            <TierStat tier="gold" count={tierCounts?.gold || 0} />
            <TierStat tier="platinum" count={tierCounts?.platinum || 0} />
            <TierStat tier="diamond" count={tierCounts?.diamond || 0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Link href={href}>
      <Card className="card-lift">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function TierStat({ tier, count }: { tier: string; count: number }) {
  const colors = {
    silver: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    gold: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    platinum:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    diamond:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  };

  return (
    <div
      className={`rounded-lg p-4 ${colors[tier as keyof typeof colors] || ""}`}
    >
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm capitalize">{tier}</p>
    </div>
  );
}
