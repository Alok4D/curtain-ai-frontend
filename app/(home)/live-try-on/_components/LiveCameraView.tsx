"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

interface LiveCameraViewProps {
  onVideoReady: (video: HTMLVideoElement) => void;
  facingMode: "environment" | "user";
  onToggleCamera: () => void;
  onUseFallbackImage?: () => void;
}

export default function LiveCameraView({
  onVideoReady,
  facingMode,
  onToggleCamera,
  onUseFallbackImage,
}: LiveCameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setCameraError(null);

    // Stop existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported on this browser.");
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().then(() => {
            setIsLoading(false);
            if (videoRef.current) {
              onVideoReady(videoRef.current);
            }
          });
        };
      }
    } catch (err: unknown) {
      console.error("Camera access error:", err);
      setIsLoading(false);
      const message =
        err instanceof Error
          ? err.message
          : "Could not access the camera. Please check permissions.";
      setCameraError(message);
    }
  }, [facingMode, onVideoReady]);

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Real-time Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Loading Spinner */}
      {isLoading && !cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 text-white">
          <div className="w-12 h-12 border-4 border-white/20 border-t-[#d3c518] rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold tracking-wide">
            Initializing Live Camera...
          </p>
          <span className="text-xs text-white/60 mt-1">
            Please allow camera permissions if prompted
          </span>
        </div>
      )}

      {/* Camera Error / Permission Denied Screen */}
      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/95 z-30 p-6 text-center text-white">
          <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">Camera Access Blocked</h3>
          <p className="text-sm text-neutral-300 max-w-sm mb-6 leading-relaxed">
            Please allow camera permissions in your browser address bar to use
            the Live Try-On feature on your room window.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={startCamera}
              className="px-5 py-2.5 bg-white text-[#004642] font-semibold text-sm rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Permission</span>
            </button>

            {onUseFallbackImage && (
              <button
                onClick={onUseFallbackImage}
                className="px-5 py-2.5 bg-[#004642] border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-[#003835] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#d3c518]" />
                <span>Use Sample Room Photo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

