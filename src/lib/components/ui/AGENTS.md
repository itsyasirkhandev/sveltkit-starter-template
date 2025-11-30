# AGENTS Guide - `src/lib/components/ui/`

> shadcn-svelte ready to use - add components on demand.

## 1. Setup Status

shadcn-svelte is **pre-configured** but no components are pre-installed. Add what you need:

```bash
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add input
npx shadcn-svelte@latest add form
npx shadcn-svelte@latest add dialog
```

**Config files (already set up):**
- `components.json` - shadcn-svelte configuration
- `src/lib/utils.ts` - `cn()` class merging helper
- `src/routes/layout.css` - Tailwind theme tokens

---

## 2. Adding Components

```bash
# Common components
npx shadcn-svelte@latest add button card input
npx shadcn-svelte@latest add form label textarea
npx shadcn-svelte@latest add dialog alert-dialog
npx shadcn-svelte@latest add dropdown-menu popover
npx shadcn-svelte@latest add table tabs accordion
```

After adding, import and use:
```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button>Click me</Button>
```

---

## 3. Design System Rules

### Spacing (8pt Grid)
- Use: `p-2` (8px), `p-4` (16px), `p-6` (24px), `gap-4`, `gap-8`
- Avoid: `p-[13px]`, `gap-[15px]`

### Colors (60/30/10 Rule)
- **60%**: `bg-background`, `bg-card` (neutral)
- **30%**: `text-foreground`, `text-muted-foreground`, `border`
- **10%**: `bg-primary`, `text-primary` (accent, CTAs only)

### Typography
- Headings: `text-xl font-semibold`, `text-2xl font-semibold`
- Body: `text-base`, `text-sm text-muted-foreground`

---

## 4. Tailwind CSS v4

### Theme Tokens (in `layout.css`)
```css
@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
}
```

### Using Tokens
```svelte
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground hover:bg-primary/90">
    Action
  </button>
</div>
```

### Dynamic Classes
```typescript
import { cn } from '$lib/utils';

const className = cn(
  'base-styles',
  isActive && 'bg-primary',
  variant === 'outline' && 'border border-input'
);
```

---

## 5. DO / DON'T

| DO | DON'T |
|----|-------|
| Use `npx shadcn-svelte@latest add` | Manually create components |
| Use semantic tokens (`bg-primary`) | Hardcode colors (`bg-blue-500`) |
| Follow 8pt spacing grid | Use arbitrary values (`p-[13px]`) |
| Use `cn()` for conditional classes | String concatenation |

---

## 6. Common Patterns

### Button (after adding)
```svelte
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
```

### Card (after adding)
```svelte
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Form (after adding)
```svelte
<form>
  <Label for="email">Email</Label>
  <Input id="email" type="email" />
  <Button type="submit">Submit</Button>
</form>
```

---

## 7. Shadcn Color System

```css
/* All available color tokens */
--background / --foreground       /* Page background */
--card / --card-foreground        /* Card surfaces */
--popover / --popover-foreground  /* Dropdowns/modals */
--primary / --primary-foreground  /* Primary actions */
--secondary / --secondary-foreground /* Secondary */
--muted / --muted-foreground      /* Subtle elements */
--accent / --accent-foreground    /* Highlights */
--destructive / --destructive-foreground /* Danger */
--border                          /* Borders */
--input                           /* Input borders */
--ring                            /* Focus rings */
--radius                          /* Border radius */
```

---

## 8. Svelte Transitions

```svelte
<script>
  import { fade, slide, fly, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  let visible = $state(true);
</script>

{#if visible}
  <div transition:fade={{ duration: 200, easing: cubicOut }}>
    Fading content
  </div>
{/if}

{#if visible}
  <div in:fly={{ y: 20, duration: 300 }} out:fade>
    Fly in, fade out
  </div>
{/if}
```

---

## 9. Accessibility Checklist

- [ ] Semantic HTML (`button`, `nav`, `main`, `article`)
- [ ] ARIA labels for icons/non-text elements
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus management (`bind:this` + `.focus()`)
- [ ] Color contrast (use theme tokens)
- [ ] Screen reader testing

```svelte
<!-- Good: Accessible button with icon -->
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

<!-- Good: Focus management -->
<script>
  let inputEl: HTMLInputElement;
  
  $effect(() => {
    if (isOpen) inputEl?.focus();
  });
</script>
<input bind:this={inputEl} />
```

---

## 10. Responsive Design

Mobile-first approach:

```svelte
<div class="
  flex flex-col gap-2
  sm:flex-row sm:gap-4
  lg:gap-6
">
  <!-- Stacks on mobile, row on sm+, larger gap on lg+ -->
</div>

<div class="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
">
  <!-- 1 col mobile, 2 col tablet, 3 col desktop -->
</div>
```

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
