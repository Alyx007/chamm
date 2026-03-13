<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import AuthPage from '$lib/components/AuthPage.svelte';
	import { theme } from '$lib/stores/theme';
	import { isLoggedIn } from '$lib/stores/auth';

	let { children } = $props();

	$effect(() => {
		document.documentElement.classList.toggle('light', $theme === 'light');
	});
</script>

<svelte:head>
	<title>Chamomile</title>
</svelte:head>

{#if $isLoggedIn}
	<div class="flex h-screen overflow-hidden bg-surface-900 font-sans">
		<Sidebar />
		<div class="flex flex-1 flex-col overflow-hidden">
			<Topbar />
			<main class="flex-1 overflow-y-auto p-6">
				{@render children()}
			</main>
		</div>
	</div>
{:else}
	<AuthPage />
{/if}
