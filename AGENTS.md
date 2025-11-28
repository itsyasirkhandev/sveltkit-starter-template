# Guidelines For AI Coding Agents

This file is the primary control surface for all AI coding agents. Read it fully and obey it strictly.

## AI Playbook (READ THIS FIRST)

1. Always read this file fully before doing anything in this repo.
2. Never edit `AGENTS.md` or `README.md` unless the human explicitly asks.
3. Before changing code: run `npm run check` and note existing errors.
4. After any changes: run `npm run check`, `npm run lint`, and `npm run test`.
5. Prefer existing patterns and recipes in this file over inventing new ones.
6. Reuse existing files as templates (copy/modify) instead of creating new patterns.
7. Do not add new dependencies unless absolutely necessary and justified in the PR.
8. **Customize shadcn-svelte components** – never ship default/generic styles. Make the UI unique to the app's personality.

---

## Project Overview

A minimal SvelteKit template with Firebase and Tailwind CSS pre-configured for building modern web applications. The template is optimized for AI-assisted development: it provides opinionated patterns (auth, resources, forms, tests) that should be cloned for new features.

### Tech Stack

| Technology    | Version | Purpose                   |
| ------------- | ------- | ------------------------- |
| SvelteKit     | 2.x     | Full-stack framework      |
| Svelte        | 5.x     | UI framework (uses Runes) |
| TypeScript    | 5.x     | Type safety (strict mode) |
| Firebase      | 12.x    | Auth & Firestore backend  |
| Tailwind CSS  | 4.x     | Utility-first styling     |
| shadcn-svelte | latest  | UI primitives (customize freely) |
| Zod           | 4.x     | Schema validation         |
| svelte-sonner | 1.x     | Toast notifications       |
| Prettier      | 3.x     | Code formatting           |
| ESLint        | 9.x     | Code linting              |
| Vite          | 7.x     | Build tool                |
| Vitest        | 2.x     | Unit testing              |

---

## Project Structure

```text
src/
├── lib/
│   ├── assets/                     # Static assets (favicon, images)
│   ├── components/ui/              # shadcn-svelte primitives (button, card, input)
│   ├── firebase/                   # Firestore utilities
│   │   └── firestore.ts            # CRUD operations, real-time subscriptions
│   ├── patterns/                   # Generic capability patterns (auth, resources, forms, UI)
│   │   ├── auth/                   # Email/password, Google, and role helpers
│   │   ├── resources/              # Generic Firestore CRUD + parent/child helpers
│   │   ├── forms/                  # Basic, multi-step, and upload form patterns
│   │   ├── ui/                     # List/detail and real-time list patterns
│   │   └── index.ts                # AI-facing registry (authPatterns, resourcePatterns, ...)
│   ├── schemas/                    # Zod validation schemas (auth, shared)
│   │   └── index.ts                # User, Login, SignUp schemas
│   ├── server/
│   │   ├── forms.ts                # Generic form handler for SvelteKit actions
│   │   └── resources/
│   │       └── todos.ts            # Canonical Firestore-backed resource module
│   ├── stores/                     # Svelte 5 runes-based stores
│   │   ├── auth.svelte.ts          # Authentication state management
│   │   └── todos.svelte.ts         # Example resource-backed store
│   ├── firebase.ts                 # Firebase initialization (browser + server-safe)
│   ├── index.ts                    # Library exports ($lib)
│   └── utils.ts                    # Utility functions (cn helper)
├── routes/
│   ├── +layout.svelte              # Root layout (includes Toaster)
│   ├── +page.svelte                # Home page (tech stack showcase + patterns hint)
│   ├── (auth)/                     # Public/auth routes (no auth required)
│   │   ├── +layout.svelte          # Auth layout + redirects if already logged in
│   │   └── login/
│   │       └── +page.svelte        # Login page (client-side auth via authStore)
│   ├── (app)/                      # Auth-protected application routes
│   │   ├── +layout.svelte          # App layout + redirect to /login if unauthenticated
│   │   ├── dashboard/
│   │   │   └── +page.svelte        # Example auth-protected page
│   │   └── todos/
│   │       ├── +page.svelte        # Example CRUD page
│   │       └── +page.server.ts     # Uses todos resource + generic form handler
│   ├── api/
│   │   └── todos/
│   │       └── +server.ts          # JSON API backed by todos resource
│   └── layout.css                  # Global styles & Tailwind config
└── lib/__tests__/
    └── todos.test.ts               # Vitest example for resource schema
```

