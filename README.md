# SvelteKit + Firebase Starter Template

A minimal SvelteKit starter template with Firebase backend and Tailwind CSS. Built for vibecoders using AI to build applications.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`)
- **SvelteKit 2** with SSR/SSG
- **Firebase** Authentication & Firestore helpers (ready to use)
- **Tailwind CSS 4** with theme tokens
- **TypeScript** strict mode
- **Zod** schema validation

## Quick Start

```bash
# Install
npm install

# Copy env and add Firebase config
cp .env.example .env

# Run
npm run dev
```

## Firebase Setup

1. Create project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** and **Firestore**
3. Copy config to `.env`:

```env
PUBLIC_FIREBASE_API_KEY=your_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── lib/
│   ├── __tests__/          # Vitest unit tests
│   ├── components/         # Custom UI components
│   ├── firebase/           # Firestore CRUD helpers
│   ├── server/             # Form handling utility
│   ├── stores/             # Auth store (ready)
│   ├── schemas/            # Zod schemas
│   └── utils.ts            # cn() helper
├── routes/
│   ├── +page.svelte        # Home page
│   ├── +layout.svelte      # Root layout
│   ├── +error.svelte       # Error/404 page
│   └── layout.css          # Tailwind theme
```

## What's Ready

### Auth Store

```svelte
<script lang="ts">
  import { authStore } from '$lib';

  // Sign in
  await authStore.signIn(email, password);
  await authStore.signInWithGoogle();

  // Sign out
  await authStore.signOut();

  // Check state
  if (authStore.user) { /* logged in */ }
</script>
```

### Firestore Helpers

```typescript
import { getDocuments, addDocument, updateDocument, deleteDocument } from '$lib';

const items = await getDocuments('collection');
const id = await addDocument('collection', { name: 'Item' });
await updateDocument('collection', id, { name: 'Updated' });
await deleteDocument('collection', id);
```

### Form Validation

```typescript
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
```

### Toast Notifications

```typescript
import { toast } from '$lib';

toast.success('Done!');
toast.error('Failed');
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run check` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |

## AI-Assisted Development

This template includes `AGENTS.md` files for AI coding assistants:

| Guide | Purpose |
|-------|---------|
| `AGENTS.md` | Root guide, core rules |
| `src/lib/AGENTS.md` | Library overview |
| `src/lib/components/AGENTS.md` | Design system, UI patterns |
| `src/lib/firebase/AGENTS.md` | Firestore CRUD, queries |
| `src/lib/stores/AGENTS.md` | Svelte 5 state management |
| `src/lib/schemas/AGENTS.md` | Zod validation |
| `src/lib/server/AGENTS.md` | Form actions, resources |
| `src/lib/__tests__/AGENTS.md` | Vitest testing |
| `src/routes/AGENTS.md` | Pages, layouts, routing |

## License

MIT
