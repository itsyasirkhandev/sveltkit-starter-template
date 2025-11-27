// Use when the user asks for a simple server-side form with Zod validation.
// This wraps the generic handleForm helper used in SvelteKit actions.

import type { RequestEvent } from '@sveltejs/kit';
import type { ZodSchema } from 'zod';

import { handleForm as baseHandleForm, type FormResult } from '../../server/forms';

export type { FormResult };

export async function handleFormWithSchema<T>(
	event: RequestEvent,
	schema: ZodSchema<T>,
	action: (data: T, event: RequestEvent) => Promise<void> | void
): Promise<FormResult<T>> {
	return baseHandleForm(event, schema, action);
}
