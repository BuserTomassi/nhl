import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

// Elegant variable serif for headlines - editorial, sophisticated
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-headline",
});

// Plus Jakarta Sans - modern geometric sans, similar to Satoshi
// Excellent readability, professional without being generic
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
