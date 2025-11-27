// Use when the user asks for Google sign-in / OAuth with Firebase Auth.
// Wraps the canonical authStore Google flow for predictable results.

import { authStore } from '../../stores/auth.svelte';

import type { AuthResult } from './email-password';

export async function signInWithGoogle(): Promise<AuthResult> {
	const ok = await authStore.signInWithGoogle();
	return ok
		? { ok: true }
		: { ok: false, error: authStore.error ?? 'Failed to sign in with Google' };
}
