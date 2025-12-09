# AGENTS Guide — `src/lib/server/`

## Package Identity
Server utilities for form handling and typed action results.

## Setup & Run
Use root npm scripts; import from `$lib/server/forms`.

## Patterns & Conventions
- ✅ Use `handleForm` (in `forms.ts`) inside `+page.server.ts` actions to validate with Zod and return `{ success, errors }`.
- ✅ Keep side effects in the provided callback; rely on typed `FormResult<T>`.
- ✅ Error keys join Zod issue paths (`path.join('.')`) for nested fields.
- ❌ Don’t manually parse `FormData` or throw raw errors; let `handleForm` standardize responses.
- ❌ Don’t mutate `RequestEvent` outside the handler’s scope.

## Touch Points / Key Files
`src/lib/server/forms.ts` • `src/lib/schemas/index.ts` • tests: `src/lib/__tests__/forms.test.ts`.

## JIT Index Hints
- Handler usage: `npm exec --yes ripgrep -n "handleForm" src`
- Result types: `npm exec --yes ripgrep -n "FormResult" src/lib/server/forms.ts`
- Server tests: `npm exec --yes ripgrep -n "forms" src/lib/__tests__`

## Common Gotchas
- Field names must align with schema paths for accurate error mapping.
- `handleForm` returns stringly typed values; coerce in schemas (e.g., `z.coerce.number()`).

## Pre-PR Checks
`npm run test -- src/lib/__tests__/forms.test.ts && npm run lint`
