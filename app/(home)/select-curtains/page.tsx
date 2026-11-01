"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { normalizeImageToJpeg } from "@/lib/utils";
import curtainData from "@/data/curtains.json";
import {
  useGetAllCurtainsQuery,
  useRecommendCurtainsMutation,
  RecommendationResponseData,
} from "@/lib/feature/curtain/curtainApi";
import {
  ProgressBar,
  RoomPhotoUploader,
  RoomPhotoPreview,
  CategoryTabs,
  CurtainGrid,
  TabType,
  CurtainItem,
} from "./_components";

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
        toast.success("Best matching curtains found for your room!");
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
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <ProgressBar
            onUploadClick={() => fileInputRef.current?.click()}
          />

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

          {/* Room Photo Large Preview & Single Action or First-time Uploader */}
          {uploadedImageUrl && uploadedImageUrl.trim() !== "" ? (
            <RoomPhotoPreview
              imageUrl={uploadedImageUrl}
              onChangePhoto={() => fileInputRef.current?.click()}
              onGetBestCurtains={handleRequestRecommendation}
              isLoading={isRecommending}
            />
          ) : (
            <RoomPhotoUploader
              onUploadClick={() => fileInputRef.current?.click()}
            />
          )}

          {/* Sticky Category & Recommendation Tabs */}
          <CategoryTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasRecommendations={Boolean(recommendationData)}
            recommendationsCount={
              recommendationData?.recommendedCurtains?.length || 0
            }
            description={
              isRecommending
                ? "Analyzing your room palette & finding the best curtains..."
                : tabDescriptions[activeTab]
            }
          />

          {/* Curtains Product Grid / Skeleton Loader */}
          <CurtainGrid
            curtains={currentList}
            isLoading={isRecommending}
            onSelectCurtain={handleSelectCurtain}
          />
        </div>
      </div>
    </main>
  );
}
