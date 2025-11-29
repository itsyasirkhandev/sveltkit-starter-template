<coding_guidelines>
# AGENTS Guide – `src/routes/`

## 1. Package Identity

- `src/routes` is the **route tree** for this SvelteKit app: public/auth pages, authenticated app pages, JSON APIs, root layouts, and global styles.
- Auth behavior is enforced by group layouts: `(auth)/` for public-auth flows, `(app)/` for authenticated-only routes.

---

## 2. Setup & Run (Route-Focused)

Run commands from repo root while developing routes:

```bash
npm run dev     # Live dev server; use for route and UX work
npm run check   # Typecheck load/actions and Svelte files
npm run test    # Hit resource logic via API/pages as needed
```

Keep `npm run dev` open while editing pages and endpoints.

---

## 3. Patterns & Conventions (MOST IMPORTANT)

### 3.1 Route Structure

- Root app shell and styles:
  - `src/routes/+layout.svelte` – Root layout (includes Toaster and base shell).
  - `src/routes/+layout.js` – Root layout config.
  - `src/routes/layout.css` – Global styles & Tailwind design tokens.
- Public/auth group: `src/routes/(auth)/*`
  - `src/routes/(auth)/+layout.svelte` – Redirects authenticated users away from auth pages.
  - `src/routes/(auth)/login/+page.svelte` – Login page using `authStore`.
- Authenticated app group: `src/routes/(app)/*`
  - `src/routes/(app)/+layout.svelte` – Redirects unauthenticated users to `/login`.
  - `src/routes/(app)/dashboard/+page.svelte` – Example protected page.
  - `src/routes/(app)/todos/+page.svelte` – Example CRUD page.
  - `src/routes/(app)/todos/+page.server.ts` – Uses todos resource + generic form handler.
- API endpoints: `src/routes/api/*`
  - `src/routes/api/todos/+server.ts` – JSON API backed by todos resource.

### 3.2 DO / DON’T – Pages & Layouts

- ✅ **DO** add new authenticated pages under `src/routes/(app)/<feature>/+page.svelte`, copying the pattern from `dashboard/+page.svelte`.
- ✅ **DO** implement new CRUD features by copying `src/routes/(app)/todos/+page.svelte` and `+page.server.ts` and wiring them to a new resource under `$lib/server/resources`.
- ❌ **DON’T** put authenticated pages directly under `src/routes/` without the `(app)` group and its layout guards.
- ✅ **DO** rely on `(auth)/+layout.svelte` and `(app)/+layout.svelte` for redirects instead of sprinkling auth checks across every page.

### 3.3 Server Actions, Load, and APIs

- ✅ **DO** use the generic `handleForm` helper from `$lib/server/forms` inside `+page.server.ts` files (see todos for reference).
- ✅ **DO** keep API logic thin in `src/routes/api/*/+server.ts` by delegating to `$lib/server/resources/*`.
- ❌ **DON’T** access Firebase SDK directly in route files; talk to Firestore via resource modules.

---

## 4. Touch Points / Key Files

- Global shell: `src/routes/+layout.svelte`, `src/routes/+layout.js`.
- Global design: `src/routes/layout.css`.
- Home page: `src/routes/+page.svelte`.
- Auth group layout: `src/routes/(auth)/+layout.svelte`.
- Login page: `src/routes/(auth)/login/+page.svelte`.
- App group layout: `src/routes/(app)/+layout.svelte`.
- Dashboard page: `src/routes/(app)/dashboard/+page.svelte`.
- Todos CRUD page: `src/routes/(app)/todos/+page.svelte`.
- Todos server actions: `src/routes/(app)/todos/+page.server.ts`.
- Todos JSON API: `src/routes/api/todos/+server.ts`.

These are your canonical examples for new routes, layouts, forms, and APIs.

---

## 5. JIT Index Hints (Search Commands)

From repo root:

```bash
# All page components
npx rg -n "\+page\.svelte" src/routes

# Layouts (root and group)
npx rg -n "\+layout" src/routes

# Load functions and actions
npx rg -n "export const (load|actions)" src/routes

# API route handlers
npx rg -n "export const (GET|POST|PUT|DELETE)" src/routes/api
```

Use these to jump straight to examples before adding anything new.

---

## 6. Common Gotchas

- Don’t bypass `(auth)`/`(app)` group layouts for auth flows; use them to centralize redirect logic.
- Don’t parse `FormData` manually in `+page.server.ts` unless you have a very good reason—prefer `handleForm` + Zod schemas in `$lib/server/resources`.
- Keep UI concerns in `.svelte` files and move reusable business logic into `$lib/server/resources` and stores.

---

## 7. Pre-PR Checks (Route Changes)

Before merging changes that touch `src/routes/`:

```bash
npm run check && npm run lint && npm run test
```

If you add a new API or complex server action, consider adding/expanding tests under `src/lib/__tests__/` to cover the underlying resource logic.
</coding_guidelines>
