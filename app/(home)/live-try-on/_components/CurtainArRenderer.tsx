"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { QuadCorners, Point2D } from "@/lib/ar-perspective";

export interface CurtainArRendererHandle {
  captureSnapshot: () => string | null;
}

interface CurtainArRendererProps {
  videoElement: HTMLVideoElement | null;
  fallbackImageUrl?: string | null;
  fabricTextureUrl: string;
  corners: QuadCorners;
  opacity: number;
  category: "curtains" | "sheers" | "rollers";
  curtainName?: string;
}

const CurtainArRenderer = forwardRef<CurtainArRendererHandle, CurtainArRendererProps>(
  function CurtainArRenderer(
    {
      videoElement,
      fallbackImageUrl,
      fabricTextureUrl,
      corners,
      opacity,
      category,
      curtainName,
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textureRef = useRef<HTMLImageElement | null>(null);
    const fallbackImageRef = useRef<HTMLImageElement | null>(null);
    const [textureLoaded, setTextureLoaded] = useState(false);

    // Load fabric texture image
    useEffect(() => {
      if (!fabricTextureUrl) return;
      setTextureLoaded(false);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = fabricTextureUrl;
      img.onload = () => {
        textureRef.current = img;
        setTextureLoaded(true);
      };
      img.onerror = () => {
        // Fallback to local default soft texture
        img.src = "/Soft.png";
      };
    }, [fabricTextureUrl]);

    // Load fallback room image if provided
    useEffect(() => {
      if (!fallbackImageUrl) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = fallbackImageUrl;
      img.onload = () => {
        fallbackImageRef.current = img;
      };
    }, [fallbackImageUrl]);

    // Expose capture snapshot
    useImperativeHandle(ref, () => ({
      captureSnapshot: () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const snapCanvas = document.createElement("canvas");
        snapCanvas.width = canvas.width;
        snapCanvas.height = canvas.height;
        const snapCtx = snapCanvas.getContext("2d");
        if (!snapCtx) return null;

        snapCtx.drawImage(canvas, 0, 0);

        // Draw Watermark
        snapCtx.save();
        const watermarkText = "Curtain AI • Room Preview";
        snapCtx.font = "bold 16px sans-serif";
        const textWidth = snapCtx.measureText(watermarkText).width;
        const badgeX = snapCanvas.width - textWidth - 36;
        const badgeY = snapCanvas.height - 36;

        snapCtx.fillStyle = "rgba(0, 70, 66, 0.9)";
        snapCtx.beginPath();
        snapCtx.roundRect(badgeX - 10, badgeY - 20, textWidth + 20, 30, 6);
        snapCtx.fill();

        snapCtx.fillStyle = "#ffffff";
        snapCtx.fillText(watermarkText, badgeX, badgeY);
        snapCtx.restore();

        return snapCanvas.toDataURL("image/jpeg", 0.95);
      },
    }));

    // Animation Loop
    useEffect(() => {
      let animId: number;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const render = () => {
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Camera Feed (or Fallback Photo)
        if (videoElement && videoElement.readyState >= 2) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        } else if (fallbackImageRef.current) {
          ctx.drawImage(fallbackImageRef.current, 0, 0, canvas.width, canvas.height);
        }

        // 2. Draw Realistic Virtual Curtains onto the window frame
        const { topLeft: tl, topRight: tr, bottomRight: br, bottomLeft: bl } = corners;

        // Vector math for window top and sides
        const topVector = { x: tr.x - tl.x, y: tr.y - tl.y };
        const windowWidth = Math.hypot(topVector.x, topVector.y);

        ctx.save();
        ctx.globalAlpha = Math.max(0.2, Math.min(1, opacity));

        // Create fabric pattern from texture
        let fabricPattern: CanvasPattern | null = null;
        if (textureRef.current && textureLoaded) {
          try {
            fabricPattern = ctx.createPattern(textureRef.current, "repeat");
          } catch {}
        }

        // ==========================================
        // TYPE A: CLASSIC DRAPES (Left & Right Panels)
        // ==========================================
        if (category === "curtains") {
          const panelRatio = 0.34; // Each curtain panel covers ~34% of window width

          // Left Curtain Panel Points
          const leftTopInner = { x: tl.x + topVector.x * panelRatio, y: tl.y + topVector.y * panelRatio };
          const botVector = { x: br.x - bl.x, y: br.y - bl.y };
          const leftBotInner = { x: bl.x + botVector.x * panelRatio, y: bl.y + botVector.y * panelRatio };

          // Right Curtain Panel Points
          const rightTopInner = { x: tr.x - topVector.x * panelRatio, y: tr.y - topVector.y * panelRatio };
          const rightBotInner = { x: br.x - botVector.x * panelRatio, y: br.y - botVector.y * panelRatio };

          // Draw Left Drape
          drawDrapePanel(ctx, tl, leftTopInner, leftBotInner, bl, fabricPattern, 6, true);

          // Draw Right Drape
          drawDrapePanel(ctx, rightTopInner, tr, br, rightBotInner, fabricPattern, 6, false);

          // Top Curtain Rod & Finials
          drawCurtainRod(ctx, tl, tr);
        }

        // ==========================================
        // TYPE B: SHEERS (Full Window Translucent Wave)
        // ==========================================
        else if (category === "sheers") {
          ctx.save();
          ctx.globalAlpha = Math.min(0.65, opacity * 0.7);

          // Draw full sheer panel
          ctx.beginPath();
          ctx.moveTo(tl.x, tl.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.lineTo(br.x, br.y);
          ctx.lineTo(bl.x, bl.y);
          ctx.closePath();

          if (fabricPattern) {
            ctx.fillStyle = fabricPattern;
          } else {
            ctx.fillStyle = "rgba(250, 250, 252, 0.85)";
          }
          ctx.fill();

          // Soft vertical wave folds across sheer
          const numWaves = 12;
          for (let i = 0; i <= numWaves; i++) {
            const frac = i / numWaves;
            const topPt = { x: tl.x + (tr.x - tl.x) * frac, y: tl.y + (tr.y - tl.y) * frac };
            const botPt = { x: bl.x + (br.x - bl.x) * frac, y: bl.y + (br.y - bl.y) * frac };

            ctx.beginPath();
            ctx.moveTo(topPt.x, topPt.y);
            ctx.lineTo(botPt.x, botPt.y);
            ctx.strokeStyle = i % 2 === 0 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.12)";
            ctx.lineWidth = windowWidth / (numWaves * 2.2);
            ctx.stroke();
          }

          ctx.restore();
          drawCurtainRod(ctx, tl, tr);
        }

        // ==========================================
        // TYPE C: BLINDS & ROLLERS
        // ==========================================
        else if (category === "rollers") {
          const dropRatio = 0.75; // Blind is lowered 75%
          const blindBotLeft = { x: bl.x + (tl.x - bl.x) * (1 - dropRatio), y: bl.y + (tl.y - bl.y) * (1 - dropRatio) };
          const blindBotRight = { x: br.x + (tr.x - br.x) * (1 - dropRatio), y: br.y + (tr.y - br.y) * (1 - dropRatio) };

          ctx.beginPath();
          ctx.moveTo(tl.x, tl.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.lineTo(blindBotRight.x, blindBotRight.y);
          ctx.lineTo(blindBotLeft.x, blindBotLeft.y);
          ctx.closePath();

          if (fabricPattern) {
            ctx.fillStyle = fabricPattern;
          } else {
            ctx.fillStyle = "#333b3d";
          }
          ctx.fill();

          // Horizontal blind slats / folds
          const slats = 14;
          for (let s = 1; s <= slats; s++) {
            const sf = s / slats;
            const sL = { x: tl.x + (blindBotLeft.x - tl.x) * sf, y: tl.y + (blindBotLeft.y - tl.y) * sf };
            const sR = { x: tr.x + (blindBotRight.x - tr.x) * sf, y: tr.y + (blindBotRight.y - tr.y) * sf };

            ctx.beginPath();
            ctx.moveTo(sL.x, sL.y);
            ctx.lineTo(sR.x, sR.y);
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Bottom Weight Bar
          ctx.beginPath();
          ctx.moveTo(blindBotLeft.x, blindBotLeft.y);
          ctx.lineTo(blindBotRight.x, blindBotRight.y);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 6;
          ctx.stroke();

          // Top Roller Cassette
          ctx.beginPath();
          ctx.moveTo(tl.x - 10, tl.y);
          ctx.lineTo(tr.x + 10, tr.y);
          ctx.strokeStyle = "#1a1a1a";
          ctx.lineWidth = 10;
          ctx.stroke();
        }

        ctx.restore();
        animId = requestAnimationFrame(render);
      };

      render();

      return () => {
        cancelAnimationFrame(animId);
      };
    }, [videoElement, corners, opacity, category, textureLoaded]);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 object-cover"
      />
    );
  }
);