### Key Files

- `src/lib/firebase.ts` – Firebase app initialization (shared for browser and server-side Firestore).
- `src/lib/firebase/firestore.ts` – Generic Firestore CRUD utilities and subscriptions.
- `src/lib/stores/auth.svelte.ts` – Auth store using Svelte 5 class pattern.
- `src/lib/stores/todos.svelte.ts` – Example resource-backed store with runes.
- `src/lib/server/resources/todos.ts` – Canonical Firestore-backed resource module.
- `src/lib/server/forms.ts` – Generic form handler for SvelteKit actions using Zod.
- `src/lib/patterns/index.ts` – Registry of generic capability patterns (auth, resources, forms, UI).
- `src/lib/schemas/index.ts` – Zod validation schemas (user, login, signup, shared).
- `src/lib/utils.ts` – `cn()` helper for Tailwind class merging.
- `src/lib/index.ts` – Re-exports for `$lib` imports.
- `src/routes/(auth)/login/+page.svelte` – Example login page using `authStore`.
- `src/routes/(app)/todos/+page.svelte` – Example CRUD page using todos resource + form.
- `src/routes/api/todos/+server.ts` – Example JSON API backed by todos resource.
- `src/lib/__tests__/todos.test.ts` – Example Vitest test for resource schema.

---

## DX Commands

```bash
# Development
npm run dev              # Start dev server (Vite)

# Type Checking
npm run check            # Run svelte-check (one-time)
npm run check:watch      # Run svelte-check in watch mode

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run Vitest test suite once
npm run test:watch       # Run Vitest in watch mode

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Setup
npm install              # Install dependencies
npm run prepare          # Sync SvelteKit (runs automatically)
```

### Environment Setup

1. Copy `.env.example` to `.env`.
2. Fill in Firebase config values from Firebase Console.
3. Use the same Firebase project for both client and server (FireStore) usage.

### Deployment

- **Vercel**: Auto-detected, uses `adapter-vercel`.
- **Static/Firebase Hosting**: Uses `adapter-static`, outputs to `build/`.

---

## Extension Points (Where To Add New Stuff)

Use this table to decide where to put new code. Prefer copying the examples listed in the "Example to copy" column.

| Task                                   | Files/Dirs to touch                                      | Example to copy                             |
| -------------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| New authenticated page                 | `src/routes/(app)/<feature>/+page.svelte(.ts/.server)`   | `src/routes/(app)/dashboard/*`             |
| New CRUD resource page                 | `src/routes/(app)/<resource>/+page.svelte(.server)`      | `src/routes/(app)/todos/*`                 |
| New public/auth page                   | `src/routes/(auth)/<page>/+page.svelte(.ts/.server)`     | `src/routes/(auth)/login/*`                |
| New Firestore-backed resource module   | `src/lib/server/resources/<name>.ts`                     | `src/lib/server/resources/todos.ts`        |
| New UI primitive                       | `src/lib/components/ui/<name>/*.svelte(.ts)`             | `button`, `card`, `input` directories      |
| New API endpoint                       | `src/routes/api/<name>/+server.ts`                       | `src/routes/api/todos/+server.ts`          |
| New store                              | `src/lib/stores/<name>.svelte.ts`                        | `src/lib/stores/auth.svelte.ts`, `todos`   |
| Generic capability pattern (auth/CRUD/forms/UI) | `src/lib/patterns/**`                                   | Existing pattern modules under `auth`, `resources`, `forms`, `ui` |
| Tests for a resource or component      | `src/lib/__tests__/*.test.ts`                            | `src/lib/__tests__/todos.test.ts`          |

---

## Patterns & Recipes

These are the "golden paths". When adding features, COPY these patterns and adapt names instead of inventing your own.

### Routing Patterns

