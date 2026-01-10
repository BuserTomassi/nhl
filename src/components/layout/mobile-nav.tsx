"use client";

import { Menu, ArrowRight, LogIn, LogOut, LayoutDashboard, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface MobileNavProps {
  initialProfile?: Profile | null;
}

export function MobileNav({ initialProfile }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(initialProfile ?? null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Only fetch profile if we don't have an initial one
      if (user && !initialProfile) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(profile);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(profile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, initialProfile]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "?";

  const authLinks = user
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/settings/profile", label: "Profile", icon: User },
        { href: "/settings", label: "Settings", icon: Settings },
      ]
    : [];

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

        {/* User section */}
        {user ? (
          <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={profile?.avatar_url || undefined}
                alt={profile?.full_name || "Profile"}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">
                {profile?.full_name || "Member"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6"
          >
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          </motion.div>
        )}

        {/* Decorative gradient line */}
        <div className="mt-6 mb-4 h-px w-full bg-gradient-to-r from-primary via-accent to-transparent" />

        <nav className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {/* Auth links when logged in */}
            {open &&
              user &&
              authLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
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
                        "group flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

            {/* Divider between auth links and main nav */}
            {open && user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: authLinks.length * 0.08 }}
                className="h-px w-full bg-border my-2"
              />
            )}

            {/* Main navigation links */}
            {open &&
              navigationLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const delay = user ? (authLinks.length + 1 + index) * 0.08 : index * 0.08;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay,
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
          {user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Empowering forward-looking leaders.
            </p>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
