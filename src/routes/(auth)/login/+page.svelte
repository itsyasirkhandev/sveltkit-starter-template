<script lang="ts">
	import { goto } from '$app/navigation';
	import { loginSchema } from '$lib/schemas';
	import { authStore, toast } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
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

<Card class="w-full max-w-md">
	<CardHeader>
		<CardTitle class="flex items-center gap-2">
			<Mail class="size-5" />
			<span>Sign in</span>
		</CardTitle>
		<CardDescription>Use your email and password to access the app.</CardDescription>
	</CardHeader>
	<CardContent class="space-y-4">
		{#if errors._form}
			<p class="text-sm text-destructive">{errors._form}</p>
		{/if}
		<form class="space-y-4" onsubmit={handleSubmit}>
			<div class="space-y-1">
				<label class="text-sm font-medium" for="email">Email</label>
				<Input
					id="email"
					type="email"
					required
					autocomplete="email"
					bind:value={email}
				/>
				{#if errors.email}
					<p class="text-xs text-destructive">{errors.email}</p>
				{/if}
			</div>
			<div class="space-y-1">
				<label class="text-sm font-medium" for="password">Password</label>
				<Input
					id="password"
					type="password"
					required
					autocomplete="current-password"
					bind:value={password}
				/>
				{#if errors.password}
					<p class="text-xs text-destructive">{errors.password}</p>
				{/if}
			</div>
			<Button type="submit" class="w-full" disabled={isSubmitting}>
				{#if isSubmitting}
					<span>Signing in...</span>
				{:else}
					<span>Sign in</span>
				{/if}
			</Button>
		</form>
		<div class="flex items-center gap-2 text-xs text-muted-foreground">
			<span class="flex-1 h-px bg-border"></span>
			<span>OR</span>
			<span class="flex-1 h-px bg-border"></span>
		</div>
		<Button variant="outline" class="w-full" onclick={handleGoogleSignIn} disabled={isSubmitting}>
			<span>Continue with Google</span>
		</Button>
	</CardContent>
</Card>
