# Remote Job Dashboard

A modern, responsive dashboard for tracking remote job applications — built with **Next.js 15** (App Router), **TypeScript**, and **Tailwind CSS v4**. Includes authentication UI backed by a real middleware route guard, streaming server components with Suspense skeletons, interactive charts, and a full profile/settings experience.

[![CI](https://github.com/Luanafrtd/remote-job-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Luanafrtd/remote-job-dashboard/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://remote-job-dashboard.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Luanafrtd/remote-job-dashboard)

## Live Demo

### 🔗 [remote-job-dashboard.vercel.app](https://remote-job-dashboard.vercel.app)

Deployed on Vercel, connected to this repo — every push to `main` auto-deploys. The root URL redirects to `/login`; sign in with any non-empty email/password, or use **Continue as guest**, to reach the protected dashboard (there's no real backend, so any input works).

📄 **[Read the case study](CASE_STUDY.md)** — the problem statement, technical challenges, architecture decisions, and before/after performance and accessibility numbers, written up as I'd present it in an interview.

> **Note:** This is a front-end portfolio project. Authentication is a real middleware-enforced route guard, but the "session" it checks is a demo cookie set on submit — there is no backend or database behind it. See [Notes on the mock backend](#notes-on-the-mock-backend) for what a production swap-in looks like.

## Overview

Remote Job Dashboard is a self-contained demo of what a production job-search tracker's front end looks like: a protected dashboard behind real middleware, streaming server components, a full auth flow, and a profile/settings area — all statically prerendered and deployed on Vercel. It exists to show how the pieces of a modern Next.js App Router app fit together: route groups, server/client component boundaries, a swappable data-access layer, and production metadata, rather than to be a real product with a backend.

## Screenshots

|                  Dashboard                   |                Sign in                 |
| :------------------------------------------: | :------------------------------------: |
| ![Dashboard](docs/screenshots/dashboard.png) | ![Sign in](docs/screenshots/login.png) |

|                 Profile                  |                  Settings                  |
| :--------------------------------------: | :----------------------------------------: |
| ![Profile](docs/screenshots/profile.png) | ![Settings](docs/screenshots/settings.png) |

<p align="center">
  <img src="docs/screenshots/dashboard-mobile.png" alt="Dashboard on mobile" width="280" />
</p>

## Features

- **Protected dashboard** — `middleware.ts` redirects unauthenticated visitors to `/login?from=<path>` and sends authenticated visitors away from the auth pages, mirroring how a real app gates its routes
- **Streaming dashboard** — each dashboard section (metrics, trend chart, pipeline chart, category chart, recent applications) is its own async server component wrapped in `<Suspense>`, so slow sections don't block fast ones, with matching skeleton fallbacks
- **Authentication UI** — login and register pages with client-side validation, password visibility toggle, and a split-screen layout
- **Sidebar navigation** — responsive, collapses into a mobile drawer (with focus-safe Escape-to-close and scroll lock), active-route highlighting
- **Profile page** — editable personal info, skills, and activity summary
- **Settings page** — tabbed account, notification, and appearance preferences with real client-side validation and toast feedback
- **Charts** — built with [Recharts](https://recharts.org/), fully responsive and theme-aware via CSS custom properties, code-split with `next/dynamic` so their JS only loads once the browser is idle
- **Branded error handling** — custom `not-found.tsx`, section-scoped `error.tsx` (keeps the sidebar visible on failure), and a root `global-error.tsx`
- **Generated brand assets** — favicon, apple touch icon, and Open Graph image are generated at build time with `next/og`, not static files
- **Theme switching** — light/dark/system, persisted per device, applied via a blocking inline script so there's no flash of the wrong theme on load
- **Responsive design** — works from mobile through desktop breakpoints
- **Production metadata** — `robots.ts`, `sitemap.ts`, `manifest.ts`, and security response headers configured out of the box
- **Tested** — Vitest + Testing Library unit tests and a Playwright end-to-end suite covering the full auth flow, both run in CI
- **Accessible** — 100/100 Lighthouse accessibility on every page; every color pairing (badges, buttons, chart legends, links) is WCAG AA contrast-checked in both themes, not just eyeballed

## Tech Stack

| Category  | Technology                                         |
| --------- | -------------------------------------------------- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router)     |
| Language  | TypeScript                                         |
| Styling   | Tailwind CSS v4                                    |
| Charts    | Recharts                                           |
| Icons     | lucide-react                                       |
| Testing   | Vitest, Testing Library, Playwright                |
| Linting   | ESLint (`eslint-config-next`) + Prettier           |
| CI        | GitHub Actions (lint, typecheck, test, build, e2e) |

## Architecture

A few decisions worth calling out, since they're the part a code review would actually focus on:

- **Route groups own their layout.** `(auth)` renders the split-screen auth shell; `(dashboard)` renders the sidebar/topbar shell. Neither leaks into the other, and the URL structure stays flat (`/login`, `/dashboard`, not `/auth/login`).
- **Server components fetch, client components interact.** `page.tsx` files are server components that export `metadata` and stay thin. Interactive logic (forms, tabs, toggles) lives in a colocated client component (e.g. `ProfileView.tsx`, `LoginForm.tsx`) — this is what lets `/profile` and `/settings` have real per-page `<title>` tags despite being fully interactive.
- **A real (if simulated) data-access layer.** `src/lib/api.ts` is `server-only` and exposes `async` functions with artificial latency, standing in for real API/database calls. `src/lib/data.ts` holds the raw mock records. Swapping in a real backend means changing the _bodies_ of the functions in `api.ts` — no call site changes.
- **Suspense boundaries, not spinners.** The dashboard page composes five independent `<Suspense>` boundaries (`src/app/(dashboard)/dashboard/sections.tsx` + `skeletons.tsx`) instead of one big loading flag. In dev, or once real per-request data is wired in, sections stream in as they resolve. Because the current data is fully static, Next.js correctly prerenders the whole page at build time — the architecture is streaming-ready without paying a runtime cost for data that doesn't need it.
- **Middleware-enforced auth, not just hidden links.** `src/middleware.ts` checks a session cookie against `PROTECTED_ROUTES` from `src/lib/routes.ts` on every request — visiting `/dashboard` directly with no session bounces you to `/login` before any page code runs.
- **Charts receive data as props.** Chart components (`src/components/charts/*`) don't import the data module themselves; they're generic renderers fed by their parent section. This keeps them reusable and independently testable.
- **Charts are lazy-loaded.** Recharts alone accounted for ~123KB of the dashboard's First Load JS. Each chart is wrapped in a small `"use client"` component that calls `next/dynamic(..., { ssr: false })`, so its code is fetched in a separate chunk after the shell is interactive instead of blocking it — verified with Lighthouse before/after (`/dashboard` First Load JS: 228KB → 105KB).
- **Color tokens are contrast-checked, not eyeballed.** The original palette (`#6366f1` primary, default status colors) failed WCAG AA in several real combinations — text links on the dark background, badge text on muted backgrounds, chart legend text on the card surface, and light-mode status badges all measured under 4.5:1. Since one color can't satisfy "readable on a near-black background" and "readable as white-on-it button text" at the same time (the luminance math is mutually exclusive), a separate `--link` token was introduced for standalone text/links, distinct from `--primary` for solid fills. Every foreground/background pairing in `globals.css` was verified against the WCAG contrast formula before shipping — see the git history for the calculations.
- **Theming supports an explicit override, not just `prefers-color-scheme`.** `globals.css` defines the dark palette twice: once inside `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...} }` for OS-driven dark mode, and once under `:root[data-theme="dark"]` so a user's explicit choice always wins. A blocking inline script (`ThemeScript.tsx`) sets `data-theme` before first paint to avoid a flash of the wrong theme; `src/lib/theme.ts` persists the choice to `localStorage`.

## Project Structure

```
src/
├── app/
│   ├── (auth)/                  # Auth route group (centered split-screen layout)
│   │   ├── login/
│   │   │   ├── page.tsx         # Server component, exports metadata
│   │   │   └── LoginForm.tsx    # Client component, the actual form
│   │   └── register/
│   ├── (dashboard)/             # Dashboard route group (sidebar + topbar layout)
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Composes sections in <Suspense> boundaries
│   │   │   ├── sections.tsx     # Async server components (the "data fetches")
│   │   │   └── skeletons.tsx    # Matching loading fallbacks
│   │   ├── profile/
│   │   ├── settings/
│   │   └── error.tsx            # Scoped error boundary (sidebar stays visible)
│   ├── icon.tsx                 # Generated favicon (next/og)
│   ├── apple-icon.tsx           # Generated apple-touch-icon
│   ├── opengraph-image.tsx      # Generated OG/social preview image
│   ├── manifest.ts              # PWA manifest
│   ├── robots.ts / sitemap.ts   # SEO metadata routes
│   ├── error.tsx / global-error.tsx / not-found.tsx
│   ├── layout.tsx               # Root layout (fonts, metadataBase, OG defaults)
│   └── globals.css              # Theme tokens & Tailwind entrypoint
├── components/
│   ├── charts/                  # Recharts wrappers, data passed via props
│   ├── dashboard/                # Dashboard-specific composites (table, etc.)
│   ├── layout/                    # Sidebar, Topbar, Logo, DashboardShell
│   └── ui/                         # Reusable primitives (Button, Card, Toast, ...)
├── lib/
│   ├── api.ts                   # server-only async data-access layer
│   ├── data.ts                  # Raw mock/sample data
│   ├── routes.ts                # Route constants + isProtectedRoute()/isAuthRoute()
│   ├── session.ts               # Demo cookie session helpers
│   ├── site.ts                  # Site URL/name/description for metadata
│   ├── theme.ts                 # Theme persistence (localStorage + data-theme)
│   └── utils.ts                 # cn(), formatDate(), initials()
├── types/
│   └── index.ts                 # Shared TypeScript types
└── middleware.ts                # Route protection

e2e/
└── auth.spec.ts                 # Playwright: login/register/logout/404 flows

*.test.ts(x) files sit next to the source they cover (e.g. src/lib/utils.test.ts).
```

## Getting Started

### Prerequisites

- Node.js 18.18 or later (see `.nvmrc`)
- npm (or pnpm/yarn — adjust commands accordingly)

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/login`; sign in with any non-empty email/password (or use **Continue as guest**) to reach the dashboard — there's no real backend, so any input works.

### Available Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Start the development server           |
| `npm run build`        | Create an optimized production build   |
| `npm run start`        | Run the production build locally       |
| `npm run lint`         | Run ESLint                             |
| `npm run typecheck`    | Run the TypeScript compiler (no emit)  |
| `npm run format`       | Format the codebase with Prettier      |
| `npm run format:check` | Check formatting without writing files |
| `npm run test`         | Run unit tests (Vitest)                |
| `npm run test:watch`   | Run unit tests in watch mode           |
| `npm run test:e2e`     | Run the Playwright end-to-end suite    |

## Routes

| Route        | Access    | Description                                    |
| ------------ | --------- | ---------------------------------------------- |
| `/`          | Public    | Redirects to `/login`                          |
| `/login`     | Public*   | Sign-in form                                   |
| `/register`  | Public*   | Account creation form                          |
| `/dashboard` | Protected | Metrics, charts, and recent applications       |
| `/profile`   | Protected | User profile and editable personal information |
| `/settings`  | Protected | Account, notification, and appearance settings |

\* Redirects to `/dashboard` if you already have a session.

## Deployment

This project is zero-config on [Vercel](https://vercel.com) — it's a standard Next.js App Router app with no required environment variables.

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Import it at [vercel.com/new](https://vercel.com/new), or click the **Deploy with Vercel** button above.
3. Vercel auto-detects the Next.js framework preset — no build command overrides needed.
4. Deploy.

**Optional environment variable:**

| Variable               | Purpose                                                                                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL used for `metadataBase` and the sitemap. Defaults to Vercel's own production URL (`VERCEL_PROJECT_PRODUCTION_URL`) when unset, so you generally don't need to set this. |

**Production readiness checklist** (already handled in this repo):

- ✅ Security response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) set in `next.config.ts`
- ✅ `robots.ts` disallows the authenticated routes from indexing while keeping auth pages crawlable
- ✅ `sitemap.ts` and `manifest.ts` for SEO/PWA metadata
- ✅ `metadataBase` configured so Open Graph/Twitter image URLs resolve correctly in production
- ✅ CI pipeline (`.github/workflows/ci.yml`) runs format check, lint, typecheck, unit tests, build, and a full Playwright e2e suite on every push/PR
- ✅ All routes statically prerendered (`○ (Static)` in the build output) — no server compute needed for the current mock data
- ✅ 100/100 Lighthouse accessibility on every page, 97-99 performance, 100 best practices (audited with Lighthouse + axe-core, not assumed)

## Notes on the mock backend

- **Authentication** is enforced by real middleware (`src/middleware.ts`), but the session it checks is a plain cookie set client-side on form submit (`src/lib/session.ts`) — there's no password verification. To make it real: replace `createSession()`/`destroySession()` with calls to an auth provider (NextAuth.js, Clerk, Supabase Auth, etc.) that sets an httpOnly cookie, and the middleware logic doesn't need to change.
- **Data** lives in `src/lib/data.ts` and is served through the async functions in `src/lib/api.ts`. Swap the function bodies for real `fetch()`/ORM calls — the Suspense boundaries and prop-typed components downstream don't need to change.

## Roadmap

Ideas for a next iteration, in rough priority order:

- Wire up a real auth provider and database
- Filtering/sorting/pagination on the applications table
- Turn the "Soon" sidebar items (Applications, Analytics, Companies, Messages) into real pages
- Component-level visual regression testing (e.g. Playwright screenshot assertions) to catch future contrast/layout regressions automatically

## License

[MIT](LICENSE) © Luana Furtado

---

📄 See [CASE_STUDY.md](CASE_STUDY.md) for the full write-up of the technical challenges and decisions behind this project.
