// Use when the user asks for parent/child relations like project -> tasks.
// These helpers keep the Firestore query logic in one place.

import type { DocumentData } from 'firebase/firestore';

import { getDocuments, where } from '../../firebase/firestore';

export async function listChildrenByParentId<TChild extends DocumentData>(
	childCollection: string,
	parentField: string,
	parentId: string
): Promise<TChild[]> {
	return getDocuments<TChild>(childCollection, [where(parentField, '==', parentId)]);
}