/**
 * Helper to draw realistic pleated drape panels with fabric texture and 3D shadow curves
 */
function drawDrapePanel(
  ctx: CanvasRenderingContext2D,
  tl: Point2D,
  tr: Point2D,
  br: Point2D,
  bl: Point2D,
  fabricPattern: CanvasPattern | null,
  pleats: number = 6,
  isLeft: boolean = true
) {
  ctx.save();

  // 1. Panel Base Shape
  ctx.beginPath();
  ctx.moveTo(tl.x, tl.y);
  ctx.lineTo(tr.x, tr.y);
  ctx.lineTo(br.x, br.y);

  // Wavy rippled bottom hem
  const botDx = br.x - bl.x;
  const botDy = br.y - bl.y;
  for (let p = pleats; p >= 0; p--) {
    const frac = p / pleats;
    const px = bl.x + botDx * frac;
    const wave = (p % 2 === 0 ? 6 : -4);
    const py = bl.y + botDy * frac + wave;
    ctx.lineTo(px, py);
  }

  ctx.lineTo(bl.x, bl.y);
  ctx.closePath();

  // Fill Fabric Texture (or rich velvet/linen color fallback)
  if (fabricPattern) {
    ctx.fillStyle = fabricPattern;
    ctx.fill();
  } else {
    ctx.fillStyle = isLeft ? "#1e3a40" : "#224249";
    ctx.fill();
  }

  // 2. 3D Accordion Pleat Folds & Highlights
  const panelWidth = Math.hypot(tr.x - tl.x, tr.y - tl.y);
  const pleatWidth = panelWidth / pleats;

  for (let i = 0; i < pleats; i++) {
    const f0 = i / pleats;
    const f1 = (i + 1) / pleats;

    const pTop0 = { x: tl.x + (tr.x - tl.x) * f0, y: tl.y + (tr.y - tl.y) * f0 };
    const pTop1 = { x: tl.x + (tr.x - tl.x) * f1, y: tl.y + (tr.y - tl.y) * f1 };
    const pBot0 = { x: bl.x + (br.x - bl.x) * f0, y: bl.y + (br.y - bl.y) * f0 };
    const pBot1 = { x: bl.x + (br.x - bl.x) * f1, y: bl.y + (br.y - bl.y) * f1 };

    // Linear gradient for 3D fold
    const grad = ctx.createLinearGradient(pTop0.x, pTop0.y, pTop1.x, pTop1.y);
    if (i % 2 === 0) {
      grad.addColorStop(0, "rgba(255, 255, 255, 0.22)"); // Highlight peak
      grad.addColorStop(1, "rgba(0, 0, 0, 0.45)"); // Deep crease shadow
    } else {
      grad.addColorStop(0, "rgba(0, 0, 0, 0.45)"); // Deep crease shadow
      grad.addColorStop(1, "rgba(255, 255, 255, 0.15)"); // Soft return
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pTop0.x, pTop0.y);
    ctx.lineTo(pTop1.x, pTop1.y);
    ctx.lineTo(pBot1.x, pBot1.y);
    ctx.lineTo(pBot0.x, pBot0.y);
    ctx.closePath();
    ctx.fill();
  }

  // Outer border & shadow
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

/**
 * Helper to draw a sleek modern curtain rod with finials
 */
function drawCurtainRod(ctx: CanvasRenderingContext2D, tl: Point2D, tr: Point2D) {
  ctx.save();

  const dx = tr.x - tl.x;
  const dy = tr.y - tl.y;
  const len = Math.hypot(dx, dy);
  if (len < 10) {
    ctx.restore();
    return;
  }

  const ux = dx / len;
  const uy = dy / len;
  const extend = 24;

  const startX = tl.x - ux * extend;
  const startY = tl.y - uy * extend;
  const endX = tr.x + ux * extend;
  const endY = tr.y + uy * extend;

  // Main Rod
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "#1b1b1b";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.stroke();

  // Highlight on rod
  ctx.beginPath();
  ctx.moveTo(startX, startY - 1);
  ctx.lineTo(endX, endY - 1);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Finial end caps
  ctx.fillStyle = "#d3c518";
  ctx.beginPath();
  ctx.arc(startX, startY, 6, 0, Math.PI * 2);
  ctx.arc(endX, endY, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default CurtainArRenderer;
