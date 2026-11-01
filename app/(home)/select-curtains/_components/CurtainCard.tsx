import React from "react";
import Image from "next/image";
import { CurtainItem } from "./types";

interface CurtainCardProps {
  curtain: CurtainItem | any;
  onSelect: () => void;
}

export const CurtainCard: React.FC<CurtainCardProps> = ({
  curtain,
  onSelect,
}) => {
  const rawSrc = curtain.display_image_url || curtain.image_url || "";
  const imageUrl =
    typeof rawSrc === "string" && rawSrc.trim() !== ""
      ? rawSrc.trim()
      : "/images/collection/curtains-drapes.png";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="curtain-option group cursor-pointer rounded-xl border-2 border-gray-200 bg-white p-2.5 w-full transition-all duration-200 hover:border-[#004642] hover:shadow-md text-left"
      aria-label={`Preview ${curtain.name || "curtain"} on your room`}
    >
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2.5">
        <Image
          src={imageUrl}
          alt={curtain.name || "Curtain preview"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={
            imageUrl.startsWith("data:") || imageUrl.includes("cloudinary.com")
          }
        />

        {/* Hover Slide-up Preview Bar */}
        <span className="absolute inset-x-0 bottom-0 bg-[#004642] text-white text-xs font-semibold py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          Preview on my room
        </span>
      </div>

      <span className="block font-medium text-sm text-center text-neutral-800 truncate">
        {curtain.name}
      </span>
    </button>
  );
};

