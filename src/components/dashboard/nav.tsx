"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface DashboardNavProps {
  profile: Profile;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
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

export function DashboardNav({
  profile,
  isCollapsed,
  onToggleCollapse,
}: DashboardNavProps) {
  const pathname = usePathname();

  // Build nav items based on tier and role
  const navItems = [
    ...baseNavItems,
    ...(["platinum", "diamond"].includes(profile.tier) ? platinumNavItems : []),
    ...(profile.role === "admin" ? adminNavItems : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <nav
        className={cn(
          "hidden lg:flex flex-col border-r bg-card h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <ul className={cn("flex-1 space-y-1 overflow-y-auto", isCollapsed ? "p-2" : "p-4")}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            if (isCollapsed) {
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-6 w-6 mb-1" />
                        <span className="text-[10px] font-medium text-center truncate w-full">
                          {item.label}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            }

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

        {/* Toggle button at the bottom */}
        <div
          className={cn(
            "border-t flex-shrink-0",
            isCollapsed ? "p-2" : "p-4"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                onClick={onToggleCollapse}
                className={cn(
                  "transition-all",
                  isCollapsed
                    ? "w-full h-10"
                    : "w-full justify-start gap-2"
                )}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="h-5 w-5" />
                ) : (
                  <>
                    <PanelLeftClose className="h-4 w-4" />
                    <span>Collapse</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={10}>
                Expand sidebar
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
}
