"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Download, Check, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-12 md:py-20 lg:py-24 font-['Urbanist',sans-serif] overflow-hidden">
      <div className="max-w-[1387px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content & Upload Box */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Sub-header badge */}
            <span className="block text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#004642] uppercase mb-4">
              FREE AI VISUALIZER · DUBAI
            </span>

            {/* H1 Heading with lime underline */}
            <h1 className="text-[34px] sm:text-[40px] md:text-[48px] leading-[1.25] font-bold text-[#004642] tracking-tight mb-5">
              See new curtains{" "}
              <span className="relative inline-block border-b-[3px] border-[#c8d42d] pb-0.5">
                on your own
              </span>
              <br />
              <span className="relative inline-block border-b-[3px] border-[#c8d42d] pb-0.5">
                windows
              </span>{" "}
              – before you buy
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] md:text-[18px] leading-[29px] font-normal text-[#4A5565] mb-8 max-w-xl">
              Take a photo of your room, pick a fabric, and our AI shows you
              exactly how it will look — in about 20 seconds. Free, no sign-up
              needed.
            </p>

            {/* Upload Box */}
            <div className="w-full max-w-[490px]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
              
              <div
                onClick={handleBoxClick}
                className="w-full bg-white border-[1.5px] border-[#004642] rounded-xl p-5 md:py-5 md:px-6 flex items-center justify-center gap-4 cursor-pointer transition-all duration-200 shadow-[0_12px_32px_rgba(40,116,101,0.12)] hover:shadow-[0_16px_36px_rgba(40,116,101,0.18)] hover:border-[#003431]"
              >
                <div className="text-[#004642] shrink-0">
                  <Camera className="w-7 h-7 stroke-[1.8]" />
                </div>
                <div className="text-left">
                  <h3 className="text-[18px] leading-tight font-bold text-[#004642] tracking-tight">
                    Upload your room photo
                  </h3>
                  <p className="text-[13.5px] text-[#4A5565] mt-1">
                    Free AI preview in ~20 seconds
                  </p>
                </div>
              </div>

              {/* Drag & Drop Hint */}
              <div className="flex flex-col items-center justify-center mt-3 text-center">
                <Download className="w-4 h-4 text-[#7b918d] stroke-[1.8] mb-1" />
                <span className="text-[13px] md:text-[14px] text-[#7b918d]">
                  or drag & drop your image here
                </span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 md:gap-x-7 mt-7 text-[#6A7282] text-[14px] leading-[20px] font-normal">
              <div className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#004642] stroke-[2.5]" />
                <span>5 free AI previews</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#004642] stroke-[2.5]" />
                <span>No sign-up</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#004642] stroke-[2.5]" />
                <span>Free home visits in Dubai</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Tilted Image Showcase (Exact 1:1 match with curtainz.ai) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-3 sm:gap-6 lg:gap-8 pt-4 lg:pt-0">
            
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
            <div className="text-[#04362f] shrink-0 hero-arrow flex items-center justify-center">
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
                <span className="absolute top-3 left-3 bg-[#04362f] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1.5 z-10 select-none">
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
