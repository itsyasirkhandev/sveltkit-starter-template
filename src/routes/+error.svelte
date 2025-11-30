<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} | My App</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
	<div class="text-center max-w-md">
		<h1 class="text-6xl font-bold text-destructive mb-4">{page.status}</h1>
		<h2 class="text-2xl font-semibold mb-4">
			{#if page.status === 404}
				Page Not Found
			{:else}
				Something went wrong
			{/if}
		</h2>
		<p class="text-muted-foreground mb-8">
			{#if page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else}
				{page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>
		<a
			href="/"
			class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
		>
			Go Home
		</a>
	</div>
</div>
