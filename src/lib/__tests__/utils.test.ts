import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
	it('should merge class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('should handle conditional classes', () => {
		const isIncluded = true;
		const isExcluded = false;
		expect(cn('base', isIncluded && 'included', isExcluded && 'excluded')).toBe('base included');
	});

	it('should merge Tailwind classes correctly', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
	});

	it('should handle undefined and null values', () => {
		expect(cn('base', undefined, null, 'end')).toBe('base end');
	});

	it('should handle empty strings', () => {
		expect(cn('base', '', 'end')).toBe('base end');
	});

	it('should handle array of classes', () => {
		expect(cn(['foo', 'bar'])).toBe('foo bar');
	});
});
