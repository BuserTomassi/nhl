import { getUpcomingEvents, getPastEvents } from "@/lib/actions/events";
export const dynamic = "force-dynamic";
import { EventCard, EventFilters } from "@/components/events";
import { DashboardPageHeader } from "@/components/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

interface EventsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { search } = await searchParams;

  const [{ data: upcomingEvents }, { data: pastEvents }] = await Promise.all([
    getUpcomingEvents(20, search),
    getPastEvents(10, search),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Events"
        description="Join exclusive gatherings, roundtables, and learning sessions with fellow leaders."
      />

      {/* Search */}
      <EventFilters currentSearch={search} />

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingEvents.length === 0 ? (
            <EmptyState message={search ? `No upcoming events matching "${search}"` : "No upcoming events scheduled"} />
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
            <EmptyState message={search ? `No past events matching "${search}"` : "No past events"} />
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
