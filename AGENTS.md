# AGENTS Guide (Root)

> **Template**: Minimal SvelteKit + Firebase starter for AI-assisted development.

## 1. Project Snapshot

- **Type**: Single SvelteKit app
- **Stack**: SvelteKit 2, Svelte 5 runes, TypeScript, Firebase, Tailwind CSS 4, Zod
- **Sub-guides**: `src/lib/AGENTS.md`, `src/routes/AGENTS.md`, `src/lib/components/ui/AGENTS.md`

---

## 2. Quick Start

```bash
npm install           # Install dependencies
npm run dev           # Dev server (localhost:5173)
npm run check         # TypeScript check
npm run lint          # ESLint
npm run test          # Vitest
npm run build         # Production build
```

---

## 3. Project Structure

```
src/
├── lib/
│   ├── components/ui/      # Add shadcn components on demand
│   ├── firebase/           # Firestore helpers
│   ├── server/             # forms.ts utility
│   ├── stores/             # auth.svelte.ts
│   ├── schemas/            # Zod schemas
│   └── utils.ts            # cn() helper
├── routes/
│   ├── +page.svelte        # Home page
│   ├── +layout.svelte      # Root layout
│   └── layout.css          # Tailwind theme
└── hooks.server.ts         # Error handling
```

---

## 4. What's Ready

| Feature | Location |
|---------|----------|
| Firebase/Firestore | `$lib/firebase/` |
| Auth logic | `$lib/stores/auth.svelte.ts` |
| Form handling | `$lib/server/forms.ts` |
| shadcn-svelte | `npx shadcn-svelte@latest add [component]` |

---

## 5. Core Rules

- **Svelte 5 runes**: `$state`, `$derived`, `$effect`
- **TypeScript strict**: No `any`
- **Tailwind only**: No custom CSS
- **Firebase via helpers**: Never call SDK directly

---

## 6. LEVER Framework

- **L**everage existing helpers
- **E**xtend before creating
- **V**erify through reactivity
- **E**liminate duplication
- **R**educe complexity

---

## 7. Before Completing Tasks

```bash
npm run check && npm run lint && npm run test
```
