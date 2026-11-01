import Image from "next/image";
import { Sparkles } from "lucide-react";

interface VisualizerPreviewProps {
  roomImage: string;
  generatedImage: string | null;
  isGenerating: boolean;
  stepIndex: number;
  progress: number;
  steps: string[];
}

export function VisualizerPreview({
  roomImage,
  generatedImage,
  isGenerating,
  stepIndex,
  progress,
  steps,
}: VisualizerPreviewProps) {
  return (
    <div
      className={`relative rounded-sm overflow-hidden bg-gray-900 transition-all duration-300 ${
        isGenerating ? "ai-generating-frame" : ""
      }`}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={generatedImage || roomImage}
            alt={generatedImage ? "AI Generated Curtain Room" : "Room preview"}
            id="generated-image"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-cover"
          />

       
        </div>

        {/* AI Scanning / Processing Overlay (identical to curtainz.ai) */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-brightness-90 z-30">
            {/* Sweeping scan beam */}
            <div className="ai-scan-beam" />

            {/* Twinkling sparkles */}
            <div
              className="ai-sparkle"
              style={{ top: "18%", left: "14%", animationDelay: "0s" }}
            />
            <div
              className="ai-sparkle"
              style={{ top: "30%", right: "18%", animationDelay: "0.7s" }}
            />
            <div
              className="ai-sparkle"
              style={{ bottom: "26%", left: "26%", animationDelay: "1.3s" }}
            />
            <div
              className="ai-sparkle"
              style={{ bottom: "16%", right: "30%", animationDelay: "1.9s" }}
            />

            {/* Centered Orb & Status Text */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
              <div className="ai-orb">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Cycling Step Text */}
              <p
                key={stepIndex}
                className="ai-step-text text-white text-sm md:text-base font-medium drop-shadow"
              >
                {steps[stepIndex]}
              </p>

              {/* Progress bar */}
              <div className="w-56 md:w-72 h-1.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-white/80 text-xs">
                This usually takes 15–25 seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

