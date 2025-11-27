<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { toast } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { CheckSquare, Plus, Square } from '@lucide/svelte';

	let { data, form } = $props<{ data: PageData; form?: ActionData }>();

	let title = $state('');

	const handleEnhance: SubmitFunction = async ({ formData, action, cancel: _cancel, submitter: _submitter }) => {
		const response = await fetch(action, {
			method: 'POST',
			body: formData,
		});
		const result = await response.json();
		
		if (result.type === 'success') {
			toast.success('Todo created');
			title = '';
		}
		if (result.type === 'failure') {
			toast.error('Please fix the form errors');
		}
		return result;
	};
</script>

<!-- Example: Firestore CRUD page for a todos collection.
	See $lib/patterns/resources and $lib/patterns/forms for generic patterns. -->

<svelte:head>
	<title>Todos</title>
</svelte:head>

<main class="container mx-auto px-4 py-8 space-y-6">
	<Card>
		<CardHeader>
			<CardTitle>Todos</CardTitle>
			<CardDescription>
				Example CRUD page backed by Firestore using the todos resource module and generic form handler.
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<form
				class="flex flex-col gap-3 sm:flex-row"
				method="POST"
				action="?/create"
				use:enhance={handleEnhance}
			>
				<div class="flex-1 space-y-1">
					<label class="text-sm font-medium" for="title">New todo</label>
					<Input
						id="title"
						name="title"
						placeholder="Add a task..."
						required
						bind:value={title}
					/>
					{#if form?.errors?.title}
						<p class="text-xs text-destructive">{form.errors.title}</p>
					{/if}
				</div>
				<Button type="submit" class="mt-2 sm:mt-7 sm:self-start">
					<Plus class="mr-2 size-4" />
					<span>Add</span>
				</Button>
			</form>
			{#if form?.errors?._form}
				<p class="text-xs text-destructive">{form.errors._form}</p>
			{/if}
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Current todos</CardTitle>
			<CardDescription>Data is loaded from Firestore in +page.server.ts via the todos resource module.</CardDescription>
		</CardHeader>
		<CardContent>
			{#if !data.todos || data.todos.length === 0}
				<p class="text-sm text-muted-foreground">No todos yet. Add your first task above.</p>
			{:else}
				<ul class="space-y-2">
					{#each data.todos as todo (todo.id)}
						<li class="flex items-center gap-2 text-sm">
							{#if todo.completed}
								<CheckSquare class="size-4 text-primary" />
							{:else}
								<Square class="size-4 text-muted-foreground" />
							{/if}
							<span>{todo.title}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</CardContent>
	</Card>
</main>
