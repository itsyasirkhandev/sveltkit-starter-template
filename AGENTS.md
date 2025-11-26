# Guidelines For AI Coding Agents

## Project Overview

A minimal SvelteKit template with Firebase and Tailwind CSS pre-configured for building modern web applications.

### Tech Stack

| Technology    | Version | Purpose                   |
| ------------- | ------- | ------------------------- |
| SvelteKit     | 2.x     | Full-stack framework      |
| Svelte        | 5.x     | UI framework (uses Runes) |
| TypeScript    | 5.x     | Type safety (strict mode) |
| Firebase      | 12.x    | Auth & Firestore backend  |
| Tailwind CSS  | 4.x     | Utility-first styling     |
| shadcn-svelte | latest  | UI component library      |
| Zod           | 4.x     | Schema validation         |
| svelte-sonner | 1.x     | Toast notifications       |
| Prettier      | 3.x     | Code formatting           |
| ESLint        | 9.x     | Code linting              |
| Vite          | 7.x     | Build tool                |

### Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components (button, card, input)
│   ├── firebase/          # Firestore utility functions
│   │   └── firestore.ts   # CRUD operations, real-time subscriptions
│   ├── schemas/           # Zod validation schemas
│   │   └── index.ts       # User, Login, SignUp schemas
│   ├── stores/            # Svelte 5 reactive stores
│   │   └── auth.svelte.ts # Authentication state management
│   ├── assets/            # Static assets (favicon, images)
│   ├── firebase.ts        # Firebase initialization
│   ├── index.ts           # Library exports
│   └── utils.ts           # Utility functions (cn helper)
├── routes/
│   ├── +layout.svelte     # Root layout (includes Toaster)
│   ├── +layout.js         # Layout config
│   ├── +page.svelte       # Home page
│   └── layout.css         # Global styles & Tailwind config
└── app.html               # HTML template
```

### Key Files

- `src/lib/firebase.ts` - Firebase app initialization (browser-only)
- `src/lib/stores/auth.svelte.ts` - Auth store using Svelte 5 class pattern
- `src/lib/firebase/firestore.ts` - Generic Firestore CRUD utilities
- `src/lib/schemas/index.ts` - Zod validation schemas
- `src/lib/utils.ts` - `cn()` helper for Tailwind class merging
- `src/lib/index.ts` - Re-exports for `$lib` imports
- `components.json` - shadcn-svelte configuration
- `firestore.rules` - Firestore security rules
- `.prettierrc` - Prettier configuration
- `eslint.config.js` - ESLint configuration

---

## Build and Test Commands

```bash
# Development
npm run dev              # Start dev server (Vite)

# Type Checking
npm run check            # Run svelte-check (one-time)
npm run check:watch      # Run svelte-check in watch mode

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Setup
npm install              # Install dependencies
npm run prepare          # Sync SvelteKit (runs automatically)
```

### Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in Firebase config values from Firebase Console

### Deployment

- **Vercel**: Auto-detected, uses `adapter-vercel`
- **Static/Firebase Hosting**: Uses `adapter-static`, outputs to `build/`

---

## Code Style Guidelines

### Imports Order

Organize imports in this order, separated by blank lines:

```typescript
// 1. Svelte/SvelteKit imports
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// 2. External library imports
import { initializeApp } from 'firebase/app';
import { tv, type VariantProps } from 'tailwind-variants';

// 3. Internal $lib imports
import { cn } from '$lib/utils';
import { authStore } from '$lib/stores/auth.svelte';
import { Button } from '$lib/components/ui/button';

// 4. Relative imports
import Component from './Component.svelte';

// 5. Type-only imports (use `type` keyword)
import type { User } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
```

### TypeScript Conventions

**Prefer interfaces over types:**

```typescript
// Good
interface UserData {
  id: string;
  email: string;
  displayName?: string;
}

// Avoid (unless union/intersection needed)
type UserData = { ... }
```

**Use const objects instead of enums:**

```typescript
// Good
const Status = {
	PENDING: 'pending',
	ACTIVE: 'active',
	COMPLETED: 'completed',
} as const;
type Status = (typeof Status)[keyof typeof Status];

