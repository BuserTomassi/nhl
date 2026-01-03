import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/50 dark:border-white/5 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-10">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {year} Next Horizon Leadership
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/contact"
            className="rounded-full bg-primary hover:bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
          >
            Contact
          </Link>
          <span
            className="mx-1 h-5 w-px bg-slate-200 dark:bg-white/10"
            aria-hidden="true"
          />
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      {/* Logo.dev attribution */}
      <div className="container mt-6 pt-4 border-t border-slate-200/30 dark:border-white/5">
        <p className="text-center text-xs text-muted-foreground">
          Logos provided by{" "}
          <a
            href="https://logo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Logo.dev
          </a>
        </p>
      </div>
    </footer>
  );
}

