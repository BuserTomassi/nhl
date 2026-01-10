"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Profile } from "@/lib/supabase/types";
import {
  Bell,
  Menu,
  MessageCircle,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  profile: Profile;
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left side - Logo & Mobile menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <Badge variant={profile.tier} className="hidden sm:inline-flex capitalize">
              {profile.tier}
            </Badge>
          </div>
        </div>

        {/* Right side - Actions & User */}
        <div className="flex items-center gap-2">
          {/* Messages */}
          <Link href="/messages">
            <Button variant="ghost" size="icon" aria-label="Messages">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {/* Notification indicator */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <ThemeToggle />

          {/* User menu */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-muted transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 z-50 rounded-lg border bg-popover p-1 shadow-lg">
                  <div className="px-3 py-2 border-b mb-1">
                    <p className="font-medium text-sm truncate">
                      {profile.full_name || "Member"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {profile.email}
                    </p>
                  </div>

                  <Link
                    href="/settings/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <div className="border-t mt-1 pt-1">
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
