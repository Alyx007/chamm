import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

const stored = browser ? (localStorage.getItem('chamomile-theme') as Theme) : null;

export const theme = writable<Theme>(stored ?? 'dark');

theme.subscribe((value) => {
	if (browser) {
		localStorage.setItem('chamomile-theme', value);
		document.documentElement.classList.toggle('light', value === 'light');
	}
});

export function toggleTheme() {
	theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
}
