import { firestore } from '$lib/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	orderBy,
	limit,
	onSnapshot,
	serverTimestamp,
	type DocumentData,
	type QueryConstraint,
	type Unsubscribe
} from 'firebase/firestore';

export type { DocumentData, Unsubscribe };

// Get a single document
export async function getDocument<T = DocumentData>(
	collectionName: string,
	docId: string
): Promise<T | null> {
	if (!firestore) return null;
	const docRef = doc(firestore, collectionName, docId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return { id: docSnap.id, ...docSnap.data() } as T;
	}
	return null;
}

// Get multiple documents with optional query constraints
export async function getDocuments<T = DocumentData>(
	collectionName: string,
	constraints: QueryConstraint[] = []
): Promise<T[]> {
	if (!firestore) return [];
	const q = query(collection(firestore, collectionName), ...constraints);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

// Add a new document
export async function addDocument<T extends DocumentData>(
	collectionName: string,
	data: T
): Promise<string | null> {
	if (!firestore) return null;
	const docRef = await addDoc(collection(firestore, collectionName), {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return docRef.id;
}

// Update a document
export async function updateDocument<T extends Partial<DocumentData>>(
	collectionName: string,
	docId: string,
	data: T
): Promise<boolean> {
	if (!firestore) return false;
	const docRef = doc(firestore, collectionName, docId);
	await updateDoc(docRef, {
		...data,
		updatedAt: serverTimestamp()
	});
	return true;
}

// Delete a document
export async function deleteDocument(collectionName: string, docId: string): Promise<boolean> {
	if (!firestore) return false;
	const docRef = doc(firestore, collectionName, docId);
	await deleteDoc(docRef);
	return true;
}

// Subscribe to real-time updates for a collection
export function subscribeToCollection<T = DocumentData>(
	collectionName: string,
	callback: (docs: T[]) => void,
	constraints: QueryConstraint[] = []
): Unsubscribe {
	if (!firestore) return () => {};
	const q = query(collection(firestore, collectionName), ...constraints);
	return onSnapshot(q, (snapshot) => {
		const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
		callback(docs);
	});
}

// Subscribe to real-time updates for a single document
export function subscribeToDocument<T = DocumentData>(
	collectionName: string,
	docId: string,
	callback: (doc: T | null) => void
): Unsubscribe {
	if (!firestore) return () => {};
	const docRef = doc(firestore, collectionName, docId);
	return onSnapshot(docRef, (snapshot) => {
		if (snapshot.exists()) {
			callback({ id: snapshot.id, ...snapshot.data() } as T);
		} else {
			callback(null);
		}
	});
}

// Re-export query helpers for convenience
export { where, orderBy, limit, serverTimestamp };
