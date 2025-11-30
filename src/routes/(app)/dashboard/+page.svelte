<script lang="ts">
	import { authStore } from '$lib';
	import { LogOut } from '@lucide/svelte';

	async function handleSignOut() {
		await authStore.signOut();
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<div class="rounded-lg border bg-card p-6 shadow-sm">
		<div class="mb-4">
			<h2 class="text-xl font-semibold">Welcome, {authStore.displayName || 'User'}</h2>
			<p class="text-sm text-muted-foreground">
				You are viewing an auth-protected page under the (app) route group.
			</p>
		</div>
		<div class="flex items-center justify-between">
			<p class="text-sm text-muted-foreground">
				Start building your app from here.
			</p>
			<button
				onclick={handleSignOut}
				class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
			>
				<LogOut class="mr-2 size-4" />
				Sign out
			</button>
		</div>
	</div>
</main>
