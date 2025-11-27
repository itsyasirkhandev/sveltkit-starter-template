// Use for Firestore-backed resources like todos, projects, notes, etc.
// This is a generic CRUD pattern built on top of the Firestore helpers.

import type { DocumentData } from 'firebase/firestore';
import type { ZodSchema } from 'zod';

import { addDocument, deleteDocument, getDocuments, updateDocument } from '../../firebase/firestore';

export interface CollectionConfig<TCreate, TUpdate> {
	collection: string;
	createSchema?: ZodSchema<TCreate>;
	updateSchema?: ZodSchema<TUpdate>;
}

export interface CollectionResource<TDoc, TCreate, TUpdate> {
	list: () => Promise<TDoc[]>;
	create: (input: TCreate) => Promise<string | null>;
	update: (id: string, data: TUpdate) => Promise<boolean>;
	remove: (id: string) => Promise<boolean>;
}

export function createCollectionResource<
	TDoc extends DocumentData,
	TCreate = unknown,
	TUpdate = Partial<TDoc>,
>(config: CollectionConfig<TCreate, TUpdate>): CollectionResource<TDoc, TCreate, TUpdate> {
	const { collection, createSchema, updateSchema } = config;

	return {
		async list() {
			return getDocuments<TDoc>(collection);
		},
		async create(input) {
			if (createSchema) {
				const parsed = createSchema.safeParse(input);
				if (!parsed.success) {
					throw parsed.error;
				}
			}

			return addDocument(collection, input as DocumentData);
		},
		async update(id, data) {
			if (updateSchema) {
				const parsed = updateSchema.safeParse(data);
				if (!parsed.success) {
					throw parsed.error;
				}
			}

			return updateDocument(collection, id, data as Partial<DocumentData>);
		},
		async remove(id) {
			return deleteDocument(collection, id);
		},
	};
}
