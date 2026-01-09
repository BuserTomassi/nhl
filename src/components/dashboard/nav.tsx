"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/supabase/types";
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Building2,
  Settings,
  Shield,
  GraduationCap,
} from "lucide-react";

interface DashboardNavProps {
  profile: Profile;
}

const baseNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/spaces", label: "Spaces", icon: MessageSquare },
  { href: "/members", label: "Members", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/partners", label: "Partners", icon: Building2 },
];

const platinumNavItems = [
  { href: "/cohorts", label: "Cohorts", icon: GraduationCap },
];

const adminNavItems = [{ href: "/admin", label: "Admin", icon: Shield }];

export function DashboardNav({ profile }: DashboardNavProps) {
  const pathname = usePathname();

  // Build nav items based on tier and role
  const navItems = [
    ...baseNavItems,
    ...(["platinum", "diamond"].includes(profile.tier) ? platinumNavItems : []),
    ...(profile.role === "admin" ? adminNavItems : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="hidden lg:flex flex-col w-64 border-r bg-card min-h-[calc(100vh-4rem)] p-4">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
