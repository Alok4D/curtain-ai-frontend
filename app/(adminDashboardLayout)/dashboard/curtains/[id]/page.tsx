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
      <div className="h-4 w-56 bg-gray-200 rounded" />

      {/* Header Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-200 rounded-full" />
          <div className="h-8 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-44 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded-xl" />
          <div className="h-10 w-28 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* 2-Column Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Skeleton */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="aspect-square bg-gray-200 rounded-xl w-full" />
          <div className="h-20 bg-gray-100 rounded-xl w-full" />
        </div>

        {/* Right Column: Details Skeleton */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-100 rounded-xl" />
              <div className="h-16 bg-gray-100 rounded-xl" />
              <div className="h-16 bg-gray-100 rounded-xl" />
              <div className="h-16 bg-gray-100 rounded-xl" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs h-40" />
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

  const curtain: ICurtain | undefined = response?.data;

  // Toggle inStock status quickly
  const handleToggleStock = async () => {
    if (!curtain) return;
    const newStock = !curtain.inStock;
    const toastId = toast.loading(newStock ? "Marking as in stock..." : "Marking as out of stock...");
    try {
      await updateCurtain({
        id: curtain._id || curtain.id,
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
      <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 shadow-xs max-w-lg mx-auto font-['Urbanist',sans-serif] mt-10">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Curtain Fabric Not Found</h2>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          The requested fabric could not be found or may have been deleted from the catalog.
        </p>
        <Link
          href="/dashboard/curtains"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-[#004642] text-white text-xs font-semibold rounded-xl hover:bg-[#003431] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const imageUrl = curtain.display_image_url || curtain.image_url;

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
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2.5 py-0.5 rounded-full capitalize">
              {curtain.category}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                curtain.inStock !== false
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {curtain.inStock !== false ? "● In Stock" : "○ Out of Stock"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight mt-2">
            {curtain.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {curtain.material || "Custom Tailored Drape"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 transition-colors cursor-pointer"
            title="Share Fabric Link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <Link
            href={`/dashboard/curtains/update-curtain?id=${curtain.id || curtain._id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#004642]" />
            <span>Edit Fabric</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-600 border border-red-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
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
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
              {imageUrl && imageUrl.trim() !== "" ? (
                <Image
                  src={imageUrl.trim()}
                  alt={curtain?.name || "Curtain fabric"}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={imageUrl.startsWith("data:") || imageUrl.includes("cloudinary.com")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No image available
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                High-Resolution Swatch
              </span>
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#004642] hover:underline font-semibold"
              >
                <span>View Full Size</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* AI Visualizer Promo Card */}
          <div className="bg-gradient-to-br from-[#004642] to-[#033633] text-white rounded-2xl p-6 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#a4df3b]" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Test in AI Room Visualizer
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed mt-1">
              Preview this exact fabric on any customer window or Dubai apartment photo in seconds with realistic photorealistic folds.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/generate-image"
                className="inline-flex items-center gap-2 bg-[#a4df3b] hover:bg-[#92cb32] text-[#004642] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
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
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#004642] tracking-tight">
                Fabric Specifications
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed attributes used for catalog display and pricing calculations.
              </p>
            </div>

            {/* Spec Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/60">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                  Product Category
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 capitalize block">
                  {curtain.category}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  {curtain.category === "curtains"
                    ? "Full drape with header tape"
                    : curtain.category === "sheers"
                    ? "Daytime light-filtering voile"
                    : "Precision roller blackout cassette"}
                </span>
              </div>

              {/* Price */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/60">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                  Unit Price
                </span>
                <span className="text-lg font-bold text-[#004642] mt-1 block">
                  AED {curtain.price || 180}{" "}
                  <span className="text-xs font-normal text-gray-500">/ linear meter</span>
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  Includes bespoke tailoring
                </span>
              </div>

              {/* Material */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/60 sm:col-span-2">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                  Material &amp; Weave Composition
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 block">
                  {curtain.material || "100% Belgian Linen · Light-filtering"}
                </span>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  Suitable for living room expanses, bedrooms, and floor-to-ceiling balcony installations.
                </p>
              </div>

              {/* Stock Status & Fast Toggle */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/60 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                    Stock &amp; Availability
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {curtain.inStock !== false ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">
                          In Stock for Immediate Studio Measurement &amp; Tailoring
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-red-600">
                          Temporarily Out of Stock
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleStock}
                  disabled={isUpdatingStock}
                  className="px-3.5 py-1.5 border border-gray-300 hover:bg-white bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer self-start sm:self-center shadow-2xs"
                >
                  {curtain.inStock !== false ? "Mark Out of Stock" : "Mark In Stock"}
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              Catalog Record &amp; Tracking
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Fabric ID:</span>
                <span className="font-mono font-semibold text-gray-800">
                  {curtain.id || curtain._id}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Database Record ID:</span>
                <span className="font-mono text-gray-600 truncate max-w-[200px]">
                  {curtain._id || "Local ID"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Last Synced:</span>
                <span className="text-gray-800 font-medium">Just now (Live API)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal Component */}
      <DeleteCurtainModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          router.push("/dashboard/curtains");
        }}
        fabric={curtain}
      />
    </div>
  );
}
