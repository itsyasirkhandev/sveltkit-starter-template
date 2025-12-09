# AGENTS Guide — `src/routes/`

## Package Identity
Client-first SvelteKit pages/layouts; SSR disabled (`src/routes/+layout.js`); Tailwind tokenized UI.

## Setup & Run
- Dev: `npm run dev`
- Build: `npm run build`
- Lint/check: root scripts; styles auto-loaded via `src/routes/+layout.svelte`.

## Patterns & Conventions
- ✅ SEO/meta pattern in `src/routes/+layout.svelte` (Open Graph/Twitter tags).
- ✅ Error UX from `src/routes/+error.svelte`; reuse for other error pages.
- ✅ Tokenized styling like `src/routes/+page.svelte` (`bg-background text-foreground`, `min-h-screen`).
- ✅ Keep SSR toggle centralized (`+layout.js`).
- ❌ Don’t hardcode colors; use tokens from `src/routes/layout.css`.
- ❌ Don’t call Firebase directly; use `$lib` stores/resources.

## Touch Points / Key Files
`src/routes/+layout.svelte` • `src/routes/+layout.js` • `src/routes/+page.svelte` • `src/routes/+error.svelte` • `src/routes/layout.css`.

## JIT Index Hints
- Routes with head blocks: `npm exec --yes ripgrep -n "^<svelte:head>" src/routes`
- Token usage: `npm exec --yes ripgrep -n "bg-background" src/routes`
- Error handling: `npm exec --yes ripgrep -n "page.status" src/routes/+error.svelte`

## Common Gotchas
- SSR off means client-side data flows; use stores or browser-safe loads.
- `Toaster` mounted in layout; don’t duplicate to avoid multiple portals.

## Pre-PR Checks
`npm run check && npm run lint && npm run test && npm run build`
