import { Header } from "@/components/layout";
import { 
  SkeletonPageHeader, 
  Skeleton, 
  SkeletonText, 
  SkeletonContactForm 
} from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SkeletonPageHeader />
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Sidebar skeleton */}
              <div className="lg:col-span-1">
                <Skeleton className="h-8 w-32 mb-6" />
                <SkeletonText lines={3} className="mb-8" />
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-16 mb-2" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Form skeleton */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl bg-card p-6 sm:p-10 border">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-48 mb-8" />
                  <SkeletonContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

