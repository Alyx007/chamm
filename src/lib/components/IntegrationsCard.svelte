<script lang="ts">
	import DashboardCard from './DashboardCard.svelte';
	import { integrations } from '$lib/stores/integrations';
</script>

<DashboardCard title="Integrations">
	<div class="space-y-3">
		{#each $integrations as integration (integration.id)}
			<div class="flex items-center justify-between rounded-xl bg-surface-700/50 px-3 py-2.5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg {integration.bg}">
						{#if integration.icon === 'mail'}
							<svg class="h-4 w-4 {integration.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
								<rect x="2" y="4" width="20" height="16" rx="2" />
								<path d="M22 4L12 13 2 4" />
							</svg>
						{:else if integration.icon === 'github'}
							<svg class="h-4 w-4 {integration.color}" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
							</svg>
						{:else if integration.icon === 'calendar'}
							<svg class="h-4 w-4 {integration.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
								<rect x="3" y="4" width="18" height="18" rx="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
						{/if}
					</div>
					<div>
						<div class="text-sm font-medium text-surface-100">{integration.name}</div>
						<div class="text-xs {integration.status === 'connected' ? 'text-emerald-400' : 'text-surface-400'}">
							{integration.status === 'connected' ? 'Connected' : 'Not connected'}
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{#if integration.count > 0}
						<span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-chamomile-500/20 px-1.5 text-xs font-medium text-chamomile-400">
							{integration.count}
						</span>
					{/if}
					<button
						class="rounded-lg px-2 py-1 text-[10px] font-medium transition
							{integration.status === 'connected'
								? 'text-surface-400 hover:text-rose-400 hover:bg-rose-400/10'
								: 'text-chamomile-400 hover:bg-chamomile-400/10'}"
						onclick={() => integrations.toggleConnection(integration.id)}
					>
						{integration.status === 'connected' ? 'Disconnect' : 'Connect'}
					</button>
				</div>
			</div>
		{/each}
	</div>
</DashboardCard>
