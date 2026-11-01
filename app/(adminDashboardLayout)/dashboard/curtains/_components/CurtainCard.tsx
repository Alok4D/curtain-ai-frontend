"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2 } from "lucide-react";
import { ICurtain } from "@/lib/feature/curtain/curtainApi";

interface CurtainCardProps {
  fabric: ICurtain;
  onDelete: (fabric: ICurtain) => void;
}

export default function CurtainCard({ fabric, onDelete }: CurtainCardProps) {
  const rawUrl =
    (fabric.images && fabric.images.length > 0 && fabric.images[0]) ||
    fabric.display_image_url ||
    fabric.image_url ||
    "";
  const imageUrl = typeof rawUrl === "string" && rawUrl.trim() !== "" ? rawUrl.trim() : null;
  const fabricId = fabric.id || fabric._id;

  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-none hover:border-gray-400 transition-colors group flex flex-col justify-between font-['Urbanist',sans-serif]">
      {/* Image Preview with Category & Badges */}
      <Link
        href={`/dashboard/curtains/${fabricId}`}
        className="relative aspect-square bg-[#F7F8F5] overflow-hidden block border-b border-gray-200"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={fabric.name || "Curtain fabric"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={imageUrl.startsWith("data:") || imageUrl.includes("cloudinary.com")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image available
          </div>
        )}

        {/* Top Badges (Category & Status) */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          <span className="bg-[#004642] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-none">
            {fabric.category}
          </span>
          {fabric.opacity && (
            <span className="bg-white/90 backdrop-blur-xs text-gray-800 border border-gray-200 text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded-none">
              {fabric.opacity}
            </span>
          )}
        </div>

        {/* Active / Inactive Tag */}
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 border ${
              fabric.isActive !== false
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-gray-100 text-gray-500 border-gray-300"
            }`}
          >
            {fabric.isActive !== false ? "Active" : "Draft"}
          </span>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/dashboard/curtains/${fabricId}`}
              className="font-bold text-sm text-gray-900 truncate hover:text-[#004642] transition-colors block flex-1"
              title={fabric.name}
            >
              {fabric.name}
            </Link>
          </div>

          <p className="text-[11px] text-gray-500 mt-1 truncate" title={fabric.fabric || fabric.material}>
            {fabric.fabric || fabric.material || "Custom Tailored Fabric"}
            {fabric.pattern ? ` · ${fabric.pattern}` : ""}
          </p>

          {/* Color & Room Badges */}
          <div className="flex flex-wrap items-center gap-1 mt-2.5">
            {fabric.colors && fabric.colors.length > 0 && (
              fabric.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[10px] font-medium bg-gray-100 text-gray-700 px-1.5 py-0.5 border border-gray-200 capitalize"
                >
                  {col}
                </span>
              ))
            )}
            {fabric.suitableRooms && fabric.suitableRooms.length > 0 && (
              <span className="text-[10px] text-gray-400 font-medium ml-1">
                +{fabric.suitableRooms.length} rooms
              </span>
            )}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          {/* Stock Status Indicator */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
              fabric.inStock !== false ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-none ${
                fabric.inStock !== false ? "bg-emerald-600" : "bg-amber-600"
              }`}
            />
            <span>{fabric.inStock !== false ? "In Stock" : "Out of Stock"}</span>
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Edit Button */}
            <Link
              href={`/dashboard/curtains/update-curtain?id=${fabricId}`}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-none transition-colors cursor-pointer"
              title="Edit Fabric"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => onDelete(fabric)}
              className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-none transition-colors cursor-pointer"
              title="Delete Fabric"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
