import { describe, it, expect } from 'vitest';
import { loginSchema, signUpSchema } from '../schemas';

describe('loginSchema', () => {
	it('should validate correct login data', () => {
		const result = loginSchema.safeParse({
			email: 'test@example.com',
			password: 'password123',
		});
		expect(result.success).toBe(true);
	});

	it('should reject invalid email', () => {
		const result = loginSchema.safeParse({
			email: 'invalid-email',
			password: 'password123',
		});
		expect(result.success).toBe(false);
	});

	it('should reject short password', () => {
		const result = loginSchema.safeParse({
			email: 'test@example.com',
			password: '12345',
		});
		expect(result.success).toBe(false);
	});

	it('should reject empty email', () => {
		const result = loginSchema.safeParse({
			email: '',
			password: 'password123',
		});
		expect(result.success).toBe(false);
	});

	it('should reject missing fields', () => {
		const result = loginSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});

describe('signUpSchema', () => {
	it('should validate correct signup data', () => {
		const result = signUpSchema.safeParse({
			email: 'test@example.com',
			password: 'password123',
			confirmPassword: 'password123',
		});
		expect(result.success).toBe(true);
	});

	it('should validate with optional displayName', () => {
		const result = signUpSchema.safeParse({
			email: 'test@example.com',
			password: 'password123',
			confirmPassword: 'password123',
			displayName: 'John Doe',
		});
		expect(result.success).toBe(true);
	});

	it('should reject mismatched passwords', () => {
		const result = signUpSchema.safeParse({
			email: 'test@example.com',
			password: 'password123',
			confirmPassword: 'different',
		});
		expect(result.success).toBe(false);
	});

	it('should reject short displayName', () => {
		const result = signUpSchema.safeParse({
			email: 'test@example.com',
			password: 'password123',
			confirmPassword: 'password123',
			displayName: 'J',
		});
		expect(result.success).toBe(false);
	});
});
