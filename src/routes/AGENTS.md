# AGENTS Guide - `src/routes/`

> Route tree: pages, layouts, API endpoints.

## 1. Package Identity

`src/routes` contains the SvelteKit route tree. Start with a blank slate and add pages as needed.

---

## 2. Route Structure

```
src/routes/
├── +layout.svelte      # Root layout (Toaster, base shell)
├── +layout.js          # Layout config
├── +page.svelte        # Home page
├── layout.css          # Global styles + Tailwind tokens
└── api/                # JSON API endpoints
    └── client-error/   # Error logging endpoint
```

---

## 3. Adding Pages

**Simple page:**
```
src/routes/about/
└── +page.svelte
```

**Page with data loading:**
```
src/routes/products/
├── +page.svelte
└── +page.server.ts     # load() function
```

**Page with form actions:**
```typescript
// +page.server.ts
import { handleForm } from '$lib/server/forms';

export const actions = {
  create: async ({ request }) => {
    return handleForm(request, schema, async (data) => {
      // handle data
      return { success: true };
    });
  }
};
```

---

## 4. Protected Routes (When Needed)

When you need auth, create route groups:

```
src/routes/
├── (public)/           # Public pages
│   └── +layout.svelte  # No auth check
├── (protected)/        # Auth-required pages
│   └── +layout.svelte  # Redirect if not logged in
```

**Protected layout example:**
```svelte
<script lang="ts">
  import { authStore } from '$lib';
  import { goto } from '$app/navigation';

  $effect(() => {
    if (!authStore.user) goto('/login');
  });
</script>

{#if authStore.user}
  <slot />
{/if}
```

---

## 5. API Endpoints

```typescript
// src/routes/api/items/+server.ts
import { json } from '@sveltejs/kit';

export async function GET() {
  return json({ items: [] });
}

export async function POST({ request }) {
  const data = await request.json();
  return json({ success: true });
}
```

---

## 6. Auth Helpers Available

Auth logic is ready in `$lib/stores/auth.svelte.ts`:

```svelte
<script lang="ts">
  import { authStore } from '$lib';

  // Sign in
  await authStore.signIn(email, password);
  await authStore.signInWithGoogle();

  // Sign out
  await authStore.signOut();

  // Check auth state
  if (authStore.user) { /* logged in */ }
</script>
```

Schemas in `$lib/schemas/index.ts`:
- `loginSchema` - email + password validation
- `signUpSchema` - email + password + confirm

---

## 7. Key Files

| Purpose | File |
|---------|------|
| Root layout | `+layout.svelte` |
| Global styles | `layout.css` |
| Home page | `+page.svelte` |

---

## 8. Pre-PR Checks

```bash
npm run check && npm run lint && npm run test
```
