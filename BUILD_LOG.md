# Build Log

A commit-by-commit walkthrough of what this work-orders dashboard does and why
each piece is built the way it is.

### scaffold Next.js 14 + Tailwind
Sets up the App Router project and strips the generated boilerplate to a clean
start. Styling is plain Tailwind utility classes with no component or UI library —
the brief is small and self-contained, so keeping the dependency surface minimal
is preferable to pulling in a framework it doesn't need. Next runs on the patched
14.2.35 release, which retains the security fix for a known vulnerability in the
14.2 line.

### add work order type and mock data
Introduces the `WorkOrder` interface and 20 mock orders, kept as a typed module in
`lib/workOrders.ts` rather than JSON or inline literals. The compiler then checks
every row against the type, so a bad status or missing field is a build error
rather than a runtime surprise. The data is internally consistent: `hoursWorked`
tracks status, with NEW and SCHEDULED at 0, IN_PROGRESS logging partial hours, and
COMPLETED carrying meaningful totals, so the numbers stay coherent.

### render work orders table
Renders the orders in a table. `app/page.tsx` is a Server Component that loads the
static data and passes it to a presentational `WorkOrdersTable`. Because the
content is static with no interactivity yet, the page renders entirely on the
server and ships no client JavaScript for the table, while keeping data-loading
and markup as separate concerns.

### add status badges
Adds a dedicated `StatusBadge` component that renders each status as a colored
pill, isolating that display concern from the table's structure. Its color map is
typed as a full `Record<WorkOrderStatus, …>`, so adding a status without a color
fails to compile rather than rendering unstyled. Each pill pairs a colored dot
with a text label, and the text carries the meaning so the status stays legible
without relying on color alone.

### add column sorting
Makes every column header sortable. Sorting needs React state for the active
column and direction, so the table becomes a Client Component (`'use client'`). A
single type-aware `compareWorkOrders` handles each field by type — numeric
subtraction for hours, timestamp comparison for dates, lexical `localeCompare` for
strings — rather than one generic comparator that would mis-order numbers or
dates. The sort runs on a copy (`[...workOrders]`), so the prop is never mutated.

### add status filter, search, empty state
Adds a status dropdown, a case-insensitive substring search on customer name, and
an empty state for when nothing matches. Filtering and sorting run together in one
`useMemo` — filter first, then sort the result — recomputed only when the data or
controls change. Because `filter()` returns a new array, the later sort still
leaves the prop untouched. The dropdown's labels come from the same
`STATUS_LABELS` map the badges use, so the two can't drift apart.

### sort status by lifecycle, priority by severity
Replaces alphabetical ordering of Status and Priority with domain ordering via
rank maps: Status by workflow stage (New → Scheduled → In progress → Waiting on
parts → Completed → Cancelled) and Priority by severity (Low → Medium → High →
Urgent). A work board is read by where a job sits in its lifecycle and how urgent
it is, not by the alphabet, so ranked ordering is what's useful when scanning the
queue.

### extract work order metadata module
Consolidates the domain metadata into `lib/workOrderMeta.ts` as a single source of
truth: the status and priority sets as `as const` tuples, the union types derived
from them, and the label and rank maps. Previously the table imported its status
labels from the badge component — a control depending on a display component — and
built its filter options with an unchecked `Object.keys(...) as WorkOrderStatus[]`
cast. The neutral leaf module fixes the dependency direction and lets the dropdown
map the typed tuple directly, removing the cast.

### add per-column default sort direction
Lets a column declare the direction it takes on the first click; Priority and
Hours Worked default to descending, so they surface the most urgent jobs and
largest hour totals first rather than starting from the lowest. The default
applies only when switching columns — clicking the active column still toggles
direction.

### add README and CLAUDE.md / clarify search label and trim comment
Adds the project README and the CLAUDE.md guidance file, then makes small
precision fixes: clarifying the customer-search label and trimming a stale comment.
