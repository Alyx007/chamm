<script lang="ts">
	import { auth, checkPassword, checkEmail, checkNick, type PasswordCheck } from '$lib/stores/auth';

	let mode: 'login' | 'register' = $state('login');
	let nick = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	const pwCheck: PasswordCheck = $derived(checkPassword(password));
	const emailValid = $derived(email.length === 0 || checkEmail(email));
	const nickCheck = $derived(checkNick(nick));

	const pwRules = $derived([
		{ met: pwCheck.length, label: '8+ characters' },
		{ met: pwCheck.uppercase, label: 'Uppercase letter' },
		{ met: pwCheck.lowercase, label: 'Lowercase letter' },
		{ met: pwCheck.number, label: 'Number' },
		{ met: pwCheck.special, label: 'Special character (!@#$...)' },
	]);

	const strengthScore = $derived(
		[pwCheck.length, pwCheck.uppercase, pwCheck.lowercase, pwCheck.number, pwCheck.special]
			.filter(Boolean).length
	);

	const strengthLabel = $derived(
		strengthScore === 0 ? '' :
		strengthScore <= 2 ? 'Weak' :
		strengthScore <= 3 ? 'Fair' :
		strengthScore <= 4 ? 'Good' : 'Strong'
	);

	const strengthColor = $derived(
		strengthScore <= 2 ? 'bg-rose-400' :
		strengthScore <= 3 ? 'bg-amber-400' :
		strengthScore <= 4 ? 'bg-chamomile-400' : 'bg-emerald-400'
	);

	async function submit() {
		error = '';
		loading = true;

		if (mode === 'register') {
			if (!nick.trim()) { error = 'Nickname is required'; loading = false; return; }
			if (!email.trim()) { error = 'Email is required'; loading = false; return; }
			const result = await auth.register(nick.trim(), email.trim(), password);
			if (!result.ok) error = result.error!;
		} else {
			if (!email.trim()) { error = 'Email is required'; loading = false; return; }
			const result = await auth.login(email.trim(), password);
			if (!result.ok) error = result.error!;
		}
		loading = false;
	}

	function switchMode() {
		mode = mode === 'login' ? 'register' : 'login';
		error = '';
	}

	const inputClass = 'w-full rounded-xl border bg-surface-700/50 px-4 py-3 text-sm text-surface-100 placeholder-surface-400 outline-none transition focus:ring-1';
</script>

