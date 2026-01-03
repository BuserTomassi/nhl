import type { Metadata } from "next";
import { bricolageGrotesque, plusJakartaSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexthorizonleadership.com"),
  title: {
    default: "Next Horizon Leadership",
    template: "%s | Next Horizon Leadership",
  },
  description:
    "Next Horizon Leadership empowers forward-looking CEOs, CHROs, and talent leaders by connecting them with world-class search partners, leading AI innovators, and organizational experts.",
  openGraph: {
    title: "Next Horizon Leadership",
    description:
      "Shaping the Future of Leadership. Connect with world-class search partners, AI innovators, and organizational experts.",
    type: "website",
    siteName: "Next Horizon Leadership",
    images: ["/images/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
