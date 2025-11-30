<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';

	let { children } = $props();

	type ClientErrorPayload = {
		kind: 'error' | 'unhandledrejection';
		message: string;
		stack?: string;
		url?: string;
	};

	function sendClientError(payload: ClientErrorPayload) {
		if (typeof window === 'undefined') return;

		try {
			const body = JSON.stringify({
				...payload,
				url: payload.url ?? window.location.href,
				userAgent: navigator.userAgent,
			});

			if ('sendBeacon' in navigator) {
				const blob = new Blob([body], { type: 'application/json' });
				navigator.sendBeacon('/api/client-error', blob);
			} else {
				void fetch('/api/client-error', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body,
					keepalive: true,
				});
			}
		} catch {
			// ignore client error reporting failures
		}
	}

	onMount(() => {
		const handleError = (event: ErrorEvent) => {
			if (!event) return;

			sendClientError({
				kind: 'error',
				message: event.message ?? 'Unknown error',
				stack: event.error instanceof Error ? event.error.stack ?? undefined : undefined,
				url: window.location.href,
			});
		};

		const handleRejection = (event: PromiseRejectionEvent) => {
			if (!event) return;

			const reason = event.reason;
			let message = 'Unhandled promise rejection';
			let stack: string | undefined;

			if (reason instanceof Error) {
				message = reason.message;
				stack = reason.stack ?? undefined;
			} else if (typeof reason === 'string') {
				message = reason;
			}

			sendClientError({
				kind: 'unhandledrejection',
				message,
				stack,
				url: window.location.href,
			});
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleRejection);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="bg-background text-foreground min-h-screen">
	{@render children()}
</div>

<Toaster richColors position="top-right" />
