<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children, class: className = '' }: {
		title: string;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class="rounded-2xl border border-surface-700 bg-surface-800 p-5 transition-colors duration-300 {className}">
	<div class="mb-4">
		<h3 class="text-sm font-semibold text-surface-100">{title}</h3>
	</div>
	{@render children()}
</div>
