"use client";

import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[320px] sm:w-[380px] border-l-0 bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-headline text-2xl font-bold">
            <span className="text-gradient text-gradient-brand">
              Next Horizon
            </span>
            <br />
            Leadership
          </SheetTitle>
        </SheetHeader>

        {/* Decorative gradient line */}
        <div className="mt-6 mb-8 h-px w-full bg-gradient-to-r from-primary via-accent to-transparent" />

        <nav className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {open &&
              navigationLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-center justify-between py-4 px-4 rounded-xl text-lg font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                        link.isPrimary &&
                          !isActive &&
                          "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 opacity-0 -translate-x-2 transition-all duration-200",
                          "group-hover:opacity-100 group-hover:translate-x-0",
                          isActive && "opacity-100 translate-x-0"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </nav>

        {/* Footer section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-6 right-6"
        >
          <div className="h-px w-full bg-border mb-6" />
          <p className="text-sm text-muted-foreground">
            Empowering forward-looking leaders.
          </p>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
