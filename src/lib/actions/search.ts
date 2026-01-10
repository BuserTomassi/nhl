"use server";

import { createClient } from "@/lib/supabase/server";

export interface SearchResult {
  id: string;
  type: "member" | "space" | "event" | "resource" | "partner";
  title: string;
  subtitle?: string;
  href: string;
  imageUrl?: string;
}

/**
 * Global search across all content types
 */
export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const supabase = await createClient();
  const searchTerm = `%${query}%`;
  const results: SearchResult[] = [];

  // Search members (profiles)
  const { data: members } = await supabase
    .from("profiles")
    .select("id, full_name, title, company, avatar_url")
    .eq("is_public", true)
    .or(`full_name.ilike.${searchTerm},company.ilike.${searchTerm},title.ilike.${searchTerm}`)
    .limit(5);

  if (members) {
    results.push(
      ...members.map((m) => ({
        id: m.id,
        type: "member" as const,
        title: m.full_name || "Member",
        subtitle: (m.title && m.company ? `${m.title} at ${m.company}` : m.company || m.title) ?? undefined,
        href: `/members?search=${encodeURIComponent(m.full_name || "")}`,
        imageUrl: m.avatar_url ?? undefined,
      }))
    );
  }

  // Search spaces
  const { data: spaces } = await supabase
    .from("spaces")
    .select("id, name, description, slug")
    .eq("is_archived", false)
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(5);

  if (spaces) {
    results.push(
      ...spaces.map((s) => ({
        id: s.id,
        type: "space" as const,
        title: s.name,
        subtitle: s.description ? s.description.slice(0, 60) + (s.description.length > 60 ? "..." : "") : undefined,
        href: `/spaces/${s.slug}`,
      }))
    );
  }

  // Search events
  const { data: events } = await supabase
    .from("events")
    .select("id, title, description, starts_at")
    .eq("is_published", true)
    .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .order("starts_at", { ascending: true })
    .limit(5);

  if (events) {
    results.push(
      ...events.map((e) => ({
        id: e.id,
        type: "event" as const,
        title: e.title,
        subtitle: e.starts_at
          ? new Date(e.starts_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : undefined,
        href: `/events/${e.id}`,
      }))
    );
  }

  // Search resources
  const { data: resources } = await supabase
    .from("resources")
    .select("id, title, description, type")
    .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(5);

  if (resources) {
    results.push(
      ...resources.map((r) => ({
        id: r.id,
        type: "resource" as const,
        title: r.title,
        subtitle: r.type ? r.type.charAt(0).toUpperCase() + r.type.slice(1) : undefined,
        href: `/resources`,
      }))
    );
  }

  // Search partners
  const { data: partners } = await supabase
    .from("partners")
    .select("id, name, description, slug, logo_url")
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(5);

  if (partners) {
    results.push(
      ...partners.map((p) => ({
        id: p.id,
        type: "partner" as const,
        title: p.name,
        subtitle: p.description ? p.description.slice(0, 60) + (p.description.length > 60 ? "..." : "") : undefined,
        href: `/partners/${p.slug}`,
        imageUrl: p.logo_url ?? undefined,
      }))
    );
  }

  return results;
}
