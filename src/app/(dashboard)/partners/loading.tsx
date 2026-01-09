import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function PartnersLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Partner grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
