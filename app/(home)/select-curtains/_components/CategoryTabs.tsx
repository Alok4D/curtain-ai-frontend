import React from "react";
import { Sparkles } from "lucide-react";
import { TabType } from "./types";

interface CategoryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  hasRecommendations: boolean;
  recommendationsCount?: number;
  description: string;
}

const STANDARD_TABS: TabType[] = ["curtains", "sheers", "rollers", "all"];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  onTabChange,
  hasRecommendations,
  recommendationsCount = 0,
  description,
}) => {
  return (
    <>
      {/* Sticky Category & Specialist Curation Tabs */}
      <div className="flex justify-center mb-2 w-full sticky top-20 md:top-24 z-40">
        <div
          className="flex flex-wrap justify-center bg-white rounded-xl shadow-md p-1 border border-gray-100 gap-1"
          role="tablist"
          aria-label="Curtain categories"
        >
          {hasRecommendations && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "specialist"}
              onClick={() => onTabChange("specialist")}
              className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "specialist"
                  ? "bg-[#004642] text-white shadow-sm"
                  : "text-emerald-900 bg-emerald-50 hover:bg-emerald-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Best Curtains ({recommendationsCount})</span>
            </button>
          )}

          {STANDARD_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#004642] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab === "all" ? "All Fabrics" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Category / Specialist Description */}
      <p className="text-center text-gray-500 text-xs md:text-sm mb-6 mt-3 max-w-xl mx-auto">
        {description}
      </p>
    </>
  );
};

