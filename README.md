# SvelteKit + Firebase + Tailwind Template

A modern, minimal SvelteKit template with Firebase backend and Tailwind CSS styling. Built with Svelte 5 runes and TypeScript for type-safe, reactive web applications.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit 2** with SSR/SSG support
- **Firebase** Authentication & Firestore
- **Tailwind CSS 4** with CSS variables theming
- **shadcn-svelte** UI components (Button, Card, Input included)
- **TypeScript** in strict mode
- **Dark mode** ready with CSS variables

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| SvelteKit | 2.x | Full-stack framework |
| Svelte | 5.x | UI framework |
| TypeScript | 5.x | Type safety |
| Firebase | 12.x | Backend (Auth, Firestore) |
| Tailwind CSS | 4.x | Styling |
| shadcn-svelte | latest | UI components |
| Vite | 7.x | Build tool |

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- Firebase project ([create one here](https://console.firebase.google.com))

### Installation

```bash
# Clone or use as template
git clone <repo-url> my-app
cd my-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable **Authentication** (Email/Password and/or Google)
4. Enable **Cloud Firestore**
5. Go to Project Settings > General > Your Apps
6. Create a Web App and copy the config values to `.env`:

```env
PUBLIC_FIREBASE_API_KEY=your_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components
│   ├── firebase/          # Firestore utilities
│   ├── stores/            # Svelte 5 stores
│   ├── firebase.ts        # Firebase initialization
│   ├── index.ts           # Library exports
│   └── utils.ts           # Utilities (cn helper)
├── routes/
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Home page
│   └── layout.css         # Global styles
└── app.html
```

## Usage

### Authentication

```svelte
<script lang="ts">
  import { authStore } from '$lib';
</script>

{#if authStore.isAuthenticated}
  <p>Welcome, {authStore.displayName}!</p>
  <button onclick={() => authStore.signOut()}>Sign Out</button>
{:else}
  <button onclick={() => authStore.signInWithGoogle()}>Sign In</button>
{/if}
```

### Firestore Operations

```typescript
import { getDocuments, addDocument, subscribeToCollection, where } from '$lib';

// Fetch documents
const users = await getDocuments('users');

// Add document
const id = await addDocument('posts', { title: 'Hello', content: '...' });

// Real-time subscription
const unsubscribe = subscribeToCollection('posts', (posts) => {
  console.log(posts);
}, [where('published', '==', true)]);
```

### UI Components

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardContent } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
</script>

<Card>
  <CardHeader>Sign Up</CardHeader>
  <CardContent>
    <Input type="email" placeholder="Email" />
    <Button variant="default">Submit</Button>
  </CardContent>
</Card>
```

### Adding More Components

```bash
npx shadcn-svelte@latest add dialog
npx shadcn-svelte@latest add dropdown-menu
npx shadcn-svelte@latest add form
```

Browse all components: [shadcn-svelte.com](https://shadcn-svelte.com)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Run TypeScript/Svelte checks |
| `npm run check:watch` | Run checks in watch mode |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy --only hosting
```

### Static Hosting

Build outputs to `build/` directory:

```bash
npm run build
# Upload 'build' folder to any static host
```

## Customization

### Theming

Edit CSS variables in `src/routes/layout.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Firestore Security Rules

Edit `firestore.rules`:

```javascript
rules_version='2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## License

MIT
