"use client";

import { cn } from "@/lib/utils";

interface AnimatedGridProps {
  className?: string;
  columns?: number;
  rows?: number;
}

export function AnimatedGrid({ className, columns = 20, rows = 10 }: AnimatedGridProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width={100 / columns}
            height={100 / rows}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${100 / columns} 0 L 0 0 0 ${100 / rows}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-200/50 dark:text-white/5"
            />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
        />
      </svg>
      
      {/* Gradient fade at edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}

