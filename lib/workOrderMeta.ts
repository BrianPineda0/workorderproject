// Single source of truth for work-order domain metadata: the canonical, ordered
// sets of statuses and priorities, the types derived from them, and the
// label/rank maps keyed off those types. This lives in lib/ (not in a display
// component) so both the filter controls and the status badge read the same
// domain facts — a control should not depend on a component for them.

export const WORK_ORDER_STATUSES = [
  "NEW",
  "SCHEDULED",
  "IN_PROGRESS",
  "WAITING_ON_PARTS",
  "COMPLETED",
  "CANCELLED",
] as const;

export const WORK_ORDER_PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
] as const;

export type WorkOrderStatus = (typeof WORK_ORDER_STATUSES)[number];
export type WorkOrderPriority = (typeof WORK_ORDER_PRIORITIES)[number];

// Human-readable labels per status, reused by both the badge and the filter
// dropdown so the displayed text can't drift between them.
export const STATUS_LABELS: Record<WorkOrderStatus, string> = {
  NEW: "New",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In progress",
  WAITING_ON_PARTS: "Waiting on parts",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

// Sort status by job lifecycle, not alphabetically — far more useful to a
// dispatcher scanning the board than A→Z.
export const STATUS_RANK: Record<WorkOrderStatus, number> = {
  NEW: 1,
  SCHEDULED: 2,
  IN_PROGRESS: 3,
  WAITING_ON_PARTS: 4,
  COMPLETED: 5,
  CANCELLED: 6,
};

// Sort priority by severity, not alphabetically — a dispatcher wants the most
// urgent jobs to surface, not "HIGH" landing between "URGENT" and "LOW".
export const PRIORITY_RANK: Record<WorkOrderPriority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
};
