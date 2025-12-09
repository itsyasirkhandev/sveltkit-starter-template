# AGENTS Guide — `src/lib/stores/`

## Package Identity
Runes-based singleton stores; ships `AuthStore` for Firebase auth.

## Setup & Run
Use root npm scripts; consume via `$lib` exports.

## Patterns & Conventions
- ✅ Class stores with `$state` + getters for derived values; see `src/lib/stores/auth.svelte.ts`.
- ✅ Guard browser-only APIs (`browser` check) before accessing Firebase, as in `auth.svelte.ts`.
- ✅ Keep store files `.svelte.ts` to enable runes.
- ✅ Return/track unsubscribes when wiring Firestore listeners.
- ❌ Don’t add new stores with `writable`/legacy stores; keep runes for consistency.
- ❌ Don’t call Firebase auth in server context; preserve guards used in `auth.svelte.ts`.

## Touch Points / Key Files
`src/lib/stores/auth.svelte.ts` • `src/lib/firebase/firestore.ts` • `src/lib/schemas/index.ts` • consumers in `src/routes/+layout.svelte`.

## JIT Index Hints
- Runes state: `npm exec --yes ripgrep -n "\\$state" src/lib/stores`
- Auth usage: `npm exec --yes ripgrep -n "authStore" src`
- Computed getters: `npm exec --yes ripgrep -n "get isAuthenticated" src/lib/stores/auth.svelte.ts`

## Common Gotchas
- SSR is off, but builds still evaluate modules; keep `browser` guards.
- Reset error state after failed auth (`clearError`) when adding flows.

## Pre-PR Checks
`npm run check && npm run lint && npm run test`
