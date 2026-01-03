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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <FeatureGrid />
        <StatsSection />
        <PillarGrid />
        {/* <TestimonialSection /> */}
        <About />
      </main>
      <Footer />
    </div>
  );
}
