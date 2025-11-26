import type { Todo, FilterType, PriorityType, SortType } from '$lib/types/todo';
import { browser } from '$app/environment';

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
	if (!browser) return [];
	const stored = localStorage.getItem(STORAGE_KEY);
	if (!stored) return [];
	try {
		const parsed = JSON.parse(stored);
		return parsed.map((todo: any) => ({
			...todo,
			createdAt: new Date(todo.createdAt),
			priority: todo.priority || 'medium'
		}));
	} catch {
		return [];
	}
}

function saveTodos(todos: Todo[]) {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
}

class TodoStore {
	todos = $state<Todo[]>(loadTodos());
	filter = $state<FilterType>('all');
	sortBy = $state<SortType>('date');

	get filteredTodos(): Todo[] {
		let filtered = this.todos;
		
		switch (this.filter) {
			case 'active':
				filtered = this.todos.filter((todo) => !todo.completed);
				break;
			case 'completed':
				filtered = this.todos.filter((todo) => todo.completed);
				break;
			default:
				filtered = this.todos;
		}

		return this.sortTodos(filtered);
	}

	get activeCount(): number {
		return this.todos.filter((todo) => !todo.completed).length;
	}

	get completedCount(): number {
		return this.todos.filter((todo) => todo.completed).length;
	}

	get totalCount(): number {
		return this.todos.length;
	}

	get completionPercentage(): number {
		if (this.totalCount === 0) return 0;
		return Math.round((this.completedCount / this.totalCount) * 100);
	}

	private sortTodos(todos: Todo[]): Todo[] {
		const sorted = [...todos];
		switch (this.sortBy) {
			case 'priority':
				const priorityOrder = { high: 0, medium: 1, low: 2 };
				return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
			case 'alphabetical':
				return sorted.sort((a, b) => a.text.localeCompare(b.text));
			case 'date':
			default:
				return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		}
	}

	addTodo(text: string, priority: PriorityType = 'medium') {
		if (!text.trim()) return;
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			text: text.trim(),
			completed: false,
			createdAt: new Date(),
			priority
		};
		this.todos = [...this.todos, newTodo];
		saveTodos(this.todos);
	}

	updateTodo(id: string, text: string) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? { ...todo, text: text.trim() } : todo
		);
		saveTodos(this.todos);
	}

	toggleTodo(id: string) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		saveTodos(this.todos);
	}

	setPriority(id: string, priority: PriorityType) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? { ...todo, priority } : todo
		);
		saveTodos(this.todos);
	}

	deleteTodo(id: string) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
		saveTodos(this.todos);
	}

	clearCompleted() {
		this.todos = this.todos.filter((todo) => !todo.completed);
		saveTodos(this.todos);
	}

	setFilter(newFilter: FilterType) {
		this.filter = newFilter;
	}

	setSortBy(newSort: SortType) {
		this.sortBy = newSort;
	}
}

export const todoStore = new TodoStore();
