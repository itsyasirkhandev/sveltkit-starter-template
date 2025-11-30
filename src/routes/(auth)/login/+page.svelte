<script lang="ts">
	import { goto } from '$app/navigation';
	import { loginSchema } from '$lib/schemas';
	import { authStore, toast } from '$lib';
	import { Mail } from '@lucide/svelte';

	type LoginErrors = {
		email?: string;
		password?: string;
		_form?: string;
	};

	let email = $state('');
	let password = $state('');
	let errors = $state<LoginErrors>({});
	let isSubmitting = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		errors = {};

		const result = loginSchema.safeParse({ email, password });
		if (!result.success) {
			const fieldErrors: LoginErrors = {};
			for (const issue of result.error.issues) {
				const path = issue.path[0]?.toString() ?? '_form';
				fieldErrors[path as keyof LoginErrors] = issue.message;
			}
			errors = fieldErrors;
			return;
		}

		isSubmitting = true;
		const ok = await authStore.signIn(email, password);
		isSubmitting = false;

		if (!ok) {
			const message = authStore.error ?? 'Failed to sign in';
			errors = { _form: message };
			toast.error(message);
			return;
		}

		toast.success('Signed in');
		goto('/dashboard');
	}

	async function handleGoogleSignIn() {
		isSubmitting = true;
		const ok = await authStore.signInWithGoogle();
		isSubmitting = false;

		if (!ok) {
			const message = authStore.error ?? 'Failed to sign in with Google';
			toast.error(message);
			return;
		}

		toast.success('Signed in with Google');
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
	<div class="mb-4">
		<h2 class="flex items-center gap-2 text-xl font-semibold">
			<Mail class="size-5" />
			<span>Sign in</span>
		</h2>
		<p class="text-sm text-muted-foreground">Use your email and password to access the app.</p>
	</div>

	<div class="space-y-4">
		{#if errors._form}
			<p class="text-sm text-destructive">{errors._form}</p>
		{/if}

		<form class="space-y-4" onsubmit={handleSubmit}>
			<div class="space-y-1">
				<label class="text-sm font-medium" for="email">Email</label>
				<input
					id="email"
					type="email"
					required
					autocomplete="email"
					bind:value={email}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
				{#if errors.email}
					<p class="text-xs text-destructive">{errors.email}</p>
				{/if}
			</div>

			<div class="space-y-1">
				<label class="text-sm font-medium" for="password">Password</label>
				<input
					id="password"
					type="password"
					required
					autocomplete="current-password"
					bind:value={password}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				/>
				{#if errors.password}
					<p class="text-xs text-destructive">{errors.password}</p>
				{/if}
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
			>
				{isSubmitting ? 'Signing in...' : 'Sign in'}
			</button>
		</form>

		<div class="flex items-center gap-2 text-xs text-muted-foreground">
			<span class="flex-1 h-px bg-border"></span>
			<span>OR</span>
			<span class="flex-1 h-px bg-border"></span>
		</div>

		<button
			onclick={handleGoogleSignIn}
			disabled={isSubmitting}
			class="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
		>
			Continue with Google
		</button>
	</div>
</div>
