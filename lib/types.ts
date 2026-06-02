export type WorkOrderStatus =
  | "NEW"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "WAITING_ON_PARTS"
  | "COMPLETED"
  | "CANCELLED";

export type WorkOrderPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface WorkOrder {
  id: string;
  customer: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTech: string;
  scheduledDate: string; // ISO date
  hoursWorked: number;
}
