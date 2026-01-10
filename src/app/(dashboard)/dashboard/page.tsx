import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Video,
} from "lucide-react";
import { getUpcomingEvents } from "@/lib/actions/events";
import { format, formatDistanceToNow } from "date-fns";

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

  // Fetch recent activity (posts from all accessible spaces)
  const { data: recentActivity } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content_text,
      created_at,
      author:profiles!posts_author_id_fkey(id, full_name, avatar_url),
      space:spaces!posts_space_id_fkey(id, name, slug)
    `
    )
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch upcoming events (limit to 3 for the dashboard)
  const { data: upcomingEvents } = await getUpcomingEvents(3);

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
        {/* Activity feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((post) => {
                  const author = post.author as { id: string; full_name: string | null; avatar_url: string | null } | null;
                  const space = post.space as { id: string; name: string; slug: string } | null;
                  return (
                    <Link
                      key={post.id}
                      href={`/spaces/${space?.slug || ""}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={author?.avatar_url || undefined} />
                        <AvatarFallback>
                          {author?.full_name?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">
                            {author?.full_name || "Member"}
                          </span>{" "}
                          posted in{" "}
                          <span className="font-medium text-primary">
                            {space?.name || "Space"}
                          </span>
                        </p>
                        {post.title && (
                          <p className="text-sm font-medium mt-0.5 line-clamp-1">
                            {post.title}
                          </p>
                        )}
                        {post.content_text && (
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {post.content_text}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </Link>
                  );
                })}
                <Link href="/spaces" className="block">
                  <Button variant="outline" className="w-full mt-2">
                    View All Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
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
            )}
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
            {upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const startDate = new Date(event.starts_at);
                  const LocationIcon = event.location_type === "virtual" ? Video : MapPin;
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors border"
                    >
                      <div className="flex gap-3">
                        {/* Date badge */}
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs font-medium text-primary uppercase">
                            {format(startDate, "MMM")}
                          </span>
                          <span className="text-lg font-bold text-primary leading-none">
                            {format(startDate, "d")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{format(startDate, "h:mm a")}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <LocationIcon className="h-3 w-3" />
                            <span className="capitalize">{event.location_type.replace("_", " ")}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <Link href="/events" className="block">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Events
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No upcoming events</p>
                <Link href="/events">
                  <Button variant="outline" size="sm" className="mt-3">
                    View All Events
                  </Button>
                </Link>
              </div>
            )}
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
