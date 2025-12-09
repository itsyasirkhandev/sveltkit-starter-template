# AGENTS Guide (Root)

> Lightweight entrypoint; nearest-folder AGENTS wins.

## Project Snapshot
- Single SvelteKit 2 app (Vite) with Svelte 5 runes, TypeScript strict, Tailwind CSS 4, Firebase (Auth/Firestore), Vitest.
- npm-based; Node >=20; SSR disabled via `src/routes/+layout.js`.
- Sub-guides below contain details per area.

## Root Setup Commands
- `npm install`
- `npm run dev`
- `npm run check`
- `npm run lint`
- `npm run test`
- `npm run build`

## Universal Conventions
- TypeScript strict; prefer `interface`; avoid `any`.
- Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`); stores live in `.svelte.ts`.
- Tailwind tokens from `src/routes/layout.css`; merge classes with `cn` (`src/lib/utils.ts`).
- Formatting: `prettier --check .`; lint: `eslint .`; tests: `npm run test`.
- Commits: concise conventional style (`feat:`, `fix:`, `chore:`); branches from `main` (feature/*).

## Security & Secrets
- Copy `.env.example` → `.env`; never commit secrets.
- PUBLIC_* Firebase keys still sensitive; restrict in Firebase console.
- Avoid logging PII; remove debug logs before merging.

## JIT Index (open these, don’t paste full files)
### Directory Map
- Library hub: `src/lib/` → [src/lib/AGENTS.md](src/lib/AGENTS.md)
- Firebase helpers: `src/lib/firebase/` → [src/lib/firebase/AGENTS.md](src/lib/firebase/AGENTS.md)
- Stores: `src/lib/stores/` → [src/lib/stores/AGENTS.md](src/lib/stores/AGENTS.md)
- Schemas: `src/lib/schemas/` → [src/lib/schemas/AGENTS.md](src/lib/schemas/AGENTS.md)
- Server utils: `src/lib/server/` → [src/lib/server/AGENTS.md](src/lib/server/AGENTS.md)
- Components/design tokens: `src/lib/components/` → [src/lib/components/AGENTS.md](src/lib/components/AGENTS.md)
- Tests: `src/lib/__tests__/` → [src/lib/__tests__/AGENTS.md](src/lib/__tests__/AGENTS.md)
- Routes/UI: `src/routes/` → [src/routes/AGENTS.md](src/routes/AGENTS.md)

### Quick Find Commands
- Find runes stores: `npm exec --yes ripgrep -n "\\$state" src/lib/stores`
- Firestore usage: `npm exec --yes ripgrep -n "getDocuments\\(|subscribeToCollection" src`
- Form handlers/schemas: `npm exec --yes ripgrep -n "handleForm" src`
- Token usage: `npm exec --yes ripgrep -n "bg-background|text-foreground" src/routes`

## Definition of Done
- `npm run check && npm run lint && npm run test && npm run build`
- No TODO/debug logs; env ready; tests updated for new/changed behavior.
