# AGENTS Guide — `src/lib/`

## Package Identity
Shared library: Firebase init, Firestore helpers, runes stores, schemas, server form utilities, class/merge helper.

## Setup & Run
- Use root npm scripts; exports aggregated via `src/lib/index.ts`.
- Run `npm run prepare` (svelte-kit sync) before `npm run check` if schema/types change.

## Patterns & Conventions
- ✅ Re-export through `src/lib/index.ts` for `$lib` imports (e.g., `authStore`, `getDocuments`).
- ✅ Use `cn` from `src/lib/utils.ts` for class merging.
- ✅ Keep runes stores in `.svelte.ts`; see `src/lib/stores/auth.svelte.ts` for browser-guarded auth lifecycle.
- ✅ Firestore calls through `src/lib/firebase/firestore.ts`; reuse `where/orderBy/limit`.
- ✅ Form handling via `src/lib/server/forms.ts` + schemas from `src/lib/schemas/index.ts`.
- ❌ Do not import `firebase/app` or `firebase/firestore` directly in routes/components; rely on `$lib/firebase.ts` + helpers.
- ❌ Do not hand-parse `FormData`; `handleForm` already validates and maps errors.

## Touch Points / Key Files
`src/lib/firebase.ts` • `src/lib/firebase/firestore.ts` • `src/lib/stores/auth.svelte.ts` • `src/lib/schemas/index.ts` • `src/lib/server/forms.ts` • `src/lib/utils.ts` • tests in `src/lib/__tests__`.

## JIT Index Hints
- Exports: `npm exec --yes ripgrep -n "export .* from" src/lib/index.ts`
- Runes: `npm exec --yes ripgrep -n "\\$(state|derived|effect)" src/lib`
- Firestore ops: `npm exec --yes ripgrep -n "getDocuments\\(|addDocument" src/lib`
- Tests: `npm exec --yes ripgrep -n "describe\\(" src/lib/__tests__`

## Common Gotchas
- Firebase helpers no-op if not initialized; keep browser guards like `auth.svelte.ts`.
- `handleForm` error keys mirror schema paths; align form field names.
- `addDocument` auto-adds timestamps; don’t duplicate `createdAt/updatedAt`.

## Pre-PR Checks
`npm run check && npm run lint && npm run test`
