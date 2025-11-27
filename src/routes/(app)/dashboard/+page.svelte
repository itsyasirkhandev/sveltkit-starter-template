<script lang="ts">
	import { authStore } from '$lib';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { LogOut } from '@lucide/svelte';

	async function handleSignOut() {
		await authStore.signOut();
	}
</script>

<!-- Example: authenticated dashboard page.
	See $lib/patterns/auth and $lib/patterns/ui for patterns to build more complex areas. -->

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<Card>
		<CardHeader>
			<CardTitle>Welcome, {authStore.displayName}</CardTitle>
			<CardDescription>You are viewing an auth-protected page under the (app) route group.</CardDescription>
		</CardHeader>
		<CardContent class="flex items-center justify-between">
			<p class="text-sm text-muted-foreground">
				Use this dashboard as a template for new authenticated pages.
			</p>
			<Button variant="outline" size="sm" onclick={handleSignOut}>
				<LogOut class="mr-2 size-4" />
				Sign out
			</Button>
		</CardContent>
	</Card>
</main>
