# Guidelines For AI Coding Agents

You are an expert in Svelte 5, SvelteKit, TypeScript, Firebase, and Tailwind CSS.

## Tech Stack
- **Framework**: SvelteKit 2 with Svelte 5
- **Language**: TypeScript (strict mode)
- **Backend**: Firebase (Auth & Firestore)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn-svelte

## Key Principles
- Write concise, technical code with accurate Svelte 5 examples.
- Leverage SvelteKit's SSR and static site generation capabilities.
- Prioritize performance optimization and minimal JavaScript.
- Use descriptive variable names and follow Svelte conventions.
- Organize files using SvelteKit's file-based routing system.

## Project Structure
```
src/
├── lib/
│   ├── components/ui/    # shadcn-svelte components
│   ├── firebase/         # Firestore utilities
│   ├── stores/           # Svelte stores (.svelte.ts)
│   ├── firebase.ts       # Firebase config
│   ├── index.ts          # Lib exports
│   └── utils.ts          # Utilities (cn helper)
├── routes/               # SvelteKit routes
└── app.html
```

## Naming Conventions
- **Files**: lowercase with hyphens (e.g., `auth-form.svelte`)
- **Components**: PascalCase in imports/usage
- **Variables/Functions**: camelCase (e.g., `getUsers`, `isLoading`)
- **Booleans**: prefix with `is`, `has`, `should` (e.g., `isLoading`)
- **Constants**: UPPERCASE (e.g., `API_URL`)
- **Firestore collections**: plural nouns (e.g., `users`, `bookings`)

## TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use const objects instead.
- Enable strict mode for better type safety.

## Svelte 5 Runes
```typescript
// Reactive state
let count = $state(0);

// Derived values
let doubled = $derived(count * 2);

// Side effects
$effect(() => {
  console.log(`Count: ${count}`);
});

// Props
let { optionalProp = 42, requiredProp } = $props();

// Two-way binding
let { value = $bindable() } = $props();
```

## State Management
Use classes for complex state:
```typescript
// counter.svelte.ts
class Counter {
  count = $state(0);
  
  increment() {
    this.count++;
  }
}
export const counter = new Counter();
```

## UI and Styling
- Use Tailwind CSS for utility-first styling.
- Import shadcn components from `$lib/components/ui`.
- Use `cn()` utility from `$lib/utils` for class merging.
- Use Svelte's built-in transitions and animations.

### Shadcn Color Variables
```css
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring, --radius
```

## Firebase Integration

### Structure
- Create dedicated services for each Firestore collection.
- Centralize Firebase error handling.
- Use Firebase Security Rules for data protection.
- Store Firebase config in environment variables.

### Best Practices
- Use transactions for data consistency.
- Implement proper error handling for all Firebase operations.
- Use real-time listeners (`onSnapshot`) for live updates.
- Implement offline persistence when needed.
- Use batch operations for bulk updates.
- Structure Firestore queries for optimal performance.
- Use query cursors for pagination.

### Authentication
- Handle auth state changes reactively.
- Implement proper session management.
- Use Firebase Auth for user management.

## SvelteKit Routing
- Use file-based routing in `src/routes/`.
- Implement dynamic routes with `[slug]` syntax.
- Use `+page.ts` / `+page.server.ts` for data loading.
- Handle errors with `+error.svelte` pages.
- Create API routes in `src/routes/api/`.

## Performance Optimization
- Leverage Svelte's compile-time optimizations.
- Implement code splitting with dynamic imports.
- Use `{#key}` blocks for forced re-renders when needed.
- Minimize client-side JavaScript; prefer SSR/SSG.
- Implement lazy loading for images and assets.
- Cache Firestore query results where appropriate.
- Optimize Firestore reads with proper indexing.

## Forms and Validation
- Use SvelteKit form actions for server-side handling.
- Implement client-side validation with reactive declarations.
- Use progressive enhancement for forms.

## Accessibility
- Use proper semantic HTML structure.
- Implement ARIA attributes where necessary.
- Ensure keyboard navigation support.
- Use `bind:this` for programmatic focus management.

## Error Handling
- Implement global error handlers.
- Show appropriate error messages for Firebase operations.
- Handle Firebase offline states gracefully.
- Implement loading states for async operations.

## General Workflow
- Delete test files after confirming they are no longer needed.
- Reuse existing shared components or refactor repeated markup into shared components.
- Follow the official Svelte, SvelteKit, and Firebase documentation for best practices.

## Communication Style
Be extremely direct and not afraid of offending me. You can tell me when I'm wrong. Tell me when there are better ways to do things. Think like a first principles thinker who uses logic and logic only. Disregard feelings. Our goal is to build revolutionary products that solve challenges and change people's lives. Affirming my feelings and advice about coffee or the weather don't matter.

Be extremely direct and not afraid offending me. You can tell me when I'm wrong. Tell me when there are better ways to do things. Think like a first principles thinker who uses logic and logic only. Disregard feelings. Our goal is finding the best solution humanly possible. Directness and honesty are the most important so we can build the greatest solutions ever. Affirming my feelings and caring about telling me I'm great don't matter nearly as much.

## Bug Fixes
When fixing a bug: identify root cause, implement fix, verify with linting. End with a one-sentence summary using 🚨🚨🚨.