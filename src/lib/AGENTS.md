<coding_guidelines>
# AGENTS Guide – `src/lib/`

## 1. Package Identity

- `src/lib` is the **core library** for this app: Firebase init, Firestore helpers, resource modules, Svelte 5 stores, UI primitives (shadcn + Tailwind), Zod schemas, generic patterns, and tests.
- All non-trivial business logic and integration with external services should live here, not in route files or raw components.

---

## 2. Setup & Run (Library-Focused)

Commands are run from the repo root:

```bash
npm run check   # Typecheck Svelte components + TS in src/lib and routes
npm run lint    # Lint everything, including src/lib
npm run test    # Vitest tests (e.g., src/lib/__tests__/todos.test.ts)
```

Keep these green before and after modifying anything under `src/lib/`.

---

## 3. Patterns & Conventions (MOST IMPORTANT)

### 3.1 File Organization

- `src/lib/firebase.ts` – Firebase initialization (browser + server safe).
- `src/lib/firebase/firestore.ts` – Firestore CRUD and subscription helpers.
- `src/lib/server/resources/*.ts` – Firestore-backed resource modules (e.g., `todos.ts`).
- `src/lib/stores/*.svelte.ts` – Svelte 5 rune-based stores that wrap resources (e.g., `auth.svelte.ts`, `todos.svelte.ts`).
- `src/lib/patterns/**` – Generic capability patterns (auth, resources, forms, UI) that higher-level features should reuse.
- `src/lib/components/ui/**` – shadcn-svelte primitives (button, card, input, etc.) customized via Tailwind.
- `src/lib/schemas/**` – Shared Zod schemas for auth and cross-cutting shapes.
- `src/lib/__tests__/**` – Vitest tests for resources, schemas, and other lib logic.

### 3.2 DO / DON’T – Resources & Stores

- ✅ **DO** create new Firestore resources by copying `src/lib/server/resources/todos.ts` and adapting names, schemas, and collection IDs.
- ✅ **DO** expose resource-backed stores under `src/lib/stores/<resource>.svelte.ts` following `todos.svelte.ts`.
- ❌ **DON’T** call the Firebase SDK directly from Svelte components or route files; instead:
  - Use `src/lib/firebase/firestore.ts` helpers inside `src/lib/server/resources/*`.
  - Reach resources from routes and components through these modules or corresponding stores.

### 3.3 Forms & Validation

- ✅ **DO** handle form parsing and validation using:
  - Zod schemas colocated with the resource (see `todoSchema` and `createTodoSchema` in `src/lib/server/resources/todos.ts`).
  - `src/lib/server/forms.ts` as the generic SvelteKit action helper.
- ✅ **DO** surface validation errors via the form pattern in todos when creating new forms.
- ❌ **DON’T** do ad-hoc validation in components when a Zod + forms pattern exists.

### 3.4 Auth & Roles

- ✅ **DO** use `src/lib/stores/auth.svelte.ts` for auth state and methods.
- ✅ **DO** use `src/lib/patterns/auth/*` (email-password, Google, roles) when you need generalized auth behaviors instead of reimplementing flows.
- ❌ **DON’T** touch Firebase Auth directly in server routes.

### 3.5 UI Primitives & Design System

- ✅ **DO** create and customize primitives in `src/lib/components/ui/*` by:
  - Copying patterns from `button`, `card`, `input` directories.
  - Using `tailwind-variants` and `cn()` from `src/lib/utils.ts` for variants and class merging.
- ✅ **DO** customize Tailwind classes to match the app vibe (colors, radii, shadows, motion) instead of leaving default shadcn styles.
- ❌ **DON’T** introduce new global CSS frameworks; stay with Tailwind and component-local styles.

---

## 4. Touch Points / Key Files

- Firebase init: `src/lib/firebase.ts`.
- Firestore helpers: `src/lib/firebase/firestore.ts`.
- Resource example: `src/lib/server/resources/todos.ts`.
- Forms helper: `src/lib/server/forms.ts`.
- Auth store: `src/lib/stores/auth.svelte.ts`.
- Todos store: `src/lib/stores/todos.svelte.ts`.
- Pattern registry: `src/lib/patterns/index.ts`.
- Shared schemas: `src/lib/schemas/index.ts`.
- Sample test: `src/lib/__tests__/todos.test.ts`.

Open these before you add or refactor anything serious.

---

## 5. JIT Index Hints (Search Commands)

From repo root:

```bash
# Resource modules (Firestore-backed)
npx rg -n "export const todoSchema" src/lib/server/resources

# Stores (Svelte 5 runes, .svelte.ts)
npx rg -n "\.svelte\.ts" src/lib/stores

# UI primitives (Svelte components under components/ui)
npx rg -n "<script lang=\"ts\"" src/lib/components/ui

# Patterns library
npx rg -n "createCollectionResource" src/lib/patterns

# Zod schemas
npx rg -n "z\.object" src/lib/schemas src/lib/server/resources
```

Use these to locate the **right example to copy**, not as a dumping ground for copy-paste.

---

## 6. Common Gotchas

- Always use Svelte 5 runes (`$state`, `$derived`, `$effect`) in `.svelte.ts` stores and Svelte components; do not reintroduce `writable` stores for new code.
- Keep all Firebase calls in `firebase/` helpers or `server/resources`, not in UI or route files.
- When adding a resource, wire it end-to-end: resource module → store → patterns (if needed) → routes/components; avoid duplicated business logic.

---

## 7. Pre-PR Checks (Library Changes)

Before merging changes that touch `src/lib/`:

```bash
npm run check && npm run lint && npm run test
```

If tests are missing for non-trivial new logic in `src/lib/`, add a Vitest spec under `src/lib/__tests__/` mirroring `todos.test.ts`.
</coding_guidelines>
