import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type EventColor = 'chamomile' | 'blue' | 'emerald' | 'rose';

export interface CalendarEvent {
	id: string;
	title: string;
	date: string; // ISO date string (YYYY-MM-DD)
	startTime: string; // HH:MM
	endTime: string; // HH:MM
	color: EventColor;
}

const STORAGE_KEY = 'chamomile-events';

const colorToBorder: Record<EventColor, string> = {
	chamomile: 'border-chamomile-400',
	blue: 'border-blue-400',
	emerald: 'border-emerald-400',
	rose: 'border-rose-400',
};

const colorToBg: Record<EventColor, string> = {
	chamomile: 'bg-chamomile-400/5',
	blue: 'bg-blue-400/5',
	emerald: 'bg-emerald-400/5',
	rose: 'bg-rose-400/5',
};

export { colorToBorder, colorToBg };

function todayStr() {
	return new Date().toISOString().split('T')[0];
}

function loadEvents(): CalendarEvent[] {
	if (!browser) return [];
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			return [];
		}
	}
	const today = todayStr();
	return [
		{ id: crypto.randomUUID(), title: 'Team standup', date: today, startTime: '09:00', endTime: '09:30', color: 'chamomile' },
		{ id: crypto.randomUUID(), title: 'Review PRs', date: today, startTime: '11:00', endTime: '12:00', color: 'blue' },
		{ id: crypto.randomUUID(), title: 'Focus time', date: today, startTime: '14:00', endTime: '16:00', color: 'emerald' },
	];
}

function createEventStore() {
	const { subscribe, set, update } = writable<CalendarEvent[]>(loadEvents());

	subscribe((events) => {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
	});

	return {
		subscribe,
		add(event: Omit<CalendarEvent, 'id'>) {
			update((events) => [
				...events,
				{ ...event, id: crypto.randomUUID() },
			]);
		},
		remove(id: string) {
			update((events) => events.filter((e) => e.id !== id));
		},
		updateEvent(id: string, changes: Partial<Omit<CalendarEvent, 'id'>>) {
			update((events) =>
				events.map((e) => (e.id === id ? { ...e, ...changes } : e))
			);
		},
		reset() {
			if (browser) localStorage.removeItem(STORAGE_KEY);
			set(loadEvents());
		},
	};
}

export const events = createEventStore();
