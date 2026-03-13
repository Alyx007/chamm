<script lang="ts">
	import DashboardCard from './DashboardCard.svelte';
	import { tasks, type TaskStatus } from '$lib/stores/tasks';

	const statusColors: Record<string, string> = {
		'pending': 'text-chamomile-400 bg-chamomile-400/10',
		'in-progress': 'text-blue-400 bg-blue-400/10',
		'completed': 'text-emerald-400 bg-emerald-400/10',
	};

	const priorityDot: Record<string, string> = {
		'high': 'bg-rose-400',
		'medium': 'bg-chamomile-400',
		'low': 'bg-surface-400',
	};

	const statusLabel: Record<string, string> = {
		'pending': 'Pending',
		'in-progress': 'In Progress',
		'completed': 'Done',
	};

	const nextStatus: Record<TaskStatus, TaskStatus> = {
		'pending': 'in-progress',
		'in-progress': 'completed',
		'completed': 'pending',
	};

	let openActionId = $state<string | null>(null);
</script>

<DashboardCard title="Recent Tasks">
	{#if $tasks.length === 0}
		<p class="py-6 text-center text-sm text-surface-400">No tasks yet. Add one to get started!</p>
	{:else}
		<div class="overflow-hidden rounded-xl border border-surface-700">
			<table class="w-full">
				<thead>
					<tr class="border-b border-surface-700 bg-surface-700/30">
						<th class="px-4 py-2.5 text-left text-xs font-medium text-surface-400">Task</th>
						<th class="px-4 py-2.5 text-left text-xs font-medium text-surface-400">Source</th>
						<th class="px-4 py-2.5 text-left text-xs font-medium text-surface-400">Status</th>
						<th class="px-4 py-2.5 text-left text-xs font-medium text-surface-400">Priority</th>
						<th class="px-4 py-2.5 text-right text-xs font-medium text-surface-400">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each $tasks as task (task.id)}
						<tr class="border-b border-surface-700/50 transition hover:bg-surface-700/20">
							<td class="px-4 py-3">
								<span class="text-sm text-surface-100 {task.status === 'completed' ? 'line-through opacity-60' : ''}">{task.title}</span>
							</td>
							<td class="px-4 py-3">
								<span class="text-xs text-surface-400">{task.source}</span>
							</td>
							<td class="px-4 py-3">
								<button
									class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition hover:opacity-80 {statusColors[task.status]}"
									onclick={() => tasks.setStatus(task.id, nextStatus[task.status])}
									title="Click to cycle status"
								>
									{statusLabel[task.status]}
								</button>
							</td>
							<td class="px-4 py-3">
								<div class="flex items-center gap-1.5">
									<span class="h-1.5 w-1.5 rounded-full {priorityDot[task.priority]}"></span>
									<span class="text-xs text-surface-400 capitalize">{task.priority}</span>
								</div>
							</td>
							<td class="px-4 py-3 text-right">
								<div class="relative inline-block">
									<button
										class="text-xs text-surface-400 hover:text-surface-200 transition"
										onclick={() => openActionId = openActionId === task.id ? null : task.id}
									>
										Actions
										<svg class="ml-0.5 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
											<path d="M19 9l-7 7-7-7" />
										</svg>
									</button>

									{#if openActionId === task.id}
										<button class="fixed inset-0 z-10" onclick={() => openActionId = null} aria-label="Close"></button>
										<div class="absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border border-surface-700 bg-surface-800 py-1 shadow-xl">
											<button
												class="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-surface-300 transition hover:bg-surface-700"
												onclick={() => { tasks.setStatus(task.id, nextStatus[task.status]); openActionId = null; }}
											>
												Move to {statusLabel[nextStatus[task.status]]}
											</button>
											<button
												class="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-rose-400 transition hover:bg-surface-700"
												onclick={() => { tasks.remove(task.id); openActionId = null; }}
											>
												Delete
											</button>
										</div>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</DashboardCard>
