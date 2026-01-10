"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Profile } from "@/lib/supabase/types";

interface HeaderProps {
  initialProfile?: Profile | null;
}

export function Header({ initialProfile }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6"
    >
      <div className="container">
        {/* Unified floating nav bar */}
        <nav
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6 transition-all duration-500",
            "border backdrop-blur-xl",
            isScrolled
              ? "bg-white/90 dark:bg-slate-900/90 border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
              : "bg-white/80 dark:bg-slate-900/70 border-slate-200/50 dark:border-white/5 shadow-md"
          )}
        >
          {/* Logo */}
          <Logo className="shrink-0" />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                    link.isPrimary && !isActive && "text-foreground"
                  )}
                >
                  {/* Animated background indicator */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cn(
                          "absolute inset-0 rounded-full -z-10",
                          isActive
                            ? "bg-primary/10 dark:bg-primary/20"
                            : "bg-muted/50"
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side: User nav + Theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <UserNav initialProfile={initialProfile} />
            <div className="h-6 w-px bg-border" />
            <ThemeToggle />
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileNav initialProfile={initialProfile} />
          </div>

          {/* Glow effect on scroll */}
          <div
            className={cn(
              "absolute inset-x-0 -bottom-px h-px transition-opacity duration-500",
              "bg-gradient-to-r from-transparent via-primary/50 to-transparent",
              isScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </nav>
      </div>
    </motion.header>
  );
}
