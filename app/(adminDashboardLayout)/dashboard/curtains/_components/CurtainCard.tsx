"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2, Sparkles } from "lucide-react";
import { ICurtain } from "@/lib/feature/curtain/curtainApi";

interface CurtainCardProps {
  fabric: ICurtain;
  onDelete: (fabric: ICurtain) => void;
}

export default function CurtainCard({ fabric, onDelete }: CurtainCardProps) {
  const imageUrl = fabric.display_image_url || fabric.image_url;
  const fabricId = fabric.id || fabric._id;

  return (
    <div className="bg-white rounded-none border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between font-['Urbanist',sans-serif]">
      {/* Image Preview with Category & Stock Status Badges */}
      <Link
        href={`/dashboard/curtains/${fabricId}`}
        className="relative aspect-square bg-[#F7F8F5] overflow-hidden block"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={fabric.name}
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

     
     
      </Link>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/dashboard/curtains/${fabricId}`}
              className="font-bold text-sm text-gray-900 truncate flex-1 hover:text-[#004642] transition-colors"
              title={fabric.name}
            >
              {fabric.name}
            </Link>

            
          <div className="flex items-center gap-1">
            {/* Dedicated Page Link for Edit */}
            <Link
              href={`/dashboard/curtains/update-curtain?id=${fabricId}`}
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Fabric on Dedicated Page"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Link>

            {/* Delete Modal Trigger */}
            <button
              type="button"
              onClick={() => onDelete(fabric)}
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Remove Fabric from Catalog"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        
          </div>

          <p className="text-[11px] text-gray-500 mt-1 truncate" title={fabric.material}>
            {fabric.material || "Custom Tailored Drape"}
          </p>
        </div>

     
      </div>
    </div>
  );
}