- Auth routes live under `src/routes/(auth)/*` and are publicly accessible.
- Application (auth-protected) routes live under `src/routes/(app)/*`.
- For authenticated app pages, always use `(app)`; for public/auth pages, use `(auth)`.
- Use group layouts:
  - `(auth)/+layout.svelte` – Redirects authenticated users away from auth pages.
  - `(app)/+layout.svelte` – Redirects unauthenticated users to `/login`.

### Recipe: New CRUD Resource (Firestore)

1. Copy `src/lib/server/resources/todos.ts` → `src/lib/server/resources/<resource>.ts` and rename types/schemas.
2. Copy `src/routes/(app)/todos/*` → `src/routes/(app)/<resource>/*` and update imports to your new resource module.
3. If you need an API, copy `src/routes/api/todos` → `src/routes/api/<resource>`.
4. Run `npm run check`, `npm run lint`, and `npm run test` and fix all errors.

### Recipe: Add a New Auth-Protected Page

1. Add a new folder under `src/routes/(app)/<feature>/`.
2. Copy `src/routes/(app)/dashboard/+page.svelte` into your new folder and adapt the content.
3. Use `authStore` from `$lib` to access `user`, `isAuthenticated`, and `displayName`.
4. Keep all redirects/guards inside the `(app)/+layout.svelte` layout instead of duplicating them.

### Recipe: Add a Form with Zod + Firestore + Toast

1. Define or reuse a Zod schema for the form data (see `createTodoSchema` in `src/lib/server/resources/todos.ts`).
2. Use the generic `handleForm()` helper from `$lib/server/forms` in a `+page.server.ts` to parse `FormData`, validate with Zod, and call a resource helper (e.g., `createTodo`).
3. In the corresponding `+page.svelte`, use a `<form method="POST" ...>` with `use:enhance` from `$app/forms` and show validation errors.
4. Use `toast` from `$lib` to give success/error notifications after submissions.

### Pattern Library ($lib/patterns)

Use the pattern library when the user asks for **capabilities** ("add auth", "add CRUD", "add multi-step form", "add realtime list") rather than specific copies of existing routes.

- `src/lib/patterns/auth/*`  
  - `email-password.ts` – Wraps `authStore` for email/password auth. Use when user wants basic login/sign-up.  
  - `google.ts` – Wraps `authStore.signInWithGoogle`. Use when user asks for Google sign-in.  
  - `roles.ts` – Generic helpers for role/claim-based access control; wire to your auth data.
- `src/lib/patterns/resources/*`  
  - `crud.ts` – `createCollectionResource()` for Firestore collections like todos, projects, notes.  
  - `related.ts` – `listChildrenByParentId()` for parent/child relations (e.g. project → tasks).
- `src/lib/patterns/forms/*`  
  - `basic.ts` – `handleFormWithSchema()` wrapper over `server/forms.ts`.  
  - `multi-step.ts` – Types and helpers for multi-step wizards.  
  - `file-upload.ts` – Stub for file upload flows (Firebase Storage or similar) when explicitly requested.
- `src/lib/patterns/ui/*`  
  - `list-detail.ts` – Generic list/detail state helpers for dashboards and sidebars.  
  - `realtime-list.ts` – `createRealtimeListController()` on top of `subscribeToCollection`.

AI agents should:

- Prefer `$lib/patterns/*` when **generalizing** behavior (new resources, new auth flows, new UIs).  
- Use existing routes (`(auth)/login`, `(app)/dashboard`, `(app)/todos`, `api/todos`) as **concrete examples** to copy/adapt when the user references them explicitly.  
- Keep the template progressive: start from simple pages, then layer in patterns as the app grows in complexity.

### Recipe: Create a UI Primitive with shadcn-svelte + Tailwind Variants

1. Copy the pattern from `$lib/components/ui/button` or `$lib/components/ui/card`.
2. Use `tailwind-variants` for variants and sizes; keep classes inside Tailwind only.
3. Use the `cn()` helper from `$lib/utils` for class merging.
4. Do not introduce custom global CSS unless strictly necessary.
5. **Customize the component's visual style** to match the application's design language (see Design Customization section below).

### Recipe: Add / Modify a Store Using Svelte 5 Runes Class Pattern

1. Copy the pattern from `$lib/stores/auth.svelte.ts` or `$lib/stores/todos.svelte.ts`.
2. Use runes inside the store (`$state`, `$derived`, `$effect`) and expose methods for mutations.
3. Keep all side effects (subscriptions, Firebase calls) inside the store or resource modules, not in components.
4. Stores should be thin wrappers over resource modules, not new sources of truth.

