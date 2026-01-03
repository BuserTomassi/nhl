"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="max-w-2xl text-center px-4">
          {/* Error icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Critical Error
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            A critical error has occurred. We apologize for the inconvenience.
            Please try refreshing the page or return to the homepage.
          </p>

          {/* Error digest for debugging */}
          {error.digest && (
            <p className="text-xs text-slate-500 mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error cannot use Next.js Link component */}
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-7 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              <Home className="h-4 w-4" />
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

