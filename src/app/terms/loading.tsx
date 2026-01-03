import { Header } from "@/components/layout";
import { SkeletonPageHeader, Skeleton, SkeletonText } from "@/components/ui/skeleton";

export default function TermsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SkeletonPageHeader />
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <SkeletonText lines={4} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

