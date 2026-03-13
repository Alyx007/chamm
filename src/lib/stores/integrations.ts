import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type IntegrationIcon = 'mail' | 'github' | 'calendar';
export type IntegrationStatus = 'connected' | 'disconnected';

export interface Integration {
	id: string;
	name: string;
	icon: IntegrationIcon;
	status: IntegrationStatus;
	color: string;      
	bg: string;         
	count: number;      // Pending notification count
	// Future: auth tokens, API config, etc.
}

const STORAGE_KEY = 'chamomile-integrations';

function loadIntegrations(): Integration[] {
	if (!browser) return [];
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			return [];
		}
	}
	return [
		{ id: 'gmail', name: 'Gmail', icon: 'mail', status: 'disconnected', color: 'text-red-400', bg: 'bg-red-400/10', count: 0 },
		{ id: 'github', name: 'GitHub', icon: 'github', status: 'disconnected', color: 'text-surface-100', bg: 'bg-surface-600', count: 0 },
		{ id: 'outlook', name: 'Outlook', icon: 'mail', status: 'disconnected', color: 'text-blue-400', bg: 'bg-blue-400/10', count: 0 },
		{ id: 'calendar', name: 'Calendar', icon: 'calendar', status: 'disconnected', color: 'text-emerald-400', bg: 'bg-emerald-400/10', count: 0 },
	];
}

function createIntegrationStore() {
	const { subscribe, set, update } = writable<Integration[]>(loadIntegrations());

	subscribe((integrations) => {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(integrations));
	});

	return {
		subscribe,
		toggleConnection(id: string) {
			update((integrations) =>
				integrations.map((i) =>
					i.id === id
						? { ...i, status: (i.status === 'connected' ? 'disconnected' : 'connected') as IntegrationStatus }
						: i
				)
			);
		},
		setCount(id: string, count: number) {
			update((integrations) =>
				integrations.map((i) => (i.id === id ? { ...i, count } : i))
			);
		},
		// Hook for future API connections
		// async connect(id: string, config: { token: string }) { ... }
		reset() {
			if (browser) localStorage.removeItem(STORAGE_KEY);
			set(loadIntegrations());
		},
	};
}

export const integrations = createIntegrationStore();
