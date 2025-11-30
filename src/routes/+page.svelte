<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>My App</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground flex flex-col">
	<main class="flex-1 flex items-center justify-center px-4">
		<div class="text-center max-w-md">
			<h1 class="text-4xl font-bold mb-4">Welcome</h1>
			<p class="text-muted-foreground mb-8">
				Your SvelteKit + Firebase starter template is ready. Start building your app.
			</p>
			<div class="flex justify-center gap-3">
				<Button href="/login">Get Started</Button>
				<Button variant="outline" href="/dashboard">Dashboard</Button>
			</div>
		</div>
	</main>
</div>
