// Use when the user asks for email/password authentication with Firebase Auth.
// Thin wrappers around the canonical authStore for consistent error handling.

import { authStore } from '../../stores/auth.svelte';

export interface AuthResult {
	ok: boolean;
	error?: string;
}

export async function signInWithEmailPassword(
	email: string,
	password: string
): Promise<AuthResult> {
	const ok = await authStore.signIn(email, password);
	return ok ? { ok: true } : { ok: false, error: authStore.error ?? 'Failed to sign in' };
}

export async function signUpWithEmailPassword(
	email: string,
	password: string,
	displayName?: string
): Promise<AuthResult> {
	const ok = await authStore.signUp(email, password, displayName);
	return ok ? { ok: true } : { ok: false, error: authStore.error ?? 'Failed to sign up' };
}
