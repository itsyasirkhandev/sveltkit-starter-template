# SvelteKit + Firebase Starter Template

A minimal SvelteKit starter template with Firebase backend and Tailwind CSS. Built for vibecoders using AI to build applications.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`)
- **SvelteKit 2** with SSR/SSG
- **Firebase** Authentication & Firestore helpers (ready to use)
- **Tailwind CSS 4** with theme tokens
- **shadcn-svelte** configured (add components on demand)
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
│   ├── components/ui/      # Add shadcn components here
│   ├── firebase/           # Firestore CRUD helpers
│   ├── server/             # Form handling utility
│   ├── stores/             # Auth store (ready)
│   ├── schemas/            # Zod schemas
│   └── utils.ts            # cn() helper
├── routes/
│   ├── +page.svelte        # Home page
│   ├── +layout.svelte      # Root layout
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

### Add UI Components

```bash
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add input
npx shadcn-svelte@latest add form
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

- `AGENTS.md` - Root guide
- `src/lib/AGENTS.md` - Library patterns
- `src/routes/AGENTS.md` - Routing guide
- `src/lib/components/ui/AGENTS.md` - UI guide

## License

MIT
