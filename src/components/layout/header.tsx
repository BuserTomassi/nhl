"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 sm:top-6 left-0 right-0 z-50"
    >
      <div className="container flex items-center justify-between">
        {/* Logo chip */}
        <div className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 sm:px-5 sm:py-3 border backdrop-blur-md bg-white/95 dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20">
          <Logo />
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-2 py-2 border backdrop-blur-md bg-white/95 dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
                link.isPrimary &&
                  pathname !== link.href &&
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile navigation */}
        <div className="flex items-center gap-2 md:hidden rounded-full px-2 py-2 border backdrop-blur-md bg-white/95 dark:bg-slate-900/80 border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}

