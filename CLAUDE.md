# CLAUDE.md

## Project

A single-page, read-only work-orders dashboard (Next.js 14 App Router) for an
environmental test-chamber manufacturer: a table of 20 static mock work orders
with column sorting, a status filter, customer search, status pills, and an empty
state. No backend — data is static and typed.

## Conventions

- **App Router split:** `app/page.tsx` stays a Server Component and loads the
  data; all interactivity lives in one `'use client'` island
  (`components/WorkOrdersTable.tsx`). Don't add `'use client'` to the page.
- **Strict TypeScript, no `any`.** Prefer types derived from data (e.g. union
  types from `as const` tuples) and exhaustive `Record` maps so a missing case is
  a compile error.
- **Plain Tailwind** utilities only — no component/UI library.
- **Single source of truth:** domain metadata (status/priority sets, derived
  types, label and rank maps) lives in `lib/workOrderMeta.ts`. UI reads from it;
  don't redefine these in components.
- **Static data** is typed and kept in `lib/` (`lib/workOrders.ts`,
  `lib/types.ts`).

## How this was built

Built by directing Claude Code in small, focused commits — one feature per
commit, each diff reviewed before it landed. Scope was deliberately held to the
brief (no tests/CI/extra features added beyond what was asked).
