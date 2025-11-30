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
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					Get Started
				</a>
				<a
					href="/dashboard"
					class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
				>
					Dashboard
				</a>
			</div>
		</div>
	</main>
</div>
