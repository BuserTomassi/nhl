"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center pt-20">
        <div className="container max-w-2xl text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Error icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
            >
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </motion.div>

            <h1 className="font-headline text-3xl sm:text-4xl font-bold mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              We apologize for the inconvenience. An unexpected error has occurred.
              Please try again or return to the homepage.
            </p>

            {/* Error digest for debugging */}
            {error.digest && (
              <p className="text-xs text-muted-foreground mb-8 font-mono">
                Error ID: {error.digest}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                variant="gradient"
                size="lg"
                className="group"
              >
                <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                Try Again
              </Button>
              
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

