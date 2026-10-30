"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CollectionItem {
  src: string;
  alt: string;
}

interface CollectionTab {
  label: string;
  images: CollectionItem[];
}

const tabs: CollectionTab[] = [
  {
    label: "Curtains & Drapes",
    images: [
      {
        src: "/images/collection/curtains-drapes.png",
        alt: "Pale greige pinch-pleat drapes with a sheer lining",
      },
      {
        src: "/images/collection/sheer.png",
        alt: "White wave-fold sheer curtains diffusing daylight",
      },
      {
        src: "/images/collection/blackout-sheer.png",
        alt: "Double-layer blackout and sheer curtains on a twin ceiling track",
      },
    ],
  },
  {
    label: "Blinds & Shades",
    images: [
      {
        src: "/images/collection/roller-blinds.png",
        alt: "Sand beige blackout roller blind in a bright modern apartment",
      },
      {
        src: "/images/collection/zebra-blinds.png",
        alt: "Pale grey zebra day-and-night blinds showing open and closed bands",
      },
      {
        src: "/images/collection/wooden-blinds.png",
        alt: "Pale ash wooden venetian blinds with tilted slats",
      },
      {
        src: "/images/collection/roman-shades.png",
        alt: "Pale greige linen roman shades raised into even folds",
      },
    ],
  },
  {
    label: "Motorized Curtains",
    images: [
      {
        src: "/images/collection/motorized-curtains.png",
        alt: "Motorised wave-fold curtains opening on a ceiling track",
      },
      {
        src: "/images/collection/motorized-blinds.png",
        alt: "Cordless motorised roller blinds aligned across a wide window",
      },
    ],
  },
];

export default function OurCollectionSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-white scroll-mt-20 md:scroll-mt-24 font-['Urbanist',sans-serif]"
    >
      <div className="max-w-[1387px] mx-auto px-2 sm:px-4 lg:px-4 py-12 md:py-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs md:text-sm font-semibold tracking-widest text-[#004642] uppercase">
            Our collection
          </p>
          <h2
            id="services-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004642] mt-2 leading-tight"
          >
            Curtains, blinds &amp; motorized systems — made to measure
          </h2>
        </div>

        {/* Tab List */} 
        <div className="w-full mt-8">
          <div
            className="flex justify-center border-b border-gray-200 mb-6"
            role="tablist"
            aria-label="Curtain categories"
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                role="tab"
                aria-selected={activeTab === idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`py-2.5 px-4 md:px-6 -mb-px font-semibold text-sm md:text-base focus:outline-none transition-colors duration-200 cursor-pointer ${
                  activeTab === idx
                    ? "border-b-2 border-[#004642] text-[#004642]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Animated Tab Panel Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`grid gap-4 ${
                activeTab === 0
                  ? "grid-cols-1 sm:grid-cols-3"
                  : activeTab === 1
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
              role="tabpanel"
            >
              {tabs[activeTab].images.map((item, index) => (
                <div
                  key={item.src}
                  className="aspect-square overflow-hidden rounded-xl shadow-sm bg-gray-100 relative group"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      activeTab === 1
                        ? "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                        : activeTab === 0
                        ? "(max-width: 640px) 100vw, 33vw"
                        : "(max-width: 640px) 100vw, 50vw"
                    }
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
