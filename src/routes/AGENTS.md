# AGENTS Guide - `src/routes/`

> Pages, layouts, and routing.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../lib/AGENTS.md](../lib/AGENTS.md) | Library overview |
| [../lib/components/AGENTS.md](../lib/components/AGENTS.md) | UI components |
| [../lib/server/AGENTS.md](../lib/server/AGENTS.md) | Form actions |
| [../lib/schemas/AGENTS.md](../lib/schemas/AGENTS.md) | Validation |

---

## Structure

```
src/routes/
├── +layout.svelte    # Root layout
├── +page.svelte      # Home (/)
├── +error.svelte     # Error page
├── layout.css        # Tailwind theme
└── [feature]/        # Feature routes
```

---

## Adding Pages

```
routes/about/+page.svelte           → /about
routes/blog/[slug]/+page.svelte     → /blog/:slug
routes/api/items/+server.ts         → /api/items
```

---

## Page with Data

```typescript
// +page.server.ts
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const item = await getItem(params.id);
  if (!item) throw error(404, 'Not found');
  return { item };
}
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>
<h1>{data.item.name}</h1>
```

---

## Form Actions

```typescript
// +page.server.ts
import { handleForm } from '$lib/server/forms';
import { contactSchema } from '$lib/schemas';

export const actions = {
  default: async (event) => {
    return handleForm(event, contactSchema, async (data) => {
      await sendEmail(data);
    });
  },
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  let { form } = $props();
</script>

<form method="POST" use:enhance>
  <input name="email" value={form?.data?.email ?? ''} />
  {#if form?.errors?.email}<span class="text-destructive">{form.errors.email}</span>{/if}
  <button>Submit</button>
</form>
```

---

## Protected Routes

```svelte
<!-- +layout.svelte for protected section -->
<script lang="ts">
  import { authStore } from '$lib';
  import { goto } from '$app/navigation';
  
  $effect(() => {
    if (!authStore.loading && !authStore.user) goto('/login');
  });
</script>

{#if authStore.user}
  {@render children()}
{/if}
```

---

## API Endpoints

```typescript
// routes/api/items/+server.ts
import { json, error } from '@sveltejs/kit';

export async function GET() {
  return json(await listItems());
}

export async function POST({ request }) {
  const body = await request.json();
  const id = await createItem(body);
  return json({ id }, { status: 201 });
}
```

---

## SEO

```svelte
<svelte:head>
  <title>{data.title} | App</title>
  <meta name="description" content={data.description} />
</svelte:head>
```

---

## SSR vs Client

| Server (`+page.server.ts`) | Client (`+page.svelte`) |
|----------------------------|-------------------------|
| API keys, secrets | User interactions |
| SEO content | Real-time updates |
| Initial data | Animations |
