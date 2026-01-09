import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Upcoming events */}
      <section>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
