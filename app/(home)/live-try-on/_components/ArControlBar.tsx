"use client";

import { Eye, EyeOff, RotateCcw, Camera, Sparkles, Sliders } from "lucide-react";
import { useState } from "react";

interface ArControlBarProps {
  onCapture: () => void;
  showPins: boolean;
  onTogglePins: () => void;
  onAutoFitWindow: () => void;
  opacity: number;
  onChangeOpacity: (val: number) => void;
}

export default function ArControlBar({
  onCapture,
  showPins,
  onTogglePins,
  onAutoFitWindow,
  opacity,
  onChangeOpacity,
}: ArControlBarProps) {
  const [showSliders, setShowSliders] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-2 select-none pointer-events-auto">
      {/* Floating Quick Settings Panel (Expandable) */}
      {showSliders && (
        <div className="bg-black/75 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-white text-xs mb-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="font-semibold text-white/80 whitespace-nowrap">Fabric Opacity:</span>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
            className="w-28 sm:w-36 accent-[#d3c518] cursor-pointer"
          />
          <span className="font-bold text-[#d3c518] w-8">
            {Math.round(opacity * 100)}%
          </span>
        </div>
      )}

      {/* Main Floating Action Bar */}
      <div className="flex items-center gap-3 sm:gap-4 bg-neutral-950/70 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-2xl">
        
        {/* 1. Auto-fit / Center Window Button */}
        <button
          type="button"
          onClick={onAutoFitWindow}
          className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          title="Auto fit window frame"
        >
          <RotateCcw className="w-4 h-4 text-[#d3c518]" />
          <span className="hidden sm:inline">Reset Pins</span>
        </button>

        {/* 2. Show / Hide Pin Markers Toggle */}
        <button
          type="button"
          onClick={onTogglePins}
          className={`p-2 sm:px-3 sm:py-1.5 rounded-full active:scale-95 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            showPins
              ? "bg-[#004642] text-white ring-1 ring-white/20"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          title={showPins ? "Hide pin handles" : "Show pin handles"}
        >
          {showPins ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="hidden sm:inline">{showPins ? "Pins Visible" : "Pins Hidden"}</span>
        </button>

        {/* 3. Primary Shutter Capture Button */}
        <button
          type="button"
          onClick={onCapture}
          className="relative group p-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-transform cursor-pointer"
          title="Capture photo of your room"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#d3c518] to-emerald-400 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white group-hover:bg-neutral-100 flex items-center justify-center text-[#004642]">
              <Camera className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        </button>

        {/* 4. Opacity Sliders Toggle */}
        <button
          type="button"
          onClick={() => setShowSliders(!showSliders)}
          className={`p-2 sm:px-3 sm:py-1.5 rounded-full active:scale-95 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            showSliders
              ? "bg-[#004642] text-white ring-1 ring-[#d3c518]"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          title="Adjust fabric opacity"
        >
          <Sliders className="w-4 h-4" />
          <span className="hidden sm:inline">Opacity</span>
        </button>

      </div>
    </div>
  );
}

