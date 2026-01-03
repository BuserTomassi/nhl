"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  variant?: "default" | "gradient-border" | "glow";
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, variant = "default", hover = true, children }, ref) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const currentRef = ref && typeof ref !== 'function' ? ref.current : cardRef.current;
      if (!currentRef) return;
      const rect = currentRef.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <motion.div
        ref={ref || cardRef}
        onMouseMove={variant === "glow" ? handleMouseMove : undefined}
        className={cn(
          "relative rounded-2xl overflow-hidden transition-all duration-300",
          variant === "default" && "card-surface card-premium",
          variant === "gradient-border" && "card-animated-border bg-card",
          variant === "glow" && "card-surface",
          hover && "card-lift",
          className
        )}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Glow effect that follows mouse */}
        {variant === "glow" && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.65 0.18 195 / 0.1), transparent 40%)`,
            }}
          />
        )}

        {/* Gradient border overlay for gradient-border variant */}
        {variant === "gradient-border" && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent [background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,var(--gradient-brand-from),var(--gradient-brand-to))_border-box] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

interface AnimatedCardContentProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedCardContent = React.forwardRef<HTMLDivElement, AnimatedCardContentProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn("p-6 sm:p-8", className)}>
      {children}
    </div>
  )
);

AnimatedCardContent.displayName = "AnimatedCardContent";

interface AnimatedCardIconProps {
  className?: string;
  children: React.ReactNode;
}

const AnimatedCardIcon = React.forwardRef<HTMLDivElement, AnimatedCardIconProps>(
  ({ className, children }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl icon-container text-primary",
        className
      )}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
);

AnimatedCardIcon.displayName = "AnimatedCardIcon";

interface AnimatedCardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedCardTitle = React.forwardRef<HTMLHeadingElement, AnimatedCardTitleProps>(
  ({ className, children }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold mb-3", className)}
    >
      {children}
    </h3>
  )
);

AnimatedCardTitle.displayName = "AnimatedCardTitle";

interface AnimatedCardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedCardDescription = React.forwardRef<HTMLParagraphElement, AnimatedCardDescriptionProps>(
  ({ className, children }, ref) => (
    <p
      ref={ref}
      className={cn("text-muted-foreground leading-relaxed", className)}
    >
      {children}
    </p>
  )
);

AnimatedCardDescription.displayName = "AnimatedCardDescription";

export {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardIcon,
  AnimatedCardTitle,
  AnimatedCardDescription,
};
