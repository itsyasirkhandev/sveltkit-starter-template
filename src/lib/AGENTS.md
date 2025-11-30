# AGENTS Guide - `src/lib/`

> Core library: Firebase, stores, UI components, schemas.

## 1. Package Identity

`src/lib` contains all shared logic: Firebase initialization, Firestore helpers, Svelte 5 stores, UI primitives, and Zod schemas. Business logic lives here, not in routes.

---

## 2. Directory Structure

```
src/lib/
├── components/ui/     # shadcn-svelte primitives (see ui/AGENTS.md)
├── firebase/          # Firestore CRUD helpers
├── server/            # Server-side utilities (forms.ts)
├── stores/            # Svelte 5 rune stores
├── schemas/           # Zod validation schemas
├── firebase.ts        # Firebase app initialization
└── utils.ts           # cn() helper for class merging
```

---

## 3. Creating Features

### 3.1 Resources (Firestore)

Create a new resource file in `src/lib/server/resources/`:

```typescript
// src/lib/server/resources/[name].ts
import { z } from 'zod';
import { addDocument, deleteDocument, getDocuments, updateDocument } from '$lib/firebase/firestore';

const COLLECTION = 'items';

export const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
});

export type Item = z.infer<typeof itemSchema>;

export async function listItems(): Promise<Item[]> {
  return getDocuments<Item>(COLLECTION);
}

export async function createItem(data: { name: string }): Promise<string | null> {
  return addDocument(COLLECTION, data);
}

export async function deleteItem(id: string): Promise<boolean> {
  return deleteDocument(COLLECTION, id);
}
```

### 3.2 Stores (Svelte 5 Runes)

Create a store in `src/lib/stores/`:

```typescript
// src/lib/stores/[name].svelte.ts
import { listItems, createItem, type Item } from '$lib/server/resources/items';

let items = $state<Item[]>([]);
let loading = $state(false);

export const itemsStore = {
  get items() { return items; },
  get loading() { return loading; },
  
  async load() {
    loading = true;
    items = await listItems();
    loading = false;
  },
  
  async add(name: string) {
    await createItem({ name });
    await this.load();
  }
};
```

### 3.3 Forms & Validation

Use `$lib/server/forms.ts` with Zod schemas in `+page.server.ts`:

```typescript
import { handleForm } from '$lib/server/forms';
import { itemSchema, createItem } from '$lib/server/resources/items';

export const actions = {
  create: async ({ request }) => {
    return handleForm(request, itemSchema, async (data) => {
      await createItem(data);
      return { success: true };
    });
  }
};
```

---

## 4. DO / DON'T

| DO | DON'T |
|----|-------|
| Create resources in `server/resources/` | Call Firebase SDK in routes/components |
| Use Svelte 5 runes (`$state`, `$derived`) | Use legacy `writable` stores |
| Validate with Zod schemas | Do ad-hoc validation in components |
| Use `cn()` for class merging | Write custom CSS files |

---

## 5. Key Files

| Purpose | File |
|---------|------|
| Firebase init | `src/lib/firebase.ts` |
| Firestore helpers | `src/lib/firebase/firestore.ts` |
| Form handler | `src/lib/server/forms.ts` |
| Auth store | `src/lib/stores/auth.svelte.ts` |
| Auth schemas | `src/lib/schemas/index.ts` |
| Class utility | `src/lib/utils.ts` |

---

## 6. LEVER Optimization Framework

> "The best code is no code. The second best is code that already exists."

- **L**everage existing helpers (`firebase/firestore.ts`, `server/forms.ts`)
- **E**xtend before creating new files
- **V**erify through Svelte reactivity (runes)
- **E**liminate duplication
- **R**educe complexity

### Decision: Extend vs Create

| Criteria | Extend (+) | Create (-) |
|----------|------------|------------|
| Similar data exists | +3 | -3 |
| Can reuse collection | +3 | -3 |
| <50 lines to extend | +3 | -3 |

**Score > 5**: Extend existing code

---

## 7. Pre-PR Checks

```bash
npm run check && npm run lint && npm run test
```
