import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/dashboard/tier-badge";
import type { Event, MembershipTier } from "@/lib/supabase/types";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";

interface EventCardProps {
  event: Event & {
    created_by?: { id: string; full_name: string | null; avatar_url: string | null } | null;
    space?: { id: string; name: string; slug: string } | null;
  };
  isPast?: boolean;
}

const locationIcons = {
  virtual: Video,
  in_person: MapPin,
  hybrid: MapPin,
};

export function EventCard({ event, isPast }: EventCardProps) {
  const LocationIcon = locationIcons[event.location_type];
  const startDate = new Date(event.starts_at);

  return (
    <Link href={`/events/${event.id}`}>
      <Card className={`card-lift h-full ${isPast ? "opacity-75" : ""}`}>
        {/* Cover image or date banner */}
        <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          {event.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.cover_image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {format(startDate, "d")}
              </p>
              <p className="text-sm font-medium text-primary/80 uppercase">
                {format(startDate, "MMM")}
              </p>
            </div>
          )}
          {isPast && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Past
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-2">{event.title}</h3>
            {event.tier_required !== "silver" && (
              <TierBadge tier={event.tier_required} size="sm" showIcon={false} />
            )}
          </div>

          <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{format(startDate, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{format(startDate, "h:mm a")} {event.timezone}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 shrink-0" />
              <span className="capitalize">{event.location_type.replace("_", " ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {event.attendee_count} attending
              {event.max_attendees && ` / ${event.max_attendees}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
