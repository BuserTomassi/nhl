import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function CohortsLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Active cohort section */}
      <section>
        <Skeleton className="h-6 w-40 mb-4" />
        <SkeletonCard className="max-w-2xl" />
      </section>

      {/* Past cohorts */}
      <section>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
