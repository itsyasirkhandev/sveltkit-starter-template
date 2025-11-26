import { auth } from '$lib/firebase';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	type User,
} from 'firebase/auth';
import { browser } from '$app/environment';

class AuthStore {
	user = $state<User | null>(null);
	loading = $state(true);
	error = $state<string | null>(null);

	constructor() {
		if (browser && auth) {
			onAuthStateChanged(auth, (user) => {
				this.user = user;
				this.loading = false;
			});
		} else {
			this.loading = false;
		}
	}

	get isAuthenticated(): boolean {
		return !!this.user;
	}

	get displayName(): string {
		return this.user?.displayName || this.user?.email?.split('@')[0] || 'User';
	}

	async signIn(email: string, password: string): Promise<boolean> {
		if (!auth) return false;
		this.error = null;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to sign in';
			return false;
		}
	}

	async signUp(email: string, password: string, displayName?: string): Promise<boolean> {
		if (!auth) return false;
		this.error = null;
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			if (displayName) {
				await updateProfile(user, { displayName });
			}
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to sign up';
			return false;
		}
	}

	async signInWithGoogle(): Promise<boolean> {
		if (!auth) return false;
		this.error = null;
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to sign in with Google';
			return false;
		}
	}

	async signOut(): Promise<void> {
		if (!auth) return;
		await firebaseSignOut(auth);
	}

	clearError(): void {
		this.error = null;
	}
}

export const authStore = new AuthStore();
