import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { firestore, auth } from '$lib/firebase';
import type { Todo, FilterType, PriorityType, SortType } from '$lib/types/todo';
import type { Unsubscribe } from 'firebase/firestore';

class FirebaseTodoStore {
	private _filter = $state<FilterType>('all');
	private _sortBy = $state<SortType>('date');
	private _todos = $state<Todo[]>([]);
	private _loading = $state(true);
	private _error = $state<string | null>(null);
	
	private unsubscribe: Unsubscribe | null = null;

	get todos() {
		return this._todos;
	}

	get filter() {
		return this._filter;
	}

	get sortBy() {
		return this._sortBy;
	}

	get loading() {
		return this._loading;
	}

	get error() {
		return this._error;
	}

	get filteredTodos() {
		let filtered = [...this._todos];

		if (this._filter === 'active') {
			filtered = filtered.filter((todo) => !todo.completed);
		} else if (this._filter === 'completed') {
			filtered = filtered.filter((todo) => todo.completed);
		}

		filtered.sort((a, b) => {
			switch (this._sortBy) {
				case 'priority': {
					const priorityOrder = { high: 0, medium: 1, low: 2 };
					return priorityOrder[a.priority] - priorityOrder[b.priority];
				}
				case 'alphabetical':
					return a.text.localeCompare(b.text);
				case 'date':
				default:
					return b.createdAt.getTime() - a.createdAt.getTime();
			}
		});

		return filtered;
	}

	get activeCount() {
		return this._todos.filter((todo) => !todo.completed).length;
	}

	get completedCount() {
		return this._todos.filter((todo) => todo.completed).length;
	}

	get totalCount() {
		return this._todos.length;
	}

	get completionPercentage() {
		if (this._todos.length === 0) return 0;
		return Math.round((this.completedCount / this._todos.length) * 100);
	}

	subscribeToTodos(userId: string) {
		this._loading = true;
		this._error = null;
		
		try {
			if (!firestore) {
				this._error = 'Firestore not initialized';
				this._loading = false;
				return;
			}

			const todosRef = collection(firestore, `users/${userId}/todos`);
			
			this.unsubscribe = onSnapshot(todosRef, (snapshot) => {
				this._todos = snapshot.docs.map(doc => {
					const data = doc.data();
					return {
						id: doc.id,
						text: data.text,
						completed: data.completed,
						priority: data.priority,
						createdAt: data.createdAt instanceof Timestamp 
							? data.createdAt.toDate() 
							: new Date(data.createdAt)
					} as Todo;
				});
				this._loading = false;
			}, (error) => {
				this._error = error.message;
				this._loading = false;
			});
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to load todos';
			this._loading = false;
		}
	}

	unsubscribeFromTodos() {
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
		this._todos = [];
		this._loading = false;
	}

	async addTodo(text: string, priority: PriorityType = 'medium') {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		try {

			const todosRef = collection(firestore, `users/${user.uid}/todos`);
			await addDoc(todosRef, {
				text,
				completed: false,
				createdAt: Timestamp.now(),
				priority
			});
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to add todo';
		}
	}

	async updateTodo(id: string, text: string) {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		try {
			const todoRef = doc(firestore, `users/${user.uid}/todos/${id}`);
			await updateDoc(todoRef, { text });
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to update todo';
		}
	}

	async toggleTodo(id: string) {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		const todo = this._todos.find((t) => t.id === id);
		if (!todo) return;

		try {
			const todoRef = doc(firestore, `users/${user.uid}/todos/${id}`);
			await updateDoc(todoRef, { completed: !todo.completed });
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to toggle todo';
		}
	}

	async setPriority(id: string, priority: PriorityType) {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		try {
			const todoRef = doc(firestore, `users/${user.uid}/todos/${id}`);
			await updateDoc(todoRef, { priority });
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to set priority';
		}
	}

	async deleteTodo(id: string) {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		try {
			const todoRef = doc(firestore, `users/${user.uid}/todos/${id}`);
			await deleteDoc(todoRef);
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to delete todo';
		}
	}

	async clearCompleted() {
		const user = auth?.currentUser;
		if (!user || !firestore) return;

		const completedTodos = this._todos.filter((todo) => todo.completed);
		
		try {
			await Promise.all(
				completedTodos.map((todo) => {
					const todoRef = doc(firestore!, `users/${user.uid}/todos/${todo.id}`);
					return deleteDoc(todoRef);
				})
			);
		} catch (err) {
			this._error = err instanceof Error ? err.message : 'Failed to clear completed';
		}
	}

	setFilter(filter: FilterType) {
		this._filter = filter;
	}

	setSortBy(sortBy: SortType) {
		this._sortBy = sortBy;
	}
}

export const firebaseTodoStore = new FirebaseTodoStore();
