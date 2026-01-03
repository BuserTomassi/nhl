import type { Metadata } from "next";
import { bricolageGrotesque, plusJakartaSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Next Horizon Leadership",
    template: "%s | Next Horizon Leadership",
  },
  description:
    "Next Horizon Leadership empowers forward-looking CEOs, CHROs, and talent leaders by connecting them with world-class search partners, leading AI innovators, and organizational experts.",
  keywords: [
    "executive search",
    "leadership",
    "CHRO",
    "CEO",
    "talent leadership",
    "AI talent",
    "organizational design",
    "interim leadership",
    "executive recruitment",
    "HR leadership",
  ],
  authors: [{ name: "Next Horizon Leadership" }],
  creator: "Next Horizon Leadership",
  publisher: "Next Horizon Leadership",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Next Horizon Leadership",
    description:
      "Shaping the Future of Leadership. Connect with world-class search partners, AI innovators, and organizational experts.",
    url: BASE_URL,
    siteName: "Next Horizon Leadership",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Next Horizon Leadership - Shaping the Future of Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Horizon Leadership",
    description:
      "Shaping the Future of Leadership. Connect with world-class search partners, AI innovators, and organizational experts.",
    images: ["/images/og.jpg"],
    // Add handles when social accounts are created
    // site: "@nexthorizonltd",
    // creator: "@nexthorizonltd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body
        className={`${bricolageGrotesque.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
