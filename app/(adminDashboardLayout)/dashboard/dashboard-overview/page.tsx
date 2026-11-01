"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Layers, Users, TrendingUp, RefreshCw } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/lib/feature/admin/adminApi";

// Modular Components
import { StatsCard } from "./_component/StatsCard";
import { UserTable } from "./_component/UserTable";
import { OverviewSkeleton } from "./_component/OverviewSkeleton";
import { Pagination } from "./_component/Pagination";

export default function DashboardOverviewPage() {
  const { data: statsResponse, isLoading, isFetching, refetch } = useGetDashboardStatsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  const stats = statsResponse?.data;
  const metrics = stats?.metrics;

  const usersList = stats?.recentUsers || [];
  const totalPages = Math.ceil(usersList.length / usersPerPage) || 1;
  const paginatedUsers = usersList.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="space-y-8 font-['Urbanist',sans-serif] text-[#2D312E]">
      {/* Top Welcome & Refresh Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight">
            Studio Overview &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time activity, AI Room visualizer metrics and registered studio clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
          title="Refresh dashboard stats"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-[#004642]" : ""}`} />
          <span>{isFetching ? "Syncing..." : "Sync Stats"}</span>
        </button>
      </div>

      {/* 1. 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatsCard
          title={metrics?.aiPreviews?.label || "AI Room Previews"}
          value={metrics?.aiPreviews?.total?.toLocaleString() || "1,842"}

          Icon={Sparkles}
          color="text-[#004642]"
          bgColor="bg-[#004642]/10"
        />

        <StatsCard
          title={metrics?.activeCatalog?.label || "Active Fabric Catalog"}
          value={metrics?.activeCatalog?.total || 24}

        
          Icon={Layers}
          color="text-teal-700"
          bgColor="bg-teal-50"
        />

    

      
      </div>

 

    </div>
  );
}

