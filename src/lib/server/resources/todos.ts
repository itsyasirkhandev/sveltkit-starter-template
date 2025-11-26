import { z } from 'zod';
import { addDocument, deleteDocument, getDocuments, updateDocument } from '$lib/firebase/firestore';

const COLLECTION = 'todos';

export const todoSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, 'Title is required'),
	completed: z.boolean().default(false),
	createdAt: z.any().optional(),
	updatedAt: z.any().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

export const createTodoSchema = z.object({
	title: z.string().min(1, 'Title is required'),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export async function listTodos(): Promise<Todo[]> {
	return getDocuments<Todo>(COLLECTION);
}

export async function createTodo(input: CreateTodoInput): Promise<string | null> {
	return addDocument(COLLECTION, {
		title: input.title,
		completed: false,
	});
}

export async function updateTodo(
	id: string,
	data: Partial<Pick<Todo, 'title' | 'completed'>>
): Promise<boolean> {
	return updateDocument(COLLECTION, id, data);
}

export async function deleteTodoById(id: string): Promise<boolean> {
	return deleteDocument(COLLECTION, id);
}
