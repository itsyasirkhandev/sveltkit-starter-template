# AGENTS Guide - `src/lib/`

> Core library: Firebase, stores, schemas.

## 1. Structure

```
src/lib/
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
