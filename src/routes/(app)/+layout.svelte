<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib';

	let { children } = $props();

	$effect(() => {
		if (!browser) return;
		if (!authStore.loading && !authStore.isAuthenticated) {
			goto('/login');
		}
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
</div>
