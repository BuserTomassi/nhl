"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MembershipTier } from "@/lib/supabase/types";
import { Search, X } from "lucide-react";
import { useState, useTransition, useEffect, useRef, useCallback } from "react";

interface MemberFiltersProps {
  currentTier?: MembershipTier;
  currentSearch?: string;
}

const tiers: { value: MembershipTier | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "diamond", label: "Diamond" },
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
];

export function MemberFilters({
  currentTier,
  currentSearch,
}: MemberFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateFilters = useCallback((tier?: MembershipTier | "all", search?: string) => {
    const params = new URLSearchParams(searchParams);

    if (tier && tier !== "all") {
      params.set("tier", tier);
    } else {
      params.delete("tier");
    }

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/members?${params.toString()}`);
    });
  }, [router, searchParams]);

  // Auto-filter with debounce as user types
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // Only update if the value has actually changed from URL
      if (searchValue !== (currentSearch || "")) {
        updateFilters(currentTier, searchValue);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue, currentTier, currentSearch, updateFilters]);

  const handleTierClick = (tier: MembershipTier | "all") => {
    updateFilters(tier, searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    updateFilters(currentTier, "");
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search members..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tier filters */}
      <div className="flex flex-wrap gap-2">
        {tiers.map((tier) => {
          const isActive =
            tier.value === "all"
              ? !currentTier
              : currentTier === tier.value;

          return (
            <Button
              key={tier.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleTierClick(tier.value)}
              disabled={isPending}
            >
              {tier.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
