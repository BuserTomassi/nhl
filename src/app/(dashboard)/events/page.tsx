import { getUpcomingEvents, getPastEvents } from "@/lib/actions/events";
export const dynamic = "force-dynamic";
import { EventCard } from "@/components/events/event-card";
import { PageHeader } from "@/components/marketing/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

export default async function EventsPage() {
  const [{ data: upcomingEvents }, { data: pastEvents }] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(10),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Events"
        description="Join exclusive gatherings, roundtables, and learning sessions with fellow leaders."
      />

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingEvents.length === 0 ? (
            <EmptyState message="No upcoming events scheduled" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastEvents.length === 0 ? (
            <EmptyState message="No past events" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16">
      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
