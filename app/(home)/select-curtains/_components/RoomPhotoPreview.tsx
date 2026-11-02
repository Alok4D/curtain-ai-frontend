"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Sparkles } from "lucide-react";

interface RoomPhotoPreviewProps {
  imageUrl: string;
  onChangePhoto: () => void;
  onGetBestCurtains: () => void;
  isLoading: boolean;
}

const ANALYSIS_STEPS = [
  "Analyzing room lighting & wall undertones…",
  "Detecting window architecture & daylight exposure…",
  "Evaluating color harmony & aesthetics…",
  "Curating best fabric matches from catalog…",
];

export const RoomPhotoPreview: React.FC<RoomPhotoPreviewProps> = ({
  imageUrl,
  onChangePhoto,
  onGetBestCurtains,
  isLoading,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setStepIndex(0);
      return;
    }

    setProgress(15);
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 2400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(92, prev + (92 - prev) * 0.05 + 0.3));
    }, 250);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <div className="mb-8 flex flex-col items-center">
      {/* Large Image Preview Card with AI Scanning Frame */}
      <div
        className={`relative w-full max-w-md sm:max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-900 transition-all duration-300 group ${
          isLoading ? "ai-generating-frame" : ""
        }`}
      >
        <Image
          src={imageUrl}
          alt="Your uploaded room"
          fill
          className="object-cover"
          unoptimized={imageUrl.startsWith("data:")}
          priority
        />

        {/* Change photo button (hidden while AI analyzing) */}
        {!isLoading && (
          <button
            type="button"
            onClick={onChangePhoto}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-xs transition-all cursor-pointer shadow-sm flex items-center gap-1.5 z-20"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Change photo</span>
          </button>
        )}

        {/* AI Scanning / Processing Overlay (identical to /generate-image) */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-brightness-90 z-30 select-none">
            {/* Sweeping scan beam */}
            <div className="ai-scan-beam" />

            {/* Twinkling sparkles */}
            <div
              className="ai-sparkle"
              style={{ top: "18%", left: "14%", animationDelay: "0s" }}
            />
            <div
              className="ai-sparkle"
              style={{ top: "28%", right: "18%", animationDelay: "0.7s" }}
            />
            <div
              className="ai-sparkle"
              style={{ bottom: "24%", left: "22%", animationDelay: "1.3s" }}
            />
            <div
              className="ai-sparkle"
              style={{ bottom: "18%", right: "26%", animationDelay: "1.9s" }}
            />

            {/* Centered Orb & Status Text */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center max-w-xs sm:max-w-sm">
              <div className="ai-orb">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Cycling Step Text */}
              <p
                key={stepIndex}
                className="ai-step-text text-white text-xs sm:text-sm font-semibold drop-shadow"
              >
                {ANALYSIS_STEPS[stepIndex]}
              </p>

              {/* Progress bar */}
              <div className="w-44 sm:w-56 h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-white/80 text-[11px] sm:text-xs">
                AI Interior Specialist analyzing your room…
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Only One Button: 'Get Best Curtains' */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onGetBestCurtains}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#004642] text-white font-semibold text-sm sm:text-base hover:bg-[#003835] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Analyzing Room with AI…</span>
            </span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Get Best Curtains</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
