# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Scope and stack
- Frontend-only prototype with simulated multi-account ecosystem (no backend). All persistence is client-side via IndexedDB (for domain data) and localStorage (for preferences). Media is embedded (e.g., YouTube/Vimeo).
- Target stack: React + TypeScript with Tailwind CSS; component library documented in Storybook.
- Roles: Organizations, Founders (solo-org), Individuals. Role-based access and identity tags (e.g., @X School, @Y Firm, Independent).

Repository status
- As of 2025-09-26, this repo has not been scaffolded yet (only README.md). Commands below reflect the intended setup once the React/TS project is initialized.

Commands (PowerShell-friendly)
- Use whichever package manager lockfile exists; examples show npm/pnpm/yarn variants.
  - Install deps: `npm i` | `pnpm i` | `yarn`
  - Start dev server: `npm run dev` | `pnpm dev` | `yarn dev`
  - Production build: `npm run build` | `pnpm build` | `yarn build`
  - Preview production build (if available): `npm run preview` | `pnpm preview` | `yarn preview`
  - Lint (ESLint): `npm run lint` | `pnpm lint` | `yarn lint`
  - Unit tests (Jest or Vitest): `npm test` | `pnpm test` | `yarn test`
    - Run a single test by name (Jest): `npx jest -t "<test name regex>"`
    - Run a single test file (Jest): `npx jest path/to/test.spec.ts`
    - Run a single test by name (Vitest): `npx vitest run -t "<test name regex>"`
    - Run a single test file (Vitest): `npx vitest run path/to/test.spec.ts`
  - Storybook
    - Dev: `npx storybook dev -p 6006` or `npm run storybook` | `pnpm storybook` | `yarn storybook`
    - Build: `npx storybook build` or `npm run build-storybook` | `pnpm build-storybook` | `yarn build-storybook`

Data management (local-only)
- Reset-to-demo: expose an in-app "Reset demo data" that clears IndexedDB and localStorage then seeds demo content.
- Manual reset during development (fallback): clear site data via browser devtools (Application tab) for IndexedDB and localStorage, then refresh.
- Export/Import: provide UI to export the JSON dataset and import it back; no CLI is expected.

High-level architecture
- App shell and navigation
  - TopNav, Sidebar, and an Account Switcher enabling impersonation of different roles (Org/Founder/Individual) to simulate multi-user.
  - Client-side routing for major surfaces (Feed, Profiles, Org/Founder pages, Courses, Reels, Videos, Chat, Servers, Drive, Calendar, Notes, Notifications, Settings).

- Roles and access model
  - Organizations and Founders have the full toolkit (courses, videos, posts, library, calendar, servers, DM). Individuals primarily consume, connect, enroll, take notes; creation is limited.
  - Identity tags are derived from membership/affiliation and rendered across UI (@X School, @Y Firm, Independent).

- Domain modules (frontend only)
  - Communication: Chat (1:1, group), Server channels with invites, DMs outside servers. Local persistence + optimistic UI.
  - Learning & Content: Courses (enrollment, progress), Video hub (long-form), Reels (short-form). All media embedded; progress tracked locally.
  - Collaboration: Drive-like Library (books/PDFs/resources), Calendar (events, availability, bookings), Notes (markdown editor, exportable).
  - Networking: Profiles (LinkedIn-style), connect/follow, discovery of orgs/founders.
  - Glue: Search & discovery across entities; Recommendations; Notifications; Payments (mock); Moderation (report/verify, mock); Analytics dashboards (mock); Trust/verification; AI simulations (summaries/suggestions). All computed client-side from local dataset.

- Data layer
  - Persistence: IndexedDB stores users, orgs, courses, enrollments/progress, posts/announcements, messages/threads, servers/channels/members, assets/library items, events/bookings, notifications. Preferences live in localStorage.
  - Access: a thin storage service abstracts CRUD, versioned migrations, and seeding demo data (export/import JSON). No network calls.

- UI components and library
  - Shared components (cards, players, editors, panels) live in a component library documented and tested in Storybook.
  - Tailwind provides styling with Inter font, black-on-white theme. Ensure Inter is loaded (e.g., via @fontsource or CDN) and applied globally.

- Constraints
  - Offline-capable demo; no backend. Multi-user behavior is simulated via the Account Switcher and seeded data. Clear visual banner indicating prototype status.

Files and project rules detected
- README.md exists but contains only the repository name.
- No CLAUDE.md, Cursor rules, or Copilot instructions detected.

Environment notes
- Shell: PowerShell (pwsh) on Windows. Prefer non-interactive, non-paginated commands (e.g., `git --no-pager`).

Next steps
- After scaffolding the React/TypeScript project and adding tooling, update package.json scripts to match the commands above and add exact details (Jest vs Vitest, ESLint config, Storybook version). Then re-run a repository scan to replace any generic commands with the precise ones present in this repo.
