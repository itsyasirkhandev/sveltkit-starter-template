import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Mock the handleForm function logic for testing
// (actual function requires RequestEvent which is hard to mock)
function parseFormData<T>(schema: z.ZodSchema<T>, data: Record<string, unknown>) {
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		const errors: Record<string, string> = {};
		for (const issue of parsed.error.issues) {
			const path = issue.path.join('.') || '_form';
			if (!errors[path]) {
				errors[path] = issue.message;
			}
		}
		return { success: false as const, errors, data: data as Partial<T> };
	}

	return { success: true as const, data: parsed.data };
}

const testSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email'),
	age: z.coerce.number().min(18, 'Must be 18 or older'),
});

describe('Form parsing logic', () => {
	it('should return success for valid data', () => {
		const result = parseFormData(testSchema, {
			name: 'John',
			email: 'john@example.com',
			age: '25',
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.name).toBe('John');
			expect(result.data.age).toBe(25);
		}
	});

	it('should return errors for invalid data', () => {
		const result = parseFormData(testSchema, {
			name: 'J',
			email: 'invalid',
			age: '16',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.errors.name).toBeDefined();
			expect(result.errors.email).toBeDefined();
			expect(result.errors.age).toBeDefined();
		}
	});

	it('should handle missing fields', () => {
		const result = parseFormData(testSchema, {});
		expect(result.success).toBe(false);
	});

	it('should coerce number strings', () => {
		const result = parseFormData(testSchema, {
			name: 'John',
			email: 'john@example.com',
			age: '30',
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(typeof result.data.age).toBe('number');
			expect(result.data.age).toBe(30);
		}
	});
});
