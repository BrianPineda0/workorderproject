import type { WorkOrder } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
}

export default function WorkOrdersTable({ workOrders }: WorkOrdersTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Assigned Tech</th>
            <th className="px-4 py-3">Scheduled Date</th>
            <th className="px-4 py-3 text-right">Hours Worked</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {workOrders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                {order.id}
              </td>
              <td className="px-4 py-3 text-slate-700">{order.customer}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {order.priority}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {order.assignedTech}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                {order.scheduledDate}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-slate-700">
                {order.hoursWorked}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
