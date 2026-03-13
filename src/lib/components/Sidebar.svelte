<script lang="ts">
	let activeItem = $state('dashboard');

	const navItems = [
		{ id: 'dashboard', icon: 'grid', label: 'Dashboard' },
		{ id: 'tasks', icon: 'check-square', label: 'Tasks' },
		{ id: 'mail', icon: 'mail', label: 'Mail' },
		{ id: 'calendar', icon: 'calendar', label: 'Calendar' },
		{ id: 'github', icon: 'github', label: 'GitHub' },
	];

</script>

<aside class="flex w-16 flex-col items-center border-r border-surface-700 bg-surface-800 py-4">
	<!-- Logo -->
	<div class="mb-8 flex h-10 w-10 items-center justify-center">
		<svg viewBox="0 0 100 100" class="h-8 w-8 text-chamomile-400" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="50" cy="50" r="45" stroke-opacity="0.6" />
			<!-- Flower center -->
			<circle cx="50" cy="35" r="6" fill="currentColor" />
			<!-- Petals -->
			<ellipse cx="50" cy="22" rx="4" ry="10" fill="currentColor" opacity="0.8" />
			<ellipse cx="61" cy="27" rx="4" ry="10" fill="currentColor" opacity="0.8" transform="rotate(50 61 27)" />
			<ellipse cx="39" cy="27" rx="4" ry="10" fill="currentColor" opacity="0.8" transform="rotate(-50 39 27)" />
			<ellipse cx="63" cy="38" rx="4" ry="10" fill="currentColor" opacity="0.8" transform="rotate(90 63 38)" />
			<ellipse cx="37" cy="38" rx="4" ry="10" fill="currentColor" opacity="0.8" transform="rotate(-90 37 38)" />
			<!-- Stem -->
			<line x1="50" y1="42" x2="50" y2="78" stroke="currentColor" stroke-width="2" />
			<!-- Leaves -->
			<path d="M50 58 Q38 52 34 60" stroke="currentColor" fill="none" stroke-width="1.5" />
			<path d="M50 65 Q62 59 66 67" stroke="currentColor" fill="none" stroke-width="1.5" />
		</svg>
	</div>

	<!-- Navigation -->
	<nav class="flex flex-1 flex-col items-center gap-2">
		{#each navItems as item}
			<button
				class="group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200
					{activeItem === item.id
						? 'bg-chamomile-500/20 text-chamomile-400'
						: 'text-surface-400 hover:bg-surface-700 hover:text-surface-200'}"
				onclick={() => activeItem = item.id}
				title={item.label}
			>
				{#if item.icon === 'grid'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
						<rect x="3" y="3" width="7" height="7" rx="1" />
						<rect x="14" y="3" width="7" height="7" rx="1" />
						<rect x="3" y="14" width="7" height="7" rx="1" />
						<rect x="14" y="14" width="7" height="7" rx="1" />
					</svg>
				{:else if item.icon === 'check-square'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
						<rect x="3" y="3" width="18" height="18" rx="2" />
						<path d="M9 12l2 2 4-4" />
					</svg>
				{:else if item.icon === 'mail'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
						<rect x="2" y="4" width="20" height="16" rx="2" />
						<path d="M22 4L12 13 2 4" />
					</svg>
				{:else if item.icon === 'calendar'}
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
						<rect x="3" y="4" width="18" height="18" rx="2" />
						<line x1="16" y1="2" x2="16" y2="6" />
						<line x1="8" y1="2" x2="8" y2="6" />
						<line x1="3" y1="10" x2="21" y2="10" />
					</svg>
				{:else if item.icon === 'github'}
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
					</svg>
				{/if}
			</button>
		{/each}
	</nav>

</aside>
