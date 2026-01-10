interface DashboardPageHeaderProps {
  title: string;
  description?: string;
}

export function DashboardPageHeader({ title, description }: DashboardPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-background via-background to-muted/50 p-6 sm:p-8">
      {/* Decorative gradient orb - adapts to theme */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent blur-2xl" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}
