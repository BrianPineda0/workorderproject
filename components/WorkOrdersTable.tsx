"use client";

import { useMemo, useState } from "react";
import type { WorkOrder } from "@/lib/types";
import {
  PRIORITY_RANK,
  STATUS_LABELS,
  STATUS_RANK,
  WORK_ORDER_STATUSES,
  type WorkOrderStatus,
} from "@/lib/workOrderMeta";
import StatusBadge from "@/components/StatusBadge";

interface WorkOrdersTableProps {
  workOrders: WorkOrder[];
}

type SortDirection = "asc" | "desc";

interface Column {
  key: keyof WorkOrder;
  label: string;
  align?: "right";
  // Direction applied when this column first becomes the sort column. Defaults
  // to "asc"; set "desc" where highest-first is the more useful first view.
  defaultDirection?: SortDirection;
}

const COLUMNS: Column[] = [
  { key: "id", label: "ID" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority", defaultDirection: "desc" },
  { key: "assignedTech", label: "Assigned Tech" },
  { key: "scheduledDate", label: "Scheduled Date" },
  {
    key: "hoursWorked",
    label: "Hours Worked",
    align: "right",
    defaultDirection: "desc",
  },
];

type StatusFilter = WorkOrderStatus | "ALL";

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
    case "status":
      return STATUS_RANK[a.status] - STATUS_RANK[b.status];
    case "priority":
      return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    case "id":
    case "customer":
    case "assignedTech":
      return a[column].localeCompare(b[column]);
  }
}

export default function WorkOrdersTable({ workOrders }: WorkOrdersTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof WorkOrder>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");

  function handleSort(column: keyof WorkOrder) {
    if (column === sortColumn) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      const defaultDirection =
        COLUMNS.find((c) => c.key === column)?.defaultDirection ?? "asc";
      setSortColumn(column);
      setSortDirection(defaultDirection);
    }
  }

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    // filter() returns a new array, so the later sort never mutates the prop.
    const filtered = workOrders.filter((order) => {
      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      const matchesSearch = order.customer.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
    filtered.sort((a, b) => {
      const result = compareWorkOrders(a, b, sortColumn);
      return sortDirection === "asc" ? result : -result;
    });
    return filtered;
  }, [workOrders, statusFilter, search, sortColumn, sortDirection]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="status-filter"
            className="text-xs font-medium text-slate-600"
          >
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">All</option>
            {WORK_ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:max-w-xs sm:flex-1">
          <label
            htmlFor="customer-search"
            className="text-xs font-medium text-slate-600"
          >
            Search
          </label>
          <input
            id="customer-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer…"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

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
                      <span
                        aria-hidden="true"
                        className="inline-block w-3 text-center"
                      >
                        {isActive ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  No work orders match your filters.
                </td>
              </tr>
            ) : (
              visibleOrders.map((order) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
