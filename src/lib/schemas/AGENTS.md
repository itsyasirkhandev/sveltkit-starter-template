# AGENTS Guide — `src/lib/schemas/`

## Package Identity
Zod schemas/types for forms (login/signup).

## Setup & Run
Use root npm scripts; schemas exported via `$lib/schemas` and `$lib`.

## Patterns & Conventions
- ✅ Extend base schemas (signup extends login) as in `src/lib/schemas/index.ts`.
- ✅ Use `.safeParse` with `handleForm` (`src/lib/server/forms.ts`) to surface errors.
- ✅ Export types via `z.infer` (`LoginForm`, `SignUpForm`).
- ❌ Don’t call `.parse()` in actions; it throws instead of returning field errors.
- ❌ Don’t duplicate TS types; derive from the schema.

## Touch Points / Key Files
`src/lib/schemas/index.ts` • `src/lib/server/forms.ts` • tests: `src/lib/__tests__/schemas.test.ts`.

## JIT Index Hints
- Definitions: `npm exec --yes ripgrep -n "Schema" src/lib/schemas/index.ts`
- Refinements: `npm exec --yes ripgrep -n "refine" src/lib/schemas/index.ts`
- Schema tests: `npm exec --yes ripgrep -n "loginSchema" src/lib/__tests__/schemas.test.ts`

## Common Gotchas
- Form field names must match schema keys for `handleForm` error mapping.
- Use `z.coerce` when adding numeric fields to avoid string inputs.

## Pre-PR Checks
`npm run test -- src/lib/__tests__/schemas.test.ts && npm run lint`