---

## Design Customization (IMPORTANT FOR AI AGENTS)

**shadcn-svelte components are starting points, not final designs.** You MUST customize them to match each application's unique visual identity and vibe.

### Philosophy

- shadcn-svelte provides accessible, well-tested interaction primitives (focus management, keyboard nav, ARIA).
- The default styling is intentionally minimal – it's a foundation, NOT the finished product.
- **Your job is to make the UI feel unique** to the application being built.
- Creative freedom applies to visuals; accessibility and interaction patterns should remain intact.

### What To Customize

When building any application with this template, customize these aspects of shadcn-svelte components:

| Aspect | How to Customize | Example |
| ------ | ---------------- | ------- |
| Colors | Modify Tailwind classes, use CSS variables in `layout.css` | `bg-primary` → `bg-gradient-to-r from-purple-500 to-pink-500` |
| Border radius | Change `rounded-*` classes | `rounded-md` → `rounded-full` or `rounded-none` |
| Shadows | Add/modify `shadow-*` classes | Add `shadow-lg shadow-purple-500/20` |
| Typography | Adjust `text-*`, `font-*` classes | `font-medium` → `font-bold tracking-tight` |
| Spacing | Modify `p-*`, `m-*`, `gap-*` | Increase padding for a more spacious feel |
| Animations | Add Tailwind transitions, transforms | `transition-all hover:scale-105` |
| Borders | Customize `border-*` classes | `border` → `border-2 border-dashed` |
| Gradients | Apply gradient backgrounds | `bg-white` → `bg-gradient-to-br from-slate-50 to-slate-100` |

### Recipe: Customize Components for Application Vibe

1. **Understand the app's personality** – Is it playful? Professional? Minimalist? Bold? Dark? Light?
2. **Define a color palette** – Update CSS variables in `src/routes/layout.css` or use Tailwind colors consistently.
3. **Modify component variants** – Edit `tailwind-variants` definitions in component files to reflect the design language.
4. **Apply consistent patterns** – If buttons are rounded-full, make all interactive elements rounded-full.
5. **Add motion thoughtfully** – Use `transition-*` and `hover:*` states to bring the UI to life.

### Example: Transforming a Button

Default shadcn-svelte button:
```svelte
<Button>Click me</Button>
```

Customized for a playful, modern SaaS:
```svelte
<Button class="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 transition-all hover:scale-105 hover:shadow-xl">
  Click me
</Button>
```

Customized for a minimal, professional app:
```svelte
<Button class="rounded-none border-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-colors font-mono uppercase tracking-widest">
  Click me
</Button>
```

### Updating Component Defaults

To change defaults across the app, modify the `tailwind-variants` configuration in component files:

```ts
// src/lib/components/ui/button/index.ts
export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2',
  variants: {
    variant: {
      default: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg hover:shadow-xl hover:scale-105',
      outline: 'border-2 border-current bg-transparent hover:bg-current hover:text-white',
      ghost: 'hover:bg-accent/50 backdrop-blur-sm',
    },
    // ... sizes, etc.
  },
});
```

### Design Consistency Checklist

Before completing any UI work, verify:

- [ ] Colors are consistent with the app's palette (not default shadcn gray)
- [ ] Border radius is consistent across all components
- [ ] Interactive states (hover, focus, active) feel cohesive
- [ ] Typography hierarchy is clear and matches the app's tone
- [ ] Spacing feels intentional (not just defaults)
- [ ] The UI has personality – it doesn't look like "generic shadcn"

---

## Code Style Guidelines

### Imports Order

Organize imports in this order, separated by blank lines:

```ts
// 1. Svelte/SvelteKit imports
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// 2. External library imports
import { initializeApp } from 'firebase/app';
import { tv, type VariantProps } from 'tailwind-variants';

// 3. Internal $lib imports
import { cn } from '$lib/utils';
import { authStore } from '$lib/stores/auth.svelte';
import { Button } from '$lib/components/ui/button';

// 4. Relative imports
import Component from './Component.svelte';

// 5. Type-only imports (use `type` keyword)
import type { User } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
```

