import React from "react";
import { Check } from "lucide-react";

interface ProgressBarProps {
  onUploadClick: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ onUploadClick }) => {
  return (
    <nav aria-label="Progress" className="flex justify-center mb-6 md:mb-8">
      <ol className="flex items-center gap-0">
        {/* Step 1: Upload your room (Done) */}
        <li className="flex items-center">
          <button
            type="button"
            onClick={onUploadClick}
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
          >
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-[11px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
              Upload your room
            </span>
          </button>
        </li>

        {/* Connecting line 1 */}
        <li className="flex items-center">
          <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-[#004642]" />
          {/* Step 2: Pick a curtain (Active) */}
          <span
            className="flex items-center gap-1.5 md:gap-2"
            aria-current="step"
          >
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white ring-4 ring-[#004642]/15">
              2
            </span>
            <span className="text-[11px] md:text-sm font-medium text-[#004642] whitespace-nowrap">
              Pick a curtain
            </span>
          </span>
        </li>

        {/* Connecting line 2 */}
        <li className="flex items-center">
          <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-gray-300" />
          {/* Step 3: See the AI preview (Pending) */}
          <span className="flex items-center gap-1.5 md:gap-2">
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-gray-200 text-gray-500">
              3
            </span>
            <span className="text-[11px] md:text-sm font-medium text-gray-400 whitespace-nowrap">
              See the AI preview
            </span>
          </span>
        </li>
      </ol>
    </nav>
  );
};

