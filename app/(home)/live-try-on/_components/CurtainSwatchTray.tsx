"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export interface CurtainOption {
  id: number | string;
  name: string;
  category: "curtains" | "sheers" | "rollers";
  image_url: string;
  display_image_url?: string;
  price?: string;
  fabric?: string;
}

interface CurtainSwatchTrayProps {
  curtains: CurtainOption[];
  selectedCurtain: CurtainOption | null;
  onSelectCurtain: (curtain: CurtainOption) => void;
  activeCategory: "curtains" | "sheers" | "rollers";
  onChangeCategory: (cat: "curtains" | "sheers" | "rollers") => void;
}

export default function CurtainSwatchTray({
  curtains,
  selectedCurtain,
  onSelectCurtain,
  activeCategory,
  onChangeCategory,
}: CurtainSwatchTrayProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const categories = [
    { key: "curtains", label: "Drapes & Curtains" },
    { key: "sheers", label: "Sheers & Wave" },
    { key: "rollers", label: "Blinds & Rollers" },
  ] as const;

  const filteredCurtains = curtains.filter((c) => c.category === activeCategory);

  return (
    <div className="w-full bg-neutral-900/90 backdrop-blur-md border-t border-white/10 px-3 py-2.5 sm:px-6 sm:py-3 select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onChangeCategory(cat.key)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#004642] text-white ring-1 ring-[#d3c518]/70"
                      : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Active selection info */}
          {selectedCurtain && (
            <span className="hidden sm:inline-block text-[11px] text-[#d3c518] font-medium truncate max-w-[150px]">
              Active: {selectedCurtain.name}
            </span>
          )}
        </div>

        {/* Horizontal Swatch Carousel (As in Photo 3) */}
        <div className="relative flex items-center">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute -left-3.5 z-10 w-7 h-7 rounded-full bg-black/60 text-white items-center justify-center border border-white/20 hover:bg-black/90 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Swatch Items List */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto scroll-smooth py-1 px-1 no-scrollbar w-full"
          >
            {filteredCurtains.map((item) => {
              const isSelected = selectedCurtain?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectCurtain(item)}
                  className={`group relative shrink-0 flex flex-col items-center gap-1 p-1 rounded-xl transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-white/20 ring-2 ring-[#d3c518] scale-[1.03]"
                      : "bg-white/5 hover:bg-white/10 hover:scale-[1.01]"
                  }`}
                >
                  {/* Swatch Image Thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-white/15 bg-neutral-800">
                    <Image
                      src={item.image_url || "/Soft.png"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />

                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#004642] text-[#d3c518] flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Swatch Label */}
                  <span className="text-[11px] text-white/90 font-medium truncate max-w-[64px] sm:max-w-[70px]">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute -right-3.5 z-10 w-7 h-7 rounded-full bg-black/60 text-white items-center justify-center border border-white/20 hover:bg-black/90 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

