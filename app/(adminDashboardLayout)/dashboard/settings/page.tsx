"use client";

import { useGetMeQuery } from "@/lib/feature/auth/authApi";
import { Loader2 } from "lucide-react";
import SettingsSkeleton from "./components/SettingsSkeleton";
import ProfileInformationCard from "./components/ProfileInformationCard";
import ChangePasswordCard from "./components/ChangePasswordCard";
import HelpSidebarCard from "./components/HelpSidebarCard";

export default function AdminSettingsPage() {
  const { data: meData, isLoading, isFetching } = useGetMeQuery();

  // Show layout-matching skeleton during initial load
  if (isLoading) {
    return <SettingsSkeleton />;
  }

  const currentUser = meData?.data;

  return (
    <div className="font-sans antialiased text-[#2D312E]">
      <div className="max-w-full mx-auto">
        {/* Page Title & Status Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight">
              Admin profile &amp; security
            </h1>
            <p className="mt-1.5 text-sm text-[#666B67]">
              Update your admin profile, photo and manage password settings.
            </p>
          </div>

          {/* Sync status indicator */}
          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#525753] bg-[#EAE8E0]/70 px-3 py-1.5 rounded-full self-start">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3B463B]" />
              <span>Syncing with server...</span>
            </div>
          )}
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Profile Card + Change Password Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Modular Profile Information Component with Image Upload */}
            <ProfileInformationCard user={currentUser} />

            {/* 2. Modular Change Password Component */}
            <ChangePasswordCard />
          </div>

          {/* Right Column: Modular Help Sidebar Component */}
          <div className="lg:col-span-1">
            <HelpSidebarCard />
          </div>
        </div>
      </div>
    </div>
  );
}
