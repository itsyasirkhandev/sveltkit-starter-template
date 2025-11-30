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

---

## 8. AI Thinking Methodology

For complex tasks, follow this process:

1. **Deep Dive Analysis**: Analyze requirements and constraints
2. **Planning**: Outline architecture before coding
3. **Implementation**: Build step-by-step following patterns
4. **Review & Optimize**: Look for improvements and edge cases
5. **Finalization**: Verify requirements, security, performance

---

## 9. Svelte 5 Runes Reference

```typescript
$state(value)      // Reactive state
$derived(expr)     // Computed values
$effect(() => {})  // Side effects/lifecycle
$props()           // Component props
$bindable()        // Two-way binding
$inspect(value)    // Debug (dev only)
```

---

## 10. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `auth-form.svelte` |
| Components | PascalCase | `AuthForm` |
| Variables | camelCase | `userName` |
| Booleans | is/has/should | `isLoading`, `hasError` |
| Constants | UPPER_SNAKE | `API_URL` |
| Collections | plural | `users`, `bookings` |

---

## 11. Error Handling

```typescript
// Use early returns and guard clauses
async function loadData(id: string) {
  if (!id) return { error: 'ID required' };
  if (!authStore.user) return { error: 'Not authenticated' };
  
  try {
    return { data: await fetchData(id) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Unknown error' };
  }
}
```

---

## 12. Debugging Protocol

```typescript
// Label all debug logs with component/module name
console.log('[ComponentName] state:', { isLoading, hasError });

// Cost convention for Firestore
console.log('(IS $) [users] fetching...');  // Costs money
console.log('(NO $) [store] local update'); // Free

// ALWAYS remove debug logs after fixing
```

---

## 13. Bug Fix Protocol

1. Identify root cause (don't guess)
2. Implement minimal fix aligned with patterns
3. Run: `npm run check && npm run lint && npm run test`
4. End response with: 🚨🚨🚨 [one-sentence summary]

---

## 14. Code Quality Rules

- Use early returns for error conditions
- Implement guard clauses for preconditions
- Favor iteration over duplication
- Use descriptive names with auxiliary verbs (`isLoading`, `hasData`)
- Delete legacy code completely (no "just in case")
- Provide JSDoc comments for complex functions
