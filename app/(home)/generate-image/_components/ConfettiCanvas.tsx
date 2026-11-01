"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface ConfettiCanvasHandle {
  triggerConfetti: () => void;
}

export const ConfettiCanvas = forwardRef<ConfettiCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    triggerConfetti: () => {
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
          requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      requestAnimationFrame(render);
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
});

ConfettiCanvas.displayName = "ConfettiCanvas";

