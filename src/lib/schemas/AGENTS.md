# AGENTS Guide - `src/lib/schemas/`

> Zod validation schemas.

## Navigation

| Guide | When to Use |
|-------|-------------|
| [../AGENTS.md](../AGENTS.md) | Library overview |
| [../server/AGENTS.md](../server/AGENTS.md) | Form actions |
| [../../routes/AGENTS.md](../../routes/AGENTS.md) | Page forms |

---

## Existing Schemas

```typescript
import { loginSchema, signUpSchema, type LoginForm, type SignUpForm } from '$lib/schemas';
```

---

## Creating Schemas

```typescript
import { z } from 'zod';

// Basic schema
export const productSchema = z.object({
  name: z.string().min(1, 'Required'),
  price: z.number().positive('Must be positive'),
  category: z.enum(['electronics', 'books', 'other']),
  description: z.string().optional(),
});

// Infer TypeScript type
export type Product = z.infer<typeof productSchema>;

// Partial for updates
export const updateProductSchema = productSchema.partial();
```

---

## Common Validations

```typescript
// Strings
z.string().min(1, 'Required')
z.string().email('Invalid email')
z.string().url('Invalid URL')
z.string().regex(/pattern/, 'Invalid format')

// Numbers
z.number().positive()
z.number().min(0).max(100)
z.coerce.number()  // Parse from string (form inputs)

// Arrays & Enums
z.array(z.string())
z.enum(['a', 'b', 'c'])

// Optional & Default
z.string().optional()
z.boolean().default(false)
```

---

## Password Confirmation

```typescript
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

---

## Validation Usage

```typescript
// Safe parse (returns result object)
const result = schema.safeParse(data);
if (result.success) {
  // result.data is typed
} else {
  // result.error.issues contains errors
}

// With form handler (see server/AGENTS.md)
return handleForm(event, schema, async (validData) => {
  // validData is typed and validated
});
```

---

## Form Error Extraction

```typescript
function getErrors(result: z.SafeParseError<unknown>) {
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    errors[issue.path[0] as string] = issue.message;
  }
  return errors;
}
```

---

## Rules

| DO | DON'T |
|----|-------|
| Use `z.infer<>` for types | Duplicate types manually |
| Use `.safeParse()` | Use `.parse()` (throws) |
| Provide error messages | Use default messages |
| Use `z.coerce` for forms | Manual type conversion |
