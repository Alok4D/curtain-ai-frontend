"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  return (
    <section
      id="ai-visualizer"
      aria-labelledby="compare-heading"
      className="w-full bg-white py-12 md:py-16 scroll-mt-20 md:scroll-mt-24 font-['Urbanist',sans-serif]"
    >
      <div className="max-w-[1387px] mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          {/* Left Column: Heading, Description & CTA */}
          <div className="w-full md:w-[45%] text-left">
            <p className="text-xs md:text-sm font-semibold tracking-widest text-[#004642] uppercase">
              Why guess?
            </p>

            <h2
              id="compare-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004642] mt-3 leading-tight"
            >
              Drag the slider — see the difference for yourself
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-5">
              Curtain AI understands your room&apos;s lighting, depth and window
              shape, so every preview looks like a real photograph — not a
              Photoshop mock-up. Compare fabrics side by side and choose with
              confidence.
            </p>

            <div className="mt-6">
              <Link
                href="/#hero-heading"
                className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                <span>Upload your room photo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: 1:1 Interactive Before / After Image Slider */}
          <div className="w-full md:w-[55%] flex justify-center">
            <div className="slider-section">
              <div
                className="slider-container"
                style={{ ["--position" as string]: `${sliderPosition}%` }}
              >
                <div className="image-container select-none">
                  {/* Before Badge */}
                  <div className="absolute top-2 left-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium bg-gray-700 text-white shadow-sm">
                      Before
                    </span>
                  </div>

                  {/* After Badge */}
                  <div className="absolute top-2 right-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium bg-[#004642] text-white shadow-sm">
                      After
                    </span>
                  </div>

                  {/* Base After Image */}
                  <Image
                    src="/after_image.png"
                    alt="Room after curtain installation"
                    width={1024}
                    height={1024}
                    priority
                    className="slider-image pointer-events-none w-full h-auto block"
                  />

                  {/* Clipped Before Image Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                  >
                    <Image
                      src="/before_image.png"
                      alt="Room before curtain installation"
                      width={1024}
                      height={1024}
                      priority
                      className="slider-image w-full h-auto block"
                    />
                  </div>
                </div>

                {/* Range Slider for Keyboard & Mouse & Touch */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Percentage of before photo shown"
                  className="slider"
                />

                {/* Divider Line */}
                <div
                  className="slider-line"
                  aria-hidden="true"
                  style={{ left: `${sliderPosition}%` }}
                />

                {/* Divider Handle with Exact Phosphor Arrows SVG */}
                <div
                  className="slider-button"
                  aria-hidden="true"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none" />
                    <line
                      x1="128"
                      y1="40"
                      x2="128"
                      y2="216"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="96"
                      y1="128"
                      x2="16"
                      y2="128"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <polyline
                      points="48 160 16 128 48 96"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <line
                      x1="160"
                      y1="128"
                      x2="240"
                      y2="128"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                    <polyline
                      points="208 96 240 128 208 160"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
