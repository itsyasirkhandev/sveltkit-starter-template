<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	
	import { Moon, Sun, Zap, Database, Cloud, Palette, Shield, Rocket, Code } from '@lucide/svelte';

	let darkMode = $state(false);

	function toggleTheme() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	const techStack = [
		{
			name: 'SvelteKit',
			version: '2.x',
			description: 'Full-stack framework with file-based routing',
			icon: Rocket,
			category: 'Framework',
			features: ['SSR', 'API routes', 'File-based routing', 'Edge deployment']
		},
		{
			name: 'Svelte',
			version: '5.x',
			description: 'UI framework with Runes reactivity',
			icon: Zap,
			category: 'UI Framework',
			features: ['Runes', 'No Virtual DOM', 'Compile-time optimization', 'Component-based']
		},
		{
			name: 'TypeScript',
			version: '5.x',
			description: 'Type-safe JavaScript with strict mode',
			icon: Code,
			category: 'Language',
			features: ['Static typing', 'IntelliSense', 'Better refactoring', 'Compile-time errors']
		},
		{
			name: 'Firebase',
			version: '12.x',
			description: 'Authentication and Firestore backend',
			icon: Cloud,
			category: 'Backend',
			features: ['Auth', 'Firestore', 'Real-time database', 'Hosted services']
		},
		{
			name: 'Tailwind CSS',
			version: '4.x',
			description: 'Utility-first CSS framework',
			icon: Palette,
			category: 'Styling',
			features: ['Utility classes', 'responsive design', 'custom themes', 'dark mode']
		},
		{
			name: 'shadcn-svelte',
			version: 'latest',
			description: 'Accessible UI component library',
			icon: Shield,
			category: 'Components',
			features: ['Accessible', 'Customizable', 'Modern design', 'TypeScript support']
		}
	];
</script>

<svelte:head>
	<title>Tech Stack Showcase</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<header class="border-b bg-card">
		<div class="container mx-auto px-4 py-6">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-3xl font-bold text-foreground">Tech Stack Showcase</h1>
					<p class="text-muted-foreground mt-1">Modern full-stack template built with cutting-edge technologies</p>
				</div>
				<div class="flex items-center gap-3">
					<Sun class="size-5 text-muted-foreground" />
					<Button variant="outline" size="sm" onclick={toggleTheme}>
						{darkMode ? '🌙' : '☀️'}
					</Button>
					<Moon class="size-5 text-muted-foreground" />
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto px-4 py-8">
		<!-- Hero Section -->
		<section class="text-center mb-12">
			<h2 class="text-2xl font-semibold mb-4">Clean Slate Theme</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto mb-6">
				Experience the clean-slate theme with OKLCH color values, providing better color consistency
				and enhanced visual hierarchy across light and dark modes.
			</p>
			<div class="flex justify-center gap-3">
				<Button size="sm">Primary</Button>
				<Button variant="secondary" size="sm">Secondary</Button>
				<Button variant="outline" size="sm">Outline</Button>
				<Button variant="destructive" size="sm">Destructive</Button>
			</div>
		</section>

		<!-- Tech Stack Grid -->
		<section class="mb-12">
			<h3 class="text-xl font-semibold mb-6 text-center">Powered Technologies</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each techStack as tech (tech.name)}
					{@const IconComponent = tech.icon}
					<Card class="h-full hover:shadow-lg transition-shadow duration-200">
						<CardHeader>
							<div class="flex items-center gap-3">
								<div class="p-2 rounded-lg bg-primary/10">
									<IconComponent class="size-6 text-primary" />
								</div>
								<div class="flex-1">
									<CardTitle class="text-lg">{tech.name}</CardTitle>
									<CardDescription>{tech.category}</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div class="text-xs font-medium text-muted-foreground mb-3">
						Version: {tech.version}
					</div>
							<p class="text-sm text-muted-foreground mb-4">{tech.description}</p>
							<div class="space-y-2">
								{#each tech.features as feature}
									<div class="flex items-center gap-2 text-sm">
										<div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
										<span class="text-foreground">{feature}</span>
									</div>
								{/each}
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</section>

		<!-- Typography Section -->
		<section class="mb-12">
			<h3 class="text-xl font-semibold mb-6 text-center">Typography & Components</h3>
			<Card>
				<CardHeader>
					<CardTitle>Component Showcase</CardTitle>
					<CardDescription>Interactive demonstration of shadcn-svelte components</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div>
						<h4 class="text-lg font-medium mb-3">Buttons</h4>
						<div class="flex flex-wrap gap-3">
							<Button>Default</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="link">Link</Button>
						</div>
					</div>

					<div>
						<h4 class="text-lg font-medium mb-3">Small Buttons</h4>
						<div class="flex flex-wrap gap-2">
							<Button size="sm">Default</Button>
							<Button variant="secondary" size="sm">Secondary</Button>
							<Button variant="outline" size="sm">Outline</Button>
							<Button variant="destructive" size="sm">Destructive</Button>
						</div>
					</div>

					<div>
						<h4 class="text-lg font-medium mb-3">Text Styles</h4>
						<div class="space-y-2">
							<p class="text-sm text-muted-foreground">Small muted text</p>
							<p class="text-base">Regular paragraph text</p>
							<p class="text-lg font-medium">Large medium text</p>
							<p class="text-xl font-semibold">Extra large semibold text</p>
							<p class="text-2xl font-bold">2xl bold heading</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t bg-muted/30">
		<div class="container mx-auto px-4 py-6 text-center">
			<p class="text-sm text-muted-foreground">
				Built with SvelteKit + Firebase + Tailwind CSS + shadcn-svelte
			</p>
		</div>
	</footer>
</div>
