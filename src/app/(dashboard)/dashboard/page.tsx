import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/auth/login");
  }

  // Check if onboarding is needed
  if (!profile.onboarding_completed) {
    redirect("/dashboard/onboarding");
  }

  const greeting = getGreeting();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {greeting}, {profile.full_name?.split(" ")[0] || "there"}
          </h1>
          <TierBadge tier={profile.tier} size="lg" />
        </div>
        <p className="text-muted-foreground">
          Welcome to your Next Horizon Leadership community
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickActionCard
          href="/spaces"
          icon={MessageSquare}
          title="Spaces"
          description="Join discussions with peers"
        />
        <QuickActionCard
          href="/events"
          icon={Calendar}
          title="Events"
          description="Upcoming gatherings"
        />
        <QuickActionCard
          href="/members"
          icon={Users}
          title="Members"
          description="Connect with leaders"
        />
        <QuickActionCard
          href="/resources"
          icon={BookOpen}
          title="Resources"
          description="Exclusive content library"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity feed placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No recent activity</p>
              <p className="text-sm mt-1">
                Join a space to start participating in discussions
              </p>
              <Link href="/spaces">
                <Button className="mt-4">
                  Explore Spaces
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No upcoming events</p>
              <Link href="/events">
                <Button variant="outline" size="sm" className="mt-3">
                  View All Events
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <Card className="card-lift h-full cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
