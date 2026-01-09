import type { Metadata } from "next";
import { bricolageGrotesque, plusJakartaSans } from "@/lib/fonts";
import { SITE_CONFIG, OG_IMAGE } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
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
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.shortDescription,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.shortDescription,
    images: [OG_IMAGE.url],
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
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
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
