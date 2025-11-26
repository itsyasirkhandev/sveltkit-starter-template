# SvelteKit + Firebase + Tailwind Template

A minimal SvelteKit template with Firebase and Tailwind CSS pre-configured.

## Tech Stack

- **SvelteKit 2** with Svelte 5
- **Firebase** (Auth & Firestore)
- **Tailwind CSS 4**
- **shadcn-svelte** (Button, Card, Input components included)
- **TypeScript**

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Configure Firebase:
   - Create a project at [Firebase Console](https://console.firebase.google.com)
   - Copy `.env.example` to `.env` and fill in your Firebase config

3. Run development server:
   ```sh
   npm run dev
   ```

## Adding UI Components

Add more shadcn-svelte components as needed:
```sh
npx shadcn-svelte@latest add [component]
```

## Building

```sh
npm run build
npm run preview
```

## Deployment

Configured for Vercel/Firebase Hosting. Deploy with:
```sh
firebase deploy --only hosting
```
