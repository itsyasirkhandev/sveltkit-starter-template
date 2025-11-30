const MAX_STACK_LENGTH = 2000;

type ClientErrorPayload = {
	kind?: string;
	message?: string;
	stack?: string;
	url?: string;
	userAgent?: string;
};

export async function POST({ request }: { request: Request }) {
	let rawBody: unknown;
	try {
		rawBody = await request.json();
	} catch (error) {
		console.error('(CLIENT-RUNTIME-ERROR)', {
			parseError: 'Invalid JSON body for /api/client-error',
			message: error instanceof Error ? error.message : String(error),
		});
		return new Response(null, { status: 400 });
	}

	const body = (rawBody ?? {}) as Record<string, unknown>;

	const payload: ClientErrorPayload = {
		kind: typeof body.kind === 'string' ? body.kind : undefined,
		message: typeof body.message === 'string' ? body.message : undefined,
		stack:
			typeof body.stack === 'string'
				? body.stack.slice(0, MAX_STACK_LENGTH)
				: undefined,
		url: typeof body.url === 'string' ? body.url : undefined,
		userAgent: typeof body.userAgent === 'string' ? body.userAgent : undefined,
	};

	console.error('(CLIENT-RUNTIME-ERROR)', payload);

	return new Response(null, { status: 204 });
}
