# Work Orders Dashboard

A read-only field-service work-orders dashboard for an environmental test-chamber
manufacturer.

**Live:** https://workorderproject.vercel.app

## Stack

- Next.js 14 (App Router)
- TypeScript (`strict`)
- Tailwind CSS (plain utilities, no component library)
- Static, typed mock data — no database

## Features

1. 20 typed mock work orders covering all statuses and priorities.
2. Table of all orders: ID, Customer, Status, Priority, Assigned Tech, Scheduled Date, Hours Worked.
3. Sortable columns — every header toggles ascending/descending with an active arrow indicator; Status sorts by lifecycle and Priority by severity, and columns can declare a default direction (Priority and Hours Worked open highest-first).
4. Status filter dropdown with an "All" option.
5. Case-insensitive substring search by customer name.
6. Color-coded status pills (dot + label; the text carries the meaning, so it stays readable without color).
7. Friendly empty state when filters/search match nothing.
8. Deployed to Vercel (link above).

## Architecture

`app/page.tsx` is a Server Component that loads the static data and passes it to a
single Client Component, `components/WorkOrdersTable.tsx`, which owns all
interactivity (sort, filter, search) behind one `'use client'` boundary. Domain
metadata — the canonical status/priority sets, their derived types, and the
label/rank maps — is centralized in `lib/workOrderMeta.ts` as the single source of
truth; `lib/types.ts` defines the `WorkOrder` interface and re-exports those
types, and `lib/workOrders.ts` holds the static seed data.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Reflection

Claude Code and Codex assisted with the implementation of this project. They helped with setup, planning, the mock dataset, and the first version of the table, sorting, filtering, and search. I drove the work in small commits, building the project up piece by piece instead of having everything already integrated and committing it all at once. My focus was reviewing what both tools gave me and making choices based on what would benefit the app most.

The main thing I cared about was data and structure. I made sure the 20 work orders made sense, so hoursWorked matched status. New and scheduled jobs stayed at 0, in progress jobs had partial hours, and completed jobs had believable totals. I also kept page.tsx as a Server Component and put the interactive state in one client table component, so the app stayed simple and matched the scope.

The biggest thing I rewrote was sorting. The first version compared every column the same way, so Status and Priority sorted alphabetically instead of by meaning. I replaced that with rank maps for status and priority, while hours sort numerically and dates sort by time. This makes the table more useful because priority and workflow order actually mean something to the user.

With more time, I would add tests for filtering and sorting logic, cleaner date formatting, a result count, and URL synced filters. With setup and planning, I finished a little under the 2 hour mark. BUILD_LOG.md also explains the commit history and includes a timeline of the build.
