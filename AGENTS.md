<coding_guidelines>
# AGENTS Guide (Root)

## 1. Project Snapshot

- **Repo type**: Single SvelteKit app (not a monorepo; no workspaces or multiple apps).
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript 5 (strict), Firebase 12, Tailwind CSS 4, shadcn-svelte, Zod 4, Vitest 2.
- **Structure**: Route tree under `src/routes`, core library-patterns under `src/lib`.
- **Sub-guides**: See `src/lib/AGENTS.md` and `src/routes/AGENTS.md` for area-specific rules.

---

## 2. Root Setup & DX Commands

From repo root (`sveltekit-fullstack-template`):

```bash
npm install           # Install all dependencies
npm run dev           # Start dev server (Vite + SvelteKit)


npm run check         # Typecheck (svelte-check + TS)
npm run lint          # ESLint over repo
npm run test          # Vitest test suite

npm run build         # Production build
npm run preview       # Preview production build
```

Always run `npm run check`, `npm run lint`, and `npm run test` before declaring work "done"; for non-trivial changes, also run `npm run dev` alongside `npm run dev:check` to smoke-test key routes.

---

## 3. Universal Conventions

- **Languages & style**: TypeScript strict, Svelte 5 runes for all new Svelte code, Tailwind-only styling with customized shadcn-svelte components.
- **Code quality**: ESLint + Prettier are the source of truth; do not fight them—fix or configure properly.
- **Commits**: Use Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, etc.).
- **Branches**: Create short-lived feature branches from `main`; open PRs back into `main`.
- **PR requirements**:
  - Green: `npm run check && npm run lint && npm run test`.
  - No new dependencies without explicit justification.
  - Follow patterns from `src/lib/patterns/**` and example routes (auth, dashboard, todos).

---

## 4. Security & Secrets

- Never commit real secrets or tokens. `.env` stays local; `.env.example` is the only env file in Git.
- Firebase config for client use goes in `.env` and `src/lib/firebase.ts` as needed; any truly secret keys (service accounts, admin creds) must **never** land in this repo.
- Treat Firestore data as potentially sensitive: respect and update `firestore.rules` whenever adding new collections or changing access patterns.

---

## 5. JIT Index (What to Open, Not What to Paste)

### Package / Area Structure

- Core library, Firebase, patterns, stores, UI, schemas, tests: `src/lib/`  
  → [see `src/lib/AGENTS.md`](src/lib/AGENTS.md)
- Routes, layouts, groups, API endpoints, global styles: `src/routes/`  
  → [see `src/routes/AGENTS.md`](src/routes/AGENTS.md)
- Tooling & config: `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `vitest.config.ts`.
- Feature docs, research, and planning: `docs/`  
  → see `docs/README.md` and `docs/AGENTS.md` for feature lifecycle, research docs, and Graphite MCP-aware workflows.

### Quick Find Commands (Windows, from repo root)

Use `npx rg` (ripgrep via npx) to search:

```bash
# Generic search
npx rg -n "functionName" src

# Svelte pages and layouts
npx rg -n "\+page\.svelte" src/routes
npx rg -n "\+layout" src/routes

# API routes (SvelteKit endpoints)
npx rg -n "export const (GET|POST|PUT|DELETE)" src/routes/api

# Firestore resources and schemas
npx rg -n "todoSchema" src/lib
npx rg -n "z\.object" src/lib/schemas src/lib/server/resources

# Tests
npx rg -n "\.test\.ts" src
```

Open the files these commands point to; **do not** copy large code blocks blindly.

---

## 6. Definition of Done

- `npm run check`, `npm run lint`, and `npm run test` are all green (no TODOs left in failures/warnings), and dev runtime smoke checks via `npm run dev` + `npm run dev:check` show no `RUNTIME-CHECK-FAIL`, `(SERVER-RUNTIME-ERROR)`, or `(CLIENT-RUNTIME-ERROR)` output for affected routes.
- New features follow the canonical patterns:
  - Firestore resources: mirror `src/lib/server/resources/todos.ts`.
  - Stores: mirror `src/lib/stores/*.svelte.ts` with Svelte 5 runes.
  - Routes: follow `(auth)` / `(app)` groups and todos/dashboard examples.
- UI is **not** generic shadcn: Tailwind classes are customized to this app’s visual language.
- Legacy paths are removed, not left commented out or half-working.
- For substantial features or refactors, a research or feature doc exists under `docs/features/*` and is kept in the correct folder (`research` → `planned` → `active` → `completed`) across the lifecycle.

---

## 7. AI Agent Operating Rules

- Always start by reading this root `AGENTS.md` **and** the relevant sub-guide (`src/lib/AGENTS.md` or `src/routes/AGENTS.md`).
- Do not add new state libraries, CSS frameworks, or Firebase access patterns; extend existing ones.
- Keep business logic in `$lib/server/resources` and stores, not in Svelte components or route files.
- When debugging, add explicit, labeled logs (e.g., `console.log('(NO $) [todos-store] state:', { ... })`) and remove them once fixed.
- For any non-trivial change, finish by running:  
  `npm run check && npm run lint && npm run test`, then start `npm run dev` and in another terminal run `npm run dev:check`; treat any `RUNTIME-CHECK-FAIL`, `(SERVER-RUNTIME-ERROR)`, or `(CLIENT-RUNTIME-ERROR)` output as a failing check to fix before completion.
- If a Svelte MCP/code-checker is available in the environment (e.g., a Svelte autofix tool), run it against any modified `.svelte` files and address reported issues before considering the work "done".
- For non-trivial work, use spec mode to propose a plan and, when appropriate, tie it to a research or feature doc under `docs/features/*`. If the Graphite MCP is installed, use it to create and manage the corresponding stack/PRs instead of raw CLI commands, and keep the docs in sync with that state.
</coding_guidelines>

Always tell the user which step you are on.

---

## Bug Fixes

When fixing a bug: identify root cause, implement a minimal fix aligned with existing patterns, then verify with `npm run check`, `npm run lint`, and `npm run test`. End with a one-sentence summary using 🚨🚨🚨.

