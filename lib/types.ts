import type { WorkOrderStatus, WorkOrderPriority } from "@/lib/workOrderMeta";

// Re-export the domain types so existing `@/lib/types` imports keep working.
export type { WorkOrderStatus, WorkOrderPriority };

export interface WorkOrder {
  id: string;
  customer: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTech: string;
  scheduledDate: string; // ISO date
  hoursWorked: number;
}
