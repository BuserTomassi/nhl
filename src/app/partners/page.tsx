import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { FadeIn } from "@/components/motion";
import { BreadcrumbSchema } from "@/components/seo";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "A curated network of Executive Search firms, AI innovators, and Organizational Design experts.",
  alternates: {
    canonical: `${BASE_URL}/partners`,
  },
  openGraph: {
    title: "Partners | Next Horizon Leadership",
    description:
      "A curated network of Executive Search firms, AI innovators, and Organizational Design experts.",
    url: `${BASE_URL}/partners`,
  },
};

export default function PartnersPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Partners", url: `${BASE_URL}/partners` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="Partners"
          subtitle="A curated network of Executive Search firms, AI innovators, and Organizational Design experts."
        />

        <section className="section-light section-vignette relative py-24 sm:py-32">
          <div className="container flex items-center justify-center">
            <FadeIn>
              <div className="text-center">
                <h2 className="font-headline text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-slate-200 dark:text-slate-800 select-none">
                  COMING SOON
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Partner directory launching soon
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
