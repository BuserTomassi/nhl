"use client";

import { DashboardNav } from "@/components/dashboard/nav";
import { useSidebar } from "@/hooks";
import type { Profile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  profile: Profile;
  children: React.ReactNode;
}

export function DashboardShell({ profile, children }: DashboardShellProps) {
  const { isCollapsed, isHydrated, toggle } = useSidebar(false);

  return (
    <div className="flex">
      {/* Render with default width until hydrated to prevent layout shift */}
      <DashboardNav
        profile={profile}
        isCollapsed={isHydrated ? isCollapsed : false}
        onToggleCollapse={toggle}
      />
      <main
        id="main-content"
        className={cn(
          "flex-1 p-6 lg:p-8 transition-all duration-300 ease-in-out"
        )}
      >
        {children}
      </main>
    </div>
  );
}
