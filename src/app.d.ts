// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		interface Locals {
			userId?: string;
			userEmail?: string;
		}
		interface PageData {
			title?: string;
			description?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
