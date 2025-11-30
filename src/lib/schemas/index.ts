import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginForm = z.infer<typeof loginSchema>;

// Sign up form schema
export const signUpSchema = loginSchema
	.extend({
		confirmPassword: z.string(),
		displayName: z.string().min(2).optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type SignUpForm = z.infer<typeof signUpSchema>;
