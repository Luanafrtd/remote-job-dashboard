# Remote Job Dashboard

A modern, responsive dashboard for tracking remote job applications — built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. Includes authentication UI, a collapsible sidebar, interactive charts, and profile/settings management.

> This is a front-end portfolio project. Authentication and data are mocked on the client — there is no backend or database. See [Notes](#notes) below for details on wiring up a real API.

## Features

- **Dashboard** — key metrics, an applications/interviews trend chart, a pipeline status donut chart, a category breakdown bar chart, and a recent applications table
- **Authentication UI** — login and register pages with client-side validation, password visibility toggle, and a split-screen layout
- **Sidebar navigation** — responsive, collapses into a mobile drawer, active-route highlighting
- **Profile page** — editable personal info, skills, and activity summary
- **Settings page** — tabbed account, notification, and appearance preferences
- **Charts** — built with [Recharts](https://recharts.org/), fully responsive and theme-aware
- **Dark mode** — automatic based on system preference
- **Responsive design** — works from mobile through desktop breakpoints

## Tech Stack

| Category   | Technology                          |
| ---------- | ------------------------------------ |
| Framework  | [Next.js 15](https://nextjs.org/) (App Router) |
| Language   | TypeScript                           |
| Styling    | Tailwind CSS v4                      |
| Charts     | Recharts                             |
| Icons      | lucide-react                         |
| Linting    | ESLint (`eslint-config-next`)        |

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth route group (centered layout, no sidebar)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Dashboard route group (sidebar + topbar layout)
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   ├── page.tsx             # Redirects to /login
│   └── globals.css          # Theme tokens & Tailwind entrypoint
├── components/
│   ├── charts/               # Recharts wrappers (trend, bar, pie)
│   ├── dashboard/             # Dashboard-specific composites (table, etc.)
│   ├── layout/                 # Sidebar, Topbar, Logo, DashboardShell
│   └── ui/                     # Reusable primitives (Button, Card, Input, ...)
├── lib/
│   ├── data.ts               # Sample/mock data
│   └── utils.ts               # cn(), formatDate(), initials()
└── types/
    └── index.ts              # Shared TypeScript types
```

Route groups (`(auth)` and `(dashboard)`) let each area of the app own its own layout without affecting the URL structure.

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm (or pnpm/yarn — adjust commands accordingly)

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The root route redirects to `/login`; use **Continue as guest** on the auth screen, or submit either form, to reach the dashboard (any non-empty values work, since there's no real backend).

### Available Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`       | Start the development server          |
| `npm run build`     | Create an optimized production build  |
| `npm run start`     | Run the production build locally      |
| `npm run lint`      | Run ESLint                            |

## Pages

| Route         | Description                                    |
| ------------- | ----------------------------------------------- |
| `/`           | Redirects to `/login`                           |
| `/login`      | Sign-in form                                    |
| `/register`   | Account creation form                           |
| `/dashboard`  | Metrics, charts, and recent applications        |
| `/profile`    | User profile and editable personal information  |
| `/settings`   | Account, notification, and appearance settings  |

## Notes

- **Authentication** is UI-only: forms simulate a network request and then redirect. To make it real, connect the `handleSubmit` functions in `src/app/(auth)/login/page.tsx` and `.../register/page.tsx` to an API route or auth provider (e.g. NextAuth.js, Clerk, Supabase Auth), and add route protection (middleware or a server-side session check) to the `(dashboard)` route group.
- **Data** in `src/lib/data.ts` is static sample data. Swap it for data fetched from your API/database — the components already accept typed props (`src/types/index.ts`), so most call sites won't need to change.
- **Theming** uses CSS custom properties defined in `src/app/globals.css` and mapped into Tailwind via `@theme inline`, with dark mode driven by `prefers-color-scheme`.

## License

This project is provided as-is for portfolio and educational purposes.