// Avoid
enum Status {
	PENDING,
	ACTIVE,
	COMPLETED,
}
```

**Generic type parameters:**

```typescript
// Use descriptive names for complex generics
async function getDocument<TData = DocumentData>(
	collectionName: string,
	docId: string
): Promise<TData | null>;
```

### Naming Conventions

| Element               | Convention              | Example                       |
| --------------------- | ----------------------- | ----------------------------- |
| Files (components)    | lowercase-hyphen        | `auth-form.svelte`            |
| Files (stores)        | lowercase-hyphen.svelte | `auth.svelte.ts`              |
| Files (utilities)     | lowercase-hyphen        | `firestore.ts`                |
| Components            | PascalCase              | `AuthForm`, `Button`          |
| Variables/Functions   | camelCase               | `getUserData`, `isLoading`    |
| Constants             | UPPER_SNAKE_CASE        | `API_URL`, `MAX_RETRIES`      |
| Booleans              | is/has/should prefix    | `isAuthenticated`, `hasError` |
| Event handlers        | handle prefix           | `handleClick`, `handleSubmit` |
| Firestore collections | plural nouns            | `users`, `bookings`           |

### Svelte 5 Runes

**Always use runes for reactivity:**

```typescript
// State
let count = $state(0);
let user = $state<User | null>(null);

// Derived values
let doubled = $derived(count * 2);
let isLoggedIn = $derived(!!user);

// Side effects
$effect(() => {
	console.log(`Count changed: ${count}`);
});

// Props
let { title, onClick, class: className = '' } = $props();

// Bindable props
let { value = $bindable() } = $props();
```

**Class-based stores pattern (for complex state):**

```typescript
// stores/counter.svelte.ts
class CounterStore {
	count = $state(0);

	get doubled(): number {
		return this.count * 2;
	}

	increment(): void {
		this.count++;
	}
}

export const counterStore = new CounterStore();
```

### Component Structure

**Svelte component template:**

```svelte
<script lang="ts" module>
  // Module-level exports (types, variants)
  import { tv, type VariantProps } from 'tailwind-variants';
  
  export const variants = tv({ ... });
  export type Props = { ... };
</script>

<script lang="ts">
	// Component logic
	import { cn } from '$lib/utils';

	let { class: className, ...props }: Props = $props();
</script>

<!-- Template -->
<div class={cn('base-classes', className)} {...props}>
	{@render children?.()}
</div>
```

### Tailwind CSS

**Use `cn()` for conditional classes:**

```typescript
import { cn } from '$lib/utils';

// Merging classes
<div class={cn('base-class', className)} />

// Conditional classes
<div class={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-class'
)} />
```

**Use tailwind-variants for component variants:**

```typescript
import { tv } from 'tailwind-variants';

const buttonVariants = tv({
	base: 'inline-flex items-center justify-center rounded-md',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground',
			outline: 'border border-input bg-background',
		},
		size: {
			default: 'h-9 px-4',
			sm: 'h-8 px-3',
			lg: 'h-10 px-6',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});
```

### Error Handling

**Firebase operations:**

```typescript
async function signIn(email: string, password: string): Promise<boolean> {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		return true;
	} catch (err) {
		// Store error message for UI
		this.error = err instanceof Error ? err.message : 'Failed to sign in';
		return false;
	}
}
```

**Firestore null checks:**

```typescript
// Always check if Firebase is initialized (browser-only)
if (!firestore) return null;
if (!auth) return false;
```

**Return types for operations:**

- `Promise<boolean>` - Success/failure operations
- `Promise<T | null>` - Fetch operations that may not find data
- `Promise<string | null>` - Operations returning IDs

### shadcn-svelte Components

**Import pattern:**

```typescript
import { Button } from '$lib/components/ui/button';
import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
import { Input } from '$lib/components/ui/input';
```

**Add new components:**

```bash
npx shadcn-svelte@latest add [component-name]
```

**Icon usage (Lucide):**

```svelte
<script>
	import { Search, Plus, X } from '@lucide/svelte';
