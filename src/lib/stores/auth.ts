import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
	id: string;
	nick: string;
	email: string;
}

interface AuthState {
	user: User | null;
	loading: boolean;
}

const STORAGE_KEY = 'chamomile-auth';
const USERS_KEY = 'chamomile-users';

interface StoredUser {
	id: string;
	nick: string;
	email: string;
	passwordHash: string;
}

// Simple hash for localStorage-only auth. Replace with proper backend auth later.
async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getStoredUsers(): StoredUser[] {
	if (!browser) return [];
	try {
		return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
	} catch {
		return [];
	}
}

function saveStoredUsers(users: StoredUser[]) {
	if (browser) localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): User | null {
	if (!browser) return null;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
}

// --- Validation ---

export interface PasswordCheck {
	valid: boolean;
	length: boolean;
	uppercase: boolean;
	lowercase: boolean;
	number: boolean;
	special: boolean;
}

export function checkPassword(password: string): PasswordCheck {
	const length = password.length >= 8;
	const uppercase = /[A-Z]/.test(password);
	const lowercase = /[a-z]/.test(password);
	const number = /[0-9]/.test(password);
	const special = /[^A-Za-z0-9]/.test(password);
	return {
		valid: length && uppercase && lowercase && number && special,
		length,
		uppercase,
		lowercase,
		number,
		special,
	};
}

export function checkEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function checkNick(nick: string): { valid: boolean; error?: string } {
	if (nick.length < 2) return { valid: false, error: 'At least 2 characters' };
	if (nick.length > 24) return { valid: false, error: 'Max 24 characters' };
	if (!/^[a-zA-Z0-9_.-]+$/.test(nick)) return { valid: false, error: 'Letters, numbers, _ . - only' };
	return { valid: true };
}

// --- Store ---

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: loadSession(),
		loading: false,
	});

	return {
		subscribe,

		async register(nick: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> {
			// Validate nick
			const nickCheck = checkNick(nick);
			if (!nickCheck.valid) return { ok: false, error: `Nick: ${nickCheck.error}` };

			// Validate email format
			if (!checkEmail(email)) return { ok: false, error: 'Invalid email format' };

			// Check duplicates
			const users = getStoredUsers();
			if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
				return { ok: false, error: 'An account with this email already exists' };
			}
			if (users.find((u) => u.nick.toLowerCase() === nick.toLowerCase())) {
				return { ok: false, error: 'This nickname is already taken' };
			}

			// Validate password strength
			const pwCheck = checkPassword(password);
			if (!pwCheck.valid) {
				return { ok: false, error: 'Password does not meet requirements' };
			}

			const passwordHash = await hashPassword(password);
			const user: StoredUser = {
				id: crypto.randomUUID(),
				nick,
				email: email.toLowerCase(),
				passwordHash,
			};
			users.push(user);
			saveStoredUsers(users);

			const session: User = { id: user.id, nick: user.nick, email: user.email };
			if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
			set({ user: session, loading: false });
			return { ok: true };
		},

		async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
			if (!checkEmail(email)) return { ok: false, error: 'Invalid email format' };

			const users = getStoredUsers();
			const passwordHash = await hashPassword(password);
			const user = users.find((u) => u.email === email.toLowerCase() && u.passwordHash === passwordHash);

			if (!user) {
				return { ok: false, error: 'Invalid email or password' };
			}

			const session: User = { id: user.id, nick: user.nick, email: user.email };
			if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
			set({ user: session, loading: false });
			return { ok: true };
		},

		logout() {
			if (browser) localStorage.removeItem(STORAGE_KEY);
			set({ user: null, loading: false });
		},

		updateProfile(changes: Partial<Pick<User, 'nick'>>) {
			update((state) => {
				if (!state.user) return state;
				const updated = { ...state.user, ...changes };
				if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

				const users = getStoredUsers();
				const idx = users.findIndex((u) => u.id === updated.id);
				if (idx !== -1) {
					users[idx] = { ...users[idx], ...changes };
					saveStoredUsers(users);
				}

				return { ...state, user: updated };
			});
		},
	};
}

export const auth = createAuthStore();
export const currentUser = derived(auth, ($auth) => $auth.user);
export const isLoggedIn = derived(auth, ($auth) => $auth.user !== null);
