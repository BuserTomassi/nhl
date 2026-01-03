import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = false }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo.png"
        alt="Next Horizon Leadership"
        width={40}
        height={40}
        className="h-8 w-8 sm:h-10 sm:w-10"
        priority
      />
      {showText && (
        <span className="font-headline text-lg font-medium hidden sm:inline">
          Next Horizon Leadership
        </span>
      )}
    </Link>
  );
}

