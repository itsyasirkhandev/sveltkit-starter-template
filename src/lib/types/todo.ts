export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	createdAt: Date;
	priority: 'low' | 'medium' | 'high';
}

export type FilterType = 'all' | 'active' | 'completed';
export type PriorityType = 'low' | 'medium' | 'high';
export type SortType = 'date' | 'priority' | 'alphabetical';
