"use client";

import Link from "next/link";
import { Plus, Database, Loader2 } from "lucide-react";

interface CurtainsHeaderProps {
  onSeedCatalog: () => void;
  isSeeding: boolean;
  totalCount: number;
}

export default function CurtainsHeader({
  onSeedCatalog,
  isSeeding,
  totalCount,
}: CurtainsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-['Urbanist',sans-serif] bg-white p-4 sm:p-5 border border-gray-200 shadow-none rounded-none">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Curtain Fabrics
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Manage fabric catalog, pricing, and visualizer availability ({totalCount} total fabrics)
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {totalCount === 0 && (
          <button
            type="button"
            onClick={onSeedCatalog}
            disabled={isSeeding}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#004642] border border-[#004642] text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-none transition-colors cursor-pointer shadow-none disabled:opacity-50"
            title="Populate studio with default fabric catalog"
          >
            {isSeeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Database className="w-4 h-4 text-[#004642]" />
            )}
            <span>Seed Catalog</span>
          </button>
        )}

        {/* Dedicated Page Link for Add New Fabric */}
        <Link href="/dashboard/curtains/add-curtain">
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-none transition-colors shadow-none cursor-pointer border border-[#004642]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Fabric</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
