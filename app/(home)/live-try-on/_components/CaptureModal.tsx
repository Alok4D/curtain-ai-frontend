"use client";

import Image from "next/image";
import { Download, X, Calendar, RefreshCw } from "lucide-react";

interface CaptureModalProps {
  imageUrl: string;
  onClose: () => void;
  curtainName?: string;
}

export default function CaptureModal({
  imageUrl,
  onClose,
  curtainName,
}: CaptureModalProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `curtain-ai-room-preview-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-neutral-950/80">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              Room Snapshot Saved!
            </h3>
            {curtainName && (
              <p className="text-xs text-[#d3c518] mt-0.5">
                Previewing: {curtainName}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshot Image Preview */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video bg-black overflow-hidden flex items-center justify-center p-2">
          <img
            src={imageUrl}
            alt="Captured room try-on"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Another Look</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-white text-[#004642] hover:bg-neutral-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Image</span>
            </button>

            {/* Book Visit Button */}
            <a
              href="https://wa.me/?text=Hi%20Curtain%20AI!%20I%20just%20previewed%20a%20curtain%20on%20my%20window%20and%20would%20like%20to%20book%20a%20free%20home%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#004642] text-white hover:bg-[#003835] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/20 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#d3c518]" />
              <span>Book Free Visit</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

