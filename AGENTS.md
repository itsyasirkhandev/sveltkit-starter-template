# AGENTS Guide (Root)

> **Template**: SvelteKit + Firebase starter for AI-assisted development.

## 1. Project Snapshot

- **Type**: Single SvelteKit app (no monorepo)
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript 5 (strict), Firebase 12, Tailwind CSS 4, shadcn-svelte, Zod
- **Sub-guides**: `src/lib/AGENTS.md`, `src/routes/AGENTS.md`, `src/lib/components/ui/AGENTS.md`

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
├── lib/
│   ├── components/ui/      # Empty - add shadcn components on demand
│   ├── firebase/           # Firestore helpers
│   ├── server/             # forms.ts utility
│   ├── stores/             # auth.svelte.ts (auth logic ready)
│   └── schemas/            # Login/signup Zod schemas
├── routes/
│   ├── +page.svelte        # Home page (blank slate)
│   ├── layout.css          # Tailwind theme tokens
│   └── api/                # API endpoints
└── hooks.server.ts         # Server hooks
```

---

## 4. What's Included

| Feature | Location | Status |
|---------|----------|--------|
| Firebase/Firestore helpers | `$lib/firebase/` | Ready |
| Auth store (sign in/out) | `$lib/stores/auth.svelte.ts` | Ready |
| Auth schemas (Zod) | `$lib/schemas/` | Ready |
| Form handler | `$lib/server/forms.ts` | Ready |
| shadcn-svelte config | `components.json` | Ready (add components on demand) |
| Tailwind theme | `layout.css` | Ready |

---

## 5. Core Conventions

- **Svelte 5 runes**: Use `$state`, `$derived`, `$effect`
- **TypeScript strict**: No `any` types
- **Tailwind only**: No custom CSS files
- **Firebase via helpers**: Never call SDK directly in routes

---

## 6. Security

- **Never commit secrets**: `.env` is gitignored
- **Firebase config**: Use `PUBLIC_` prefix for client keys
- **Firestore rules**: Update when adding collections

---

## 7. Adding Features

### Add UI Components
```bash
npx shadcn-svelte@latest add button card input form
```

### Add Auth UI (when needed)
Use `authStore` from `$lib`:
```svelte
<script lang="ts">
  import { authStore } from '$lib';
  await authStore.signIn(email, password);
  await authStore.signInWithGoogle();
</script>
```

### Add Firestore Resources
Create in `$lib/server/resources/[name].ts` using helpers from `$lib/firebase/firestore.ts`

---

## 8. LEVER Framework

> "The best code is no code."

- **L**everage existing helpers
- **E**xtend before creating
- **V**erify through Svelte reactivity
- **E**liminate duplication
- **R**educe complexity

---

## 9. Pre-PR Checks

```bash
npm run check && npm run lint && npm run test
```
