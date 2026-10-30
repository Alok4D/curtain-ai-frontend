"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Download, RotateCcw, Calendar, MessageSquare } from "lucide-react";

const GENERATION_STEPS = [
  "Analyzing your room…",
  "Measuring your windows…",
  "Matching your fabric…",
  "Draping the curtains…",
  "Adjusting light & shadows…",
  "Adding finishing touches…",
];

export default function GenerateImagePage() {
  const router = useRouter();

  const [roomImage, setRoomImage] = useState<string>("/before_image.png");
  const [curtainName, setCurtainName] = useState<string>("Blue Lenin");
  const [curtainImage, setCurtainImage] = useState<string>(
    "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg"
  );
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

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
  }, []);

  const handleGenerate = () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(0);
    setCurrentStepIndex(0);

    const totalDuration = 7000; // 7 seconds simulation
    const intervalTime = 100;
    const increment = 100 / (totalDuration / intervalTime);

    const stepInterval = totalDuration / GENERATION_STEPS.length;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const stepTimer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, stepInterval);

    setTimeout(() => {
      // Use authentic realistic generated transformation
      const finalImage = "/after_image.png";
      setGeneratedImage(finalImage);
      sessionStorage.setItem("generatedImageUrl", finalImage);
      setIsGenerating(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, totalDuration);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImage || roomImage;
    link.download = `curtain-room-preview-${curtainName.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-16 font-['Urbanist',sans-serif]">
      {/* Simple Canvas Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full animate-bounce"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#d3c518",
                  "#004642",
                  "#0e7367",
                  "#f59e0b",
                  "#3b82f6",
                ][i % 5],
                animationDuration: `${1 + Math.random() * 2}s`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      )}

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

          {/* Heading */}
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-[#004642]">
              See your room transformed
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              One click and our AI drapes your selected curtain right into your room
            </p>
          </div>

          {/* Main Visualizer Container */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-5 md:gap-6 items-start">
              
              {/* Left Column: Big Image Preview & Scanning Overlay */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                <Image
                  src={generatedImage || roomImage}
                  alt="Room preview"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover"
                />

                {/* AI Generated Badge (visible after generation) */}
                {generatedImage && !isGenerating && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur text-[#004642] px-3 py-1.5 rounded-full text-xs font-semibold shadow select-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="#004642"
                    >
                      <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" />
                    </svg>
                    <span>AI Generated</span>
                  </div>
                )}

                {/* AI Scanning / Processing Overlay (identical to curtainz.ai) */}
                {isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-brightness-90 z-20">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="26"
                          height="26"
                          fill="white"
                        >
                          <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" />
                        </svg>
                      </div>

                      {/* Cycling Step Text */}
                      <p className="ai-step-text text-white text-sm md:text-base font-semibold drop-shadow">
                        {GENERATION_STEPS[currentStepIndex]}
                      </p>

                      {/* Progress bar */}
                      <div className="w-56 md:w-72 h-1.5 bg-white/25 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-white/80 text-xs">
                        This usually takes 15–30 seconds
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Comparison Thumbnails & Actions */}
              <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                
                {/* Thumbnails Row */}
                <div className="flex gap-3">
                  {/* Your Room Thumbnail */}
                  <div className="flex-1 text-center">
                    <div className="relative w-full h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
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
                      <div className="absolute inset-0 h-24 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <p className="text-white text-[11px] font-medium">Change</p>
                      </div>
                      <div className="relative w-full h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
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

                {/* Primary Action Button */}
                {!generatedImage ? (
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-3.5 px-4 bg-[#004642] hover:bg-[#003431] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-75"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="#d3c518"
                    >
                      <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" />
                    </svg>
                    <span>Generate AI Image</span>
                  </button>
                ) : (
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

                <p className="text-[11px] text-gray-400 text-center -mt-2">
                  Up to 5 free AI images — no sign-up needed
                </p>

                {/* Consultation & Booking Section */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2.5 text-center">
                    Need help deciding?
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://wa.me/971523135707?text=Hi%20Curtainz!%20I'd%20like%20to%20know%20more%20about%20your%20curtains."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#0E7367] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#0B5D54] text-sm transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact us on WhatsApp</span>
                    </a>

                    <Link
                      href="/#book-visit"
                      className="flex items-center justify-center gap-2 bg-[#004642] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#003431] text-sm transition-colors shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book A Free Visit</span>
                    </Link>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center mt-2.5">
                    Free consultation · Our experts bring samples to your home
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
