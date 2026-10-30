"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Download,
  RotateCcw,
  Calendar,
  MessageSquare,
  SlidersHorizontal,
  ShieldCheck,
  AlertCircle,
  Columns,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const STEPS = [
  "Locating window geometry & room perspective…",
  "Analyzing your room & identifying windows…",
  "Matching your catalog fabric & texture…",
  "Synthesizing weave & realistic fabric drop…",
  "Harmonizing ambient light & shadows…",
  "Locking room furniture & finishing touches…",
];

export default function GenerateImagePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const [roomImage, setRoomImage] = useState<string>("/before_image.png");
  const [curtainName, setCurtainName] = useState<string>("Blue Lenin");
  const [curtainImage, setCurtainImage] = useState<string>(
    "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg"
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Styling & Fitting preferences from curtain_ai_room_visualizer
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [drapeLength, setDrapeLength] = useState<string>("just touching the floor");
  const [drapePosition, setDrapePosition] = useState<string>(
    "pulled open to the sides framing the window with natural daylight coming through"
  );
  const [curtainRod, setCurtainRod] = useState<string>(
    "matte black minimalist curtain rod mounted just below the ceiling"
  );

  // Interactive Split-Slider State
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliderMode, setIsSliderMode] = useState<boolean>(true);
  const isDraggingRef = useRef<boolean>(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [remainingImages, setRemainingImages] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Split-Slider Drag Handler (Mouse and Touch)
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleSliderMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Realistic confetti burst
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#004642",
      "#d3c518",
      "#0e7367",
      "#10b981",
      "#fbbf24",
      "#60a5fa",
    ];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRot: number;
      opacity: number;
    }> = [];

    // Left & Right cannon bursts
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: window.innerWidth * 0.25,
        y: window.innerHeight * 0.6,
        vx: (Math.random() - 0.2) * 14,
        vy: -(Math.random() * 16 + 8),
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        opacity: 1,
      });
      particles.push({
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.6,
        vx: (Math.random() - 0.8) * 14,
        vy: -(Math.random() * 16 + 8),
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        opacity: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.985; // drag
        p.rotation += p.vRot;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (active) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animId = requestAnimationFrame(render);
  };

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
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomImage,
          curtainImage,
          drapeLength,
          drapePosition,
          curtainRod,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Failed to generate curtain preview. Please check your OpenAI API key and image inputs."
        );
      }

      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      setProgress(100);
      setGeneratedImage(data.imageUrl);
      sessionStorage.setItem("generatedImageUrl", data.imageUrl);
      setRemainingImages((prev) => Math.max(0, prev - 1));
      setIsGenerating(false);

      // Trigger Celebration
      triggerConfetti();
    } catch (err: any) {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(0);
      setIsGenerating(false);
      setErrorMessage(
        err.message || "An unexpected error occurred during image generation."
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
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Stepper */}
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

          {/* Heading & Subtitle */}
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-[#004642]">
              See your room transformed
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {generatedImage && !isGenerating
                ? "Here is your AI curtain visualization — compare and see the difference"
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
              {/* Left Column: Big Image Preview, Split-Slider & Scanning Overlay */}
              <div
                className={`relative rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 ${
                  isGenerating ? "ai-generating-frame" : ""
                }`}
              >
                <div
                  ref={sliderContainerRef}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none flex items-center justify-center"
                >
                  {/* Mode 1: Result is generated and Slider Mode is active */}
                  {generatedImage && !isGenerating && isSliderMode ? (
                    <div
                      className="relative w-full h-full cursor-ew-resize"
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleMouseDown}
                      onClick={(e) => handleSliderMove(e.clientX)}
                    >
                      {/* Base Image: Original Room (Right side) */}
                      <Image
                        src={roomImage}
                        alt="Original Room"
                        fill
                        priority
                        className="object-cover pointer-events-none"
                      />

                      {/* Clipped Overlay Image: Fitted AI Curtain (Left side) */}
                      <div
                        className="absolute inset-0 overflow-hidden pointer-events-none"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <Image
                          src={generatedImage}
                          alt="Fitted Curtain Room"
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>

                      {/* Slider Divider Line & Handle */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)] pointer-events-none z-10"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#004642]">
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.5 7l-5 5 5 5V7zm7 0v10l5-5-5-5z" />
                          </svg>
                        </div>
                      </div>

                      {/* Before / After Badges */}
                      <div className="absolute top-3 left-3 bg-[#004642]/85 backdrop-blur text-white px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide shadow-sm pointer-events-none z-20">
                        Fitted AI Curtain
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide shadow-sm pointer-events-none z-20">
                        Original Room
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: Full View (Original or Generated) */
                    <div className="relative w-full h-full">
                      <Image
                        src={generatedImage || roomImage}
                        alt="Room preview"
                        id="generated-image"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 750px"
                        className="object-cover"
                      />

                      {/* AI Generated Badge (visible when showing generated result in full view) */}
                      {generatedImage && !isGenerating && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur text-[#004642] px-3 py-1.5 rounded-full text-xs font-semibold shadow select-none z-10">
                          <Sparkles className="w-3.5 h-3.5 text-[#004642]" />
                          <span>AI Generated Fitting</span>
                        </div>
                      )}
                    </div>
                  )}

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
                          {STEPS[stepIndex]}
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

                {/* Bottom Canvas Footer Toolbar (when generated) */}
                {generatedImage && !isGenerating && (
                  <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="text-[11px] text-slate-400">
                      {isSliderMode
                        ? "Drag the center handle to compare before & after"
                        : "Showing newly fitted curtain in your room"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSliderMode(!isSliderMode)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>{isSliderMode ? "Full View" : "Slider View"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Comparison Thumbnails, Styling Controls & Actions */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                {/* Thumbnails Row */}
                <div className="flex gap-3">
                  {/* Your Room Thumbnail */}
                  <div className="flex-1 text-center">
                    <div className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <Image
                        src={roomImage}
                        alt="Uploaded Room"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Your Room</p>
                  </div>

                  {/* Selected Curtain Thumbnail */}
                  <div className="flex-1">
                    <Link href="/select-curtains" className="group relative block">
                      <div className="absolute inset-0 h-20 sm:h-24 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <p className="text-white text-[11px] font-medium">Change</p>
                      </div>
                      <div className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                        <Image
                          src={curtainImage}
                          alt="Selected Curtain"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <p className="text-[11px] text-gray-500 mt-1 text-center truncate">
                      {curtainName}
                    </p>
                  </div>
                </div>

                {/* Primary Action Button (Exact 1:1 match with curtainz.ai) */}
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
                      <Sparkles className="w-4 h-4 text-[#d3c518]" />
                      <span>Generate AI Image</span>
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

                {/* Collapsible Fitting & Styling Controls (from curtain_ai_room_visualizer) */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60">
                  <button
                    type="button"
                    onClick={() => setShowPreferences(!showPreferences)}
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

                {/* Secondary Actions (Download & Try Another) when generated */}
                {generatedImage && !isGenerating && (
                  <div className="grid grid-cols-2 gap-2 mt-0.5">
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

                {/* Consultation & Booking Section */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2.5 text-center">
                    {generatedImage && !isGenerating
                      ? "Love the look? Let's make it real"
                      : "Need help deciding?"}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://wa.me/971523135707?text=Hi%20Curtainz!%20I'd%20like%20to%20know%20more%20about%20your%20curtains."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#0E7367] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#0B5D54] text-sm transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact us on WhatsApp</span>
                    </a>

                    <Link
                      href="/#book-visit"
                      className="flex items-center justify-center gap-2 bg-[#004642] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#003431] text-sm transition-colors shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book A Free Visit</span>
                    </Link>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center mt-2.5">
                    Free consultation- Our experts bring samples to your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
