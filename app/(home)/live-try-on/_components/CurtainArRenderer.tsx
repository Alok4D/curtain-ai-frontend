"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { QuadCorners, renderPerspectiveQuad } from "@/lib/ar-perspective";

export interface CurtainArRendererHandle {
  captureSnapshot: () => string | null;
}

interface CurtainArRendererProps {
  videoElement: HTMLVideoElement | null;
  fallbackImageUrl?: string | null;
  curtainImageUrl: string;
  corners: QuadCorners;
  opacity: number;
  category: "curtains" | "sheers" | "rollers";
  pleatsCount?: number;
}

const CurtainArRenderer = forwardRef<CurtainArRendererHandle, CurtainArRendererProps>(
  function CurtainArRenderer(
    {
      videoElement,
      fallbackImageUrl,
      curtainImageUrl,
      corners,
      opacity,
      category,
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const curtainImageRef = useRef<HTMLImageElement | null>(null);
    const fallbackImageRef = useRef<HTMLImageElement | null>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Preload curtain texture image
    useEffect(() => {
      if (!curtainImageUrl) return;
      setImageLoaded(false);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = curtainImageUrl;
      img.onload = () => {
        curtainImageRef.current = img;
        setImageLoaded(true);
      };
      img.onerror = () => {
        // Fallback to soft curtain image if url fails
        img.src = "/Soft.png";
      };
    }, [curtainImageUrl]);

    // Preload fallback room image if provided
    useEffect(() => {
      if (!fallbackImageUrl) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = fallbackImageUrl;
      img.onload = () => {
        fallbackImageRef.current = img;
      };
    }, [fallbackImageUrl]);

    // Expose snapshot capture
    useImperativeHandle(ref, () => ({
      captureSnapshot: () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        // Render full snapshot onto an offscreen canvas with watermark
        const snapshotCanvas = document.createElement("canvas");
        snapshotCanvas.width = canvas.width;
        snapshotCanvas.height = canvas.height;
        const snapCtx = snapshotCanvas.getContext("2d");
        if (!snapCtx) return null;

        // Draw live canvas content
        snapCtx.drawImage(canvas, 0, 0);

        // Draw Brand Watermark Badge (bottom right)
        snapCtx.save();
        const watermarkText = "Curtain AI • Live Room Preview";
        snapCtx.font = "bold 18px sans-serif";
        const textWidth = snapCtx.measureText(watermarkText).width;
        const badgeX = snapshotCanvas.width - textWidth - 40;
        const badgeY = snapshotCanvas.height - 45;

        snapCtx.fillStyle = "rgba(0, 70, 66, 0.85)";
        snapCtx.beginPath();
        snapCtx.roundRect(badgeX - 12, badgeY - 24, textWidth + 24, 34, 8);
        snapCtx.fill();

        snapCtx.fillStyle = "#ffffff";
        snapCtx.fillText(watermarkText, badgeX, badgeY);
        snapCtx.restore();

        return snapshotCanvas.toDataURL("image/jpeg", 0.95);
      },
    }));

    // Animation render loop
    useEffect(() => {
      let animId: number;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const renderFrame = () => {
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Video Frame (or Fallback Photo)
        if (videoElement && videoElement.readyState >= 2) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        } else if (fallbackImageRef.current) {
          ctx.drawImage(fallbackImageRef.current, 0, 0, canvas.width, canvas.height);
        }

        // 2. Draw Curtain Overlay onto the 4 corners
        if (curtainImageRef.current && imageLoaded) {
          ctx.save();

          // If sheer, use multiply/overlay blend to allow natural room light
          if (category === "sheers") {
            ctx.globalCompositeOperation = "source-over";
          }

          // Render perspective transformed curtain
          renderPerspectiveQuad(
            ctx,
            curtainImageRef.current,
            corners,
            12, // Subdivisions for smooth curve & perspective
            opacity
          );

          // Subtle curtain rod shadow on top of window
          const { topLeft: tl, topRight: tr } = corners;
          ctx.beginPath();
          ctx.moveTo(tl.x, tl.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.strokeStyle = "rgba(0,0,0,0.35)";
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.restore();
        }

        animId = requestAnimationFrame(renderFrame);
      };

      renderFrame();

      return () => {
        cancelAnimationFrame(animId);
      };
    }, [videoElement, corners, opacity, category, imageLoaded]);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
      />
    );
  }
);

export default CurtainArRenderer;

