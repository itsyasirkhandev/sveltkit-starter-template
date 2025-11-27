// Use when the user asks for list + detail layouts (e.g. sidebar list + main panel).
// These are generic state helpers; wire them into Svelte 5 runes stores or components.

export interface ListDetailState<TItem, TId = string> {
	items: TItem[];
	selectedId: TId | null;
	isLoading: boolean;
}

export function createInitialListDetailState<TItem, TId = string>(): ListDetailState<TItem, TId> {
	return {
		items: [],
		selectedId: null,
		isLoading: false,
	};
}

export function setItems<TItem, TId = string>(
	state: ListDetailState<TItem, TId>,
	items: TItem[],
): ListDetailState<TItem, TId> {
	return { ...state, items };
}

export function selectItem<TItem, TId = string>(
	state: ListDetailState<TItem, TId>,
	id: TId | null,
): ListDetailState<TItem, TId> {
	return { ...state, selectedId: id };
}

export function setLoading<TItem, TId = string>(
	state: ListDetailState<TItem, TId>,
	isLoading: boolean,
): ListDetailState<TItem, TId> {
	return { ...state, isLoading };
}
