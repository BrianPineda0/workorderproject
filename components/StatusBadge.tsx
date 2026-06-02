import { STATUS_LABELS, type WorkOrderStatus } from "@/lib/workOrderMeta";

/**
 * Pill + dot colors per status. Typed as a full Record so adding a status to
 * the union without giving it a color is a compile error. Soft background with
 * same-hue readable text; the dot reinforces but never carries meaning alone.
 */
const STATUS_STYLES: Record<WorkOrderStatus, { pill: string; dot: string }> = {
  NEW: { pill: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  SCHEDULED: { pill: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  IN_PROGRESS: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  WAITING_ON_PARTS: { pill: "bg-purple-100 text-purple-800", dot: "bg-purple-500" },
  COMPLETED: { pill: "bg-green-100 text-green-800", dot: "bg-green-500" },
  CANCELLED: { pill: "bg-red-100 text-red-800", dot: "bg-red-500" },
};

interface StatusBadgeProps {
  status: WorkOrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${style.pill}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
