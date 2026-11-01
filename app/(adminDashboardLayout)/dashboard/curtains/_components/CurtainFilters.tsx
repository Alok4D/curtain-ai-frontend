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
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-none border border-gray-200 shadow-none font-['Urbanist',sans-serif]">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-none border transition-colors cursor-pointer whitespace-nowrap shadow-none ${
                isActive
                  ? "bg-[#004642] text-white border-[#004642]"
                  : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 lg:max-w-xs">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search fabrics by name or material…"
          className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-none text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#004642] shadow-none transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer p-0.5"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
