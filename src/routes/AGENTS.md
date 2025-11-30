# AGENTS Guide - `src/routes/`

> Route tree: pages, layouts, API endpoints, auth flow.

## 1. Package Identity

`src/routes` contains the SvelteKit route tree with two protected groups: `(auth)` for public auth pages and `(app)` for authenticated pages.

---

## 2. Route Structure

```
src/routes/
├── +layout.svelte      # Root layout (Toaster, base shell)
├── +layout.js          # Layout config
├── +page.svelte        # Home page
├── layout.css          # Global styles + Tailwind tokens
├── (auth)/             # Public auth routes
│   ├── +layout.svelte  # Redirects logged-in users away
│   └── login/          # Login page
├── (app)/              # Protected routes
│   ├── +layout.svelte  # Redirects guests to /login
│   ├── dashboard/      # Dashboard page
│   └── todos/          # CRUD example
└── api/                # JSON API endpoints
    └── todos/          # Todos API
```

---

## 3. Route Groups

### `(auth)` - Public Auth Pages
- Layout redirects authenticated users to `/dashboard`
- Add new auth pages here: `register/`, `forgot-password/`

### `(app)` - Protected Pages  
- Layout redirects unauthenticated users to `/login`
- Add all app features here: `settings/`, `profile/`

---

## 4. Adding New Pages

**Protected page** (copy from `dashboard/`):
```
src/routes/(app)/my-feature/
├── +page.svelte        # UI
└── +page.server.ts     # Optional: load/actions
```

**With server actions** (copy from `todos/`):
```typescript
// +page.server.ts
import { handleForm } from '$lib/server/forms';
import { createItemSchema, createItem } from '$lib/server/resources/items';

export const actions = {
  create: async ({ request }) => {
    return handleForm(request, createItemSchema, async (data) => {
      await createItem(data);
      return { success: true };
    });
  }
};
```

---

## 5. API Endpoints

Add new APIs by copying `api/todos/+server.ts`:

```typescript
// src/routes/api/[name]/+server.ts
import { json } from '@sveltejs/kit';
import { listItems } from '$lib/server/resources/items';

export async function GET() {
  const items = await listItems();
  return json(items);
}

export async function POST({ request }) {
  const data = await request.json();
  // validate and create...
  return json({ success: true });
}
```

---

## 6. DO / DON'T

| DO | DON'T |
|----|-------|
| Use `(app)` group for protected pages | Put auth pages outside groups |
| Delegate to `$lib/server/resources` | Write business logic in routes |
| Use `handleForm` for form actions | Parse FormData manually |
| Keep pages thin, stores fat | Duplicate state in components |

---

## 7. Key Files

| Purpose | File |
|---------|------|
| Root layout | `+layout.svelte` |
| Global styles | `layout.css` |
| Auth guard | `(auth)/+layout.svelte` |
| App guard | `(app)/+layout.svelte` |
| Page example | `(app)/dashboard/+page.svelte` |
| CRUD example | `(app)/todos/+page.svelte` |
| API example | `api/todos/+server.ts` |

---

## 8. Search Commands

```bash
npx rg -n "\+page\.svelte" src/routes     # All pages
npx rg -n "\+layout" src/routes           # All layouts
npx rg -n "export const actions" src/routes  # Server actions
npx rg -n "export const (GET|POST)" src/routes/api  # API handlers
```

---

## 9. Pre-PR Checks

```bash
npm run check && npm run lint && npm run test
```

After route changes, run `npm run dev` and verify pages load without errors.
