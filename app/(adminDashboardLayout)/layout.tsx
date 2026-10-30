import { DashboardHeader } from "@/components/dashboard_component/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard_component/DashboardSidebar";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden w-full max-w-full bg-[#f8faf9] font-['Urbanist',sans-serif]">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#f8faf9]">
          {children}
        </main>
      </div>
    </div>
  );
}
