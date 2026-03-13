<script lang="ts">
	import DashboardCard from './DashboardCard.svelte';
	import { events, colorToBorder, colorToBg } from '$lib/stores/events';

	const today = new Date();
	const currentDay = today.getDate();
	const todayStr = today.toISOString().split('T')[0];

	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay() + 1);
	const weekDays = Array.from({ length: 7 }, (_, i) => {
		const d = new Date(startOfWeek);
		d.setDate(startOfWeek.getDate() + i);
		return {
			label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
			date: d.getDate(),
			isToday: d.getDate() === currentDay && d.getMonth() === today.getMonth()
		};
	});

	const todayEvents = $derived(
		$events
			.filter((e) => e.date === todayStr)
			.sort((a, b) => a.startTime.localeCompare(b.startTime))
	);
</script>

<DashboardCard title="Schedule">
	<!-- Week strip -->
	<div class="mb-4 flex justify-between">
		{#each weekDays as day}
			<div class="flex flex-col items-center gap-1">
				<span class="text-[10px] text-surface-400">{day.label}</span>
				<span
					class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium
						{day.isToday ? 'bg-chamomile-400 text-surface-900' : 'text-surface-300'}"
				>
					{day.date}
				</span>
			</div>
		{/each}
	</div>

	<!-- Events -->
	{#if todayEvents.length === 0}
		<p class="py-4 text-center text-sm text-surface-400">No events today</p>
	{:else}
		<div class="space-y-2">
			{#each todayEvents as event}
				<div class="group rounded-xl border-l-2 {colorToBorder[event.color]} {colorToBg[event.color]} px-3 py-2.5">
					<div class="flex items-start justify-between">
						<div class="text-sm font-medium text-surface-100">{event.title}</div>
						<button
							class="ml-2 hidden text-surface-400 transition hover:text-rose-400 group-hover:block"
							onclick={() => events.remove(event.id)}
							title="Remove"
						>
							<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="mt-0.5 flex items-center gap-1.5 text-xs text-surface-400">
						<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
							<circle cx="12" cy="12" r="10" />
							<polyline points="12 6 12 12 16 14" />
						</svg>
						{event.startTime} - {event.endTime}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</DashboardCard>
