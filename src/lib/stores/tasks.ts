import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskSource = 'Manual' | 'GitHub' | 'Gmail' | 'Outlook' | 'Calendar';

export interface Task {
	id: string;
	title: string;
	source: TaskSource;
	status: TaskStatus;
	priority: TaskPriority;
	createdAt: string;
}

const STORAGE_KEY = 'chamomile-tasks';

function loadTasks(): Task[] {
	if (!browser) return [];
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch {
			return [];
		}
	}
	// Seed with sample data on first load
	return [
		{ id: crypto.randomUUID(), title: 'Review pull request #42', source: 'GitHub', status: 'in-progress', priority: 'high', createdAt: new Date().toISOString() },
		{ id: crypto.randomUUID(), title: 'Reply to design feedback', source: 'Gmail', status: 'pending', priority: 'medium', createdAt: new Date().toISOString() },
		{ id: crypto.randomUUID(), title: 'Update project roadmap', source: 'Manual', status: 'pending', priority: 'high', createdAt: new Date().toISOString() },
		{ id: crypto.randomUUID(), title: 'Fix login bug', source: 'GitHub', status: 'completed', priority: 'low', createdAt: new Date().toISOString() },
		{ id: crypto.randomUUID(), title: 'Schedule 1:1 meeting', source: 'Calendar', status: 'pending', priority: 'medium', createdAt: new Date().toISOString() },
		{ id: crypto.randomUUID(), title: 'Write weekly report', source: 'Manual', status: 'in-progress', priority: 'low', createdAt: new Date().toISOString() },
	];
}

function createTaskStore() {
	const { subscribe, set, update } = writable<Task[]>(loadTasks());

	// Persist on every change
	subscribe((tasks) => {
		if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	});

	return {
		subscribe,
		add(task: Omit<Task, 'id' | 'createdAt'>) {
			update((tasks) => [
				{ ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
				...tasks,
			]);
		},
		remove(id: string) {
			update((tasks) => tasks.filter((t) => t.id !== id));
		},
		updateTask(id: string, changes: Partial<Omit<Task, 'id'>>) {
			update((tasks) =>
				tasks.map((t) => (t.id === id ? { ...t, ...changes } : t))
			);
		},
		setStatus(id: string, status: TaskStatus) {
			update((tasks) =>
				tasks.map((t) => (t.id === id ? { ...t, status } : t))
			);
		},
		reset() {
			if (browser) localStorage.removeItem(STORAGE_KEY);
			set(loadTasks());
		},
	};
}

export const tasks = createTaskStore();

export const taskStats = derived(tasks, ($tasks) => ({
	total: $tasks.length,
	pending: $tasks.filter((t) => t.status === 'pending').length,
	inProgress: $tasks.filter((t) => t.status === 'in-progress').length,
	completed: $tasks.filter((t) => t.status === 'completed').length,
	overdue: $tasks.filter((t) => t.priority === 'high' && t.status === 'pending').length,
}));
