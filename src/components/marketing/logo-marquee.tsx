"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { socialProofNumbers } from "@/data/social-proof";

const LOGO_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

const row1Companies = [
  { domain: "apple.com", name: "Apple" },
  { domain: "nike.com", name: "Nike" },
  { domain: "microsoft.com", name: "Microsoft" },
  { domain: "disney.com", name: "Disney" },
  { domain: "google.com", name: "Alphabet (Google)" },
  { domain: "pfizer.com", name: "Pfizer" },
  { domain: "amazon.com", name: "Amazon" },
  { domain: "starbucks.com", name: "Starbucks" },
  { domain: "meta.com", name: "Meta" },
  { domain: "servicenow.com", name: "ServiceNow" },
  { domain: "airbnb.com", name: "Airbnb" },
  { domain: "salesforce.com", name: "Salesforce" },
  { domain: "chobani.com", name: "Chobani" },
  { domain: "adobe.com", name: "Adobe" },
  { domain: "workday.com", name: "Workday" },
  { domain: "walmart.com", name: "Walmart" },
  { domain: "databricks.com", name: "Databricks" },
  { domain: "lilly.com", name: "Eli Lilly" },
  { domain: "stripe.com", name: "Stripe" },
  { domain: "patagonia.com", name: "Patagonia" },
  { domain: "crowdstrike.com", name: "CrowdStrike" },
  { domain: "peloton.com", name: "Peloton" },
  { domain: "atlassian.com", name: "Atlassian" },
];

const row2Companies = [
  { domain: "warbyparker.com", name: "Warby Parker" },
  { domain: "hubspot.com", name: "HubSpot" },
  { domain: "target.com", name: "Target" },
  { domain: "zoom.us", name: "Zoom" },
  { domain: "amgen.com", name: "Amgen" },
  { domain: "intel.com", name: "Intel" },
  { domain: "visa.com", name: "Visa" },
  { domain: "coinbase.com", name: "Coinbase" },
  { domain: "gilead.com", name: "Gilead Sciences" },
  { domain: "netflix.com", name: "Netflix" },
  { domain: "thermofisher.com", name: "Thermo Fisher Scientific" },
  { domain: "qualcomm.com", name: "Qualcomm" },
  { domain: "takeda.com", name: "Takeda" },
  { domain: "lumen.com", name: "Lumen" },
  { domain: "paypal.com", name: "PayPal" },
  { domain: "intuit.com", name: "Intuit" },
  { domain: "ebay.com", name: "eBay" },
  { domain: "paloaltonetworks.com", name: "Palo Alto Networks" },
  { domain: "t-mobile.com", name: "T-Mobile" },
  { domain: "petco.com", name: "Petco" },
  { domain: "verizon.com", name: "Verizon" },
  { domain: "levi.com", name: "Levi's" },
];

function LogoCard({ company }: { company: { domain: string; name: string } }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load images 200px before they enter viewport
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex-shrink-0 group">
      <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-lg bg-white shadow-md overflow-hidden group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
        {isVisible ? (
          <Image
            src={`https://img.logo.dev/${company.domain}?token=${LOGO_TOKEN}`}
            alt={company.name}
            fill
            className={`object-contain p-2 sm:p-2.5 transition-opacity duration-300 ${
              hasLoaded ? "opacity-100" : "opacity-0"
            }`}
            unoptimized
            onLoad={() => setHasLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>
    </div>
  );
}

function LogoRow({ 
  companies, 
  direction = "left", 
  duration = 60 
}: { 
  companies: typeof row1Companies; 
  direction?: "left" | "right";
  duration?: number;
}) {
  return (
    <div className="relative overflow-hidden group/marquee">
      <div 
        className={`flex gap-12 sm:gap-16 lg:gap-20 items-center ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover/marquee:[animation-play-state:paused]`}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...companies, ...companies].map((company, i) => (
          <LogoCard key={`${company.domain}-${i}`} company={company} />
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900/50 dark:to-slate-950/50" />

      <div className="container relative z-10 mb-10">
        {/* Updated headline with social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-2">
            Trusted by CHROs and talent leaders from
          </p>
          <p className="text-xs text-muted-foreground/70">
            {socialProofNumbers.newsletterSubscribers}+ leaders in our network
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="space-y-6">
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-slate-100 dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1 - moves left */}
        <LogoRow companies={row1Companies} direction="left" duration={80} />
        
        {/* Row 2 - moves right */}
        <LogoRow companies={row2Companies} direction="right" duration={70} />
      </div>
    </section>
  );
}
