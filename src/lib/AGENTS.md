# AGENTS Guide - `src/lib/`

> Core library: Firebase, stores, schemas.

## 1. Structure

```
src/lib/
├── __tests__/         # Vitest unit tests
├── components/ui/     # Add shadcn on demand
├── firebase/          # Firestore helpers
├── server/            # forms.ts
├── stores/            # auth.svelte.ts
├── schemas/           # Zod schemas
├── firebase.ts        # Firebase init
└── utils.ts           # cn() helper
```

---

## 2. Creating Resources

Create `src/lib/server/resources/[name].ts`:

```typescript
import { z } from 'zod';
import { addDocument, getDocuments } from '$lib/firebase/firestore';

const COLLECTION = 'items';

export const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
});

export type Item = z.infer<typeof itemSchema>;

export async function listItems() {
  return getDocuments<Item>(COLLECTION);
}

export async function createItem(data: { name: string }) {
  return addDocument(COLLECTION, data);
}
```

---

## 3. Creating Stores

Create `src/lib/stores/[name].svelte.ts`:

```typescript
let items = $state<Item[]>([]);
let loading = $state(false);

export const itemsStore = {
  get items() { return items; },
  get loading() { return loading; },
  
  async load() {
    loading = true;
    items = await listItems();
    loading = false;
  }
};
```

---

## 4. Auth Store (Ready)

```typescript
import { authStore } from '$lib';

// Methods
await authStore.signIn(email, password);
await authStore.signInWithGoogle();
await authStore.signOut();

// State
authStore.user        // Firebase user or null
authStore.displayName // User display name
authStore.loading     // Loading state
authStore.error       // Error message
```

---

## 5. Key Files

| File | Purpose |
|------|---------|
| `firebase.ts` | Firebase init |
| `firebase/firestore.ts` | CRUD helpers |
| `server/forms.ts` | Form handling |
| `stores/auth.svelte.ts` | Auth state |
| `schemas/index.ts` | Zod schemas |
| `utils.ts` | cn() helper |

---

## 6. Rules

| DO | DON'T |
|----|-------|
| Use Firestore helpers | Call Firebase SDK directly |
| Use Svelte 5 runes | Use `writable` stores |
| Validate with Zod | Ad-hoc validation |

---

## 7. Svelte 5 Class-Based State

For complex state management:

```typescript
// counter.svelte.ts
class Counter {
  count = $state(0);
  doubled = $derived(this.count * 2);
  
  increment() { this.count++; }
  reset() { this.count = 0; }
}

export const counter = new Counter();
```

Usage:
```svelte
<script lang="ts">
  import { counter } from './counter.svelte.ts';
</script>

<button onclick={() => counter.increment()}>
  Count: {counter.count} (doubled: {counter.doubled})
</button>
```

---

## 8. Firebase/Firestore Best Practices

| Rule | Description |
|------|-------------|
| Collections | Plural nouns: `users`, `bookings` |
| Document IDs | Descriptive: `user-${uid}`, `booking-${ts}` |
| Centralize | All calls via `$lib/firebase/` |
| Transactions | Use for multi-doc atomic updates |
| Security Rules | Update `firestore.rules` for new collections |
| Indexing | Add indexes via Firebase Console for complex queries |
| Pagination | Use query cursors (startAfter), not offset |
| Offline | Handle gracefully with loading states |
| Batch Writes | Use for bulk operations (max 500) |

---

## 9. Console Log Cost Convention

```typescript
// Firestore operations cost money - track them
console.log('(IS $) [users] query:', { uid });
console.log('(IS $) [bookings] write:', { data });

// Local operations are free
console.log('(NO $) [store] state:', { items });
console.log('(NO $) [derived] computed:', { total });
```

---

## 10. TypeScript Strict Rules

- Use `interface` over `type` for objects
- Avoid `enum`, use `as const` objects
- No `any` - use `unknown` with type guards
- Enable strict mode in `tsconfig.json`
- Use Zod for runtime validation

```typescript
// Prefer interface
interface User {
  id: string;
  name: string;
}

// Use const objects instead of enum
const Status = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DONE: 'done',
} as const;

type Status = typeof Status[keyof typeof Status];
```

---

## 11. Error Handling Pattern

```typescript
// Resource function with proper error handling
interface Result<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export async function createItem(data: CreateInput): Promise<Result<string>> {
  // Guard clauses first
  if (!data.name) return { ok: false, error: 'Name required' };
  
  try {
    const id = await addDocument(COLLECTION, data);
    return { ok: true, data: id };
  } catch (e) {
    console.error('(IS $) [items] create failed:', e);
    return { ok: false, error: 'Failed to create item' };
  }
}
```

---

## 12. Performance Optimization

- Minimize Firestore reads (cache in stores)
- Use `$derived` for computed values (not `$effect`)
- Implement loading states for all async operations
- Use Firebase offline persistence when appropriate
- Avoid unnecessary re-renders with fine-grained reactivity
