# AGENTS Guide - `src/lib/components/ui/`

> shadcn-svelte UI primitives with Tailwind CSS 4.

## 1. Package Identity

`src/lib/components/ui` contains customizable shadcn-svelte components styled with Tailwind CSS 4. These are the building blocks for all UI.

---

## 2. Available Components

```
src/lib/components/ui/
├── button/       # Button with variants
├── card/         # Card layout components
└── input/        # Form input
```

**Add more**: `npx shadcn-svelte@latest add [component]`

---

## 3. Design System Rules

### Spacing (8pt Grid)
Use spacing divisible by 4 or 8:
- `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)
- `gap-2`, `gap-4`, `gap-6`, `gap-8`
- **Avoid**: `p-[13px]`, `gap-[15px]`

### Colors (60/30/10 Rule)
- **60% Neutral**: `bg-background`, `bg-card`
- **30% Complementary**: `text-foreground`, `text-muted-foreground`, `border`
- **10% Accent**: `bg-primary`, `text-primary` (CTAs only)

### Typography (4 Sizes, 2 Weights)
- Headings: `text-2xl font-semibold`, `text-xl font-semibold`
- Body: `text-base font-normal`
- Small: `text-sm text-muted-foreground`

---

## 4. Using Components

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
</script>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Input placeholder="Enter value" />
    <Button>Submit</Button>
  </CardContent>
</Card>
```

### Button Variants
```svelte
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
```

---

## 5. Customizing Components

Components use `tailwind-variants` and `cn()` for styling:

```typescript
// button/index.ts
import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      // Add custom variants here
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
```

---

## 6. Tailwind CSS v4 Best Practices

### General Rules
- Use utility classes for all styling, custom CSS only for special cases
- Organize classes logically: layout → spacing → color → typography
- Use responsive variants in markup: `sm:`, `md:`, `lg:`, `hover:`, `focus:`, `dark:`

### Svelte Components
```svelte
<!-- Apply utilities directly in markup -->
<div class="flex gap-4 p-6 bg-card rounded-lg hover:shadow-md">
  <!-- Dynamic arbitrary values -->
  <div class="grid grid-cols-[1fr_500px_2fr]">
    <!-- Data attribute variants -->
    <button class="opacity-50 data-[active]:opacity-100">
```

### Dynamic Classes (TypeScript)
```typescript
// Use cn() helper for conditional classes
import { cn } from '$lib/utils';

const className = cn(
  'base-styles',
  isActive && 'active-styles',
  variant === 'primary' && 'bg-primary'
);
```

### Theme Configuration
- Use `@theme` directive in CSS for design tokens
- Prefer `oklch` color format for better gamut support
- Reference theme variables: `text-[--color-primary]`
- Oxide engine auto-scans files (no `content` array needed)

### Advanced Features
- Container queries: `@container`, `@max-*`, `@min-*`
- 3D transforms: `rotate-x-*`, `rotate-y-*`, `scale-z-*`
- Arbitrary properties: `[mask-type:luminance]`
- Starting styles: `starting:opacity-0` (check browser support)

---

## 7. DO / DON'T

| DO | DON'T |
|----|-------|
| Use semantic color tokens (`bg-primary`) | Hardcode colors (`bg-blue-500`) |
| Follow 8pt spacing grid | Use arbitrary pixel values like `p-[13px]` |
| Extend via `tailwind-variants` | Override with inline styles |
| Use `cn()` for conditional classes | String concatenation for classes |
| Use responsive variants (`md:flex`) | Write media queries in CSS |
| Reference theme vars (`text-foreground`) | Use raw color values |

---

## 8. Adding New Components

```bash
npx shadcn-svelte@latest add dialog
npx shadcn-svelte@latest add dropdown-menu
npx shadcn-svelte@latest add form
```

After adding, customize to match app style.

---

## 9. Theme Tokens

Defined in `src/routes/layout.css`:

```css
@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  /* ... */
}
```

Reference in Tailwind: `bg-background`, `text-foreground`, `bg-primary`
