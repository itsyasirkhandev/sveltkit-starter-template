# AGENTS Guide - `src/lib/server/`

> Server-side utilities and form handling.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | Library overview |
| [../schemas/AGENTS.md](../schemas/AGENTS.md) | Validation schemas |
| [../firebase/AGENTS.md](../firebase/AGENTS.md) | Database operations |
| [../../routes/AGENTS.md](../../routes/AGENTS.md) | Form actions in pages |

---

## Form Handler

```typescript
import { handleForm } from '$lib/server/forms';

// In +page.server.ts
export const actions = {
  default: async (event) => {
    return handleForm(event, schema, async (data, event) => {
      // data is typed and validated
      await saveData(data);
    });
  },
};
```

### Result Types

```typescript
// Success
{ success: true, data: T }

// Error  
{ success: false, errors: Record<string, string>, data?: Partial<T> }
```

---

## Multiple Actions

```typescript
export const actions = {
  create: async (event) => {
    return handleForm(event, createSchema, async (data) => {
      await createItem(data);
    });
  },
  
  delete: async (event) => {
    const formData = await event.request.formData();
    const id = formData.get('id') as string;
    await deleteItem(id);
    return { success: true };
  },
};
```

```svelte
<form method="POST" action="?/create" use:enhance>...</form>
<form method="POST" action="?/delete" use:enhance>
  <input type="hidden" name="id" value={item.id} />
  <button>Delete</button>
</form>
```

---

## Resource Pattern

```typescript
// server/resources/products.ts
import { z } from 'zod';
import { getDocuments, addDocument } from '$lib/firebase/firestore';

const COLLECTION = 'products';

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

export type Product = z.infer<typeof productSchema> & { id: string };

interface Result<T> { ok: boolean; data?: T; error?: string; }

export async function listProducts(): Promise<Result<Product[]>> {
  try {
    const data = await getDocuments<Product>(COLLECTION);
    return { ok: true, data };
  } catch {
    return { ok: false, error: 'Failed to fetch' };
  }
}

export async function createProduct(input: unknown): Promise<Result<string>> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  
  const id = await addDocument(COLLECTION, parsed.data);
  return id ? { ok: true, data: id } : { ok: false, error: 'Failed to create' };
}
```

---

## Load Functions

```typescript
// +page.server.ts
import { error } from '@sveltejs/kit';
import { listProducts } from '$lib/server/resources/products';

export async function load() {
  const result = await listProducts();
  if (!result.ok) throw error(500, result.error);
  return { products: result.data };
}
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use `handleForm` for forms | Parse FormData manually |
| Return `Result<T>` from resources | Throw errors in resources |
| Validate with Zod | Trust client input |
| Use `error()` for HTTP errors | Return plain error objects |