<div class="flex min-h-screen items-center justify-center bg-surface-900 p-4">
	<div class="w-full max-w-sm">
		<!-- Logo & branding -->
		<div class="mb-10 flex flex-col items-center">
			<div class="mb-6">
				<svg viewBox="0 0 100 100" class="h-20 w-20 text-chamomile-400" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="50" cy="50" r="45" stroke-opacity="0.4" />
					<circle cx="50" cy="35" r="6" fill="currentColor" />
					<ellipse cx="50" cy="20" rx="4.5" ry="11" fill="currentColor" opacity="0.7" />
					<ellipse cx="62" cy="25" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(50 62 25)" />
					<ellipse cx="38" cy="25" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(-50 38 25)" />
					<ellipse cx="64" cy="38" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(90 64 38)" />
					<ellipse cx="36" cy="38" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(-90 36 38)" />
					<ellipse cx="62" cy="46" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(130 62 46)" />
					<ellipse cx="38" cy="46" rx="4.5" ry="11" fill="currentColor" opacity="0.7" transform="rotate(-130 38 46)" />
					<line x1="50" y1="45" x2="50" y2="80" stroke="currentColor" stroke-width="1.5" />
					<path d="M50 60 Q36 53 32 62" stroke="currentColor" fill="none" stroke-width="1.2" />
					<path d="M50 68 Q64 61 68 70" stroke="currentColor" fill="none" stroke-width="1.2" />
				</svg>
			</div>
			<h1 class="text-2xl font-bold text-surface-100">chamomile</h1>
			<p class="mt-1 text-sm text-surface-400">Calm your mind. Focus on what matters.</p>
		</div>

		<!-- Form card -->
		<div class="rounded-2xl border border-surface-700 bg-surface-800 p-6">
			<h2 class="mb-5 text-lg font-semibold text-surface-100">
				{mode === 'login' ? 'Welcome back' : 'Create your account'}
			</h2>

			{#if error}
				<div class="mb-4 rounded-lg bg-rose-400/10 px-4 py-2.5 text-sm text-rose-400">
					{error}
				</div>
			{/if}

			<form onsubmit={submit} class="space-y-4">
				{#if mode === 'register'}
					<!-- Nickname -->
					<div>
						<label for="nick" class="mb-1.5 block text-xs font-medium text-surface-400">Nickname</label>
						<input
							id="nick"
							type="text"
							bind:value={nick}
							placeholder="your_nick"
							class="{inputClass} {nick.length > 0 && !nickCheck.valid ? 'border-rose-400/50 focus:border-rose-400 focus:ring-rose-400/50' : 'border-surface-600 focus:border-chamomile-400 focus:ring-chamomile-400/50'}"
							autocomplete="username"
						/>
						{#if nick.length > 0 && !nickCheck.valid}
							<p class="mt-1 text-xs text-rose-400">{nickCheck.error}</p>
						{/if}
						{#if nick.length === 0}
							<p class="mt-1 text-[11px] text-surface-500">Letters, numbers, _ . - allowed</p>
						{/if}
					</div>
				{/if}

				<!-- Email -->
				<div>
					<label for="email" class="mb-1.5 block text-xs font-medium text-surface-400">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="you@example.com"
						class="{inputClass} {email.length > 0 && !emailValid ? 'border-rose-400/50 focus:border-rose-400 focus:ring-rose-400/50' : 'border-surface-600 focus:border-chamomile-400 focus:ring-chamomile-400/50'}"
						autocomplete="email"
					/>
					{#if email.length > 0 && !emailValid}
						<p class="mt-1 text-xs text-rose-400">Invalid email format</p>
					{/if}
				</div>

				<!-- Password -->
				<div>
					<label for="password" class="mb-1.5 block text-xs font-medium text-surface-400">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						placeholder={mode === 'register' ? 'Create a strong password' : 'Your password'}
						class="{inputClass} border-surface-600 focus:border-chamomile-400 focus:ring-chamomile-400/50"
						autocomplete={mode === 'register' ? 'new-password' : 'current-password'}
					/>

					<!-- Password strength (register only) -->
					{#if mode === 'register' && password.length > 0}
						<div class="mt-3 space-y-2">
							<!-- Strength bar -->
							<div class="flex items-center gap-2">
								<div class="flex flex-1 gap-1">
									{#each Array(5) as _, i}
										<div class="h-1 flex-1 rounded-full transition-all {i < strengthScore ? strengthColor : 'bg-surface-700'}"></div>
									{/each}
								</div>
								<span class="text-[11px] font-medium {strengthScore <= 2 ? 'text-rose-400' : strengthScore <= 3 ? 'text-amber-400' : strengthScore <= 4 ? 'text-chamomile-400' : 'text-emerald-400'}">
									{strengthLabel}
								</span>
							</div>

							<!-- Requirements checklist -->
							<div class="grid grid-cols-2 gap-x-2 gap-y-1">
								{#each pwRules as rule}
									<div class="flex items-center gap-1.5">
										{#if rule.met}
											<svg class="h-3 w-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
												<polyline points="20 6 9 17 4 12" />
											</svg>
										{:else}
											<svg class="h-3 w-3 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
												<circle cx="12" cy="12" r="10" />
											</svg>
										{/if}
										<span class="text-[11px] {rule.met ? 'text-surface-300' : 'text-surface-500'}">{rule.label}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<button
					type="submit"
					disabled={loading || (mode === 'register' && !pwCheck.valid)}
					class="w-full rounded-xl bg-chamomile-400 py-3 text-sm font-semibold text-surface-900 transition hover:bg-chamomile-300 disabled:opacity-40 disabled:cursor-not-allowed"
				>
					{#if loading}
						...
					{:else}
						{mode === 'login' ? 'Sign in' : 'Create account'}
					{/if}
				</button>
			</form>

			<div class="mt-5 text-center text-sm text-surface-400">
				{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
				<button class="ml-1 font-medium text-chamomile-400 transition hover:text-chamomile-300" onclick={switchMode}>
					{mode === 'login' ? 'Sign up' : 'Sign in'}
				</button>
			</div>
		</div>

		<p class="mt-6 text-center text-xs text-surface-500">
			Your data stays in your browser. No tracking, no servers.
		</p>
	</div>
</div>
