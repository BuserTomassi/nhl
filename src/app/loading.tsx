import { Header } from "@/components/layout";
import { 
  SkeletonHero, 
  SkeletonSection, 
  SkeletonStats 
} from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SkeletonHero />
        <SkeletonSection cards={3} />
        <SkeletonStats />
        <SkeletonSection cards={3} />
      </main>
    </div>
  );
}