### TypeScript Conventions

- Prefer interfaces over type aliases for object shapes.
- Use `as const` objects instead of enums.
- Use descriptive generic type parameters (e.g., `TData` for data payloads).

### Naming Conventions

| Element               | Convention              | Example                       |
| --------------------- | ----------------------- | ----------------------------- |
| Files (components)    | lowercase-hyphen        | `auth-form.svelte`            |
| Files (stores)        | lowercase-hyphen.svelte | `auth.svelte.ts`              |
| Files (utilities)     | lowercase-hyphen        | `firestore.ts`                |
| Components            | PascalCase              | `AuthForm`, `Button`          |
| Variables/Functions   | camelCase               | `getUserData`, `isLoading`    |
| Constants             | UPPER_SNAKE_CASE        | `API_URL`, `MAX_RETRIES`      |
| Booleans              | is/has/should prefix    | `isAuthenticated`, `hasError` |
| Event handlers        | handle prefix           | `handleClick`, `handleSubmit` |
| Firestore collections | plural nouns            | `users`, `bookings`, `todos`  |

### Svelte 5 Runes

- Any new Svelte code must use runes for reactivity.
- Use `$state` for local state, `$derived` for computed values, `$effect` for side effects.
- Use `$props()` to read props; use `$bindable()` for bindable props.

Example:

```ts
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
	console.log('Count changed', count);
});
```

### Component Structure

```svelte
<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const variants = tv({ /* ... */ });
	export type Props = { /* ... */ };
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...props }: Props = $props();
</script>

<div class={cn('base-classes', className)} {...props}>
	{@render children?.()}
</div>
```

### Tailwind CSS & shadcn-svelte

- Use `cn()` from `$lib/utils` for class merging and conditional classes.
- Use `tailwind-variants` for component variants and sizes.
- Use shadcn-svelte components from `$lib/components/ui/*` as the primary UI primitives.
- **Always customize component styling** to match the application's design language – never ship default shadcn styles.
- Leverage Tailwind's full utility set: gradients, shadows, animations, transforms, filters.

### Zod Validation

- Shared schemas: `src/lib/schemas/index.ts` (user/login/signup).
- Resource-local schemas: inside `src/lib/server/resources/*` (e.g., `todoSchema`, `createTodoSchema`).
- Use the `validate` helper from `$lib/schemas` for simple schema checks, or `handleForm` for SvelteKit actions.

### Toast Notifications

- Import `toast` from `$lib`.
- Use for success/error/info messages after async operations (form submissions, Firebase calls).

---

## DO & DON'T For AI Agents

DO:

- Use existing patterns and recipes before creating new structures.
- Keep imports ordered as documented.
- Keep styles inside Tailwind + shadcn patterns (no custom global CSS unless required).
- Prefer Firestore helpers and resource modules over direct Firebase SDK calls in routes/components.
- Add tests next to new resource modules or complex stores.
- **Customize shadcn-svelte components** to match the application's unique design and vibe.
- **Be creative with visuals** – use gradients, shadows, animations, custom color palettes.
- **Ask about the app's personality** if unclear – playful, professional, minimalist, bold, etc.

DON'T:

- Edit `AGENTS.md`, `README.md`, or environment files unless explicitly asked.
- Introduce new state management libraries (no Redux, Zustand, etc.).
- Add new dependencies without checking `package.json` and justifying usage.
- Bypass `npm run check`, `npm run lint`, and `npm run test` before declaring work complete.
- Call Firebase Auth from server routes; keep Auth usage in client-side code and stores.
- **Ship default/generic shadcn-svelte styling** – always customize to the app's visual identity.
- **Break accessibility** when customizing – keep focus states, keyboard nav, and ARIA intact.

---

## AI Constraints & Architecture Rules

- This project uses **Svelte 5 runes** – any new Svelte code must use runes for reactivity.
- Do not add or use non-Svelte store libraries; use Svelte runes stores (`*.svelte.ts`).
- Use Firestore helpers from `$lib/firebase/firestore` and resource modules under `$lib/server/resources` instead of calling the Firebase SDK directly in routes/components.
- Firebase is initialized for both client and server; server usage is currently limited to Firestore operations in resource modules and API endpoints.
- Respect Tailwind and shadcn-svelte; do not introduce global CSS frameworks.
- All non-trivial business logic must live in resource modules (`src/lib/server/resources/*`) or stores, not in Svelte components.

