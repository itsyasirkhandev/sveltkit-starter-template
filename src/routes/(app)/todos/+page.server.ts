import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createTodo, createTodoSchema, listTodos } from '$lib/server/resources/todos';
import { handleForm } from '$lib/server/forms';

export const load: PageServerLoad = async () => {
	const todos = await listTodos();
	return { todos };
};

export const actions: Actions = {
	create: async (event) => {
		const result = await handleForm(event, createTodoSchema, async (data) => {
			await createTodo(data);
		});

		if (!result.success) {
			return fail(400, { errors: result.errors, data: result.data });
		}

		return { success: true };
	},
};
