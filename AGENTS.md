# AGENTS Guide (Root)

> Minimal SvelteKit + Firebase starter for AI-assisted development.

## Navigation

| Guide | Purpose |
|-------|---------|
| [`src/lib/AGENTS.md`](src/lib/AGENTS.md) | Library overview, auth store |
| [`src/lib/components/AGENTS.md`](src/lib/components/AGENTS.md) | Design system, UI patterns |
| [`src/lib/firebase/AGENTS.md`](src/lib/firebase/AGENTS.md) | Firestore CRUD, queries |
| [`src/lib/stores/AGENTS.md`](src/lib/stores/AGENTS.md) | Svelte 5 state management |
| [`src/lib/schemas/AGENTS.md`](src/lib/schemas/AGENTS.md) | Zod validation |
| [`src/lib/server/AGENTS.md`](src/lib/server/AGENTS.md) | Form actions, resources |
| [`src/lib/__tests__/AGENTS.md`](src/lib/__tests__/AGENTS.md) | Vitest testing |
| [`src/routes/AGENTS.md`](src/routes/AGENTS.md) | Pages, layouts, routing |

---

## Stack

SvelteKit 2 | Svelte 5 runes | TypeScript | Firebase | Tailwind CSS 4 | Zod

## Commands

```bash
npm run dev      # Dev server
npm run check    # TypeScript
npm run lint     # ESLint  
npm run test     # Vitest
npm run build    # Production
```

---

## Core Rules

1. **Svelte 5 runes** - `$state`, `$derived`, `$effect`, `$props`
2. **TypeScript strict** - No `any`, use interfaces
3. **Tailwind only** - No custom CSS, use semantic tokens
4. **Firebase via helpers** - Never import SDK directly

---

## Project Structure

```
src/
├── lib/
│   ├── components/    # UI components
│   ├── firebase/      # Firestore helpers
│   ├── stores/        # State (auth.svelte.ts)
│   ├── schemas/       # Zod validation
│   ├── server/        # Form handling
│   └── __tests__/     # Vitest tests
├── routes/            # Pages & layouts
└── hooks.server.ts    # Server hooks
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `auth-form.svelte` |
| Components | PascalCase | `AuthForm` |
| Variables | camelCase | `isLoading` |
| Booleans | is/has/should | `hasError` |
| Collections | plural | `users` |

---

## Error Handling

```typescript
interface Result<T> { ok: boolean; data?: T; error?: string; }

async function loadData(id: string): Promise<Result<Data>> {
  if (!id) return { ok: false, error: 'ID required' };
  try {
    return { ok: true, data: await fetchData(id) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed' };
  }
}
```

---

## Debug Logging

```typescript
console.log('(IS $) [users] query:', id);   // Firestore (costs money)
console.log('(NO $) [store] update:', data); // Local (free)
// ALWAYS remove after fixing
```

---

## Before Completing Tasks

```bash
npm run check && npm run lint && npm run test
```
