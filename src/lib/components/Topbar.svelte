<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { auth, currentUser } from '$lib/stores/auth';

	const today = new Date();
	const dateStr = today.toLocaleDateString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	let settingsOpen = $state(false);

	const initial = $derived($currentUser?.nick?.charAt(0)?.toUpperCase() ?? '?');
</script>

<header class="flex items-center justify-between border-b border-surface-700 bg-surface-800/50 px-6 py-3">
	<div class="flex items-center gap-3">
		<h1 class="text-lg font-semibold text-surface-100">
			<span class="text-chamomile-400">chamomile</span>
		</h1>
		<span class="text-sm text-surface-400">Dashboard</span>
	</div>

	<div class="flex items-center gap-2">
		<!-- Date -->
		<span class="mr-2 hidden text-sm text-surface-400 sm:block">{dateStr}</span>

		<!-- Search -->
		<button class="flex h-9 w-9 items-center justify-center rounded-lg text-surface-400 transition hover:bg-surface-700 hover:text-surface-200">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
		</button>

		<!-- Notifications -->
		<button class="relative flex h-9 w-9 items-center justify-center rounded-lg text-surface-400 transition hover:bg-surface-700 hover:text-surface-200">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
				<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
				<path d="M13.73 21a2 2 0 01-3.46 0" />
			</svg>
			<span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-chamomile-400"></span>
		</button>

		<!-- Settings with dropdown -->
		<div class="relative">
			<button
				class="flex h-9 w-9 items-center justify-center rounded-lg text-surface-400 transition hover:bg-surface-700 hover:text-surface-200"
				onclick={() => settingsOpen = !settingsOpen}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
					<circle cx="12" cy="12" r="3" />
					<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
				</svg>
			</button>

			{#if settingsOpen}
				<button
					class="fixed inset-0 z-10"
					onclick={() => settingsOpen = false}
					aria-label="Close settings"
				></button>

				<div class="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-surface-700 bg-surface-800 p-2 shadow-xl">
					<!-- User info -->
					<div class="mb-2 border-b border-surface-700 px-3 py-2">
						<div class="text-sm font-medium text-surface-100">{$currentUser?.nick}</div>
						<div class="text-xs text-surface-400">{$currentUser?.email}</div>
					</div>

					<div class="mb-1 px-3 py-1 text-[10px] font-medium text-surface-500 uppercase tracking-wider">Settings</div>

					<!-- Theme toggle -->
					<button
						class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-surface-200 transition hover:bg-surface-700"
						onclick={() => { toggleTheme(); settingsOpen = false; }}
					>
						<span class="flex items-center gap-2">
							{#if $theme === 'dark'}
								<svg class="h-4 w-4 text-chamomile-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
									<circle cx="12" cy="12" r="5" />
									<line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
									<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
									<line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
									<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
								</svg>
								Switch to Light
							{:else}
								<svg class="h-4 w-4 text-chamomile-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
									<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
								</svg>
								Switch to Dark
							{/if}
						</span>
						<span class="rounded-md bg-surface-700 px-1.5 py-0.5 text-[10px] text-surface-400">
							{$theme}
						</span>
					</button>

					<!-- Logout -->
					<div class="mt-1 border-t border-surface-700 pt-1">
						<button
							class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-400 transition hover:bg-surface-700"
							onclick={() => { auth.logout(); settingsOpen = false; }}
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
								<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
								<polyline points="16 17 21 12 16 7" />
								<line x1="21" y1="12" x2="9" y2="12" />
							</svg>
							Sign out
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Profile avatar -->
		<div class="ml-1 h-8 w-8 rounded-full bg-chamomile-500/30 ring-2 ring-chamomile-500/50 flex items-center justify-center cursor-pointer">
			<span class="text-xs font-medium text-chamomile-400">{initial}</span>
		</div>
	</div>
</header>
