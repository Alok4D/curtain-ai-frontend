"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Download,
  RotateCcw,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { normalizeImageToJpeg } from "@/lib/utils";
import { useGenerateCurtainPreviewMutation } from "@/lib/feature/visualizer/visualizerApi";
import {
  ConfettiCanvas,
  ConfettiCanvasHandle,
  VisualizerStepper,
  VisualizerPreview,
  RoomAndCurtainThumbnails,
  FittingPreferences,
  ConsultationCard,
} from "./_components";

const STEPS = [
  "Locating window geometry & room perspective…",
  "Analyzing your room & identifying windows…",
  "Matching your catalog fabric & texture…",
  "Synthesizing weave & realistic fabric drop…",
  "Harmonizing ambient light & shadows…",
  "Locking room furniture & finishing touches…",
];

export default function GenerateImagePage() {
  const confettiRef = useRef<ConfettiCanvasHandle>(null);

  const [roomImage, setRoomImage] = useState<string>("/before_image.png");
  const [curtainName, setCurtainName] = useState<string>("Blue Lenin");
  const [curtainImage, setCurtainImage] = useState<string>(
    "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg"
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Styling & Fitting preferences
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [drapeLength, setDrapeLength] = useState<string>("just touching the floor");
  const [drapePosition, setDrapePosition] = useState<string>(
    "pulled open to the sides framing the window with natural daylight coming through"
  );
  const [curtainRod, setCurtainRod] = useState<string>(
    "matte black minimalist curtain rod mounted just below the ceiling"
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [remainingImages, setRemainingImages] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // RTK Query API Hook
  const [generateCurtainPreview] = useGenerateCurtainPreviewMutation();

  useEffect(() => {
    // Read selections from sessionStorage
    const storedRoom = sessionStorage.getItem("uploadedImageUrl");
    const storedCurtainName = sessionStorage.getItem("selectedCurtainName");
    const storedCurtainImg = sessionStorage.getItem("selectedCurtainImageUrl");
    const storedGenerated = sessionStorage.getItem("generatedImageUrl");

    if (storedRoom) setRoomImage(storedRoom);
    if (storedCurtainName) setCurtainName(storedCurtainName);
    if (storedCurtainImg) setCurtainImage(storedCurtainImg);
    if (storedGenerated) setGeneratedImage(storedGenerated);

    return () => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleGenerate = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(0);
    setStepIndex(0);
    setErrorMessage(null);

    // Step message cycle interval (2800ms)
    stepIntervalRef.current = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2800);

    // Smooth asymptotic progress towards 92% (every 250ms)
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(92, prev + (92 - prev) * 0.045 + 0.2));
    }, 250);

    try {
      let processedRoom = roomImage;
      if (roomImage.startsWith("data:image/")) {
        processedRoom = await normalizeImageToJpeg(roomImage);
      }

      const result = await generateCurtainPreview({
        roomImage: processedRoom,
        curtainImage,
        curtainName,
        drapeLength,
        drapePosition,
        curtainRod,
      }).unwrap();

      if (!result?.data?.imageUrl) {
        throw new Error(result?.message || "Failed to generate curtain preview. Please check your image inputs.");
      }

      const finalImageUrl = result.data.imageUrl;

      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      setProgress(100);
      setGeneratedImage(finalImageUrl);
      sessionStorage.setItem("generatedImageUrl", finalImageUrl);
      setRemainingImages((prev) => Math.max(0, prev - 1));
      setIsGenerating(false);

      // Trigger Celebration
      confettiRef.current?.triggerConfetti();
    } catch (err: any) {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(0);
      setIsGenerating(false);
      setErrorMessage(
        err?.data?.message || err?.message || "An unexpected error occurred during image generation."
      );
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 19);
      link.download = `curtain-ai-image-${timestamp}.png`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `curtain-room-preview.png`;
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-16 font-['Urbanist',sans-serif]">
      {/* Invisible Canvas for Confetti */}
      <ConfettiCanvas ref={confettiRef} />

      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Stepper */}
          <VisualizerStepper />

          {/* Heading & Subtitle */}
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-[#004642]">
              See your room transformed
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {generatedImage && !isGenerating
                ? "Here is your AI curtain visualization"
                : "One click and our AI drapes your selected curtain right into your room"}
            </p>
          </div>

          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs md:text-sm flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-amber-950">
                  Generation Notice
                </p>
                <p className="mt-0.5 leading-relaxed text-amber-800">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Main Visualizer Container */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_21rem] gap-5 md:gap-6 items-start">
              {/* Left Column: Big Image Preview & Scanning Overlay */}
              <VisualizerPreview
                roomImage={roomImage}
                generatedImage={generatedImage}
                isGenerating={isGenerating}
                stepIndex={stepIndex}
                progress={progress}
                steps={STEPS}
              />

              {/* Right Column: Comparison Thumbnails, Styling Controls & Actions */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                {/* Thumbnails Row */}
                <RoomAndCurtainThumbnails
                  roomImage={roomImage}
                  curtainImage={curtainImage}
                  curtainName={curtainName}
                />

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3.5 px-4 bg-[#004642] hover:bg-[#003431] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {isGenerating ? (
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
                      <span>Generating with AI…</span>
                    </span>
                  ) : generatedImage ? (
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white fill-white" />
                      <span>Regenerate AI Image</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d3c518]" />
                      <span>Generate AI Image</span>
                    </span>
                  )}
                </button>

                {/* Free quota indicator */}
                <p className="text-[11px] text-gray-400 text-center -mt-2">
                  {remainingImages < 5
                    ? `${remainingImages} of 5 free images remaining`
                    : "Up to 5 free AI images — no sign-up needed"}
                </p>

                {/* Secondary Actions (Download & Try Another) when generated */}
                {generatedImage && !isGenerating && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <Link
                      href="/select-curtains"
                      className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Another</span>
                    </Link>
                  </div>
                )}

                {/* Collapsible Fitting & Styling Controls */}
                <FittingPreferences
                  showPreferences={showPreferences}
                  setShowPreferences={setShowPreferences}
                  drapeLength={drapeLength}
                  setDrapeLength={setDrapeLength}
                  drapePosition={drapePosition}
                  setDrapePosition={setDrapePosition}
                  curtainRod={curtainRod}
                  setCurtainRod={setCurtainRod}
                  isGenerating={isGenerating}
                />

                {/* Consultation & Booking Section */}
                <ConsultationCard isGenerated={Boolean(generatedImage && !isGenerating)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
