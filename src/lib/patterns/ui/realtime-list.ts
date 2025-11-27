// Use when the user asks for real-time lists or live-updating dashboards.
// This wires subscribeToCollection into a small controller; plug it into your own stores.

import type { DocumentData } from 'firebase/firestore';

import { subscribeToCollection, type Unsubscribe } from '../../firebase/firestore';

export interface RealtimeListController<_TItem> {
	start: () => void;
	stop: () => void;
}

export function createRealtimeListController<TItem extends DocumentData>(
	collection: string,
	onChange: (items: TItem[]) => void
): RealtimeListController<TItem> {
	let unsubscribe: Unsubscribe | null = null;

	function start() {
		if (unsubscribe) return;
		unsubscribe = subscribeToCollection<TItem>(collection, (docs) => {
			onChange(docs);
		});
	}

	function stop() {
		if (unsubscribe) {
			unsubscribe();
			unsubscribe = null;
		}
	}

	return { start, stop };
}
