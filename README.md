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
