# Contributing to NHL Platform

This document covers development guidelines and best practices for contributing to the Next Horizon Leadership platform.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Git

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd nhl

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in the values

# Start development server
npm run dev
```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

Example: `feature/partner-directory`, `fix/mobile-nav-focus`

### Commit Messages

Follow conventional commits:

```
feat: add partner directory filtering
fix: resolve mobile navigation focus trap
refactor: extract tier validation to shared utility
docs: update SUPABASE.md with RLS examples
```

### Pull Requests

1. Create feature branch from `main`
2. Make changes with clear commits
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Open PR with description of changes
6. Request review

## Code Standards

### TypeScript

- Strict mode is enabled
- No `any` types - use `unknown` and narrow
- Define interfaces for all props
- Export types from component files or `@/types`

```typescript
// Good
interface ProfileCardProps {
  profile: UserProfile;
  onEdit?: () => void;
}

// Bad
function ProfileCard(props: any) { ... }
```

### Components

- Server Components by default
- Only add `"use client"` when needed
- One component per file
- Use named exports

```typescript
// Good - Server Component
export function ProfileHeader({ profile }: { profile: UserProfile }) {
  return <h1>{profile.full_name}</h1>;
}

// Good - Client Component (when interactivity needed)
"use client";

export function ProfileForm({ profile }: ProfileFormProps) {
  const [name, setName] = useState(profile.full_name);
  // ...
}
```

### File Organization

```
src/components/feature-name/
├── index.ts              # Barrel exports
├── feature-component.tsx # Main component
├── sub-component.tsx     # Child components
└── __tests__/           # Tests
    └── feature.test.tsx
```

### Styling

- Use Tailwind CSS classes
- Use `cn()` helper for conditional classes
- Prefer existing component classes from `globals.css`
- Use CSS variables for colors (defined in `:root`)

```typescript
// Good
import { cn } from "@/lib/utils";

<div className={cn(
  "card-surface p-6",
  isActive && "ring-2 ring-primary"
)} />

// Bad - hardcoded colors
<div className="bg-[#1a2b3c]" />
```

### Forms

- Use react-hook-form with Zod
- Define schemas in `@/lib/schemas`
- Handle loading, success, and error states

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schemas";

const form = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
});
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run with coverage
npm run test:coverage
```

### Test Guidelines

- Test user behavior, not implementation
- Use Testing Library queries in priority order:
  1. `getByRole`
  2. `getByLabelText`
  3. `getByText`
- Mock external dependencies (fetch, Supabase)

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("submits form with valid data", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  
  await user.type(screen.getByLabelText(/email/i), "test@example.com");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Provide aria-labels for icon buttons
- Test with screen reader
- Ensure color contrast meets WCAG AA

```typescript
// Good
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Bad
<div onClick={close}>
  <X />
</div>
```

## Performance

- Use Server Components for static content
- Lazy load heavy components
- Use `loading.tsx` for route segments
- Optimize images with `next/image`
- Avoid unnecessary client-side state

```typescript
// Good - Lazy load heavy components
const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  loading: () => <Skeleton className="h-40" />,
});
```

## Security

- Never expose secrets in client code
- Validate all inputs with Zod
- Use RLS for data access control
- Don't trust client-side tier claims

See [SUPABASE.md](./SUPABASE.md) for detailed security patterns.

## Documentation

- Update relevant docs when adding features
- Add JSDoc comments for exported functions
- Keep README.md current

```typescript
/**
 * Check if user has required tier access
 * @param userTier - User's current membership tier
 * @param requiredTier - Minimum tier required for access
 * @returns true if user has sufficient access
 */
export function hasTierAccess(
  userTier: MembershipTier,
  requiredTier: MembershipTier
): boolean {
  return TIER_LEVELS[userTier] >= TIER_LEVELS[requiredTier];
}
```

## Getting Help

- Check existing docs in `/docs`
- Review similar implementations in codebase
- Ask in team chat
- Open an issue for bugs
