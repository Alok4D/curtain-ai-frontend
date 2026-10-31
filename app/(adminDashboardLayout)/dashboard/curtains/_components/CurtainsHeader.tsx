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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs font-['Urbanist',sans-serif]">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2.5 py-1 rounded-full">
            Inventory &bull; AI Catalog
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {totalCount} total fabrics in studio
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight mt-2">
          Curtain &amp; Fabric Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
          Add, edit, or manage custom curtains, sheers, and rollers used by the AI Room Visualizer engine and Dubai customer studio.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {totalCount === 0 && (
          <button
            type="button"
            onClick={onSeedCatalog}
            disabled={isSeeding}
            className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#004642] border border-emerald-200 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
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
            className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Fabric</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
