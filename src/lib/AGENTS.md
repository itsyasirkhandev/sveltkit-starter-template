# AGENTS Guide - `src/lib/`

> Core library: Firebase, resources, stores, UI components, schemas.

## 1. Package Identity

`src/lib` contains all shared logic: Firebase initialization, Firestore helpers, resource modules, Svelte 5 stores, UI primitives, and Zod schemas. Business logic lives here, not in routes.

---

## 2. Directory Structure

```
src/lib/
├── components/ui/     # shadcn-svelte primitives (see ui/AGENTS.md)
├── firebase/          # Firestore CRUD helpers
├── server/resources/  # Firestore-backed resource modules
├── stores/            # Svelte 5 rune stores
├── schemas/           # Shared Zod schemas
├── patterns/          # Reusable patterns (auth, forms, etc.)
├── __tests__/         # Vitest tests
├── firebase.ts        # Firebase app initialization
└── utils.ts           # cn() helper for class merging
```

---

## 3. Key Patterns

### 3.1 Resources (Firestore)

Create new resources by copying `src/lib/server/resources/todos.ts`:

```typescript
// src/lib/server/resources/[name].ts
import { z } from 'zod';
import { addDocument, deleteDocument, getDocuments, updateDocument } from '$lib/firebase/firestore';

const COLLECTION = 'items';

export const itemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  createdAt: z.any().optional(),
});

export type Item = z.infer<typeof itemSchema>;

export async function listItems(): Promise<Item[]> {
  return getDocuments<Item>(COLLECTION);
}

export async function createItem(data: { name: string }): Promise<string | null> {
  return addDocument(COLLECTION, data);
}
```

**Rules**:
- One resource file per Firestore collection
- Colocate Zod schema with resource functions
- Use helpers from `$lib/firebase/firestore.ts`

### 3.2 Stores (Svelte 5 Runes)

Create stores by copying `src/lib/stores/todos.svelte.ts`:

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

**Rules**:
- Use `.svelte.ts` extension for rune-based stores
- Wrap resource functions, don't duplicate logic
- Expose reactive getters

### 3.3 Forms & Validation

Use `$lib/server/forms.ts` with Zod schemas:

```typescript
// In +page.server.ts
import { handleForm } from '$lib/server/forms';
import { createItemSchema } from '$lib/server/resources/items';

export const actions = {
  create: async ({ request }) => {
    return handleForm(request, createItemSchema, async (data) => {
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
| Extend existing stores | Create duplicate state management |
| Use `cn()` for class merging | Write custom CSS files |

---

## 5. Key Files

| Purpose | File |
|---------|------|
| Firebase init | `src/lib/firebase.ts` |
| Firestore helpers | `src/lib/firebase/firestore.ts` |
| Resource example | `src/lib/server/resources/todos.ts` |
| Form handler | `src/lib/server/forms.ts` |
| Auth store | `src/lib/stores/auth.svelte.ts` |
| Todos store | `src/lib/stores/todos.svelte.ts` |
| Class utility | `src/lib/utils.ts` |

---

## 6. Search Commands

```bash
# Resources
npx rg -n "export async function" src/lib/server/resources

# Stores  
npx rg -n "\.svelte\.ts" src/lib/stores

# Schemas
npx rg -n "z\.object" src/lib

# UI components
npx rg -n "<script" src/lib/components/ui
```

---

## 7. Adding New Features

1. **Schema first**: Define Zod schema in `server/resources/[name].ts`
2. **Resource functions**: Add CRUD functions using Firestore helpers
3. **Store wrapper**: Create `.svelte.ts` store if UI needs reactive state
4. **Update rules**: Add Firestore security rules if new collection
5. **Test**: Add Vitest test in `__tests__/`

---

## 8. LEVER Optimization Framework

> "The best code is no code. The second best code is code that already exists."

### 8.1 The Framework

- **L**everage existing patterns in resources and stores
- **E**xtend before creating new files
- **V**erify through Svelte reactivity (runes)
- **E**liminate duplication
- **R**educe complexity

### 8.2 Decision Tree

```
New Feature Request
    ↓
Can existing code handle it? → YES → Extend existing code
    ↓ NO
Can we modify existing patterns? → YES → Adapt and extend
    ↓ NO
Is new code reusable? → YES → Create new pattern
    ↓ NO
Reconsider approach
```

### 8.3 Pre-Implementation Checklist

Before writing code, answer:

```markdown
## Pattern Analysis (5 min)
- [ ] What similar functionality already exists?
- [ ] Which resource handles related data?
- [ ] What store manages related state?
- [ ] Which components display similar info?

## Reuse Opportunities
- [ ] Can I add fields to existing Firestore documents?
- [ ] Can I extend existing resource functions?
- [ ] Can I add computed properties to existing store?
- [ ] Can I enhance existing component with props?
```

### 8.4 Scoring: Extend vs Create New

| Criteria | Extend | Create New |
|----------|--------|------------|
| Similar data structure exists | +3 | -3 |
| Can reuse Firestore collection | +3 | -3 |
| Existing store returns related data | +2 | -2 |
| UI components show similar info | +2 | -2 |
| Would require <50 lines to extend | +3 | -3 |

**Score > 5**: Extend existing code
**Score < -5**: Create new implementation

### 8.5 Anti-Patterns to Avoid

#### Don't: Create Similar Collections
```typescript
// ❌ BAD: Separate collection for variants
const COLLECTION = 'userProfiles';  // when 'users' exists
```

```typescript
// ✅ GOOD: Extend existing collection
// Add fields to 'users' collection instead
```

#### Don't: Duplicate Query Logic
```typescript
// ❌ BAD: Multiple similar functions
export async function getActiveItems() { ... }
export async function getPendingItems() { ... }
export async function getCompletedItems() { ... }
```

```typescript
// ✅ GOOD: Single function with filter
export async function listItems(filter?: ItemStatus) {
  const items = await getDocuments<Item>(COLLECTION);
  return filter ? items.filter(i => i.status === filter) : items;
}
```

#### Don't: Create Overlapping Stores
```typescript
// ❌ BAD: Multiple stores for same concern
export const itemsStore = { ... };
export const itemFilterStore = { ... };
export const itemStatsStore = { ... };
```

```typescript
// ✅ GOOD: Single store with derived state
export const itemsStore = {
  get items() { return items; },
  get filtered() { return $derived(items.filter(...)); },
  get stats() { return $derived({ count: items.length, ... }); },
};
```

---

## 9. Pre-PR Checks

```bash
npm run check && npm run lint && npm run test
```

Add tests for new resource logic in `src/lib/__tests__/`.
