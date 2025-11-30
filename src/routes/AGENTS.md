# AGENTS Guide - `src/routes/`

> Route tree: pages and layouts.

## 1. Structure

```
src/routes/
├── +layout.svelte      # Root layout
├── +layout.js          # Layout config  
├── +page.svelte        # Home page
└── layout.css          # Tailwind theme tokens
```

---

## 2. Adding Pages

```
src/routes/about/+page.svelte       # /about
src/routes/blog/[slug]/+page.svelte # /blog/:slug
```

**With data loading:**
```typescript
// +page.server.ts
export async function load() {
  return { data: 'value' };
}
```

**With form actions:**
```typescript
// +page.server.ts
import { handleForm } from '$lib/server/forms';

export const actions = {
  submit: async ({ request }) => {
    return handleForm(request, schema, async (data) => {
      return { success: true };
    });
  }
};
```

---

## 3. Auth (When Needed)

Use `authStore` from `$lib`:

```svelte
<script lang="ts">
  import { authStore } from '$lib';

  // Sign in/out
  await authStore.signIn(email, password);
  await authStore.signInWithGoogle();
  await authStore.signOut();

  // Check state
  if (authStore.user) { /* logged in */ }
</script>
```

**Protected routes:** Create layout that checks `authStore.user`

---

## 4. API Endpoints

```typescript
// src/routes/api/items/+server.ts
import { json } from '@sveltejs/kit';

export async function GET() {
  return json({ items: [] });
}
```

---

## 5. Key Files

| File | Purpose |
|------|---------|
| `+layout.svelte` | Root layout, Toaster |
| `layout.css` | Tailwind theme |
| `+page.svelte` | Home page |

---

## 6. SSR vs CSR Decision

| Use Server (`+page.server.ts`) | Use Client (`+page.svelte`) |
|--------------------------------|-----------------------------|
| Sensitive data/API keys | User interactions |
| SEO-critical content | Real-time updates |
| Initial data load | After-load mutations |
| Form actions | Animations/transitions |

---

## 7. Progressive Enhancement

Forms work without JavaScript:

```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<!-- Works without JS, enhanced with JS -->
<form method="POST" action="?/submit" use:enhance>
  <input name="email" type="email" required />
  <button>Submit</button>
</form>
```

---

## 8. Load Function Pattern

```typescript
// +page.server.ts
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
  // Guard clause
  if (!params.id) throw error(400, 'ID required');
  
  const item = await getItem(params.id);
  if (!item) throw error(404, 'Not found');
  
  return { item };
}
```

---

## 9. SEO Implementation

```svelte
<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title} | App Name</title>
  <meta name="description" content={data.description} />
  <meta property="og:title" content={data.title} />
  <meta property="og:description" content={data.description} />
  <link rel="canonical" href={data.canonicalUrl} />
</svelte:head>
```

---

## 10. Performance Rules

- Minimize `use:enhance` re-renders
- Use `{#key}` blocks for forced component updates
- Implement lazy loading for images
- Use dynamic imports for heavy components:
  ```typescript
  const HeavyComponent = await import('./HeavyComponent.svelte');
  ```
- Prefer SSR over client-side fetching
- Use `prerender` for static pages

---

## 11. Error Pages

```
src/routes/
├── +error.svelte      # Global error page
├── +layout.svelte     # Error boundary
└── [feature]/
    └── +error.svelte  # Feature-specific errors
```

```svelte
<!-- +error.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
```
