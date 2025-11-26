import { json } from '@sveltejs/kit';
import { createTodo, createTodoSchema, listTodos } from '$lib/server/resources/todos';

export async function GET() {
	const todos = await listTodos();
	return json({ ok: true, data: todos });
}

export async function POST({ request }: { request: Request }) {
	const body = await request.json().catch(() => null);
	const parsed = createTodoSchema.safeParse(body);
	if (!parsed.success) {
		return json(
			{
				ok: false,
				error: 'Invalid payload',
				issues: parsed.error.issues,
			},
			{ status: 400 },
		);
	}

	const id = await createTodo(parsed.data);
	return json({ ok: true, data: { id } }, { status: 201 });
}
