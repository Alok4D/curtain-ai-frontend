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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-['Urbanist',sans-serif]">
  

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
