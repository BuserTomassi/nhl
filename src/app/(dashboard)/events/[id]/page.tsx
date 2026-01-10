import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
import { getEvent, getEventAttendees, isRegisteredForEvent } from "@/lib/actions/events";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { RsvpButton } from "@/components/events/rsvp-button";
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  ExternalLink,
} from "lucide-react";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  const [event, attendees, isRegistered] = await Promise.all([
    getEvent(id),
    getEventAttendees(id),
    isRegisteredForEvent(id),
  ]);

  if (!event) {
    notFound();
  }

  const startDate = new Date(event.starts_at);
  const endDate = event.ends_at ? new Date(event.ends_at) : null;
  const isPast = startDate < new Date();
  const attendeeCount = event.attendee_count ?? 0;
  const isFull = event.max_attendees
    ? attendeeCount >= event.max_attendees
    : false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/events"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            {/* Cover image */}
            {event.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.cover_image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}

            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{event.title}</h1>
                  {event.tier_required !== "silver" && (
                    <TierBadge tier={event.tier_required} className="mt-2" />
                  )}
                </div>
              </div>

              {event.description && (
                <p className="mt-4 text-muted-foreground whitespace-pre-wrap">
                  {event.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Attendees ({attendees.length})
              </h2>

              {attendees.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No attendees yet. Be the first to register!
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {attendees
                    .filter((attendee) => attendee.profile != null)
                    .map((attendee) => {
                      const profile = attendee.profile!;
                      const initials = profile.full_name
                        ? profile.full_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "?";

                      return (
                        <Link
                          key={attendee.id}
                          href={`/members/${profile.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={profile.avatar_url || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {profile.full_name || "Member"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {profile.title || profile.company || ""}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {/* RSVP button */}
              <RsvpButton
                eventId={event.id}
                isRegistered={isRegistered}
                isPast={isPast}
                isFull={isFull}
              />

              {/* Event details */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {format(startDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {format(startDate, "h:mm a")}
                      {endDate && ` - ${format(endDate, "h:mm a")}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.timezone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {event.location_type === "virtual" ? (
                    <Video className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium capitalize">
                      {event.location_type.replace("_", " ")}
                    </p>
                    {event.location_details && (
                      <p className="text-sm text-muted-foreground">
                        {event.location_details}
                      </p>
                    )}
                  </div>
                </div>

                {event.max_attendees && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {attendeeCount} / {event.max_attendees} spots
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.max_attendees - attendeeCount} remaining
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video room link (if registered and event has one) */}
              {isRegistered && event.video_room_url && !isPast && (
                <div className="pt-4 border-t">
                  <a
                    href={event.video_room_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
                  >
                    <Video className="h-4 w-4" />
                    Join Video Room
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
