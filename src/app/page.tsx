import { Suspense } from "react";
import { Header, Footer } from "@/components/layout";
import {
  Hero,
  LogoMarquee,
  FeatureGrid,
  PillarGrid,
  About,
  StatsSection,
  // TestimonialSection, // TODO: Uncomment when testimonials are ready
} from "@/components/marketing";
import { 
  SkeletonHero, 
  SkeletonSection, 
  SkeletonStats 
} from "@/components/ui/skeleton";

// Fallback for logo marquee section
function LogoMarqueeFallback() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container text-center">
        <div className="h-4 w-64 bg-muted rounded mx-auto animate-pulse" />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Suspense fallback={<SkeletonHero />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LogoMarqueeFallback />}>
          <LogoMarquee />
        </Suspense>
        <Suspense fallback={<SkeletonSection cards={3} />}>
          <FeatureGrid />
        </Suspense>
        <Suspense fallback={<SkeletonStats />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<SkeletonSection cards={4} />}>
          <PillarGrid />
        </Suspense>
        {/* <TestimonialSection /> */}
        <About />
      </main>
      <Footer />
    </div>
  );
}
