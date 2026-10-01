# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 01: Design System — complete

## Current Goal

- Awaiting Feature 02.

## Completed

- Next.js boilerplate cleanup (stripped globals.css, removed SVGs, minimal page.tsx)
- Feature 01: Design system — shadcn/ui (Radix, Nova preset) initialized, 7 UI components added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea), lucide-react installed, lib/utils.ts cn() helper created, globals.css updated with dark-only theme tokens.

## In Progress

- None.

## Next Up

- Feature 02 (to be defined)

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
