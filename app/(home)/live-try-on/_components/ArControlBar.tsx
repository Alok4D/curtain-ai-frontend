"use client";

import { Eye, EyeOff, RotateCcw, Camera, Sparkles, Sliders } from "lucide-react";
import { useState } from "react";

interface ArControlBarProps {
  onCapture: () => void;
  onGenerateWithAI: () => void;
  showPins: boolean;
  onTogglePins: () => void;
  onAutoFitWindow: () => void;
  opacity: number;
  onChangeOpacity: (val: number) => void;
}

export default function ArControlBar({
  onCapture,
  onGenerateWithAI,
  showPins,
  onTogglePins,
  onAutoFitWindow,
  opacity,
  onChangeOpacity,
}: ArControlBarProps) {
  const [showSliders, setShowSliders] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-2 select-none pointer-events-auto">
      {/* Floating Fabric Opacity Slider */}
      {showSliders && (
        <div className="bg-black/85 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-4 text-white text-xs mb-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
      <div className="flex items-center gap-2.5 sm:gap-4 bg-neutral-950/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-2xl">
        
        {/* 1. Reset Frame Pins */}
        <button
          type="button"
          onClick={onAutoFitWindow}
          className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          title="Reset Frame to Center"
        >
          <RotateCcw className="w-4 h-4 text-[#d3c518]" />
          <span className="hidden sm:inline">Reset Frame</span>
        </button>

        {/* 2. Show / Hide Pin Outlines */}
        <button
          type="button"
          onClick={onTogglePins}
          className={`p-2 sm:px-3 sm:py-1.5 rounded-full active:scale-95 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            showPins
              ? "bg-[#004642] text-white ring-1 ring-[#d3c518]"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          title={showPins ? "Hide yellow frame" : "Show yellow frame"}
        >
          {showPins ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="hidden sm:inline">{showPins ? "Frame On" : "Frame Off"}</span>
        </button>

        {/* 3. Primary Shutter Capture Button */}
        <button
          type="button"
          onClick={onCapture}
          className="relative group p-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-transform cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-white/20 to-white/10 border border-white/25"
          title="Take Photo of Room"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004642] shadow">
            <Camera className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold text-white pr-1">Capture</span>
        </button>

        {/* 4. Deep AI Generation Makeover Button */}
        <button
          type="button"
          onClick={onGenerateWithAI}
          className="p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-[#004642] hover:bg-[#003835] active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 transition-all border border-[#d3c518]/70 shadow cursor-pointer"
          title="Generate with AI for deep photorealism"
        >
          <Sparkles className="w-4 h-4 text-[#d3c518] animate-pulse" />
          <span>AI Makeover</span>
        </button>

        {/* 5. Opacity Slider Toggle */}
        <button
          type="button"
          onClick={() => setShowSliders(!showSliders)}
          className={`p-2 rounded-full active:scale-95 text-xs font-medium transition-all cursor-pointer ${
            showSliders
              ? "bg-[#004642] text-white ring-1 ring-[#d3c518]"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
          title="Adjust fabric opacity"
        >
          <Sliders className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
