# SvelteKit + Firebase + Tailwind Template

A modern, minimal SvelteKit template with Firebase backend and Tailwind CSS styling. Built with Svelte 5 runes and TypeScript for type-safe, reactive web applications.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit 2** with SSR/SSG support
- **Firebase** Authentication & Firestore
- **Tailwind CSS 4** with CSS variables theming
- **shadcn-svelte** UI components (Button, Card, Input included)
- **TypeScript** in strict mode
- **Zod** schema validation with example schemas
- **svelte-sonner** toast notifications
- **Prettier + ESLint** code formatting and linting
- **Dark mode** ready with CSS variables

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

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── lib/
│   ├── components/ui/     # shadcn-svelte components
│   ├── firebase/          # Firestore utilities
│   ├── schemas/           # Zod validation schemas
│   ├── stores/            # Svelte 5 stores
│   ├── firebase.ts        # Firebase initialization
│   ├── index.ts           # Library exports
│   └── utils.ts           # Utilities (cn helper)
├── routes/
│   ├── +layout.svelte     # Root layout (includes Toaster)
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
