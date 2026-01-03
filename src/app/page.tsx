import { Header, Footer } from "@/components/layout";
import {
  Hero,
  LogoMarquee,
  FeatureGrid,
  PillarGrid,
  About,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <FeatureGrid />
        <PillarGrid />
        <About />
      </main>
      <Footer />
    </div>
  );
}
