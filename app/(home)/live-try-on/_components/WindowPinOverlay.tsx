"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { QuadCorners, Point2D } from "@/lib/ar-perspective";

interface WindowPinOverlayProps {
  corners: QuadCorners;
  onChangeCorners: (corners: QuadCorners) => void;
  showPins: boolean;
  onResetPins?: () => void;
}

type ActiveHandle = "topLeft" | "topRight" | "bottomRight" | "bottomLeft" | null;

export default function WindowPinOverlay({
  corners,
  onChangeCorners,
  showPins,
}: WindowPinOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHandle, setActiveHandle] = useState<ActiveHandle>(null);

  // Normalize touch / mouse coordinate to container percentage or px
  const getContainerCoords = useCallback(
    (clientX: number, clientY: number): Point2D | null => {
      if (!containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      return { x, y };
    },
    []
  );

  const handlePointerDown = (handle: ActiveHandle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setActiveHandle(handle);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!activeHandle) return;
      e.preventDefault();
      const coords = getContainerCoords(e.clientX, e.clientY);
      if (!coords) return;

      onChangeCorners({
        ...corners,
        [activeHandle]: coords,
      });
    },
    [activeHandle, corners, getContainerCoords, onChangeCorners]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (activeHandle) {
        try {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
        setActiveHandle(null);
      }
    },
    [activeHandle]
  );

  const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = corners;

  // SVG Polygon Points
  const polygonPoints = `${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute inset-0 w-full h-full pointer-events-auto touch-none select-none z-10"
    >
      {/* Laser Red Boundary Outline (Matching Photo 2) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Animated Laser Gradient Line */}
        <defs>
          <linearGradient id="laserGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3366" />
            <stop offset="50%" stopColor="#d3c518" />
            <stop offset="100%" stopColor="#ff3366" />
          </linearGradient>
        </defs>

        {/* Boundary Polygon */}
        <polygon
          points={polygonPoints}
          fill="none"
          stroke={showPins ? "url(#laserGlow)" : "none"}
          strokeWidth="2.5"
          strokeDasharray={showPins ? "6 3" : "none"}
          className="transition-all duration-75"
        />

        {/* Subtle Window Glass highlight */}
        {showPins && (
          <polygon
            points={polygonPoints}
            fill="#d3c518"
            fillOpacity="0.05"
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* 4 Interactive Drag Pins */}
      {showPins && (
        <>
          <PinHandle
            label="Top Left"
            point={tl}
            isActive={activeHandle === "topLeft"}
            onPointerDown={handlePointerDown("topLeft")}
          />
          <PinHandle
            label="Top Right"
            point={tr}
            isActive={activeHandle === "topRight"}
            onPointerDown={handlePointerDown("topRight")}
          />
          <PinHandle
            label="Bottom Right"
            point={br}
            isActive={activeHandle === "bottomRight"}
            onPointerDown={handlePointerDown("bottomRight")}
          />
          <PinHandle
            label="Bottom Left"
            point={bl}
            isActive={activeHandle === "bottomLeft"}
            onPointerDown={handlePointerDown("bottomLeft")}
          />
        </>
      )}
    </div>
  );
}

interface PinHandleProps {
  label: string;
  point: Point2D;
  isActive: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

function PinHandle({ label, point, isActive, onPointerDown }: PinHandleProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        transform: `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`,
      }}
      className={`absolute w-12 h-12 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-20 ${
        isActive ? "scale-125" : "hover:scale-110"
      } transition-transform duration-75`}
      aria-label={label}
    >
      {/* Outer Halo */}
      <div
        className={`w-9 h-9 rounded-full ${
          isActive
            ? "bg-red-500/30 ring-4 ring-red-400"
            : "bg-[#d3c518]/25 ring-2 ring-[#d3c518]/80"
        } flex items-center justify-center animate-pulse`}
      >
        {/* Inner Solid Pin Point */}
        <div
          className={`w-4 h-4 rounded-full ${
            isActive ? "bg-red-500" : "bg-white"
          } shadow-lg border-2 border-[#004642]`}
        />
      </div>

      {/* Corner Indicator Mark */}
      <span className="absolute -bottom-5 text-[9px] font-bold tracking-wider uppercase text-white bg-black/60 px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

