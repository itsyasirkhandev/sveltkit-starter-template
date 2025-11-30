# SvelteKit + Firebase + Tailwind Template

A modern, minimal SvelteKit template with Firebase backend and Tailwind CSS styling. Built with Svelte 5 runes and TypeScript for type-safe, reactive web applications.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit 2** with SSR/SSG support
- **Firebase** Authentication & Firestore
- **Tailwind CSS 4** with OKLCH color values and **Clean Slate theme**
- **shadcn-svelte** UI components (Button, Card, Input included)
- **TypeScript** in strict mode
- **Zod** schema validation with example schemas
- **svelte-sonner** toast notifications
- **Prettier + ESLint** code formatting and linting
- **Dark/Light mode** with seamless theme switching
- **Tech stack showcase page** demonstrating the template design system

## Tech Stack

| Technology    | Version | Purpose                   |
| ------------- | ------- | ------------------------- |
| SvelteKit     | 2.x     | Full-stack framework      |
| Svelte        | 5.x     | UI framework              |
| TypeScript    | 5.x     | Type safety               |
| Firebase      | 12.x    | Backend (Auth, Firestore) |
| Tailwind CSS  | 4.x     | Styling                   |
| shadcn-svelte | latest  | UI components             |
| Zod           | 4.x     | Schema validation         |
| svelte-sonner | 1.x     | Toast notifications       |
| Prettier      | 3.x     | Code formatting           |
| ESLint        | 9.x     | Code linting              |
| Vite          | 7.x     | Build tool                |

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

