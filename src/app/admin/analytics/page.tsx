import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  UserPlus,
  Eye,
} from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Get counts
  const [
    { count: totalMembers },
    { count: totalPosts },
    { count: totalEvents },
    { count: totalSpaces },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("spaces").select("*", { count: "exact", head: true }),
  ]);

  // Get recent signups (last 7 days)
  const sevenDaysAgo = subDays(new Date(), 7);
  const { count: recentSignups } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString());

  // Get posts this week
  const { count: postsThisWeek } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString());

  // Get tier distribution
  const { data: profiles } = await supabase.from("profiles").select("tier");

  const tierDistribution = profiles?.reduce(
    (acc, p) => {
      acc[p.tier] = (acc[p.tier] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get recent activity
  const { data: recentPosts } = await supabase
    .from("posts")
    .select(
      `
      id,
      created_at,
      author:profiles!posts_author_id_fkey(full_name),
      space:spaces!posts_space_id_fkey(name)
    `
    )
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Platform engagement and growth metrics
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Users}
          label="Total Members"
          value={totalMembers || 0}
          change={`+${recentSignups || 0} this week`}
        />
        <MetricCard
          icon={MessageSquare}
          label="Total Posts"
          value={totalPosts || 0}
          change={`+${postsThisWeek || 0} this week`}
        />
        <MetricCard
          icon={Calendar}
          label="Total Events"
          value={totalEvents || 0}
        />
        <MetricCard
          icon={TrendingUp}
          label="Active Spaces"
          value={totalSpaces || 0}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tier distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["diamond", "platinum", "gold", "silver"].map((tier) => {
                const count = tierDistribution?.[tier] || 0;
                const total = totalMembers || 1;
                const percentage = Math.round((count / total) * 100);

                return (
                  <div key={tier}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium">{tier}</span>
                      <span className="text-muted-foreground">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getTierColor(tier)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts && recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>
                        <span className="font-medium">
                          {(post.author as { full_name: string })?.full_name || "Member"}
                        </span>{" "}
                        posted in{" "}
                        <span className="font-medium">
                          {(post.space as { name: string })?.name || "Space"}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.created_at), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Growth metrics placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Charts will be added when more data is available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  change?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
            {change && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {change}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTierColor(tier: string): string {
  switch (tier) {
    case "diamond":
      return "bg-cyan-500";
    case "platinum":
      return "bg-purple-500";
    case "gold":
      return "bg-amber-500";
    case "silver":
    default:
      return "bg-slate-400";
  }
}
