import Link from "next/link";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeaderWrapper />
      <main id="main-content" className="flex-1 flex items-center justify-center pt-20">
        <div className="container text-center">
          <h1 className="font-headline text-8xl sm:text-9xl font-bold text-muted-foreground/30">
            404
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">
            Page Not Found
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