</script>

<Button>
	<Plus class="size-4" />
	Add Item
</Button>
```

### Zod Validation

**Available schemas from `$lib/schemas`:**

```typescript
import { userSchema, loginSchema, signUpSchema, validate } from '$lib';

// Validate data
const result = validate(loginSchema, formData);
if (result.success) {
	// result.data is typed
} else {
	// result.errors contains ZodError
}
```

**Creating custom schemas:**

```typescript
import { z } from 'zod';

const postSchema = z.object({
	title: z.string().min(1, 'Title required'),
	content: z.string().min(10, 'Content too short'),
	published: z.boolean().default(false),
});

type Post = z.infer<typeof postSchema>;
```

### Toast Notifications

**Import and use:**

```typescript
import { toast } from '$lib';

toast.success('Saved successfully');
toast.error('Something went wrong');
toast.info('Processing...');
toast.warning('Please check your input');

// Promise-based
toast.promise(asyncOperation(), {
	loading: 'Loading...',
	success: 'Done!',
	error: 'Failed',
});
```

**Toaster is pre-configured in `+layout.svelte` with:**

- `richColors` - Colored backgrounds
- `position="top-right"` - Position on screen

### SvelteKit Patterns

**Route structure:**

```
routes/
├── +page.svelte          # Page component
├── +page.ts              # Client-side load function
├── +page.server.ts       # Server-side load function
├── +layout.svelte        # Layout component
├── +error.svelte         # Error page
└── api/
    └── endpoint/
        └── +server.ts    # API endpoint
```

**Load functions:**

```typescript
// +page.ts (client-side)
export async function load({ params }) {
	return { data: await fetchData(params.id) };
}

// +page.server.ts (server-side only)
export async function load({ params, locals }) {
	return { data: await serverFetchData(params.id) };
}
```

---

## Firebase Integration

### Authentication

- Use `authStore` from `$lib/stores/auth.svelte.ts`
- Auth state is reactive via `authStore.user`
- Methods: `signIn()`, `signUp()`, `signInWithGoogle()`, `signOut()`

### Firestore

- Use utilities from `$lib/firebase/firestore`
- Available functions:
  - `getDocument<T>(collection, id)` - Fetch single doc
  - `getDocuments<T>(collection, constraints)` - Fetch multiple docs
  - `addDocument<T>(collection, data)` - Create doc
  - `updateDocument<T>(collection, id, data)` - Update doc
  - `deleteDocument(collection, id)` - Delete doc
  - `subscribeToCollection<T>(collection, callback, constraints)` - Real-time
  - `subscribeToDocument<T>(collection, id, callback)` - Real-time

### Security Rules

Located in `firestore.rules`. Current pattern:

```javascript
match /users/{userId}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

## General Workflow

1. **Before coding**: Run `npm run check` to verify current state
2. **During development**: Keep `npm run dev` running
3. **Shared components**: Reuse existing UI components or create new ones in `$lib/components/ui`
4. **After changes**: Run `npm run check` to verify no type errors
5. **Test files**: Delete after confirming they are no longer needed

---

## Communication Style

Be extremely direct and not afraid of offending me. You can tell me when I'm wrong. Tell me when there are better ways to do things. Think like a first principles thinker who uses logic and logic only. Disregard feelings. Our goal is to build revolutionary products that solve challenges and change people's lives. Affirming my feelings and advice about coffee or the weather don't matter.

Be extremely direct and not afraid offending me. You can tell me when I'm wrong. Tell me when there are better ways to do things. Think like a first principles thinker who uses logic and logic only. Disregard feelings. Our goal is finding the best solution humanly possible. Directness and honesty are the most important so we can build the greatest solutions ever. Affirming my feelings and caring about telling me I'm great don't matter nearly as much.

---

## Bug Fixes

When fixing a bug: identify root cause, implement fix, verify with `npm run check`. End with a one-sentence summary using 🚨🚨🚨.
