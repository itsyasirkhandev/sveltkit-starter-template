# AGENTS Guide - `src/lib/components/`

> Design system and UI component patterns.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | Library overview |
| [../stores/AGENTS.md](../stores/AGENTS.md) | Component state |
| [../schemas/AGENTS.md](../schemas/AGENTS.md) | Form validation |
| [../../routes/AGENTS.md](../../routes/AGENTS.md) | Page integration |

---

## Design Tokens

Use semantic tokens from `layout.css` - never hardcode colors:

```svelte
<!-- DO -->
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground">Action</button>
</div>

<!-- DON'T -->
<div class="bg-white text-black">
  <button class="bg-blue-500">Action</button>
</div>
```

### Color Tokens

| Token | Usage |
|-------|-------|
| `background/foreground` | Page |
| `card/card-foreground` | Cards |
| `primary/primary-foreground` | CTAs |
| `muted/muted-foreground` | Subtle, helper text |
| `destructive` | Danger actions |
| `border`, `input`, `ring` | Borders, focus |

---

## Spacing (4px Grid)

```svelte
<div class="p-2">8px</div>
<div class="p-4">16px</div>
<div class="gap-2">8px gap</div>
<div class="gap-4">16px gap</div>
<!-- DON'T: p-[13px] -->
```

---

## Component Template

```svelte
<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'primary' | 'secondary' | 'outline';
    class?: string;
    children?: Snippet;
  }
  
  let { variant = 'primary', class: className, children }: Props = $props();
</script>

<button class={cn(
  'px-4 py-2 rounded-md font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
  variant === 'secondary' && 'bg-secondary text-secondary-foreground',
  variant === 'outline' && 'border border-input hover:bg-accent',
  className
)}>
  {@render children?.()}
</button>
```

---

## Common Patterns

### Card

```svelte
<div class="rounded-lg border bg-card p-6 shadow-sm">
  <h3 class="font-semibold">{title}</h3>
  <p class="text-sm text-muted-foreground">{description}</p>
</div>
```

### Input

```svelte
<input class="h-10 w-full rounded-md border border-input bg-background px-3 text-sm
  placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
```

### Loading Spinner

```svelte
<div class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
```

---

## Responsive Design

```svelte
<div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
  <!-- Stack mobile, row desktop -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Responsive grid -->
</div>
```

**Breakpoints**: `sm:640px` | `md:768px` | `lg:1024px` | `xl:1280px`

---

## Accessibility

```svelte
<!-- Icon buttons need labels -->
<button aria-label="Close"><XIcon aria-hidden="true" /></button>

<!-- Link labels -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Screen reader only -->
<span class="sr-only">Description</span>
```

---

## Transitions

```svelte
<script>
  import { fade, slide, fly } from 'svelte/transition';
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Fading</div>
{/if}

{#if visible}
  <div in:fly={{ y: 20 }} out:fade>Fly in, fade out</div>
{/if}
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use semantic tokens | Hardcode colors |
| Use 4px spacing grid | Arbitrary values |
| Use `cn()` for classes | String concatenation |
| Mobile-first responsive | Desktop-first |
| Semantic HTML | Div soup |
