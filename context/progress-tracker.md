# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 08: Editor Workspace Shell — complete

## Current Goal

- Awaiting Feature 09.

## Completed

- Next.js boilerplate cleanup (stripped globals.css, removed SVGs, minimal page.tsx)
- Feature 01: Design system — shadcn/ui (Radix, Nova preset) initialized, 7 UI components added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, lib/utils.ts cn() helper created, globals.css updated with dark-only theme tokens.
- Feature 02: Editor chrome — EditorNavbar (fixed top bar, sidebar toggle with PanelLeftOpen/PanelLeftClose) and ProjectSidebar (floating overlay, slides from left, Tabs with My Projects/Shared empty states, New Project button) created in components/editor/. Dialog pattern confirmed ready via existing dialog.tsx.
- Feature 03: Auth — ClerkProvider with dark theme wraps root layout; proxy.ts (protected-first) at project root; sign-in and sign-up pages at /sign-in/[[...sign-in]] and /sign-up/[[...sign-up]] with two-panel layout (left: logo+tagline+feature list, right: Clerk form; form-only on small screens); app/page.tsx redirects authenticated users to /editor and unauthenticated users to /sign-in; UserButton added to EditorNavbar right section; @clerk/ui installed for dark theme; Clerk env vars added to .env.local.
- Feature 04: Project Dialogs & Editor Home — editor home screen with heading/description/New Project button; Create (name + live slug preview), Rename (prefilled, auto-focus, Enter submits), Delete (destructive) dialogs; ProjectSidebar updated with project items and hover rename/delete actions for owned projects; mobile backdrop scrim; useProjectDialogs hook; ProjectDialogsContext for cross-layout state; all wired end-to-end with mock data.
- Feature 05: Prisma Schema & Data Layer — Project and ProjectCollaborator models in prisma/models/project.prisma; ProjectStatus enum (DRAFT/ARCHIVED); all indexes, relations, cascade delete, and column mappings; lib/prisma.ts singleton with DATABASE_URL branching (prisma+postgres:// → accelerateUrl, others → PrismaPg adapter); migration 20261005221710_init_projects applied; client generated to app/generated/prisma/.
- Feature 06: Project APIs — GET /api/projects (list by owner, desc), POST /api/projects (create, name defaults to "Untitled Project"), PATCH /api/projects/[projectId] (rename, owner-only), DELETE /api/projects/[projectId] (owner-only, 204); 401 for unauthenticated, 403 for non-owner, 404 for missing; build passes.
- Feature 07: Wire Editor Home — lib/projects.ts server helper (owned + shared via Clerk email); useProjectActions hook (create → POST + navigate to /editor/[id], rename → PATCH + refresh, delete → DELETE + redirect or refresh); app/editor/layout.tsx async server component fetches data; EditorShell accepts ownedProjects/sharedProjects props; ProjectSidebar uses real Prisma Project type; CreateProjectDialog shows roomIdPreview (slugified name + short suffix); RenameProjectDialog and DeleteProjectDialog wired with onSubmit/onConfirm + isLoading; project-dialogs-context updated to UseProjectActionsReturn; build passes.
- Feature 08: Editor Workspace Shell — lib/project-access.ts with getIdentity() and getProjectAccess() helpers; AccessDenied component (lock icon, message, back link); WorkspaceNavbar (project name, share button, AI toggle, UserButton); WorkspaceShell (full-viewport layout: WorkspaceNavbar + ProjectSidebar + canvas placeholder + slide-over AI sidebar placeholder + all dialogs); app/editor/[roomId]/page.tsx server component (unauth → redirect /sign-in, no access → AccessDenied, else WorkspaceShell with project + project lists); app/editor/layout.tsx reduced to minimal pass-through; app/editor/page.tsx made async server component (fetches data, renders EditorShell + EditorHome); lib/projects.ts refactored to use getIdentity(); ProjectSidebar gains activeProjectId prop for highlight; build passes.

## In Progress

- None.





## Next Up

- Feature 09 (to be defined)

## Open Questions

- None yet.

## Fixes

- lib/prisma.ts — added `normalizeConnectionString()` to replace deprecated `sslmode=require/prefer/verify-ca` with `sslmode=verify-full` before passing to PrismaPg. Silences the pg-connection-string v3 security warning; semantics are unchanged.

## Architecture Decisions

- Dark only — no light mode. All theme values defined as CSS custom properties in globals.css and mapped via @theme inline. `dark` class is hardcoded on `<html>` to activate dark: Tailwind variants.
- shadcn/ui component files in components/ui/ are not modified after generation.
- cn() helper uses the `cn` npm package (compiled drop-in for clsx + tailwind-merge).

## Session Notes

- Path alias `@/*` maps to project root.
- ui-context.md defines the authoritative token names and hex values.
- Custom design tokens (--bg-base, --text-primary, etc.) live in :root alongside shadcn vars, mapped to Tailwind via @theme inline as --color-base, --color-copy-primary, etc.
