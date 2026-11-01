import Link from "next/link";
import { Check } from "lucide-react";

export function VisualizerStepper() {
  return (
    <nav aria-label="Progress" className="flex justify-center mb-6 md:mb-8">
      <ol className="flex items-center gap-0">
        {/* Step 1: Upload your room */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
          >
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-[11px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
              Upload your room
            </span>
          </Link>
        </li>

        {/* Connecting line 1 */}
        <li className="flex items-center">
          <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-[#004642]" />
          {/* Step 2: Pick a curtain */}
          <Link
            href="/select-curtains"
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
          >
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="text-[11px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
              Pick a curtain
            </span>
          </Link>
        </li>

        {/* Connecting line 2 */}
        <li className="flex items-center">
          <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-[#004642]" />
          {/* Step 3: See the AI preview (Active) */}
          <span
            className="flex items-center gap-1.5 md:gap-2"
            aria-current="step"
          >
            <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white ring-4 ring-[#004642]/15">
              3
            </span>
            <span className="text-[11px] md:text-sm font-medium text-[#004642] whitespace-nowrap">
              See the AI preview
            </span>
          </span>
        </li>
      </ol>
    </nav>
  );
}

