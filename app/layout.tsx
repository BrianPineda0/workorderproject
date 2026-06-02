import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Orders Dashboard",
  description:
    "Track and manage field service work orders — sort, filter, and search across status, priority, and assigned technician.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
