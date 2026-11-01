"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Camera, Download, AlertCircle } from "lucide-react";
import { normalizeImageToJpeg } from "@/lib/utils";
import curtainData from "@/data/curtains.json";
import { useGetAllCurtainsQuery } from "@/lib/feature/curtain/curtainApi";

interface CurtainItem {
  id: number;
  name: string;
  image_url: string;
  display_image_url: string;
}

type TabType = "curtains" | "sheers" | "rollers";

export default function SelectCurtainsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("curtains");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // RTK Query API Hook
  const { data: curtainsResponse } = useGetAllCurtainsQuery();

  useEffect(() => {
    // Read uploaded room image from sessionStorage
    const stored = sessionStorage.getItem("uploadedImageUrl");
    if (stored) {
      setUploadedImageUrl(stored);
    }
  }, []);

  const handleRoomPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    try {
      const dataUrl = await normalizeImageToJpeg(file);
      if (dataUrl) {
        sessionStorage.setItem("uploadedImageUrl", dataUrl);
        sessionStorage.setItem("roomImageId", Date.now().toString());
        setUploadedImageUrl(dataUrl);
        setErrorMsg(null);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          sessionStorage.setItem("uploadedImageUrl", dataUrl);
          sessionStorage.setItem("roomImageId", Date.now().toString());
          setUploadedImageUrl(dataUrl);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectCurtain = (curtain: CurtainItem | any) => {
    if (!uploadedImageUrl) {
      setErrorMsg("Please upload a room photo first before choosing a curtain.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    sessionStorage.setItem("selectedCurtain", (curtain.id || curtain._id || "").toString());
    sessionStorage.setItem("selectedCurtainName", curtain.name);
    sessionStorage.setItem(
      "selectedCurtainImageUrl",
      curtain.display_image_url || curtain.image_url
    );

    router.push("/generate-image");
  };

  // Group curtains from API or fallback to static curtainData
  const fabrics = curtainsResponse?.data && curtainsResponse.data.length > 0 ? {
    curtains: curtainsResponse.data.filter((c: any) => c.category === "curtains"),
    sheers: curtainsResponse.data.filter((c: any) => c.category === "sheers"),
    rollers: curtainsResponse.data.filter((c: any) => c.category === "rollers"),
  } : curtainData;

  const currentList: any[] = fabrics[activeTab] || [];

  const tabDescriptions: Record<TabType, string> = {
    curtains:
      "Full-length drapes in premium fabrics — from airy linens to rich blackouts.",
    sheers:
      "Light-filtering, semi-translucent sheers for soft natural light and subtle privacy.",
    rollers:
      "Sleek, minimalist roller blinds in textured and blackout options.",
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-16 font-['Urbanist',sans-serif]">
      {/* Hidden file input for uploading or changing room photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleRoomPhotoUpload}
        className="hidden"
      />

      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Progress Indicator */}
          <nav aria-label="Progress" className="flex justify-center mb-6 md:mb-8">
            <ol className="flex items-center gap-0">
              {/* Step 1: Upload your room (Done) */}
              <li className="flex items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                >
                  <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span className="text-[11px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
                    Upload your room
                  </span>
                </button>
              </li>

              {/* Connecting line 1 */}
              <li className="flex items-center">
                <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-[#004642]" />
                {/* Step 2: Pick a curtain (Active) */}
                <span
                  className="flex items-center gap-1.5 md:gap-2"
                  aria-current="step"
                >
                  <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-[#004642] text-white ring-4 ring-[#004642]/15">
                    2
                  </span>
                  <span className="text-[11px] md:text-sm font-medium text-[#004642] whitespace-nowrap">
                    Pick a curtain
                  </span>
                </span>
              </li>

              {/* Connecting line 2 */}
              <li className="flex items-center">
                <div className="w-6 md:w-14 h-px mx-1.5 md:mx-2 bg-gray-300" />
                {/* Step 3: See the AI preview (Pending) */}
                <span className="flex items-center gap-1.5 md:gap-2">
                  <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[11px] md:text-xs font-bold shrink-0 bg-gray-200 text-gray-500">
                    3
                  </span>
                  <span className="text-[11px] md:text-sm font-medium text-gray-400 whitespace-nowrap">
                    See the AI preview
                  </span>
                </span>
              </li>
            </ol>
          </nav>

          {/* Page Heading */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-[#004642]">
              Pick a curtain — tap any fabric to preview it
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              The AI will drape your choice straight onto your room photo.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center max-w-xl mx-auto flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          {/* Room Photo Banner (shows current photo thumbnail or prompt to upload) */}
          {uploadedImageUrl ? (
            <div className="flex items-center justify-center gap-3 mb-6 bg-white py-2 px-4 rounded-xl max-w-xs mx-auto border border-gray-200 shadow-2xs">
              <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={uploadedImageUrl}
                  alt="Your uploaded room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> Room photo ready
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#004642] underline hover:opacity-80 cursor-pointer"
                >
                  Use a different photo
                </button>
              </div>
            </div>
          ) : (
            /* First, add a photo of your room prompt */
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8 max-w-2xl mx-auto text-center border border-gray-100">
              <h2 className="text-base md:text-lg font-semibold text-[#004642] mb-1">
                First, add a photo of your room
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                The AI needs your room photo to show curtains on your actual windows.
              </p>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cta-button border-2 rounded-lg px-8 py-5 text-black cursor-pointer w-full relative overflow-hidden gradient-border-flow"
                  >
                    <div className="flex items-center gap-4 justify-center">
                      <Camera className="w-6 h-6 text-[#004642]" />
                      <div className="flex flex-col items-start text-left">
                        <span className="text-base font-semibold text-neutral-900 leading-tight">
                          Upload your room photo
                        </span>
                        <span className="text-xs text-neutral-600 font-normal">
                          Free AI preview in ~20 seconds
                        </span>
                      </div>
                    </div>
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    or drag & drop your image here
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Category Tabs */}
          <div className="flex justify-center mb-2 w-full sticky top-20 md:top-24 z-40">
            <div
              className="flex bg-white rounded-xl shadow-md p-1 w-full md:w-auto border border-gray-100"
              role="tablist"
              aria-label="Curtain categories"
            >
              {(["curtains", "sheers", "rollers"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-initial px-5 md:px-7 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#004642] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Category Description */}
          <p className="text-center text-gray-500 text-sm mb-6 mt-3 max-w-xl mx-auto">
            {tabDescriptions[activeTab]}
          </p>

          {/* Curtains Product Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mb-10"
            role="tabpanel"
          >
            {currentList.map((curtain: any) => (
              <button
                key={curtain._id || curtain.id}
                type="button"
                onClick={() => handleSelectCurtain(curtain)}
                className="curtain-option group cursor-pointer rounded-2xl border-2 border-gray-200 bg-white p-2.5 w-full transition-all duration-200 hover:border-[#004642] hover:shadow-md text-left"
                aria-label={`Preview ${curtain.name} on your room`}
              >
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2.5">
                  <Image
                    src={curtain.display_image_url || curtain.image_url}
                    alt={curtain.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={(curtain.display_image_url || curtain.image_url)?.startsWith("data:")}
                  />
                  {/* Hover Slide-up Preview Bar matching curtainz.ai */}
                  <span className="absolute inset-x-0 bottom-0 bg-[#004642] text-white text-xs font-semibold py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    Preview on my room
                  </span>
                </div>
                <span className="block font-medium text-sm text-center text-neutral-800 truncate">
                  {curtain.name}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
