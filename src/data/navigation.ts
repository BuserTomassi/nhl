import type { NavigationLink } from "@/types";

export const navigationLinks: NavigationLink[] = [
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact", isPrimary: true },
];
