<script lang="ts">
	import DashboardCard from './DashboardCard.svelte';
	import { taskStats } from '$lib/stores/tasks';

	// Placeholder bars — will be replaced with real per-day data once we track completion dates
	const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
</script>

<DashboardCard title="Task Overview">
	<div class="flex items-end gap-6">
		<div class="flex-1">
			<div class="text-4xl font-bold text-surface-100">{$taskStats.total}</div>
			<div class="text-xs text-surface-400 mt-1">Total Tasks</div>
			<div class="mt-4 text-2xl font-bold text-emerald-400">{$taskStats.completed}</div>
			<div class="text-xs text-surface-400 mt-1">Completed</div>
		</div>
		<div class="flex items-end gap-1.5">
			{#each days as day, i}
				{@const bar = Math.max(1, (($taskStats.total > 0 ? $taskStats.completed : 0) + i) % 7 + 1)}
				{@const maxBar = 7}
				<div class="flex flex-col items-center gap-1">
					<div
						class="w-5 rounded-sm bg-chamomile-400/80 transition-all"
						style="height: {(bar / maxBar) * 60 + 10}px"
					></div>
					<span class="text-[10px] text-surface-400">{day}</span>
				</div>
			{/each}
		</div>
	</div>
</DashboardCard>
