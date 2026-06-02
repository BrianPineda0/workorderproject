import type { WorkOrder } from "@/lib/types";

/**
 * Mock work orders for an environmental / thermal test-chamber manufacturer.
 * Customers are invented companies in the industries we actually serve:
 * aerospace & defense, semiconductor, pharma/biotech, battery & materials labs,
 * EV, and medical devices. Technician names are invented.
 *
 * Realism rules applied to hoursWorked (so the numbers tell a coherent story):
 *   NEW              -> 0      (just logged; work not started yet)
 *   SCHEDULED        -> 0      (booked, work not started)
 *   IN_PROGRESS      -> 1-6    (partial hours, job underway)
 *   WAITING_ON_PARTS -> >0     (hours logged before the job stalled)
 *   COMPLETED        -> 3-20   (meaningful hours for a finished job)
 *   CANCELLED        -> 0      (or small if diagnosed before being cancelled)
 *
 * Dates run mid-May to mid-June 2026 (today is ~2026-06-01): finished and
 * stalled jobs sit in the past, scheduled and new jobs in the near future.
 * IDs are sequential with small gaps, as a real ticket counter would be.
 */
export const workOrders: WorkOrder[] = [
  {
    id: "WO-2026-0101",
    customer: "Northgate Semiconductor",
    status: "COMPLETED",
    priority: "HIGH",
    assignedTech: "Maya Chen",
    scheduledDate: "2026-05-13",
    hoursWorked: 12.5,
  },
  {
    id: "WO-2026-0102",
    customer: "Helios Aerospace",
    status: "COMPLETED",
    priority: "MEDIUM",
    assignedTech: "Diego Vargas",
    scheduledDate: "2026-05-15",
    hoursWorked: 8,
  },
  {
    id: "WO-2026-0103",
    customer: "Voltaic Energy Labs",
    status: "CANCELLED",
    priority: "LOW",
    assignedTech: "Priya Nair",
    scheduledDate: "2026-05-16",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0105",
    customer: "Cedar Ridge Pharmaceuticals",
    status: "COMPLETED",
    priority: "URGENT",
    assignedTech: "Owen Brooks",
    scheduledDate: "2026-05-18",
    hoursWorked: 16,
  },
  {
    id: "WO-2026-0106",
    customer: "Cascade Semiconductor",
    status: "WAITING_ON_PARTS",
    priority: "HIGH",
    assignedTech: "Maya Chen",
    scheduledDate: "2026-05-19",
    hoursWorked: 5.5,
  },
  {
    id: "WO-2026-0108",
    customer: "Apex Aerodynamics",
    status: "COMPLETED",
    priority: "MEDIUM",
    assignedTech: "Tasha Bell",
    scheduledDate: "2026-05-20",
    hoursWorked: 6.5,
  },
  {
    id: "WO-2026-0109",
    customer: "Ironwood Materials Lab",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assignedTech: "Liam Foster",
    scheduledDate: "2026-05-22",
    hoursWorked: 3,
  },
  {
    id: "WO-2026-0110",
    customer: "BioNova Therapeutics",
    status: "COMPLETED",
    priority: "HIGH",
    assignedTech: "Renee Okafor",
    scheduledDate: "2026-05-23",
    hoursWorked: 9.5,
  },
  {
    id: "WO-2026-0112",
    customer: "Quantum Cell Technologies",
    status: "CANCELLED",
    priority: "MEDIUM",
    assignedTech: "Carlos Mendez",
    scheduledDate: "2026-05-25",
    hoursWorked: 1.5,
  },
  {
    id: "WO-2026-0113",
    customer: "Stratos Defense Systems",
    status: "WAITING_ON_PARTS",
    priority: "URGENT",
    assignedTech: "Diego Vargas",
    scheduledDate: "2026-05-26",
    hoursWorked: 4,
  },
  {
    id: "WO-2026-0114",
    customer: "Photon Microsystems",
    status: "COMPLETED",
    priority: "LOW",
    assignedTech: "Hannah Doyle",
    scheduledDate: "2026-05-27",
    hoursWorked: 4.5,
  },
  {
    id: "WO-2026-0116",
    customer: "Ascend Battery Systems",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignedTech: "Wes Tanaka",
    scheduledDate: "2026-05-29",
    hoursWorked: 5,
  },
  {
    id: "WO-2026-0117",
    customer: "Meridian Biolabs",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assignedTech: "Priya Nair",
    scheduledDate: "2026-05-30",
    hoursWorked: 2.5,
  },
  {
    id: "WO-2026-0118",
    customer: "Silicon Crest Microelectronics",
    status: "SCHEDULED",
    priority: "MEDIUM",
    assignedTech: "Maya Chen",
    scheduledDate: "2026-06-03",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0120",
    customer: "Terraform EV",
    status: "SCHEDULED",
    priority: "HIGH",
    assignedTech: "Owen Brooks",
    scheduledDate: "2026-06-05",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0121",
    customer: "Lumen Materials Research",
    status: "NEW",
    priority: "LOW",
    assignedTech: "Renee Okafor",
    scheduledDate: "2026-06-09",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0123",
    customer: "Sentinel Defense Electronics",
    status: "NEW",
    priority: "URGENT",
    assignedTech: "Carlos Mendez",
    scheduledDate: "2026-06-10",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0124",
    customer: "Halcyon Pharma",
    status: "SCHEDULED",
    priority: "LOW",
    assignedTech: "Tasha Bell",
    scheduledDate: "2026-06-12",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0126",
    customer: "Vanguard Aerosystems",
    status: "NEW",
    priority: "MEDIUM",
    assignedTech: "Hannah Doyle",
    scheduledDate: "2026-06-13",
    hoursWorked: 0,
  },
  {
    id: "WO-2026-0128",
    customer: "Cortex Medical Devices",
    status: "SCHEDULED",
    priority: "MEDIUM",
    assignedTech: "Liam Foster",
    scheduledDate: "2026-06-16",
    hoursWorked: 0,
  },
];
