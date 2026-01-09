/**
 * Navigation types
 * Shared types for navigation components and data
 */

export interface NavigationLink {
  href: string;
  label: string;
  isPrimary?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface NavItemWithChildren extends NavigationLink {
  children?: NavigationLink[];
}
