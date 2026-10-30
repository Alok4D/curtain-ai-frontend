"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full bg-[#FFFFFF] font-['Urbanist',sans-serif] overflow-hidden"
    >
      <div className="max-w-[1387px] mx-auto px-2 sm:px-4 lg:px-4 pt-24 pb-10 md:pt-36 md:pb-16">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Content & Upload CTA (1:1 identical to curtainz.ai) */}
          <div className="w-full md:w-1/2 text-left">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-[#004642] uppercase">
              Free AI Visualizer · Bangladesh
            </p>

            {/* H1 Heading with lime underline */}
            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#004642] mt-3 leading-tight"
            >
              See new curtains on{" "}
              <span className="underline decoration-[#d3c518] decoration-4 underline-offset-4">
                your own windows
              </span>{" "}
              - before you buy
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 mt-5 text-base md:text-lg mb-8 leading-relaxed">
              Take a photo of your room, pick a fabric, and our AI shows you
              exactly how it will look — in about 20 seconds. Free, no sign-up
              needed.
            </p>

            {/* Upload Box with Animated Flowing Gradient Border */}
            <div className="flex flex-col items-center gap-4 w-full md:w-4/5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleBoxClick}
                className="cta-button border-2 rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-black cursor-pointer w-full relative overflow-hidden gradient-border-flow"
              >
                <div className="flex items-center gap-4 sm:gap-5 justify-center">
                  <svg
                    className="w-7 h-7 shrink-0 text-black mb-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
                      Upload your room photo
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-600 font-normal mt-0.5">
                      Free AI preview in ~20 seconds
                    </span>
                  </div>
                </div>
              </button>

              {/* Desktop Drag & Drop Hint */}
              <div className="hidden md:flex flex-col items-center gap-1.5 text-gray-500 text-sm">
                <svg
                  className="w-5 h-5 opacity-70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <p>or drag &amp; drop your image here</p>
              </div>
            </div>

            {/* Benefits List */}
            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-gray-500">
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#004642]"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>5 free AI previews</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#004642]"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>No sign-up</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#004642]"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Free home visits in Dubai</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Dynamic Tilted Image Showcase (Exact 1:1 match with curtainz.ai) */}
          <div className="w-full md:w-1/2 flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 pt-4 md:pt-0">
            
            {/* Card 1: Before Image (Left Tilt & Floating Animation) */}
            <div className="relative rounded-xl transform rotate-[-6deg] hero-float">
              <div className="relative w-64 lg:w-72 h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/before_image.png"
                  alt="Living room before adding curtains"
                  fill
                  priority
                  sizes="(max-width: 1024px) 256px, 288px"
                  className="w-64 lg:w-72 h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                />
                {/* Before Badge */}
                <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow select-none">
                  Before
                </span>
              </div>
            </div>

            {/* Center Animated Arrow */}
            <div className="text-[#004642] shrink-0 hero-arrow flex items-center justify-center">
              <ArrowRight className="w-8 h-8 stroke-[2.2]" />
            </div>

            {/* Card 2: After Image (Right Tilt + Reveal Wipe Animation + Golden Glow Line + Lime Ring) */}
            <div className="relative rounded-xl transform rotate-[6deg] hero-float hero-float-alt">
              <div className="relative w-64 lg:w-72 h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl ring-4 ring-[#d3c518]/70">
                {/* Base Before Image */}
                <Image
                  src="/before_image.png"
                  alt="Living room before adding curtains"
                  fill
                  priority
                  sizes="(max-width: 1024px) 256px, 288px"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Animated Reveal After Image */}
                <Image
                  src="/after_image.png"
                  alt="Living room with AI-added curtains"
                  fill
                  priority
                  sizes="(max-width: 1024px) 256px, 288px"
                  className="hero-reveal absolute inset-0 w-full h-full object-cover"
                />

                {/* Sweeping Reveal Glow Line */}
                <div className="hero-reveal-line" aria-hidden="true" />

                {/* AI Preview Badge with Sparkle */}
                <span className="absolute top-3 left-3 bg-[#004642] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1.5 z-10 select-none">
                  <svg
                    className="w-3.5 h-3.5 fill-[#d3c518] text-[#d3c518]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
                  </svg>
                  <span>AI Preview</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
