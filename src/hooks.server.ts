import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	const message =
		error instanceof Error
			? error.message
			: typeof error === 'string'
				? error
				: 'Unknown error';
	const stack = error instanceof Error ? error.stack ?? undefined : undefined;

	console.error('(SERVER-RUNTIME-ERROR)', {
		url: event.url.toString(),
		message,
		stack,
	});

	return {
		message: 'An unexpected error occurred',
	};
};
