import { Header } from "@/components/layout";
import { SkeletonPageHeader, SkeletonSection } from "@/components/ui/skeleton";

export default function PartnersLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SkeletonPageHeader />
        <SkeletonSection cards={4} />
      </main>
    </div>
  );
}

