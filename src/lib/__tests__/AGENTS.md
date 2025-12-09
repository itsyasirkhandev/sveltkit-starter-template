# AGENTS Guide — `src/lib/__tests__/`

## Package Identity
Vitest suites for forms, schemas, and utilities.

## Setup & Run
- All tests: `npm run test`
- Single file: `npm run test -- src/lib/__tests__/forms.test.ts`
- Watch: `npm run test:watch`

## Patterns & Conventions
- ✅ Use `describe/it` with focused assertions (see `forms.test.ts`, `schemas.test.ts`, `utils.test.ts`).
- ✅ Mock externals via `vi.mock` when needed (`forms.test.ts`).
- ✅ Shared setup lives in `setup.test.ts`.
- ❌ Don’t hit live Firebase; mock helpers instead.
- ❌ Don’t overfit to implementation; assert behavior.

## Touch Points / Key Files
`forms.test.ts` • `schemas.test.ts` • `utils.test.ts` • `setup.test.ts`.

## JIT Index Hints
- Mocks: `npm exec --yes ripgrep -n "vi.mock" src/lib/__tests__`
- Schema assertions: `npm exec --yes ripgrep -n "loginSchema" src/lib/__tests__/schemas.test.ts`
- Form handler tests: `npm exec --yes ripgrep -n "handleForm" src/lib/__tests__/forms.test.ts`

## Common Gotchas
- Keep tests hermetic; avoid shared mutable state.
- Update tests when schemas or handlers change.

## Pre-PR Checks
`npm run test && npm run lint`
