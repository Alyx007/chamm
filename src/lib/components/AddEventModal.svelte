<script lang="ts">
	import Modal from './Modal.svelte';
	import { events, type EventColor } from '$lib/stores/events';

	let { open = $bindable(false) }: { open: boolean } = $props();

	let title = $state('');
	let date = $state(new Date().toISOString().split('T')[0]);
	let startTime = $state('09:00');
	let endTime = $state('10:00');
	let color: EventColor = $state('chamomile');

	function submit() {
		if (!title.trim()) return;
		events.add({ title: title.trim(), date, startTime, endTime, color });
		title = '';
		date = new Date().toISOString().split('T')[0];
		startTime = '09:00';
		endTime = '10:00';
		color = 'chamomile';
		open = false;
	}

	const colors: { value: EventColor; label: string; dot: string }[] = [
		{ value: 'chamomile', label: 'Gold', dot: 'bg-chamomile-400' },
		{ value: 'blue', label: 'Blue', dot: 'bg-blue-400' },
		{ value: 'emerald', label: 'Green', dot: 'bg-emerald-400' },
		{ value: 'rose', label: 'Red', dot: 'bg-rose-400' },
	];

	const inputClass = 'w-full rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-surface-100 outline-none transition focus:border-chamomile-400 focus:ring-1 focus:ring-chamomile-400/50';
	const labelClass = 'block text-xs font-medium text-surface-400 mb-1.5';
</script>

<Modal {open} title="Add Event" onclose={() => open = false}>
	<form onsubmit={submit} class="space-y-4">
		<div>
			<label class={labelClass}>Title</label>
			<input type="text" bind:value={title} placeholder="Event name" class={inputClass} />
		</div>

		<div>
			<label class={labelClass}>Date</label>
			<input type="date" bind:value={date} class={inputClass} />
		</div>

		<div class="grid grid-cols-2 gap-3">
			<div>
				<label class={labelClass}>Start</label>
				<input type="time" bind:value={startTime} class={inputClass} />
			</div>
			<div>
				<label class={labelClass}>End</label>
				<input type="time" bind:value={endTime} class={inputClass} />
			</div>
		</div>

		<div>
			<label class={labelClass}>Color</label>
			<div class="flex gap-2">
				{#each colors as c}
					<button
						type="button"
						class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition
							{color === c.value ? 'bg-surface-600 text-surface-100' : 'bg-surface-700 text-surface-400 hover:bg-surface-600'}"
						onclick={() => color = c.value}
					>
						<span class="h-2 w-2 rounded-full {c.dot}"></span>
						{c.label}
					</button>
				{/each}
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
				Add Event
			</button>
		</div>
	</form>
</Modal>
