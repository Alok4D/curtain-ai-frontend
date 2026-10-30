"use client";

import React, { useState } from "react";
import Image from "next/image";

type TabKey = "curtains" | "blinds" | "motorized";

interface CollectionItem {
  id: number;
  title: string;
  image: string;
}

const collectionData: Record<TabKey, { label: string; items: CollectionItem[] }> = {
  curtains: {
    label: "Curtains & Drapes",
    items: [
      {
        id: 1,
        title: "Pinch Pleat Double Curtains",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Sheer Wave Curtains",
        image:
          "https://images.unsplash.com/photo-1540518614846-7ede433c4b4f?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Charcoal Blackout & Sheer",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  blinds: {
    label: "Blinds & Shades",
    items: [
      {
        id: 1,
        title: "Roller Blind",
        image:
          "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Zebra Day & Night Blinds",
        image:
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Venetian Wooden Blinds",
        image:
          "https://images.unsplash.com/photo-1533779283484-8da494b7a3c4?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Roman Shades",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  motorized: {
    label: "Motorized Curtains",
    items: [
      {
        id: 1,
        title: "Smart Motorized Track Curtain",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Motorized Roller Shades",
        image:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
};

export default function OurCollectionSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("curtains");

  return (
    <section className="w-full bg-[#FFFFFF] py-16 md:py-24 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-2 lg:px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="block text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#004642] uppercase mb-2">
            OUR COLLECTION
          </span>
          <h2 className="text-[28px] md:text-[40px] leading-[1.2] font-bold text-[#004642] tracking-tight">
            Curtains, blinds & motorized systems — <br className="hidden sm:inline" />
            made to measure
          </h2>
        </div>

        {/* Tab Navigation with Full-Width Bottom Hairline */}
        <div className="relative mb-10 md:mb-14">
          <div className="flex justify-center items-center gap-6 md:gap-12 overflow-x-auto no-scrollbar">
            {(Object.keys(collectionData) as TabKey[]).map((tabKey) => {
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveTab(tabKey)}
                  className={`relative pb-3 text-[14px] md:text-[15px] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#004642] font-bold"
                      : "text-[#6d827e] font-medium hover:text-[#004642]"
                  }`}
                >
                  {collectionData[tabKey].label}
                  {/* Active Indicator Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#004642] z-10" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Continuous thin horizontal divider behind tabs */}
          <div className="w-full h-[1px] bg-[#e5ecea] -mt-[1px]" />
        </div>

        {/* Dynamic Image Grid */}
        <div
          className={`grid gap-5 md:gap-6 items-stretch transition-opacity duration-300 ${
            activeTab === "curtains"
              ? "grid-cols-1 md:grid-cols-3"
              : activeTab === "blinds"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {collectionData[activeTab].items.map((item) => (
            <div
              key={item.id}
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-[22px] overflow-hidden bg-[#f4f7f6] group shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                priority
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}