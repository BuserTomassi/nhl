import type { Metadata } from "next";
import { Search, Sparkles, LayoutGrid, Users } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardIcon,
  AnimatedCardTitle,
  AnimatedCardDescription,
} from "@/components/ui/animated-card";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo";
import { services } from "@/data/services";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services from Next Horizon Leadership.",
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: "Services | Next Horizon Leadership",
    description:
      "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services from Next Horizon Leadership.",
    url: `${BASE_URL}/services`,
  },
};

const iconMap = {
  search: Search,
  sparkles: Sparkles,
  layout: LayoutGrid,
  users: Users,
};

export default function ServicesPage() {
  const serviceItems = services.map((s) => ({
    name: s.title,
    description: s.description,
  }));

  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Services", url: `${BASE_URL}/services` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServiceSchema services={serviceItems} />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="Executive Search And Advisory Services"
          subtitle="Partnering with a curated network of world-class organizations to deliver results."
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          {/* Texture */}
          <div className="absolute inset-0 texture-topo opacity-50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 section-vignette" />

          <div className="container relative z-10">
            <StaggerChildren className="grid gap-6 lg:gap-8 md:grid-cols-2">
              {services.map((service) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <StaggerItem key={service.title}>
                    <AnimatedCard variant="glow" className="h-full">
                      <AnimatedCardContent>
                        <AnimatedCardIcon className="h-14 w-14 rounded-xl">
                          {Icon && <Icon className="h-6 w-6" />}
                        </AnimatedCardIcon>
                        <AnimatedCardTitle className="text-xl">
                          {service.title}
                        </AnimatedCardTitle>
                        <AnimatedCardDescription className="leading-relaxed">
                          {service.description}
                        </AnimatedCardDescription>
                      </AnimatedCardContent>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
