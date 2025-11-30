# AGENTS Guide (Root)

> **Template**: SvelteKit + Firebase starter for AI-assisted development.

## 1. Project Snapshot

- **Type**: Single SvelteKit app (no monorepo)
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript 5 (strict), Firebase 12, Tailwind CSS 4, shadcn-svelte, Zod
- **Sub-guides**: `src/lib/AGENTS.md` and `src/routes/AGENTS.md`

---

## 2. Quick Start

```bash
npm install           # Install dependencies
npm run dev           # Dev server (http://localhost:5173)
npm run check         # TypeScript + Svelte typecheck
npm run lint          # ESLint
npm run test          # Vitest
npm run build         # Production build
```

**Before completing any task**: `npm run check && npm run lint && npm run test`

---

## 3. Project Structure

```
src/
├── lib/                    # Core library (see src/lib/AGENTS.md)
│   ├── components/ui/      # shadcn-svelte components (see ui/AGENTS.md)
│   ├── firebase/           # Firestore helpers
│   ├── server/             # Server utilities (forms.ts)
│   ├── stores/             # Svelte 5 rune stores
│   └── schemas/            # Zod schemas
├── routes/                 # Route tree (see src/routes/AGENTS.md)
│   ├── (auth)/             # Public auth pages (login)
│   ├── (app)/              # Protected app pages (dashboard)
│   └── api/                # API endpoints
└── hooks.server.ts         # Server hooks
```

---

## 4. Core Conventions

- **Svelte 5 runes**: Use `$state`, `$derived`, `$effect` in all new code
- **TypeScript strict**: No `any` types, explicit return types
- **Tailwind only**: No custom CSS files, use utility classes
- **Firebase via helpers**: Never call Firebase SDK directly from routes/components
- **Zod validation**: All forms and API inputs validated with Zod schemas

---

## 5. Security

- **Never commit secrets**: `.env` is gitignored, use `.env.example` as template
- **Firebase config**: Client keys in `.env` with `PUBLIC_` prefix
- **Firestore rules**: Update `firestore.rules` when adding collections

---

## 6. JIT Index (What to Open)

### Key Files
- Firebase init: `src/lib/firebase.ts`
- Firestore helpers: `src/lib/firebase/firestore.ts`
- Form handler: `src/lib/server/forms.ts`
- Auth store: `src/lib/stores/auth.svelte.ts`
- Auth schemas: `src/lib/schemas/index.ts`
- Dashboard: `src/routes/(app)/dashboard/+page.svelte`

### Search Commands (Windows)
```bash
npx rg -n "pattern" src                    # Generic search
npx rg -n "\+page\.svelte" src/routes      # Find pages
npx rg -n "z\.object" src/lib              # Find Zod schemas
```

---

## 7. Definition of Done

- [ ] `npm run check && npm run lint && npm run test` all green
- [ ] New features follow existing patterns (resources, stores, routes)
- [ ] No hardcoded secrets or API keys
- [ ] Firestore rules updated if new collections added

---

## 8. LEVER Optimization Framework

> "The best code is no code. The second best code is code that already exists."

Before implementing any feature, apply LEVER:

- **L**everage existing helpers (`firebase/firestore.ts`, `server/forms.ts`)
- **E**xtend before creating - add fields/methods to existing code
- **V**erify through reactivity - let Svelte runes handle state updates
- **E**liminate duplication - one source of truth per concern
- **R**educe complexity - fewer files, more reuse

**Decision rule**: If extending existing code takes <50% effort of creating new, extend.

See `src/lib/AGENTS.md` for detailed optimization patterns.

---

## 9. AI Agent Rules

1. **Read AGENTS.md files first** - root + relevant sub-guide
2. **Apply LEVER** - always check if existing code can be extended
3. **Keep business logic in lib** - not in routes or components
4. **Test your changes** - run all checks before declaring done
5. **Use descriptive logs when debugging**: `console.log('[module-name] context:', data)`
