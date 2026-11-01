import React from "react";
import Image from "next/image";
import { Camera, Sparkles, Loader2 } from "lucide-react";

interface RoomPhotoPreviewProps {
  imageUrl: string;
  onChangePhoto: () => void;
  onGetBestCurtains: () => void;
  isLoading: boolean;
}

export const RoomPhotoPreview: React.FC<RoomPhotoPreviewProps> = ({
  imageUrl,
  onChangePhoto,
  onGetBestCurtains,
  isLoading,
}) => {
  return (
    <div className="mb-8 flex flex-col items-center">
      {/* Large Image Preview Card */}
      <div className="relative w-full max-w-md sm:max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100 group">
        <Image
          src={imageUrl}
          alt="Your uploaded room"
          fill
          className="object-cover"
          unoptimized={imageUrl.startsWith("data:")}
          priority
        />
        {/* Change photo button */}
        <button
          type="button"
          onClick={onChangePhoto}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-xs transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Change photo</span>
        </button>
      </div>

      {/* Only One Button: 'Get Best Curtains' */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onGetBestCurtains}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#004642] text-white font-semibold text-sm sm:text-base hover:bg-[#003835] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Finding Best Curtains...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Get Best Curtains</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

