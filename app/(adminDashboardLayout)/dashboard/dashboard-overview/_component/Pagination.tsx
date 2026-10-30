import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Logic for more complex pagination can go here
      // For now, sticking to a simpler version that shows first 3
      for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
    }
    return pages;
  };

  const createPageUrl = (pageNumber: number) => {
    return `/dashboard?page=${pageNumber}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link 
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "p-2 border border-[#374151] rounded-full text-gray-400 hover:bg-[#1F2937] transition-all",
          currentPage === 1 && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronLeft size={20} />
      </Link>
      
      {getPageNumbers().map((page) => (
        <Link 
          key={page}
          href={createPageUrl(page)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200",
            currentPage === page 
              ? "bg-[#064E3B] text-[#10B981] font-medium" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          {page}
        </Link>
      ))}
      
      {totalPages > 5 && (
        <>
          <span className="text-gray-600 px-2">...</span>
          <Link 
            href={createPageUrl(totalPages)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200",
              currentPage === totalPages 
                ? "bg-[#064E3B] text-[#10B981] font-medium" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            {totalPages}
          </Link>
        </>
      )}
      
      <Link 
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "p-2 border border-[#374151] rounded-full text-gray-400 hover:bg-[#1F2937] transition-all",
          currentPage === totalPages && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronRight size={20} />
      </Link>
    </div>
  );
};