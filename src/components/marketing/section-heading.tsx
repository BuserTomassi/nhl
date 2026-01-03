import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  gradient?: boolean;
  size?: "default" | "large";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
  gradient = false,
  size = "default",
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          id={id}
          className="mb-4 text-xs font-semibold tracking-[0.3em] text-primary uppercase"
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-headline font-bold tracking-tight",
          size === "default" && "text-3xl sm:text-4xl lg:text-5xl",
          size === "large" && "text-4xl sm:text-5xl lg:text-6xl",
          gradient && "text-gradient text-gradient-brand"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg text-muted-foreground leading-relaxed",
            align === "center" && "max-w-3xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

