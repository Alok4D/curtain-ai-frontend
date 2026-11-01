"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Tag,
  Layers,
  Calendar,
  Share2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Package,
  Home,
  Palette,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetCurtainByIdQuery,
  useUpdateCurtainMutation,
  ICurtain,
} from "@/lib/feature/curtain/curtainApi";

// Reuse modular delete modal
import DeleteCurtainModal from "../_components/DeleteCurtainModal";

// Skeleton loader matching single curtain page layout
function SingleCurtainSkeleton() {
  return (
    <div className="space-y-6 animate-pulse font-['Urbanist',sans-serif]">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-56 bg-gray-200" />

      {/* Header Skeleton */}
      <div className="bg-white p-6 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-200" />
          <div className="h-8 w-64 bg-gray-200" />
          <div className="h-4 w-44 bg-gray-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200" />
          <div className="h-10 w-28 bg-gray-200" />
        </div>
      </div>

      {/* 2-Column Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white p-6 border border-gray-200 space-y-4">
          <div className="aspect-square bg-gray-200 w-full" />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 border border-gray-200 space-y-4 h-64" />
        </div>
      </div>
    </div>
  );
}

export default function SingleCurtainPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: response, isLoading, isError, refetch } = useGetCurtainByIdQuery(id);
  const [updateCurtain, { isLoading: isUpdatingStock }] = useUpdateCurtainMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const curtain: ICurtain | undefined = response?.data;

  // Toggle inStock status quickly
  const handleToggleStock = async () => {
    if (!curtain) return;
    const newStock = !curtain.inStock;
    const toastId = toast.loading(newStock ? "Marking as in stock..." : "Marking as out of stock...");
    try {
      await updateCurtain({
        id: curtain._id || curtain.id || "",
        body: { inStock: newStock },
      }).unwrap();
      toast.success(newStock ? "Fabric is now marked In Stock" : "Fabric is now marked Out of Stock", {
        id: toastId,
      });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update stock status", { id: toastId });
    }
  };

  // Toggle isActive status
  const handleToggleActive = async () => {
    if (!curtain) return;
    const newActive = curtain.isActive === false ? true : false;
    const toastId = toast.loading(newActive ? "Activating product..." : "Deactivating product...");
    try {
      await updateCurtain({
        id: curtain._id || curtain.id || "",
        body: { isActive: newActive },
      }).unwrap();
      toast.success(newActive ? "Product is now Active" : "Product is now Draft/Inactive", {
        id: toastId,
      });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update active status", { id: toastId });
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Page link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <SingleCurtainSkeleton />;
  }

  if (isError || !curtain) {
    return (
      <div className="bg-white p-12 text-center border border-gray-200 shadow-none max-w-lg mx-auto font-['Urbanist',sans-serif] mt-10">
        <div className="w-12 h-12 bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Curtain Fabric Not Found</h2>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          The requested fabric could not be found or may have been deleted from the catalog.
        </p>
        <Link
          href="/dashboard/curtains"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-[#004642] text-white text-xs font-semibold hover:bg-[#003431] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  // Collect all images
  const allImages = (curtain.images && curtain.images.length > 0)
    ? curtain.images
    : [curtain.display_image_url || curtain.image_url || ""];
  const currentImage = allImages[selectedImageIndex] || allImages[0] || "";

  return (
    <div className="space-y-6 font-['Urbanist',sans-serif] text-[#2D312E]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link
          href="/dashboard"
          className="hover:text-[#004642] transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href="/dashboard/curtains"
          className="hover:text-[#004642] transition-colors"
        >
          Curtains
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800 truncate max-w-[200px]">
          {curtain.name}
        </span>
      </nav>

      {/* Top Header Card */}
      <div className="bg-white p-6 border border-gray-200 shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#004642] px-2.5 py-0.5 capitalize">
              {curtain.category}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 border ${
                curtain.isActive !== false
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {curtain.isActive !== false ? "Active" : "Draft / Inactive"}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 border ${
                curtain.inStock !== false
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}
            >
              {curtain.inStock !== false ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight mt-2">
            {curtain.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {curtain.fabric || curtain.material || "Custom Tailored Fabric"} · {curtain.pattern || "plain"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
            title="Share Fabric Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <Link
            href={`/dashboard/curtains/update-curtain?id=${curtain.id || curtain._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#004642]" />
            <span>Edit Product</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-600 border border-red-200 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image & AI Visualizer Quick Action */}
        <div className="lg:col-span-5 space-y-6">
          {/* Large Fabric Image Display */}
          <div className="bg-white p-5 border border-gray-200">
            <div className="relative aspect-square overflow-hidden bg-gray-100 border border-gray-100">
              {currentImage && currentImage.trim() !== "" ? (
                <Image
                  src={currentImage.trim()}
                  alt={curtain?.name || "Curtain fabric"}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={currentImage.startsWith("data:") || currentImage.includes("cloudinary.com")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No image available
                </div>
              )}
            </div>

            {/* Gallery Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 h-14 border shrink-0 overflow-hidden ${
                      selectedImageIndex === idx ? "border-[#004642] ring-2 ring-[#004642]/30" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={img.startsWith("data:") || img.includes("cloudinary.com")}
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                High-Resolution Asset
              </span>
              {currentImage && (
                <a
                  href={currentImage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#004642] hover:underline font-semibold"
                >
                  <span>View Full Size</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* AI Visualizer Promo Card */}
          <div className="bg-[#004642] text-white p-6 border border-[#003835]">
            <div className="w-9 h-9 bg-white/10 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#a4df3b]" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Test in AI Room Visualizer
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed mt-1">
              Preview this fabric with {curtain.opacity || "semi-sheer"} opacity on customer room photos in ~20 seconds.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/generate-image"
                className="inline-flex items-center gap-2 bg-[#a4df3b] hover:bg-[#92cb32] text-[#004642] font-bold text-xs px-4 py-2 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Visualizer</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Specifications & Studio Management */}
        <div className="lg:col-span-7 space-y-6">
          {/* Fabric Specifications */}
          <div className="bg-white p-6 sm:p-7 border border-gray-200 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#004642] tracking-tight">
                Product Specifications
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete model attributes used for AI rendering, room matching, and catalog filters.
              </p>
            </div>

            {/* Spec Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Category
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.category}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  {curtain.category === "curtains"
                    ? "Full drape with header tape"
                    : curtain.category === "sheers"
                    ? "Daytime light-filtering sheer"
                    : "Precision roller blackout system"}
                </span>
              </div>

              {/* Fabric & Material */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Fabric Type
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.fabric || "linen"}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  {curtain.material || "100% Premium Belgian Linen"}
                </span>
              </div>

              {/* Pattern */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Pattern
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.pattern || "plain"}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  Design weave pattern
                </span>
              </div>

              {/* Opacity */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Opacity
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.opacity || "semi-sheer"}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  Privacy &amp; light-filtering grade
                </span>
              </div>

              {/* Texture */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Texture
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.texture || "natural linen"}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  Fabric visual appearance
                </span>
              </div>

              {/* Colors */}
              <div className="p-4 bg-gray-50 border border-gray-200 sm:col-span-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Color Matching Palette ({curtain.colors?.length || 0})
                </span>
                <div className="flex flex-wrap gap-2">
                  {curtain.colors && curtain.colors.length > 0 ? (
                    curtain.colors.map((c, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 text-xs font-semibold text-gray-800 capitalize"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#004642]" />
                        <span>{c}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">None defined</span>
                  )}
                </div>
              </div>

              {/* Styles */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Interior Style
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {curtain.style && curtain.style.length > 0 ? (
                    curtain.style.map((st, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-white border border-gray-300 text-gray-800 px-2.5 py-0.5 capitalize"
                      >
                        {st}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">modern</span>
                  )}
                </div>
              </div>

              {/* Suitable Rooms */}
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Suitable Rooms
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {curtain.suitableRooms && curtain.suitableRooms.length > 0 ? (
                    curtain.suitableRooms.map((rm, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold bg-white border border-gray-300 text-gray-800 px-2.5 py-0.5 capitalize flex items-center gap-1"
                      >
                        <Home className="w-3 h-3 text-[#004642]" />
                        <span>{rm.replace("-", " ")}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">living room, bedroom</span>
                  )}
                </div>
              </div>

              {/* Quick Status Toggles */}
              <div className="p-4 bg-gray-50 border border-gray-200 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Product Availability &amp; State
                  </span>
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="text-xs font-bold text-gray-800">
                      Visibility: {curtain.isActive !== false ? "Active (Catalog & Visualizer)" : "Draft (Hidden)"}
                    </span>
                    <span className="text-xs font-bold text-gray-800">
                      Stock: {curtain.inStock !== false ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleActive}
                    className="px-3 py-1.5 text-xs font-bold border border-gray-300 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Toggle Active State
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleStock}
                    disabled={isUpdatingStock}
                    className="px-3 py-1.5 text-xs font-bold border border-gray-300 bg-white hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Toggle Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteCurtainModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        fabric={curtain}
        onSuccess={() => {
          setIsDeleteModalOpen(false);
          router.push("/dashboard/curtains");
        }}
      />
    </div>
  );
}
