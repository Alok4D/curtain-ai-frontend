"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Sparkles, HelpCircle } from "lucide-react";
import { QuadCorners, Point2D } from "@/lib/ar-perspective";
import curtainLocalData from "@/data/curtains.json";
import { useGetAllCurtainsQuery } from "@/lib/feature/curtain/curtainApi";

import LiveCameraView from "./_components/LiveCameraView";
import WindowPinOverlay from "./_components/WindowPinOverlay";
import CurtainArRenderer, {
  CurtainArRendererHandle,
} from "./_components/CurtainArRenderer";
import CurtainSwatchTray, {
  CurtainOption,
} from "./_components/CurtainSwatchTray";
import ArControlBar from "./_components/ArControlBar";
import CaptureModal from "./_components/CaptureModal";

export default function LiveTryOnPage() {
  const rendererRef = useRef<CurtainArRendererHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // RTK Query hook with local fallback
  const { data: apiResponse } = useGetAllCurtainsQuery();

  // Unified list of curtains
  const [allCurtains, setAllCurtains] = useState<CurtainOption[]>([]);
  const [activeCategory, setActiveCategory] = useState<"curtains" | "sheers" | "rollers">("curtains");
  const [selectedCurtain, setSelectedCurtain] = useState<CurtainOption | null>(null);

  // Camera & Video
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [fallbackImageUrl, setFallbackImageUrl] = useState<string | null>(null);

  // AR Settings & Pins
  const [showPins, setShowPins] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(0.9);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);

  // 4 Window Corner Pins (Default percentage-based)
  const [corners, setCorners] = useState<QuadCorners>({
    topLeft: { x: 80, y: 80 },
    topRight: { x: 300, y: 80 },
    bottomRight: { x: 300, y: 420 },
    bottomLeft: { x: 80, y: 420 },
  });

  // Calculate default centered window frame based on container dimensions
  const calculateDefaultCorners = useCallback((): QuadCorners => {
    if (!containerRef.current) {
      return {
        topLeft: { x: 80, y: 80 },
        topRight: { x: 320, y: 80 },
        bottomRight: { x: 320, y: 440 },
        bottomLeft: { x: 80, y: 440 },
      };
    }
    const { width: w, height: h } = containerRef.current.getBoundingClientRect();
    const marginX = w * 0.18;
    const topY = h * 0.14;
    const botY = h * 0.68;

    return {
      topLeft: { x: Math.round(marginX), y: Math.round(topY) },
      topRight: { x: Math.round(w - marginX), y: Math.round(topY) },
      bottomRight: { x: Math.round(w - marginX), y: Math.round(botY) },
      bottomLeft: { x: Math.round(marginX), y: Math.round(botY) },
    };
  }, []);

  // Initialize and resize corners proportionally
  useEffect(() => {
    const updateCorners = () => {
      setCorners(calculateDefaultCorners());
    };

    updateCorners();
    window.addEventListener("resize", updateCorners);
    return () => window.removeEventListener("resize", updateCorners);
  }, [calculateDefaultCorners]);

  // Combine curtains from local JSON and backend API
  useEffect(() => {
    const list: CurtainOption[] = [];

    // 1. Process local catalog
    const cats: ("curtains" | "sheers" | "rollers")[] = ["curtains", "sheers", "rollers"];
    cats.forEach((cat) => {
      const items = (curtainLocalData as Record<string, any[]>)[cat] || [];
      items.forEach((item) => {
        list.push({
          id: item.id || `local-${cat}-${item.name}`,
          name: item.name,
          category: cat,
          image_url: item.display_image_url || item.image_url || "/Soft.png",
          display_image_url: item.display_image_url,
          fabric: item.fabric || "Textured Polyester Blend",
          price: "$85",
        });
      });
    });

    // 2. Add API curtains if available
    if (apiResponse?.data && Array.isArray(apiResponse.data)) {
      apiResponse.data.forEach((item: any) => {
        const cat = (item.category as "curtains" | "sheers" | "rollers") || "curtains";
        list.push({
          id: item._id || item.id,
          name: item.name,
          category: cat,
          image_url: item.display_image_url || item.image_url || item.images?.[0] || "/Soft.png",
          price: "$95",
        });
      });
    }

    setAllCurtains(list);
    if (list.length > 0 && !selectedCurtain) {
      setSelectedCurtain(list[0]);
    }
  }, [apiResponse]);

  const handleCapture = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.captureSnapshot();
    if (dataUrl) {
      setCapturedImage(dataUrl);
    }
  };

  const handleToggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleResetPins = () => {
    setCorners(calculateDefaultCorners());
  };

  const handleUseFallbackImage = () => {
    setFallbackImageUrl(
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden select-none font-['Urbanist',sans-serif] flex flex-col justify-between"
    >
      {/* ========================================================
          1. TOP AR CONTROLS HEADER
         ======================================================== */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-auto">
        {/* Back / Exit Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit AR</span>
        </Link>

        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004642]/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#d3c518] animate-pulse" />
          <span>Live Window Try-On</span>
        </div>

        {/* Right Action Icons: Flip Camera & Guide */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHelpGuide(!showHelpGuide)}
            className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            title="Help & Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleToggleCamera}
            className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            title="Flip Camera (Front/Rear)"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================
          2. INSTRUCTION HINT PILL (DISMISSIBLE)
         ======================================================== */}
      {showHelpGuide && (
        <div className="absolute top-16 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-md z-40 bg-neutral-900/95 backdrop-blur-md border border-[#d3c518]/50 text-white p-4 rounded-2xl shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-[#d3c518] mb-1.5">
                How to position your curtains:
              </h4>
              <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4">
                <li>Point your camera at your room&apos;s window.</li>
                <li>
                  Drag the <strong>4 corner pins</strong> (Top Left, Top Right,
                  Bottom Left, Bottom Right) to match your window frame.
                </li>
                <li>Tap any curtain below to see it change live.</li>
                <li>Tap the camera shutter button to save a high-res photo.</li>
              </ul>
            </div>
            <button
              onClick={() => setShowHelpGuide(false)}
              className="text-white/60 hover:text-white text-xs font-bold px-2 py-1 bg-white/10 rounded"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MAIN AR VIEWPORT (CAMERA + PERSPECTIVE RENDERER + PINS)
         ======================================================== */}
      <div className="relative w-full h-full flex-1 overflow-hidden">
        {/* Live Camera Feed */}
        <LiveCameraView
          facingMode={facingMode}
          onVideoReady={(vid) => setVideoElement(vid)}
          onToggleCamera={handleToggleCamera}
          onUseFallbackImage={handleUseFallbackImage}
        />

        {/* Real-time Perspective Curtain Overlay Canvas */}
        <CurtainArRenderer
          ref={rendererRef}
          videoElement={videoElement}
          fallbackImageUrl={fallbackImageUrl}
          curtainImageUrl={selectedCurtain?.image_url || "/Soft.png"}
          corners={corners}
          opacity={opacity}
          category={activeCategory}
        />

        {/* Interactive 4-Corner Pinning Grid (Touch & Mouse Drag) */}
        <WindowPinOverlay
          corners={corners}
          onChangeCorners={(newCorners) => setCorners(newCorners)}
          showPins={showPins}
          onResetPins={handleResetPins}
        />
      </div>

      {/* ========================================================
          4. BOTTOM CONTROLS & CURTAIN SWATCH CAROUSEL
         ======================================================== */}
      <div className="relative z-30 flex flex-col w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-3">
        {/* Floating Controls Bar (Shutter, Pins, Opacity) */}
        <div className="px-4 pb-2 flex justify-center">
          <ArControlBar
            onCapture={handleCapture}
            showPins={showPins}
            onTogglePins={() => setShowPins(!showPins)}
            onAutoFitWindow={handleResetPins}
            opacity={opacity}
            onChangeOpacity={(val) => setOpacity(val)}
          />
        </div>

        {/* Real Curtains Swatch Carousel */}
        <CurtainSwatchTray
          curtains={allCurtains}
          selectedCurtain={selectedCurtain}
          onSelectCurtain={(curtain) => setSelectedCurtain(curtain)}
          activeCategory={activeCategory}
          onChangeCategory={(cat) => setActiveCategory(cat)}
        />
      </div>

      {/* ========================================================
          5. SNAPSHOT CAPTURED MODAL
         ======================================================== */}
      {capturedImage && (
        <CaptureModal
          imageUrl={capturedImage}
          onClose={() => setCapturedImage(null)}
          curtainName={selectedCurtain?.name}
        />
      )}
    </div>
  );
}

