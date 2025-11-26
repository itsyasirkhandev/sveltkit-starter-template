import { subscribeToCollection, type Unsubscribe } from '$lib/firebase/firestore';
import { createTodo, deleteTodoById, listTodos, updateTodo, type Todo } from '$lib/server/resources/todos';

class TodosStore {
	items = $state<Todo[]>([]);
	loading = $state(false);
	error = $state<string | null>(null);

	private unsubscribe: Unsubscribe | null = null;

	async loadOnce(): Promise<void> {
		this.loading = true;
		this.error = null;
		try {
			this.items = await listTodos();
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to load todos';
		} finally {
			this.loading = false;
		}
	}

	subscribeRealtime(): void {
		if (this.unsubscribe) return;
		this.unsubscribe = subscribeToCollection<Todo>('todos', (docs) => {
			this.items = docs;
		});
	}

	dispose(): void {
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}

	async add(title: string): Promise<boolean> {
		this.error = null;
		try {
			await createTodo({ title });
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to create todo';
			return false;
		}
	}

	async toggle(id: string): Promise<boolean> {
		const current = this.items.find((item) => item.id === id);
		if (!current) return false;
		try {
			await updateTodo(id, { completed: !current.completed });
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to update todo';
			return false;
		}
	}

	async remove(id: string): Promise<boolean> {
		this.error = null;
		try {
			await deleteTodoById(id);
			return true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to delete todo';
			return false;
		}
	}
}

export const todosStore = new TodosStore();
