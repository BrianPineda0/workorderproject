"use client";

import { useMemo, useState } from "react";
import type { WorkOrder } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
}

type SortDirection = "asc" | "desc";

interface Column {
  key: keyof WorkOrder;
  label: string;
  align?: "right";
}

const COLUMNS: Column[] = [
  { key: "id", label: "ID" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "assignedTech", label: "Assigned Tech" },
  { key: "scheduledDate", label: "Scheduled Date" },
  { key: "hoursWorked", label: "Hours Worked", align: "right" },
];

/**
 * Compare two work orders on a column, handling each data type explicitly:
 * numbers numerically, dates by timestamp, everything else as strings.
 * Always returns an ascending-order result; the caller negates for descending.
 */
function compareWorkOrders(
  a: WorkOrder,
  b: WorkOrder,
  column: keyof WorkOrder,
): number {
  switch (column) {
    case "hoursWorked":
      return a.hoursWorked - b.hoursWorked;
    case "scheduledDate":
      return (
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
      );
    case "id":
    case "customer":
    case "assignedTech":
    case "status":
    case "priority":
      return a[column].localeCompare(b[column]);
  }
}

export default function WorkOrdersTable({ workOrders }: WorkOrdersTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof WorkOrder>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function handleSort(column: keyof WorkOrder) {
    if (column === sortColumn) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const sortedOrders = useMemo(() => {
    // Sort a copy — never mutate the prop array.
    const copy = [...workOrders];
    copy.sort((a, b) => {
      const result = compareWorkOrders(a, b, sortColumn);
      return sortDirection === "asc" ? result : -result;
    });
    return copy;
  }, [workOrders, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {COLUMNS.map((col) => {
              const isActive = sortColumn === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    isActive
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`px-4 py-3 ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  <button
                    type="button"
                    onClick={() => handleSort(col.key)}
                    className={`flex w-full items-center gap-1 rounded hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      col.align === "right" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{col.label}</span>
                    {/* Fixed-width slot so headers don't shift when the arrow appears. */}
                    <span aria-hidden="true" className="inline-block w-3 text-center">
                      {isActive ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sortedOrders.map((order) => (
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
