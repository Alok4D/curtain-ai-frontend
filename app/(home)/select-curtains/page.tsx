"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Camera,
  AlertCircle,
  Sparkles,
  Loader2,
  Palette,
  ShieldCheck,
  RefreshCw,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import { normalizeImageToJpeg } from "@/lib/utils";
import curtainData from "@/data/curtains.json";
import {
  useGetAllCurtainsQuery,
  useRecommendCurtainsMutation,
  RecommendationResponseData,
  RecommendedCurtainItem,
} from "@/lib/feature/curtain/curtainApi";

interface CurtainItem {
  id?: number;
  _id?: string;
  name: string;
  image_url: string;
  display_image_url: string;
  category?: string;
  material?: string;
  matchScore?: number;
  matchPercentage?: number;
  specialistNote?: string;
}

type TabType = "specialist" | "curtains" | "sheers" | "rollers" | "all";

export default function SelectCurtainsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>("curtains");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recommendationData, setRecommendationData] =
    useState<RecommendationResponseData | null>(null);

  // RTK Query hooks
  const { data: curtainsResponse } = useGetAllCurtainsQuery();
  const [recommendCurtains, { isLoading: isRecommending }] =
    useRecommendCurtainsMutation();

  useEffect(() => {
    // Read uploaded room image and cached recommendation from sessionStorage
    const storedImg = sessionStorage.getItem("uploadedImageUrl");
    if (storedImg) {
      setUploadedImageUrl(storedImg);
    }

    const cachedRecommendation = sessionStorage.getItem(
      "curtainSpecialistRecommendation",
    );
    if (cachedRecommendation) {
      try {
        const parsed = JSON.parse(cachedRecommendation);
        if (parsed && parsed.recommendedCurtains) {
          setRecommendationData(parsed);
          setActiveTab("specialist");
        }
      } catch (e) {
        sessionStorage.removeItem("curtainSpecialistRecommendation");
      }
    }
  }, []);

  const handleRoomPhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    try {
      const dataUrl = await normalizeImageToJpeg(file);
      if (dataUrl) {
        sessionStorage.setItem("uploadedImageUrl", dataUrl);
        sessionStorage.setItem("roomImageId", Date.now().toString());
        // Invalidate previous recommendation for the new photo
        sessionStorage.removeItem("curtainSpecialistRecommendation");
        setRecommendationData(null);
        setActiveTab("curtains");
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
          sessionStorage.removeItem("curtainSpecialistRecommendation");
          setRecommendationData(null);
          setActiveTab("curtains");
          setUploadedImageUrl(dataUrl);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRequestRecommendation = async () => {
    if (!uploadedImageUrl) {
      setErrorMsg("Please upload your room photo first.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setErrorMsg(null);
      const res = await recommendCurtains({
        roomImage: uploadedImageUrl,
      }).unwrap();

      if (res.success && res.data) {
        setRecommendationData(res.data);
        setActiveTab("specialist");
        sessionStorage.setItem(
          "curtainSpecialistRecommendation",
          JSON.stringify(res.data),
        );
        toast.success("Interior Specialist curation ready for your room!");
      }
    } catch (err: any) {
      console.error("Specialist recommendation error:", err);
      const message =
        err?.data?.message ||
        err?.message ||
        "Could not generate interior recommendations. You can still pick fabrics from the catalog below.";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  const handleSelectCurtain = (curtain: CurtainItem | any) => {
    if (!uploadedImageUrl) {
      setErrorMsg(
        "Please upload a room photo first before choosing a curtain.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const rawSrc = curtain.display_image_url || curtain.image_url || "";
    const selectedImage =
      typeof rawSrc === "string" && rawSrc.trim() !== ""
        ? rawSrc.trim()
        : "/images/collection/curtains-drapes.png";

    sessionStorage.setItem(
      "selectedCurtain",
      (curtain.id || curtain._id || "").toString(),
    );
    sessionStorage.setItem("selectedCurtainName", curtain.name || "Curtain");
    sessionStorage.setItem("selectedCurtainImageUrl", selectedImage);

    router.push("/generate-image");
  };

  // Group curtains from API or fallback to static curtainData
  const allApiCurtains = curtainsResponse?.data || [];
  const fabrics =
    allApiCurtains.length > 0
      ? {
          curtains: allApiCurtains.filter(
            (c: any) => c.category === "curtains",
          ),
          sheers: allApiCurtains.filter((c: any) => c.category === "sheers"),
          rollers: allApiCurtains.filter((c: any) => c.category === "rollers"),
          all: allApiCurtains,
        }
      : {
          ...curtainData,
          all: [
            ...(curtainData.curtains || []),
            ...(curtainData.sheers || []),
            ...(curtainData.rollers || []),
          ],
        };

  // Determine current list to display
  let currentList: any[] = [];
  if (activeTab === "specialist" && recommendationData) {
    currentList = recommendationData.recommendedCurtains || [];
  } else if (activeTab === "all") {
    currentList = fabrics.all || [];
  } else if (
    activeTab === "curtains" ||
    activeTab === "sheers" ||
    activeTab === "rollers"
  ) {
    currentList = fabrics[activeTab] || [];
  } else {
    currentList = fabrics.curtains || [];
  }

  const tabDescriptions: Record<TabType, string> = {
    specialist:
      "Handpicked best curtains matching your room's wall colors, lighting, and decor.",
    curtains:
      "Full-length drapes in premium fabrics — from airy linens to rich blackouts.",
    sheers:
      "Light-filtering, semi-translucent sheers for soft natural light and subtle privacy.",
    rollers:
      "Sleek, minimalist roller blinds in textured and blackout options.",
    all: "Browse the complete collection of Curtain AI fabrics.",
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
          <nav
            aria-label="Progress"
            className="flex justify-center mb-6 md:mb-8"
          >
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
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          {/* Room Photo Large Preview & Single Action */}
          {uploadedImageUrl && uploadedImageUrl.trim() !== "" ? (
            <div className="mb-8 flex flex-col items-center">
              {/* Large Image Preview Card */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100 group">
                <Image
                  src={uploadedImageUrl}
                  alt="Your uploaded room"
                  fill
                  className="object-cover"
                  unoptimized={uploadedImageUrl.startsWith("data:")}
                  priority
                />
                {/* Change photo button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
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
                  onClick={handleRequestRecommendation}
                  disabled={isRecommending}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#004642] text-white font-semibold text-sm sm:text-base hover:bg-[#003835] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-75"
                >
                  {isRecommending ? (
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
          ) : (
            /* First, add a photo of your room prompt */
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8 max-w-2xl mx-auto text-center border border-gray-100">
              <h2 className="text-base md:text-lg font-semibold text-[#004642] mb-1">
                First, add a photo of your room
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                The AI needs your room photo to show curtains on your actual
                windows.
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

          {/* Sticky Category & Specialist Curation Tabs */}
          <div className="flex justify-center mb-2 w-full sticky top-20 md:top-24 z-40">
            <div
              className="flex flex-wrap justify-center bg-white rounded-xl shadow-md p-1 border border-gray-100 gap-1"
              role="tablist"
              aria-label="Curtain categories"
            >
              {recommendationData && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "specialist"}
                  onClick={() => setActiveTab("specialist")}
                  className={`flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "specialist"
                      ? "bg-[#004642] text-white shadow-sm"
                      : "text-emerald-900 bg-emerald-50 hover:bg-emerald-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    Best Curtains (
                    {recommendationData.recommendedCurtains?.length || 0})
                  </span>
                </button>
              )}

              {(["curtains", "sheers", "rollers", "all"] as TabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold capitalize transition-all cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#004642] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab === "all" ? "All Fabrics" : tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Category / Specialist Description */}
          <p className="text-center text-gray-500 text-xs md:text-sm mb-6 mt-3 max-w-xl mx-auto">
            {isRecommending
              ? "Analyzing your room palette & finding the best curtains..."
              : tabDescriptions[activeTab]}
          </p>

          {/* Curtains Product Grid / Skeleton Loader */}
          {isRecommending ? (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mb-10"
              aria-busy="true"
              aria-label="Loading best curtains"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border-2 border-gray-200 bg-white p-2.5 w-full animate-pulse"
                >
                  {/* Skeleton Image Area */}
                  <div className="relative aspect-square bg-gray-200 rounded-xl mb-2.5 overflow-hidden" />
                  {/* Skeleton Title Line */}
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto my-1" />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mb-10"
              role="tabpanel"
            >
              {currentList.map((curtain: any) => {
                const rawSrc =
                  curtain.display_image_url || curtain.image_url || "";
                const imageUrl =
                  typeof rawSrc === "string" && rawSrc.trim() !== ""
                    ? rawSrc.trim()
                    : "/images/collection/curtains-drapes.png";

                return (
                  <button
                    key={curtain._id || curtain.id}
                    type="button"
                    onClick={() => handleSelectCurtain(curtain)}
                    className="curtain-option group cursor-pointer rounded-2xl border-2 border-gray-200 bg-white p-2.5 w-full transition-all duration-200 hover:border-[#004642] hover:shadow-md text-left"
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
                          imageUrl.startsWith("data:") ||
                          imageUrl.includes("cloudinary.com")
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
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
