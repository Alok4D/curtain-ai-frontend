"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-24 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-2 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:pr-6">
            <span className="block text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#004642] uppercase mb-3">
              WHY GUESS?
            </span>

            <h2 className="text-[32px] md:text-[40px] xl:text-[44px] leading-[1.18] font-bold text-[#004642] tracking-tight mb-5">
              Drag the slider — see the difference for yourself
            </h2>

            <p className="text-[14.5px] md:text-[15.5px] leading-[1.65] text-[#556965] mb-8 max-w-lg">
              Curtainz.ai understands your room&apos;s lighting, depth and window shape, so
              every preview looks like a real photograph — not a Photoshop mock-up.
              Compare fabrics side by side and choose with confidence.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#004642] hover:bg-[#003431] text-white text-[15px] font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <span>Upload your room photo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Right Column: Interactive Before / After Comparison */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full max-w-[580px] aspect-[516/512] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              {/* After Image (Background / Right Layer) */}
              <div className="absolute inset-0">
                <Image
                  src="https://curtainz.ai/_app/immutable/assets/after_image.Cb7JVlq1.avif"
                  alt="Curtain room after visualizer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover pointer-events-none"
                />
                {/* After Badge */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-[#004642]/90 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide">
                  After
                </div>
              </div>

              {/* Before Image (Clipped / Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src="https://curtainz.ai/_app/immutable/assets/before_image.CbgS-B66.avif"
                  alt="Curtain room before visualizer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover pointer-events-none"
                />
                {/* Before Badge */}
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-[#2c3e50]/80 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide">
                  Before
                </div>
              </div>

              {/* Divider Line & Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center pointer-events-auto">
                  <div className="flex items-center gap-0.5 text-[#004642]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                    </svg>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}