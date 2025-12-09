# AGENTS Guide — `src/lib/components/`

## Package Identity
Design-system staging area; uses Tailwind CSS 4 tokens from `src/routes/layout.css` and helpers from `$lib/utils.ts`.

## Setup & Run
Use root npm scripts; import `cn` from `$lib/utils.ts`; tokens already provided by `src/routes/layout.css`.

## Patterns & Conventions
- ✅ Tokenized styles (`bg-background`, `text-foreground`, `bg-primary`) as used in `src/routes/+layout.svelte`.
- ✅ Merge classes with `cn` (`src/lib/utils.ts`).
- ✅ Follow 4px spacing scale (`p-2`, `gap-4`) consistent with `layout.css`.
- ✅ Add accessibility labels on interactive elements (see CTA in `src/routes/+error.svelte`).
- ❌ Don’t hardcode hex colors or arbitrary spacing.
- ❌ Don’t bypass runes props; prefer `let { children } = $props()` for renderable children.

## Touch Points / Key Files
Tokens: `src/routes/layout.css` • Class helper: `src/lib/utils.ts` • Token usage example: `src/routes/+layout.svelte` • CTA styling example: `src/routes/+error.svelte`.

## JIT Index Hints
- Token usage: `npm exec --yes ripgrep -n "bg-primary" src/routes`
- Class helper imports: `npm exec --yes ripgrep -n "from '\\$lib/utils'" src`
- Layout wrappers: `npm exec --yes ripgrep -n "min-h-screen" src/routes`

## Common Gotchas
- Tailwind v4 uses inline `@theme`; avoid adding ad-hoc CSS files.
- Keep components side-effect free for tree-shaking.

## Pre-PR Checks
`npm run check && npm run lint && npm run test`
