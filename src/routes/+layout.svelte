<script lang="ts">
	import './layout.css';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();

	const siteConfig = {
		name: 'My App',
		description: 'A modern SvelteKit + Firebase starter template',
		url: 'https://example.com',
		ogImage: '/og-image.png',
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content={siteConfig.description} />
	<meta name="author" content={siteConfig.name} />

	<!-- Favicon -->
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteConfig.url} />
	<meta property="og:title" content={siteConfig.name} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:image" content={siteConfig.ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={siteConfig.url} />
	<meta name="twitter:title" content={siteConfig.name} />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content={siteConfig.ogImage} />

	<!-- Theme Color -->
	<meta name="theme-color" content="#ff3e00" />
</svelte:head>

<div class="bg-background text-foreground min-h-screen">
	{@render children()}
</div>

<Toaster richColors position="top-right" />