---

## Firebase Integration

### Authentication

- Use `authStore` from `$lib/stores/auth.svelte.ts`.
- Auth state is reactive via `authStore.user` and `authStore.isAuthenticated`.
- Public/auth pages live under `(auth)`; authenticated pages live under `(app)`.

### Firestore

- Use utilities from `$lib/firebase/firestore` inside resource modules and stores.
- Available helpers:
  - `getDocument<T>(collection, id)` – Fetch single doc.
  - `getDocuments<T>(collection, constraints)` – Fetch multiple docs.
  - `addDocument<T>(collection, data)` – Create doc.
  - `updateDocument<T>(collection, id, data)` – Update doc.
  - `deleteDocument(collection, id)` – Delete doc.
  - `subscribeToCollection<T>(collection, callback, constraints)` – Real-time collection subscription.
  - `subscribeToDocument<T>(collection, id, callback)` – Real-time document subscription.

### Security Rules

- Located in `firestore.rules`.
- Update rules in sync with new collections and resource modules.

---

## General Workflow

1. Before coding: run `npm run check` to see the current state.
2. During development: keep `npm run dev` running; use `npm run test:watch` for evolving tests.
3. When adding features: pick the closest recipe above and copy it.
4. After changes: run `npm run check`, `npm run lint`, and `npm run test`.
5. Test files: keep them when they add value; remove only if they are clearly obsolete.

---

## Communication Style

Be extremely direct and not afraid of offending the human. Point out better ways to do things. Think like a first-principles thinker who uses logic only. The goal is to build revolutionary products, not to preserve feelings.

## Debugging Console Logs

When debugging issues, the AI must:

1. *Be specific about what logs are needed* - Never say "check the console" or "expand the Object".
2. *Add targeted console.log statements* with clear labels showing exactly what values to look for.
3. *Tell the user the exact log line to find* (e.g., "[ComponentName] State: ...").
4. *List the specific properties needed* from any objects (e.g., "I need: isLoading, hasCurrentImage, isInputDisabled").
5. *Add temporary debug logging* that outputs the exact data structure needed to diagnose the issue.

Example of good debugging:

```ts
console.log('[DEBUG] Input state:', {
	isDisabled: isInputDisabled,
	isLoading: isLoading,
	hasImage: hasCurrentImage,
});
```

Then tell the user: "Look for the line that says '[DEBUG] Input state:' and tell me the values of isDisabled, isLoading, and hasImage".

*Never ask the user to:*
- "Check the console for errors".
- "Expand the Object".
- "Look at the console output".

*Always:*
- Add specific logging code.
- Tell them the exact log label to find.
- List the exact properties you need to see.

## Legacy Code Cleanup

When implementing new features or making changes, the AI must:

1. *Always delete legacy code* - Don't leave old code paths "just in case".
2. *Remove backward compatibility* - If migrating to a new pattern, remove the old pattern completely.
3. *Delete unused imports* - Remove any type imports or dependencies that are no longer used.
4. *Clean up comments* - Remove "backward compat", "legacy", or "deprecated" comments referring to deleted code.
5. *No fallback logic* - Avoid `oldPattern ?? newPattern` - choose one and commit.

*Rationale:*
Legacy code creates bugs, confusion, and maintenance burden. Clean breaks are better than dual-system support.

## Console Log Cost Convention

*Rule:* Does it call Firebase/Google servers? → `(IS $)` · Does it run locally in the browser? → `(NO $)`.

Use these prefixes in debug logs to instantly identify billed Firestore/Google operations versus free local operations (Svelte state, local caches, IndexedDB, etc.).

In software development, we often follow the pattern:

- Make it work (fix the bug/logic).
- Make it right (clean up the code/architecture).
- Make it fast (optimize/cache).

Always tell the user which step you are on.

---

## Bug Fixes

When fixing a bug: identify root cause, implement a minimal fix aligned with existing patterns, then verify with `npm run check`, `npm run lint`, and `npm run test`. End with a one-sentence summary using 🚨🚨🚨.

