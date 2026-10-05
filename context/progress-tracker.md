# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 05: Prisma Schema & Data Layer — complete

## Current Goal

- Awaiting Feature 06.

## Completed

- Next.js boilerplate cleanup (stripped globals.css, removed SVGs, minimal page.tsx)
- Feature 01: Design system — shadcn/ui (Radix, Nova preset) initialized, 7 UI components added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, lib/utils.ts cn() helper created, globals.css updated with dark-only theme tokens.
- Feature 02: Editor chrome — EditorNavbar (fixed top bar, sidebar toggle with PanelLeftOpen/PanelLeftClose) and ProjectSidebar (floating overlay, slides from left, Tabs with My Projects/Shared empty states, New Project button) created in components/editor/. Dialog pattern confirmed ready via existing dialog.tsx.
- Feature 03: Auth — ClerkProvider with dark theme wraps root layout; proxy.ts (protected-first) at project root; sign-in and sign-up pages at /sign-in/[[...sign-in]] and /sign-up/[[...sign-up]] with two-panel layout (left: logo+tagline+feature list, right: Clerk form; form-only on small screens); app/page.tsx redirects authenticated users to /editor and unauthenticated users to /sign-in; UserButton added to EditorNavbar right section; @clerk/ui installed for dark theme; Clerk env vars added to .env.local.
- Feature 04: Project Dialogs & Editor Home — editor home screen with heading/description/New Project button; Create (name + live slug preview), Rename (prefilled, auto-focus, Enter submits), Delete (destructive) dialogs; ProjectSidebar updated with project items and hover rename/delete actions for owned projects; mobile backdrop scrim; useProjectDialogs hook; ProjectDialogsContext for cross-layout state; all wired end-to-end with mock data.
- Feature 05: Prisma Schema & Data Layer — Project and ProjectCollaborator models in prisma/models/project.prisma; ProjectStatus enum (DRAFT/ARCHIVED); all indexes, relations, cascade delete, and column mappings; lib/prisma.ts singleton with DATABASE_URL branching (prisma+postgres:// → accelerateUrl, others → PrismaPg adapter); migration 20261005221710_init_projects applied; client generated to app/generated/prisma/.

## In Progress

- None.



## Next Up

- Feature 05 (to be defined)

## Open Questions

- None yet.

## Architecture Decisions

- Dark only — no light mode. All theme values defined as CSS custom properties in globals.css and mapped via @theme inline. `dark` class is hardcoded on `<html>` to activate dark: Tailwind variants.
- shadcn/ui component files in components/ui/ are not modified after generation.
- cn() helper uses the `cn` npm package (compiled drop-in for clsx + tailwind-merge).

## Session Notes

- Path alias `@/*` maps to project root.
- ui-context.md defines the authoritative token names and hex values.
- Custom design tokens (--bg-base, --text-primary, etc.) live in :root alongside shadcn vars, mapped to Tailwind via @theme inline as --color-base, --color-copy-primary, etc.
