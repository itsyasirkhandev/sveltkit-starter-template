// Use when the user asks for multi-step forms or onboarding wizards.
// This file provides generic types and helpers; adapt them inside your own routes/stores.

import type { ZodObject, ZodRawShape } from 'zod';

export interface MultiStepState<
	TStepKey extends string,
	TData extends Record<string, unknown>,
> {
	currentStep: TStepKey;
	completedSteps: TStepKey[];
	data: Partial<TData>;
}

export function mergeStepData<TData extends Record<string, unknown>>(
	previous: Partial<TData>,
	stepData: Partial<TData>
): Partial<TData> {
	return { ...previous, ...stepData };
}

export function createInitialMultiStepState<
	TStepKey extends string,
	TData extends Record<string, unknown>,
>(initialStep: TStepKey): MultiStepState<TStepKey, TData> {
	return {
		currentStep: initialStep,
		completedSteps: [],
		data: {},
	};
}

// This is a reference pattern: in real code, you may want to merge the shapes of your
// individual step schemas. Here we simply return the first schema to keep the helper generic.
export function combineStepSchemas<TShape extends ZodRawShape>(
	...schemas: ZodObject<TShape>[]
): ZodObject<TShape> {
	return schemas[0];
}
