"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Calendar } from "lucide-react";

export default function FinishingTouchSection() {
  const [imageSrc, setImageSrc] = useState("/Soft.png");

  return (
    <section
      id="book-visit"
      aria-labelledby="finishing-touch-heading"
      className="w-full bg-[#313D29] py-16 md:py-20 lg:py-24 text-white font-['Urbanist',sans-serif] antialiased overflow-hidden border-b border-white/10"
    >
      <div className="max-w-[1387px] mx-auto px-4 sm:px-6 md:px-8 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Subtitle, CTA Buttons & Footnote */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl text-left">
            {/* Small Tracker Tag */}
            <span className="block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#a4df3b] mb-4">
              FROM INSPIRATION TO YOUR HOME
            </span>

            {/* Serif Heading */}
            <h2
              id="finishing-touch-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal leading-[1.15] text-white tracking-tight mb-5"
            >
              Let&apos;s find your <br className="hidden sm:inline" />
              perfect finishing touch.
            </h2>

            {/* Body Description */}
            <p className="text-base md:text-lg leading-relaxed text-[#cadbd8] mb-8 max-w-xl font-normal">
              Bring your ideas, your questions and your favourite preview. We&apos;ll help with
              the fabric, fit and details — at a free home visit.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary White Button */}
              <a
                href="https://wa.me/971523135707?text=Hi%20Curtainz!%20I'd%20like%20to%20book%20a%20free%20home%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-[#004642] text-sm sm:text-base font-bold rounded-lg transition-colors duration-150 shadow-sm inline-flex items-center justify-center text-center gap-2"
              >
                <Calendar className="w-4 h-4 stroke-[2.2]" />
                <span>Book a free home visit</span>
              </a>

          
            </div>
          </div>

          {/* Right Column: Framed Sheer Curtain Window Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-[#003431]">
              <Image
                src={imageSrc}
                alt="Sunlit sheer curtains in home interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-center"
                onError={() =>
                  setImageSrc(
                    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                  )
                }
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
