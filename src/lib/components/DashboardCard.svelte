<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children, class: className = '' }: {
		title: string;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class="rounded-2xl border border-surface-700 bg-surface-800 p-5 transition-colors duration-300 {className}">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="text-sm font-semibold text-surface-100">{title}</h3>
		<button class="text-surface-400 hover:text-surface-200 transition">
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
				<circle cx="12" cy="5" r="1.5" />
				<circle cx="12" cy="12" r="1.5" />
				<circle cx="12" cy="19" r="1.5" />
			</svg>
		</button>
	</div>
	{@render children()}
</div>
