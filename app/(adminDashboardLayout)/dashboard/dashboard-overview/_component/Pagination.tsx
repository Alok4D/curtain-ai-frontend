"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 font-['Urbanist',sans-serif]">
      {/* Prev */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer shadow-2xs",
          currentPage === 1 && "opacity-30 cursor-not-allowed hover:bg-transparent"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handlePageClick(page)}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
            currentPage === page
              ? "bg-[#004642] text-white shadow-xs"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          {page}
        </button>
      ))}

      {totalPages > 5 && (
        <>
          <span className="text-gray-400 px-1 text-xs">&hellip;</span>
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
              currentPage === totalPages
                ? "bg-[#004642] text-white shadow-xs"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            )}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer shadow-2xs",
          currentPage === totalPages && "opacity-30 cursor-not-allowed hover:bg-transparent"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
