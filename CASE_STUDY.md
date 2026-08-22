# Case Study: Remote Job Dashboard

_A walkthrough of how I built, reviewed, and hardened a production-style Next.js dashboard, written the way I'd present it in a frontend interview._

**Live app:** [remote-job-dashboard.vercel.app](https://remote-job-dashboard.vercel.app) · **Repo:** [github.com/Luanafrtd/remote-job-dashboard](https://github.com/Luanafrtd/remote-job-dashboard)

---

## Project Overview

Remote Job Dashboard is a job-application tracker: a protected dashboard with charts and a data table, a full authentication flow, and profile/settings pages. I built it with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4, and deployed it on Vercel with CI on every push.

The point of the project wasn't the job-tracker concept itself. It's a vehicle for demonstrating how I actually build and ship a Next.js app: route architecture, server/client component boundaries, a real auth guard, and the kind of verification (Lighthouse, axe, real-browser testing, cross-version CI checks) that separates "looks done" from "is done."

## Problem Statement

I wanted a portfolio piece that would hold up under the scrutiny of an actual code review, not just look good in a screenshot. Most portfolio dashboards I'd seen (including my first pass at this one) have the same gaps: no tests, no real auth boundary, colors picked by eye instead of verified, and a README that oversells what's actually there. I set myself two constraints:

1. Build it like I'd build it at a job: real architecture decisions, defensible trade-offs, things I could explain in a review.
2. Then _actually review it_ like a senior engineer would, with tools, not vibes, and fix everything the review found.

## Solution

**Core features:**

- A dashboard with four stat cards, a trend chart, a status breakdown chart, a category breakdown chart, and a recent-applications table
- Login/register pages with client-side validation, wired to a real session cookie
- A profile page and a tabbed settings page (account, notifications, appearance)
- A sidebar + topbar shell that collapses into a mobile drawer

**What makes it more than a UI mockup:**

- `middleware.ts` actually enforces the auth boundary: hitting `/dashboard` with no session redirects to `/login?from=/dashboard` server-side, before any page code runs. It's not just a hidden link.
- The dashboard streams: each section is an independent async server component in its own `<Suspense>` boundary, backed by a `server-only` data-access layer that simulates real API latency.
- Light/dark/system theming that's actually wired up, not a decorative toggle. More on that below, because the first version _was_ decorative, and that's a story worth telling on its own.

## Technical Challenges

These are the problems that were actually interesting to solve: not "I used Tailwind," but specific things that broke or needed real judgment calls.

### 1. A color that mathematically couldn't satisfy both use cases

During a later accessibility pass, I ran Lighthouse against the deployed site instead of eyeballing it, and it failed color-contrast in dark mode: the primary indigo (`#6366f1`) was used both as link/text color directly on the dark background _and_ as a button fill with white text on top. I ran the actual WCAG contrast formula and found the button-text pairing was at 4.46:1 and the text-on-background pairing was at 4.22:1, both just under the 4.5:1 requirement.

I tried to find a single shade that would fix both. It's not possible: satisfying "readable on a near-black background" requires a _high_-luminance color; satisfying "white text is readable on top of it" requires a _low_-luminance color. I solved the luminance inequalities directly and confirmed the two constraints don't overlap for this background/foreground pair: no single hex value works for both roles. The actual fix was architectural: split the token into `--primary` (for solid fills, tuned for white-text contrast) and a new `--link` token (for standalone text, tuned for background contrast). That one investigation also led me to check every other color pairing in the app systematically rather than assuming a "similar" color would be fine, and it wasn't: status badges failed contrast badly in **light** mode (as low as 2.86:1), and several chart legend colors failed in both themes. All of it got fixed with the same verify-first approach.

### 2. Two self-inflicted CI failures, caught before they shipped

When I added a Vitest unit-test suite, jsdom's `window.localStorage` collided with a native `localStorage` global in the Node version on my machine (Node 26). My first fix was a Node CLI flag (`--no-experimental-webstorage`); it worked locally and I pushed it. CI failed immediately: that flag doesn't exist on Node 20, which is what the project actually targets (`.nvmrc`, `engines`) and what GitHub Actions ran. I replaced it with a version-independent polyfill in the test setup file instead of a flag tied to my local Node version.

Fixing that surfaced a second, unrelated problem: the jsdom version I'd installed (v30) has an explicit `engines` requirement of Node 22.22+: it uses newer `undici` internals that don't exist on Node 20 at all. Rather than push a second guess, I installed a real Node 20.20.2 binary locally via Homebrew and ran the _entire_ check suite (lint, typecheck, format, unit tests, build) against it before pushing again. It caught what the engines field alone wouldn't have proven. That's the difference between "should work" and "verified to work in the actual CI environment."

### 3. A real date bug, found by writing a test

Writing a unit test for `formatDate` with a US timezone revealed that date-only strings like `"2026-08-01"` parse as UTC midnight; formatting them in the _viewer's local timezone_ rolled the date back to July 31 for anyone west of UTC: all of North America, most of the Pacific. This wasn't a hypothetical: I confirmed it by running the formatter under `TZ=America/Los_Angeles`. The fix was pinning the formatter's `Intl.DateTimeFormat` call to `timeZone: "UTC"`, since the data is calendar dates, not moments in time. This is the clearest example in the project of tests finding a bug I wouldn't have caught by looking at the code.

### 4. A dead control that looked alive

Code review, not tooling, caught this one: the Settings → Appearance page had Light/Dark/System buttons that visually toggled a "selected" state and did nothing else. The disclaimer text underneath admitted as much. A control that responds to clicks but has no effect is worse than no control; it actively misleads the user. I implemented real theme persistence: a `data-theme` attribute driven by `localStorage`, applied via a blocking inline script in `<body>` so there's no flash of the wrong theme on load, with the CSS supporting both `prefers-color-scheme` _and_ an explicit override that always wins.

## Architecture Decisions

- **Route groups own their layout.** `(auth)` renders a centered split-screen shell; `(dashboard)` renders the sidebar/topbar shell. The URL structure stays flat (`/login`, not `/auth/login`) while each area's chrome stays isolated.
- **Server components fetch, client components interact.** Every `page.tsx` is a server component that exports `metadata` and stays thin; interactive logic lives in a colocated client component (`LoginForm.tsx`, `ProfileView.tsx`, etc.). This is also what makes `/profile` and `/settings` have real per-page `<title>` tags despite being fully interactive: a client component can't export `metadata`, so the split isn't optional, it's required by the framework.
- **A real (simulated) data-access layer.** `src/lib/api.ts` is marked `server-only` and exposes `async` functions with artificial latency, standing in for real API calls. Swapping in a real backend means changing the _bodies_ of those functions, with no call-site changes anywhere downstream.
- **Suspense boundaries, not one big loading flag.** The dashboard composes five independent `<Suspense>` boundaries instead of a single `isLoading` state, so a slow section doesn't block a fast one. Because the current data is fully static, Next.js still correctly prerenders the whole page at build time. The architecture is streaming-ready without paying a runtime cost it doesn't currently need.
- **Middleware-enforced auth.** `middleware.ts` checks a session cookie against a route allowlist on every request, server-side, before any page component runs. It's not a client-side redirect that flashes protected content first.
- **Charts receive data as props, not as imports.** Chart components don't reach into the data module themselves; they're generic renderers fed by their parent section, which keeps them reusable and unit-testable in isolation.

## Performance Improvements

The dashboard route was shipping **228KB of First Load JS**, and Lighthouse flagged `bootup-time` and `mainthread-work-breakdown` at a 0 score. Recharts alone accounted for roughly 123KB of that, all loaded eagerly even though charts aren't needed for the page to become interactive.

I wrapped each of the three chart components in a small client wrapper using `next/dynamic(..., { ssr: false })`, so Recharts' JS is fetched in a separate chunk after the shell hydrates instead of blocking it.

| Metric                                | Before                     | After  |
| ------------------------------------- | -------------------------- | ------ |
| `/dashboard` First Load JS            | 228 KB                     | 105 KB |
| Lighthouse Performance (`/login`)     | 99                         | 99     |
| Lighthouse Performance (`/dashboard`) | flagged (`bootup-time`: 0) | 97     |

## Accessibility Improvements

I ran Lighthouse and axe-core against the actual deployed site (not a local guess) and fixed everything it found:

| Issue                                       | Root cause                                                                 | Fix                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Color contrast (dark mode buttons/links)    | One color used for two roles with incompatible luminance requirements      | Split into `--primary` and `--link` tokens                           |
| Color contrast (light-mode status badges)   | Badge colors never contrast-checked against their muted backgrounds        | Re-tuned all four status colors to ≥4.5:1                            |
| Color contrast (chart legends, both themes) | Chart palette shared across themes, never checked against the card surface | Theme-aware chart palette, each color verified                       |
| Missing `<main>` landmark                   | Auth layout used a plain `<div>` for its primary content                   | Changed to a semantic `<main>`                                       |
| Heading order (h1 → h3 skip)                | `CardTitle` hard-coded `<h3>` regardless of context                        | Changed to `<h2>`, fixed two other skips                             |
| No focus management on mobile drawer        | Drawer opened/closed with no focus handling                                | Focus moves into the drawer on open, returns to the trigger on close |
| Password-manager warning                    | Settings password form had no username field for autofill                  | Added a hidden, accessible username field                            |

**Result: Lighthouse accessibility went from 94 to 100 on every page**, verified against the live production URL after deploying the fixes.

## Results

- **Lighthouse (production, `/login`): Performance 99, Accessibility 100, Best Practices 100, SEO 100**
- **Accessibility: 94 → 100** across all five pages after the contrast/landmark/heading fixes
- **Dashboard First Load JS: 228KB → 105KB** after lazy-loading charts
- **Test coverage added from zero:** 29 Vitest unit tests and a 9-test Playwright e2e suite covering the full auth flow (login, register, logout, redirect-back, validation, 404), both running in CI on every push
- **CI catches real regressions**, not just style: two separate Node-version incompatibilities were caught by CI before they could have shipped, and I re-verified both fixes against a real Node 20 binary rather than trusting the fix on faith
- **A genuine correctness bug** (date formatting rolling back a day for ~half the world's timezones) found by writing a test, not by manual QA

---

_For the full technical README (setup instructions, project structure, and architecture notes), see [README.md](README.md)._
