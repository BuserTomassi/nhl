import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          id={id}
          className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary uppercase"
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground",
            align === "center" && "max-w-3xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}