Open [http://localhost:5173](http://localhost:5173) to see:

- **Tech stack showcase** with interactive theme switching
- **Component demonstrations** using shadcn-svelte
- **Clean Slate theme** in both light and dark modes

With the dev server running, you can also run a small runtime smoke test in another terminal:

```bash
npm run dev:check
```

This pings a set of core routes (`/`, `/login`, `/dashboard`, `/todos` by default) and fails if the dev server is unreachable or returns 4xx/5xx responses.

## Project Structure

```
src/
├── lib/
│   ├── assets/                     # Static assets (favicon, images)
│   ├── components/ui/              # shadcn-svelte primitives (button, card, input)
│   ├── firebase/                   # Firestore utilities
│   │   └── firestore.ts            # CRUD operations, real-time subscriptions
│   ├── patterns/                   # Generic capability patterns (auth, resources, forms, UI)
│   │   ├── auth/                   # Email/password, Google, and role helpers
│   │   ├── resources/              # Generic Firestore CRUD + parent/child helpers
│   │   ├── forms/                  # Basic, multi-step, and upload form patterns
│   │   ├── ui/                     # List/detail and real-time list patterns
│   │   └── index.ts                # Registry (authPatterns, resourcePatterns, formPatterns, uiPatterns)
│   ├── schemas/                    # Zod validation schemas
│   ├── server/                     # Server-side helpers (forms, resource modules)
│   ├── stores/                     # Svelte 5 runes-based stores
│   ├── firebase.ts                 # Firebase initialization
│   ├── index.ts                    # Library exports ($lib)
│   └── utils.ts                    # Utilities (cn helper)
├── routes/
│   ├── +layout.svelte              # Root layout (includes Toaster)
│   ├── +page.svelte                # Home page (tech stack showcase + patterns hint)
│   ├── (auth)/                     # Public/auth routes (no auth required)
│   │   ├── +layout.svelte          # Auth layout + redirects if already logged in
│   │   └── login/                  # Example login page
│   ├── (app)/                      # Auth-protected application routes
│   │   ├── +layout.svelte          # App layout + redirect to /login if unauthenticated
│   │   ├── dashboard/              # Example authenticated dashboard page
│   │   └── todos/                  # Example Firestore-backed CRUD page
│   ├── api/
│   │   └── todos/                  # JSON API backed by todos resource
│   └── layout.css                  # Global styles & Tailwind config
└── lib/__tests__/
    └── todos.test.ts               # Vitest example for resource schema
```

## Pattern Library ($lib/patterns)

The template includes a small, generic **pattern library** so you (or an AI agent) can progressively add advanced features (auth, CRUD, complex forms, realtime UIs) without bloating the core app.

- **Auth patterns** – `src/lib/patterns/auth/*`
  - `email-password.ts` – Helpers around the `authStore` for email/password sign-in/sign-up.
  - `google.ts` – Helper for Google sign-in using Firebase Auth.
  - `roles.ts` – Role/claim-based access checks (`hasRole`, `canAccessRoute`).
- **Resource patterns** – `src/lib/patterns/resources/*`
  - `crud.ts` – `createCollectionResource()` for generic Firestore collections (todos, projects, notes, etc.).
  - `related.ts` – `listChildrenByParentId()` for parent/child relations (e.g. project → tasks).
- **Form patterns** – `src/lib/patterns/forms/*`
  - `basic.ts` – `handleFormWithSchema()` wrapper over the generic `handleForm` action helper.
  - `multi-step.ts` – Types and helpers for multi-step wizards.
  - `file-upload.ts` – Interface for file upload flows (extend when you add Firebase Storage).
- **UI patterns** – `src/lib/patterns/ui/*`
  - `list-detail.ts` – List/detail state helpers for dashboards and master/detail views.
  - `realtime-list.ts` – `createRealtimeListController()` on top of Firestore `subscribeToCollection`.

Use `$lib/patterns` when you want to **add capabilities** (e.g. “add login”, “add a new Firestore-backed resource”, “add a multi-step form”, “add realtime updates”). Use the existing example routes (`(auth)/login`, `(app)/dashboard`, `(app)/todos`, `api/todos`) as concrete reference implementations you can copy and customize.

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
const unsubscribe = subscribeToCollection(
	'posts',
	(posts) => {
		console.log(posts);
	},
	[where('published', '==', true)]
);
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

### Form Validation (Zod)

```typescript
import { loginSchema, validate, toast } from '$lib';

const formData = { email: 'user@example.com', password: '123456' };
const result = validate(loginSchema, formData);

if (result.success) {
	// result.data is typed as LoginForm
	await authStore.signIn(result.data.email, result.data.password);
	toast.success('Logged in successfully');
} else {
	toast.error(result.errors.issues[0].message);
}
```

### Toast Notifications

```typescript
import { toast } from '$lib';

// Success
toast.success('Operation completed');

// Error
toast.error('Something went wrong');

// With options
toast.info('Processing...', { duration: 5000 });

// Promise-based
toast.promise(saveData(), {
	loading: 'Saving...',
	success: 'Saved!',
	error: 'Failed to save',
});
```

## Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start development server     |
| `npm run dev:check`    | Runtime smoke test against the running dev server (port/route health) |
| `npm run build`        | Build for production         |
| `npm run preview`      | Preview production build     |
| `npm run check`        | Run TypeScript/Svelte checks |
| `npm run check:watch`  | Run checks in watch mode     |
| `npm run lint`         | Run ESLint                   |
| `npm run lint:fix`     | Run ESLint with auto-fix     |
| `npm run format`       | Format code with Prettier    |
| `npm run format:check` | Check code formatting        |

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

Template uses **Clean Slate theme** with OKLCH color values for better color consistency. Edit CSS variables in `src/routes/layout.css`:

```css
:root {
  --background: oklch(0.9842 0.0034 247.8575);
  --foreground: oklch(0.2795 0.0368 260.0310);
  --primary: oklch(0.5854 0.2041 277.1173);
  --primary-foreground: oklch(1.0000 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.2077 0.0398 265.7549);
  --foreground: oklch(0.9288 0.0126 255.5078);
  --primary: oklch(0.6801 0.1583 276.9349);
  --primary-foreground: oklch(0.2077 0.0398 265.7549);
  /* ... */
}
```

**Theme Toggle Usage:**

```svelte
<script lang="ts">
  let darkMode = $state(false);
  
  function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<Button onclick={toggleTheme}>
  {#if darkMode}
    <Moon /> <span>Dark</span>
  {:else}
    <Sun /> <span>Light</span>
  {/if}
</Button>
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

## Docs & AGENT workflow

This template is designed to work well for both human developers and AI agents (e.g. when using Graphite MCP and Svelte MCP in your tooling).

- Root rules and workflows: `AGENTS.md`  
  → how to run checks, when to use `npm run dev:check`, and expectations for Definition of Done.
- Library-specific rules: `src/lib/AGENTS.md`  
  → Firebase, Firestore resources, stores, patterns, and Tailwind/shadcn UI guidelines.
- Route-specific rules: `src/routes/AGENTS.md`  
  → Route structure, auth groups, API conventions, and runtime checks.
- Docs workspace: `docs/`  
  → see `docs/README.md` for the feature lifecycle (`research` → `planned` → `active` → `completed`) and `docs/AGENTS.md` for how agents should plan in spec mode and keep feature docs in sync with Graphite stacks.

If you are using AI assistants with this repo, point them to these files first so they follow the same workflows for checks, docs, and branch/PR management.

## License

MIT
