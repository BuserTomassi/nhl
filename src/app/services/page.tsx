import type { Metadata } from "next";
import { Search, Sparkles, LayoutGrid, Users } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services from Next Horizon Leadership.",
};

const iconMap = {
  search: Search,
  sparkles: Sparkles,
  layout: LayoutGrid,
  users: Users,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title="Executive Search And Advisory Services"
          subtitle="Partnering with a curated network of world-class organizations to deliver results."
        />

        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            <StaggerChildren className="grid gap-6 md:grid-cols-2">
              {services.map((service) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <StaggerItem key={service.title}>
                    <div className="card-surface card-premium card-lift p-8 h-full">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
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
