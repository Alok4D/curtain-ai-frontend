import React from "react";
import { SlidersHorizontal, ChevronDown, ShieldCheck } from "lucide-react";

interface FittingPreferencesProps {
  showPreferences: boolean;
  setShowPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  drapeLength: string;
  setDrapeLength: (value: string) => void;
  drapePosition: string;
  setDrapePosition: (value: string) => void;
  curtainRod: string;
  setCurtainRod: (value: string) => void;
  headerStyle: string;
  setHeaderStyle: (value: string) => void;
  fabricOpacity: string;
  setFabricOpacity: (value: string) => void;
  pleatDensity: string;
  setPleatDensity: (value: string) => void;
  isGenerating: boolean;
}

export function FittingPreferences({
  showPreferences,
  setShowPreferences,
  drapeLength,
  setDrapeLength,
  drapePosition,
  setDrapePosition,
  curtainRod,
  setCurtainRod,
  headerStyle,
  setHeaderStyle,
  fabricOpacity,
  setFabricOpacity,
  pleatDensity,
  setPleatDensity,
  isGenerating,
}: FittingPreferencesProps) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60 shadow-xs">
      <button
        type="button"
        onClick={() => setShowPreferences((prev) => !prev)}
        className="w-full flex items-center justify-between px-3.5 py-3 text-xs font-semibold text-slate-800 hover:bg-slate-100/80 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-[#004642]/10 text-[#004642]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </span>
          <span className="text-[13px] font-bold text-[#004642]">
            Custom Fit &amp; Style (Optional)
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
            showPreferences ? "rotate-180" : ""
          }`}
        />
      </button>

      {showPreferences && (
        <div className="p-3.5 border-t border-slate-200 space-y-3.5 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* 1. Curtain Length */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                1. Curtain Length
              </label>
              <select
                value={drapeLength}
                onChange={(e) => setDrapeLength(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Floor-skimming">Floor-skimming (Precise touch)</option>
                <option value="Floor-length">Floor-length (Modern puddle)</option>
                <option value="Sill-length">Sill-length (Touches window sill)</option>
                <option value="Apron-length">Apron-length (3-4″ below sill)</option>
              </select>
            </div>

            {/* 2. Drape Position */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                2. Drape Position
              </label>
              <select
                value={drapePosition}
                onChange={(e) => setDrapePosition(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Framing Sides">Framing Sides (Open &amp; bright)</option>
                <option value="Fully Open">Fully Open (Pulled wide)</option>
                <option value="Half Open">Half Open (Soft daylight)</option>
                <option value="Fully Closed">Fully Closed (Full coverage)</option>
              </select>
            </div>

            {/* 3. Rod / Mounting Hardware */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                3. Rod / Mounting Hardware
              </label>
              <select
                value={curtainRod}
                onChange={(e) => setCurtainRod(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Matte Black">Matte Black Architectural Rod</option>
                <option value="Gold Brass">Gold Brass (Warm luxury)</option>
                <option value="Silver">Silver / Brushed Nickel</option>
                <option value="Ceiling Track">Ceiling Track (Flush mount)</option>
                <option value="Hidden Track">Hidden Track (Recessed pocket)</option>
              </select>
            </div>

            {/* 4. Curtain Header Style */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                4. Curtain Header Style
              </label>
              <select
                value={headerStyle}
                onChange={(e) => setHeaderStyle(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Wave Header">Wave Header (S-Fold modern wave)</option>
                <option value="Pinch Pleat">Pinch Pleat (Classic tailored fold)</option>
                <option value="Eyelet">Eyelet (Grommet metal rings)</option>
                <option value="Pencil Pleat">Pencil Pleat (Gathered header)</option>
                <option value="Tab Top">Tab Top (Fabric loop hanging)</option>
              </select>
            </div>

            {/* 5. Fabric Opacity */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                5. Fabric Opacity
              </label>
              <select
                value={fabricOpacity}
                onChange={(e) => setFabricOpacity(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Auto">Auto (Preserve fabric profile)</option>
                <option value="Sheer">Sheer (Light &amp; breezy daylight)</option>
                <option value="Semi-Sheer">Semi-Sheer (Soft diffuse glow)</option>
                <option value="Light Filtering">Light Filtering (Medium light)</option>
                <option value="Blackout">Blackout (100% room darkening)</option>
              </select>
            </div>

            {/* 6. Pleat Density */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                6. Pleat Density
              </label>
              <select
                value={pleatDensity}
                onChange={(e) => setPleatDensity(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none transition-colors"
              >
                <option value="Medium">Medium (Balanced 2.0x fullness)</option>
                <option value="Standard">Standard (Clean &amp; spaced 1.5x)</option>
                <option value="Full">Full (Heavy 3D luxury 2.5x-3.0x)</option>
              </select>
            </div>
          </div>

          {/* Strict Preservation Guarantee Note */}
          <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-900 text-[11px] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-950">Room Preservation Lock:</span>{" "}
              Walls, furniture, ceiling, and flooring remain 100% untouched.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
