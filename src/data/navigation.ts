import type { NavigationLink } from "@/types";

export const navigationLinks: NavigationLink[] = [
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact", isPrimary: true },
];
