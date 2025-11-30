# AGENTS Guide - `src/lib/`

> Core library: Firebase, stores, schemas, utilities.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [components/AGENTS.md](components/AGENTS.md) | Building UI |
| [firebase/AGENTS.md](firebase/AGENTS.md) | Database operations |
| [stores/AGENTS.md](stores/AGENTS.md) | State management |
| [schemas/AGENTS.md](schemas/AGENTS.md) | Validation |
| [server/AGENTS.md](server/AGENTS.md) | Form actions |
| [__tests__/AGENTS.md](__tests__/AGENTS.md) | Testing |
| [../routes/AGENTS.md](../routes/AGENTS.md) | Pages & routing |

---

## Structure

```
src/lib/
├── components/        # UI → components/AGENTS.md
├── firebase/          # Firestore → firebase/AGENTS.md
├── stores/            # State → stores/AGENTS.md
├── schemas/           # Zod → schemas/AGENTS.md
├── server/            # Forms → server/AGENTS.md
├── __tests__/         # Tests → __tests__/AGENTS.md
├── firebase.ts        # Firebase init
├── index.ts           # Re-exports
└── utils.ts           # cn() helper
```

---

## Quick Patterns

### Auth Store (Ready to Use)

```typescript
import { authStore } from '$lib';

await authStore.signIn(email, password);
await authStore.signInWithGoogle();
await authStore.signOut();

// State: authStore.user, authStore.loading, authStore.error
```

### Create a Store

```typescript
// stores/items.svelte.ts
class ItemsStore {
  items = $state<Item[]>([]);
  loading = $state(false);
  count = $derived(this.items.length);
  
  async load() {
    this.loading = true;
    this.items = await getDocuments<Item>('items');
    this.loading = false;
  }
}
export const itemsStore = new ItemsStore();
```

### Create a Resource

```typescript
// server/resources/items.ts
import { z } from 'zod';
import { getDocuments, addDocument } from '$lib/firebase/firestore';

export const itemSchema = z.object({ name: z.string().min(1) });
export type Item = z.infer<typeof itemSchema> & { id: string };

export const listItems = () => getDocuments<Item>('items');
export const createItem = (data: z.infer<typeof itemSchema>) => addDocument('items', data);
```

---

## Key Exports from `$lib`

```typescript
import { 
  authStore,                    // Auth state
  getDocuments, addDocument,    // Firestore
  loginSchema, signUpSchema,    // Validation
  cn,                           // Class merging
  toast,                        // Notifications
} from '$lib';
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use `$lib/firebase/firestore` helpers | Import Firebase SDK directly |
| Use Svelte 5 runes (`$state`) | Use legacy `writable` stores |
| Validate with Zod schemas | Ad-hoc validation |
| Use `interface` for objects | Use `type` or `any` |
