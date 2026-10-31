"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface RecentAiPreviewsProps {
  previews?: Array<any>;
}

export const RecentAiPreviews = ({ previews }: RecentAiPreviewsProps) => {
  // Default fallback showcase previews if no DB previews exist yet
  const fallbackPreviews = [
    {
      id: 1,
      client: "Sarah Al-Maktoum",
      area: "Palm Jumeirah",
      fabric: "Emerald Velvet",
      category: "Curtains",
      time: "12 mins ago",
      fittedImage:
        "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
    },
    {
      id: 2,
      client: "David Harrison",
      area: "Dubai Marina",
      fabric: "Blue Linen Drape",
      category: "Curtains",
      time: "45 mins ago",
      fittedImage:
        "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
    },
    {
      id: 3,
      client: "Fatima Al-Zahra",
      area: "Downtown Dubai",
      fabric: "Voile Sheer Luxe",
      category: "Sheers",
      time: "2 hours ago",
      fittedImage:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      client: "Michael Vance",
      area: "Arabian Ranches",
      fabric: "Thermal Roller Blind",
      category: "Rollers",
      time: "3 hours ago",
      fittedImage:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const itemsToDisplay = previews && previews.length > 0 ? previews : fallbackPreviews;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs font-['Urbanist',sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#004642] tracking-tight">
              Recent AI Room Previews
            </h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live Engine
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Photorealistic curtains visualized on Dubai windows &amp; living rooms
          </p>
        </div>
        <Link
          href="/generate-image"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004642] hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#004642]" />
          <span>Launch AI Visualizer &rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itemsToDisplay.slice(0, 4).map((preview, index) => {
          const imageSrc =
            preview.fittedImage ||
            preview.roomImage ||
            "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg";
          const fabricTitle = preview.fabricName || preview.fabric || "Custom Linen";
          const clientName = preview.userId?.name || preview.client || "Studio Client";
          const areaOrEmail = preview.area || preview.userId?.email || "Dubai Studio";
          const category = preview.category || "Curtains";

          return (
            <div
              key={preview._id || preview.id || index}
              className="group border border-gray-100 bg-gray-50/50 rounded-xl p-3 hover:bg-white hover:border-[#004642]/30 hover:shadow-md transition-all duration-200"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-3 shadow-inner">
                <Image
                  src={imageSrc}
                  alt={fabricTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized={imageSrc.startsWith("data:") || imageSrc.includes("cloudinary.com")}
                />
                <span className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                  {category}
                </span>
                <span className="absolute bottom-2 right-2 bg-[#004642]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {preview.time || "Recent"}
                </span>
              </div>

              {/* Fabric & Client Details */}
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-gray-800 truncate" title={fabricTitle}>
                  {fabricTitle}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {clientName} &bull;{" "}
                  <span className="text-[#004642] font-semibold">{areaOrEmail}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

