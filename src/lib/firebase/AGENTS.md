# AGENTS Guide — `src/lib/firebase/`

## Package Identity
Firestore CRUD + realtime helpers built on `$lib/firebase.ts` initialization.

## Setup & Run
- Requires `PUBLIC_FIREBASE_*` vars (.env from `.env.example`).
- Use root npm scripts; no separate build.

## Patterns & Conventions
- ✅ CRUD via `getDocument/getDocuments/addDocument/updateDocument/deleteDocument` in `firestore.ts` (auto `serverTimestamp` on create/update).
- ✅ Reuse `where/orderBy/limit` exported from `firestore.ts`.
- ✅ Keep `Unsubscribe` handles and clean up (`subscribeToCollection/subscribeToDocument`).
- ❌ Don’t reinitialize Firebase; import `firestore` from `$lib/firebase.ts`.
- ❌ Don’t add `createdAt/updatedAt` manually when creating; helpers set them.

## Touch Points / Key Files
`src/lib/firebase/firestore.ts` (helpers) • `src/lib/firebase.ts` (app/auth/firestore init) • tests mocking helpers: `src/lib/__tests__/forms.test.ts`.

## JIT Index Hints
- Subscriptions: `npm exec --yes ripgrep -n "subscribeTo(Collection|Document)" src`
- Constraints: `npm exec --yes ripgrep -n "where\(" src/lib/firebase/firestore.ts`
- Firestore imports: `npm exec --yes ripgrep -n "\\$lib/firebase" src`

## Common Gotchas
- Helpers return `null`/empty when Firestore isn’t initialized (SSR/offline); guard in callers.
- Always clean up listeners to avoid leaks.
- Check `addDocument` return before continuing.

## Pre-PR Checks
`npm run test -- src/lib/__tests__/forms.test.ts && npm run lint`
