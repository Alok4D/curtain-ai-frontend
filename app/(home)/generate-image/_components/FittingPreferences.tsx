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
  isGenerating,
}: FittingPreferencesProps) {
  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-slate-50/60">
      <button
        type="button"
        onClick={() => setShowPreferences((prev) => !prev)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#004642]" />
          <span>Custom Fit &amp; Style (Optional)</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
            showPreferences ? "rotate-180" : ""
          }`}
        />
      </button>

      {showPreferences && (
        <div className="p-3 border-t border-slate-200 space-y-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Drape Length */}
            <div>
              <label className="block text-slate-600 font-medium mb-1 text-[11px]">
                Drape Length
              </label>
              <select
                value={drapeLength}
                onChange={(e) => setDrapeLength(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-700 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none"
              >
                <option value="just touching the floor">
                  Floor-skimming (Precise)
                </option>
                <option value="floor-length floor puddle style">
                  Floor-length (Modern puddle)
                </option>
                <option value="sill-length covering the window sill">
                  Sill-length (Short)
                </option>
              </select>
            </div>

            {/* Drape Position */}
            <div>
              <label className="block text-slate-600 font-medium mb-1 text-[11px]">
                Drape Position
              </label>
              <select
                value={drapePosition}
                onChange={(e) => setDrapePosition(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-700 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none"
              >
                <option value="pulled open to the sides framing the window with natural daylight coming through">
                  Framing sides (Open)
                </option>
                <option value="partially closed with soft pleats">
                  Semi-closed (Diffused)
                </option>
                <option value="fully closed blocking the window">
                  Fully Closed
                </option>
              </select>
            </div>
          </div>

          {/* Rod / Hardware */}
          <div>
            <label className="block text-slate-600 font-medium mb-1 text-[11px]">
              Rod / Mounting Hardware
            </label>
            <select
              value={curtainRod}
              onChange={(e) => setCurtainRod(e.target.value)}
              disabled={isGenerating}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-700 text-xs focus:ring-1 focus:ring-[#004642] focus:border-[#004642] outline-none"
            >
              <option value="matte black minimalist curtain rod mounted just below the ceiling">
                Matte Black Architectural Rod
              </option>
              <option value="brushed brass warm gold curtain rod">
                Warm Brass / Gold Rod
              </option>
              <option value="hidden ceiling-recessed curtain track">
                Ceiling Track (Hidden hardware)
              </option>
              <option value="matching existing window trim">
                Match Existing Window Trim
              </option>
            </select>
          </div>

          {/* Strict Preservation Guarantee Note */}
          <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-start gap-2 text-amber-900 text-[11px] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Room Preservation Lock:</span>{" "}
              Walls, furniture, floors, and lamps remain 100% untouched.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

