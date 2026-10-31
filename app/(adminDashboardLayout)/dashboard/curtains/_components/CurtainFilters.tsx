"use client";

import { Search, X } from "lucide-react";

interface CurtainFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    curtains: number;
    sheers: number;
    rollers: number;
  };
}

export default function CurtainFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  counts,
}: CurtainFiltersProps) {
  const tabs = [
    { id: "all", label: "All Fabrics", count: counts.all },
    { id: "curtains", label: "Curtains", count: counts.curtains },
    { id: "sheers", label: "Sheers", count: counts.sheers },
    { id: "rollers", label: "Rollers", count: counts.rollers },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs font-['Urbanist',sans-serif]">
      {/* Category Tabs */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white text-[#004642] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-[#004642]/10 text-[#004642] font-bold"
                    : "opacity-60"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-xs">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search fabrics by name or material…"
          className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

