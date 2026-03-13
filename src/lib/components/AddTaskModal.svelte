<script lang="ts">
	import Modal from './Modal.svelte';
	import { tasks, type TaskPriority, type TaskSource, type TaskStatus } from '$lib/stores/tasks';

	let { open = $bindable(false) }: { open: boolean } = $props();

	let title = $state('');
	let source: TaskSource = $state('Manual');
	let priority: TaskPriority = $state('medium');
	let status: TaskStatus = $state('pending');

	function submit() {
		if (!title.trim()) return;
		tasks.add({ title: title.trim(), source, priority, status });
		title = '';
		source = 'Manual';
		priority = 'medium';
		status = 'pending';
		open = false;
	}

	const sources: TaskSource[] = ['Manual', 'GitHub', 'Gmail', 'Outlook', 'Calendar'];
	const priorities: TaskPriority[] = ['low', 'medium', 'high'];
	const statuses: TaskStatus[] = ['pending', 'in-progress', 'completed'];

	const inputClass = 'w-full rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-surface-100 outline-none transition focus:border-chamomile-400 focus:ring-1 focus:ring-chamomile-400/50';
	const labelClass = 'block text-xs font-medium text-surface-400 mb-1.5';
</script>

<Modal {open} title="Add Task" onclose={() => open = false}>
	<form onsubmit={submit} class="space-y-4">
		<div>
			<label class={labelClass}>Title</label>
			<input
				type="text"
				bind:value={title}
				placeholder="What needs to be done?"
				class={inputClass}
			/>
		</div>

		<div class="grid grid-cols-3 gap-3">
			<div>
				<label class={labelClass}>Source</label>
				<select bind:value={source} class={inputClass}>
					{#each sources as s}
						<option value={s}>{s}</option>
					{/each}
				</select>
			</div>
			<div>
				<label class={labelClass}>Priority</label>
				<select bind:value={priority} class={inputClass}>
					{#each priorities as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</div>
			<div>
				<label class={labelClass}>Status</label>
				<select bind:value={status} class={inputClass}>
					{#each statuses as st}
						<option value={st}>{st}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="flex justify-end gap-2 pt-2">
			<button
				type="button"
				class="rounded-lg px-4 py-2 text-sm text-surface-400 transition hover:bg-surface-700 hover:text-surface-200"
				onclick={() => open = false}
			>
				Cancel
			</button>
			<button
				type="submit"
				class="rounded-lg bg-chamomile-400 px-4 py-2 text-sm font-semibold text-surface-900 transition hover:bg-chamomile-300"
			>
				Add Task
			</button>
		</div>
	</form>
</Modal>
