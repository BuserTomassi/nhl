"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PartnerCategory } from "@/lib/supabase/types";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";

interface PartnerFiltersProps {
  currentCategory?: PartnerCategory;
  currentSearch?: string;
}

const categories: { value: PartnerCategory | "all"; label: string }[] = [
  { value: "all", label: "All Partners" },
  { value: "search_firm", label: "Executive Search" },
  { value: "ai_vendor", label: "AI & Technology" },
  { value: "consultant", label: "Consulting" },
];

export function PartnerFilters({
  currentCategory,
  currentSearch,
}: PartnerFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(currentSearch || "");

  const updateFilters = (category?: PartnerCategory | "all", search?: string) => {
    const params = new URLSearchParams(searchParams);

    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/partners?${params.toString()}`);
    });
  };

  const handleCategoryClick = (category: PartnerCategory | "all") => {
    updateFilters(category, searchValue);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(currentCategory, searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    updateFilters(currentCategory, "");
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search partners..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive =
            cat.value === "all"
              ? !currentCategory
              : currentCategory === cat.value;

          return (
            <Button
              key={cat.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(cat.value)}
              disabled={isPending}
            >
              {cat.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
