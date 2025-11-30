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
