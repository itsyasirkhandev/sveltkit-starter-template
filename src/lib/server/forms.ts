import type { RequestEvent } from '@sveltejs/kit';
import type { ZodSchema } from 'zod';

export interface FormSuccess<T> {
	success: true;
	data: T;
}

export interface FormError<T> {
	success: false;
	errors: Record<string, string>;
	data?: Partial<T>;
}

export type FormResult<T> = FormSuccess<T> | FormError<T>;

export async function handleForm<T>(
	event: RequestEvent,
	schema: ZodSchema<T>,
	action: (data: T, event: RequestEvent) => Promise<void> | void
): Promise<FormResult<T>> {
	const formData = await event.request.formData();
	const raw = Object.fromEntries(formData) as Record<string, unknown>;
	const parsed = schema.safeParse(raw);

	if (!parsed.success) {
		const errors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const path = issue.path.join('.') || '_form';
			if (!errors[path]) {
				errors[path] = issue.message;
			}
		}
		return { success: false, errors, data: raw as Partial<T> };
	}

	await action(parsed.data, event);
	return { success: true, data: parsed.data };
}
