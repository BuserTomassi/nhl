import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

export function SkeletonText({ className, lines = 3 }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-2xl border bg-card p-6 sm:p-8", className)}>
      <Skeleton className="h-14 w-14 rounded-xl mb-5" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonButton({ className, size = "default" }: SkeletonProps & { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-9 w-24",
    default: "h-10 w-32",
    lg: "h-12 w-40",
  };

  return (
    <Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
  );
}

export function SkeletonHero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center">
      <Skeleton className="absolute inset-0" />
      <div className="container relative z-10 mt-20 sm:mt-24 md:mt-28 pb-24 lg:pb-32 max-w-5xl">
        <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-full max-w-3xl mb-4" />
        <Skeleton className="h-16 sm:h-20 md:h-24 lg:h-28 w-3/4 max-w-2xl mb-8" />
        <SkeletonText lines={2} className="max-w-2xl mb-10" />
        <div className="flex gap-4">
          <SkeletonButton size="lg" />
          <SkeletonButton size="lg" />
        </div>
      </div>
    </section>
  );
}

export function SkeletonPageHeader() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Skeleton className="absolute inset-0" />
      <div className="container relative z-10 text-center">
        <Skeleton className="h-12 sm:h-16 w-3/4 max-w-xl mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 max-w-md mx-auto" />
      </div>
    </section>
  );
}

export function SkeletonSection({ cards = 3 }: { cards?: number }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-24 mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-2xl mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 max-w-xl mx-auto" />
        </div>
        <div className={cn(
          "grid gap-6 sm:gap-8",
          cards === 2 && "md:grid-cols-2",
          cards === 3 && "md:grid-cols-3",
          cards === 4 && "md:grid-cols-2 lg:grid-cols-4"
        )}>
          {Array.from({ length: cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonStats() {
  return (
    <section className="py-20 lg:py-24">
      <Skeleton className="absolute inset-0" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-24 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-10 w-3/4 max-w-md mx-auto bg-white/20" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-12 w-24 mx-auto mb-2 bg-white/20" />
              <Skeleton className="h-4 w-20 mx-auto bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonContactForm() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <SkeletonButton size="lg" />
    </div>
  );
}

