"use client";

import { Layers, Database, RefreshCw } from "lucide-react";

interface EmptyCurtainsStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onSeedCatalog: () => void;
  isSeeding: boolean;
}

export default function EmptyCurtainsState({
  hasFilters,
  onClearFilters,
  onSeedCatalog,
  isSeeding,
}: EmptyCurtainsStateProps) {
  return (
    <div className="bg-white p-12 text-center rounded-none border border-gray-200 shadow-none font-['Urbanist',sans-serif]">
      <div className="w-12 h-12 rounded-none border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-3">
        <Layers className="w-6 h-6 text-gray-400" />
      </div>

      <h3 className="text-base font-bold text-gray-900">
        {hasFilters ? "No matching fabrics found" : "Your fabric catalog is currently empty"}
      </h3>

      <p className="text-xs text-gray-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
        {hasFilters
          ? "Try adjusting your search query or selecting a different fabric category above."
          : "Get started by populating the database with curated Dubai curtain fabrics, or add a custom fabric manually."}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        {hasFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-none text-xs font-semibold text-gray-700 transition-colors cursor-pointer shadow-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onSeedCatalog}
            disabled={isSeeding}
            className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs font-semibold px-4 py-2 border border-[#004642] rounded-none transition-colors shadow-none cursor-pointer disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>Seed Default Curtains</span>
          </button>
        )}
      </div>
    </div>
  );
}
