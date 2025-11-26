import { describe, expect, it } from 'vitest';
import { createTodoSchema } from '$lib/server/resources/todos';

describe('createTodoSchema', () => {
	it('accepts a valid title', () => {
		const result = createTodoSchema.safeParse({ title: 'Test todo' });
		expect(result.success).toBe(true);
	});

	it('rejects an empty title', () => {
		const result = createTodoSchema.safeParse({ title: '' });
		expect(result.success).toBe(false);
		if (result.success) return;
		expect(result.error.issues[0]?.message).toBe('Title is required');
	});
});
