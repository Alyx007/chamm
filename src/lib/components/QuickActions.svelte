<script lang="ts">
	import DashboardCard from './DashboardCard.svelte';
	import { taskStats } from '$lib/stores/tasks';

	let { onaddtask, onschedule }: {
		onaddtask?: () => void;
		onschedule?: () => void;
	} = $props();

	const bars = $derived([
		{ label: 'Completed', pct: $taskStats.total ? Math.round(($taskStats.completed / $taskStats.total) * 100) : 0, color: 'bg-emerald-400' },
		{ label: 'In Progress', pct: $taskStats.total ? Math.round(($taskStats.inProgress / $taskStats.total) * 100) : 0, color: 'bg-blue-400' },
		{ label: 'Overdue', pct: $taskStats.total ? Math.round(($taskStats.overdue / $taskStats.total) * 100) : 0, color: 'bg-rose-400' },
	]);
</script>

<DashboardCard title="Progress">
	<div class="space-y-4">
		{#each bars as stat}
			<div>
				<div class="mb-1.5 flex items-center justify-between">
					<span class="text-xs text-surface-300">{stat.label}</span>
					<span class="text-xs font-semibold text-surface-200">{stat.pct}%</span>
				</div>
				<div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-700">
					<div class="{stat.color} h-full rounded-full transition-all" style="width: {stat.pct}%"></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-5 grid grid-cols-2 gap-2">
		<button
			class="rounded-xl bg-chamomile-500/20 px-3 py-2.5 text-sm font-medium text-chamomile-400 transition hover:bg-chamomile-500/30"
			onclick={onaddtask}
		>
			+ Add Task
		</button>
		<button
			class="rounded-xl bg-surface-700 px-3 py-2.5 text-sm font-medium text-surface-200 transition hover:bg-surface-600"
			onclick={onschedule}
		>
			+ Add Event
		</button>
	</div>
</DashboardCard>
