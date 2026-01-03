import { Header } from "@/components/layout";
import { SkeletonPageHeader, SkeletonSection } from "@/components/ui/skeleton";

export default function InsightsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SkeletonPageHeader />
        <SkeletonSection cards={3} />
      </main>
    </div>
  );
}

