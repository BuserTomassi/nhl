import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";

// Bricolage Grotesque - distinctive, modern geometric display font
// Perfect for headlines with character that stands out from generic choices
export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
  weight: ["400", "500", "600", "700", "800"],
});

// Plus Jakarta Sans - modern geometric sans for body text
// Excellent readability, professional without being generic
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
