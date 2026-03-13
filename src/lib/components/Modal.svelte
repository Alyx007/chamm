<script lang="ts">
	import type { Snippet } from 'svelte';

	let { open = false, title, children, onclose }: {
		open: boolean;
		title: string;
		children: Snippet;
		onclose: () => void;
	} = $props();
</script>

{#if open}
	<!-- Backdrop -->
	<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" role="presentation">
		<button class="absolute inset-0 cursor-default" onclick={onclose} aria-label="Close modal"></button>
	</div>

	<!-- Modal -->
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<div class="w-full max-w-md rounded-2xl border border-surface-700 bg-surface-800 p-6 shadow-2xl">
			<div class="mb-5 flex items-center justify-between">
				<h2 class="text-lg font-semibold text-surface-100">{title}</h2>
				<button
					class="flex h-7 w-7 items-center justify-center rounded-lg text-surface-400 transition hover:bg-surface-700 hover:text-surface-200"
					onclick={onclose}
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
			{@render children()}
		</div>
	</div>
{/if}
