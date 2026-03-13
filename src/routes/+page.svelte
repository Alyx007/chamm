<script lang="ts">
	import TaskOverview from '$lib/components/TaskOverview.svelte';
	import IntegrationsCard from '$lib/components/IntegrationsCard.svelte';
	import ScheduleCard from '$lib/components/ScheduleCard.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import QuickActions from '$lib/components/QuickActions.svelte';
	import AddTaskModal from '$lib/components/AddTaskModal.svelte';
	import AddEventModal from '$lib/components/AddEventModal.svelte';
	import { currentUser } from '$lib/stores/auth';

	const greeting = (() => {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 18) return 'Good afternoon';
		return 'Good evening';
	})();

	let showAddTask = $state(false);
	let showAddEvent = $state(false);
</script>

<AddTaskModal bind:open={showAddTask} />
<AddEventModal bind:open={showAddEvent} />

<!-- Greeting -->
<div class="mb-6">
	<h2 class="text-2xl font-bold text-surface-100">
		{greeting}, <span class="text-chamomile-400">{$currentUser?.nick ?? 'friend'}</span>!
		<span class="font-normal text-surface-300">Here's what needs your attention.</span>
	</h2>
</div>

<!-- Action buttons -->
<div class="mb-6 flex gap-3">
	<button
		class="rounded-full bg-chamomile-400 px-5 py-2 text-sm font-semibold text-surface-900 transition hover:bg-chamomile-300"
		onclick={() => showAddTask = true}
	>
		+ Add Task
	</button>
	<button
		class="rounded-full border border-surface-600 px-5 py-2 text-sm font-medium text-surface-200 transition hover:bg-surface-700"
		onclick={() => showAddEvent = true}
	>
		+ Add Event
	</button>
</div>

<!-- Dashboard Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
	<!-- Row 1 -->
	<TaskOverview />
	<QuickActions onaddtask={() => showAddTask = true} onschedule={() => showAddEvent = true} />
	<ScheduleCard />

	<!-- Row 2 -->
	<div class="md:col-span-2">
		<TaskList />
	</div>
	<IntegrationsCard />
</div>
