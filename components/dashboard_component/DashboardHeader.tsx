"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ExternalLink, Bell, ShieldCheck } from "lucide-react";
import { useGetMeQuery } from "@/lib/feature/auth/authApi";
import { useAppSelector } from "@/lib/hooks/redux";

export function DashboardHeader() {
  const reduxUser = useAppSelector((state) => state.auth.user);
  const { data: meData } = useGetMeQuery();

  const user = meData?.data || reduxUser;

  // Calculate user initials
  const getInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3.5 px-4 sm:px-8 z-30 font-['Urbanist',sans-serif]">
      <div className="w-full flex justify-between items-center gap-4">
        {/* Left: Header Title / Context */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <h2 className="text-[#1C201D] font-bold text-xl sm:text-2xl font-serif">
              Welcome to Admin Dashboard
            </h2>
          </div>
        </div>

        {/* Mobile Spacer */}
        <div className="sm:hidden flex-1 pl-12">
          <span className="text-sm font-bold text-[#004642]">
            Curtain AI Studio
          </span>
        </div>

        {/* Right side: Quick Links & Admin Info */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick link: Visualizer */}
          <Link
            href="/generate-image"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#004642] bg-[#004642]/10 hover:bg-[#004642]/15 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#004642]" />
            <span>AI Visualizer</span>
          </Link>

          {/* Quick link: Live Website */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Notification Icon */}
          <button
            type="button"
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {/* Admin Profile Link connected to real API */}
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 pl-2 border-l border-gray-200 hover:opacity-85 transition-opacity group cursor-pointer"
            title="Admin Profile & Settings"
          >
            {user?.avatarUrl ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#004642]/20 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.name || "Admin"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#004642] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                {getInitials(user?.name)}
              </div>
            )}

            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-gray-800 leading-tight group-hover:text-[#004642] transition-colors truncate max-w-[130px]">
                {user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-gray-500 leading-tight flex items-center gap-1">
                <span>{user?.location || "Curtain AI Dubai"}</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
