"use client";

import Image from "next/image";
import { getLogoUrl, logosTop, logosBottom } from "@/data/logos";
import { cn } from "@/lib/utils";

interface LogoRowProps {
  logos: typeof logosTop;
  speed?: number;
  reverse?: boolean;
}

function LogoRow({ logos, speed = 56, reverse = false }: LogoRowProps) {
  const style = {
    "--marquee-duration": `${speed}s`,
  } as React.CSSProperties;

  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex gap-12 animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
        style={style}
      >
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos].map((logo, index) => {
          const src = getLogoUrl(logo.key);
          if (!src) return null;
          return (
            <div
              key={`${logo.key}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-[120px] h-[44px]"
            >
              <Image
                src={src}
                alt={logo.alt}
                width={120}
                height={44}
                className="h-8 sm:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/98 dark:to-slate-950">
      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand absolute left-1/4 -top-32 opacity-10" />
      <div className="ambient-orb orb-accent absolute right-1/4 -bottom-32 opacity-10" />

      <div className="container relative z-10">
        <p className="mb-10 text-center text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
          Trusted by leaders from world-class organizations
        </p>
        <LogoRow logos={logosTop} speed={56} />
        <div className="mt-8">
          <LogoRow logos={logosBottom} speed={72} reverse />
        </div>
      </div>
    </section>
  );
}

