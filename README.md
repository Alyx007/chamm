# chamomile

A personal task management dashboard that calms the chaos. All your tasks, emails, calendars, and integrations in one place.

Built with **SvelteKit** + **Tailwind CSS v4**, styled in JetBrains Mono with a dark botanical aesthetic.

## Features

- **Dashboard** — Card-based overview with task stats, progress bars, schedule, and integrations
- **Tasks** — Create, update status (pending/in-progress/completed), delete, with source tracking
- **Schedule** — Daily event view with color-coded entries
- **Integrations** — Slots for Gmail, GitHub, Outlook, Calendar (connect/disconnect UI ready)
- **Auth** — Local register/login with nickname, email validation, and password strength enforcement
- **Themes** — Dark and light mode, toggled from settings, persisted in localStorage
- **Responsive** — Adapts from 1-column mobile to 3-column desktop

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Framework   | SvelteKit                   |
| Styling     | Tailwind CSS v4             |
| Font        | JetBrains Mono              |
| State       | Svelte stores + localStorage|
| Auth        | Client-side (SHA-256 hash)  |
| Build       | Vite                        |

## Project structure

```
src/
├── lib/
│   ├── components/    # UI components (Sidebar, Topbar, Cards, Modals...)
│   └── stores/        # Svelte stores (auth, tasks, events, integrations, theme)
├── routes/
│   ├── +layout.svelte # App shell with auth gate
│   └── +page.svelte   # Dashboard page
├── app.css            # Tailwind config + theme tokens
└── app.html           # HTML shell
```

## Roadmap

- [ ] OAuth integrations (Google, GitHub)
- [ ] Backend API + database (replace localStorage)
- [ ] Email inbox widget
- [ ] GitHub notifications/PR feed
- [ ] Calendar sync
- [ ] Drag-and-drop task ordering
- [ ] Notifications system

## License

MIT
