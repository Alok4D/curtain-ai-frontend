"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Upload,
  ChevronDown,
  ArrowLeft,
  Loader2,
  Trash2,
  Layers,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  TCurtainCategory,
  useGetCurtainByIdQuery,
  useUpdateCurtainMutation,
  useGetAllCurtainsQuery,
} from "@/lib/feature/curtain/curtainApi";

function UpdateCurtainForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries & Mutations
  const { data: curtainResponse, isLoading: isFetchingCurtain } = useGetCurtainByIdQuery(id || "", {
    skip: !id,
  });
  const { data: allCurtainsData } = useGetAllCurtainsQuery(undefined, { skip: Boolean(id) });
  const [updateCurtain, { isLoading: isUpdating }] = useUpdateCurtainMutation();

  const curtain = curtainResponse?.data;

  // Form states
  const [curtainName, setCurtainName] = useState("");
  const [category, setCategory] = useState<TCurtainCategory>("curtains");
  const [fabricStyle, setFabricStyle] = useState("");
  const [price, setPrice] = useState<number>(180);
  const [inStock, setInStock] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Sync with fetched curtain data
  useEffect(() => {
    if (curtain) {
      setCurtainName(curtain.name || "");
      setCategory(curtain.category || "curtains");
      setFabricStyle(curtain.material || "");
      setPrice(curtain.price || 180);
      setInStock(curtain.inStock !== false);
      const url = curtain.display_image_url || curtain.image_url || "";
      setImagePreview(url);
    }
  }, [curtain]);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error("Missing curtain ID to update.");
      return;
    }

    if (!curtainName.trim()) {
      toast.error("Please provide a curtain name.");
      return;
    }

    if (!imagePreview) {
      toast.error("Please upload or provide a curtain photo.");
      return;
    }

    const toastId = toast.loading("Updating curtain in catalog...");

    try {
      const res = await updateCurtain({
        id,
        body: {
          name: curtainName.trim(),
          category,
          material: fabricStyle.trim(),
          price: Number(price) || 180,
          inStock,
          display_image_url: imagePreview,
          image_url: imagePreview,
        },
      }).unwrap();

      toast.success(res?.message || "Curtain updated successfully!", { id: toastId });
      router.push("/dashboard/curtains");
    } catch (err: any) {
      console.error("Update curtain error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to update curtain.", {
        id: toastId,
      });
    }
  };

  if (!id) {
    return (
      <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center max-w-lg mx-auto shadow-xs">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900">No Fabric Selected</h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Please select a fabric from the curtain management catalog to edit.
        </p>
        <Link
          href="/dashboard/curtains"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#004642] text-white text-xs font-semibold rounded-xl hover:bg-[#003431] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Curtain Management</span>
        </Link>
      </div>
    );
  }

  if (isFetchingCurtain) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-10 w-72 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-200 h-80" />
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-gray-200 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      {/* Top Back Link */}
      <div className="mb-6">
        <Link
          href="/dashboard/curtains"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#525753] hover:text-[#1C201D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curtain Management</span>
        </Link>
      </div>

      {/* Top Header Bar */}
      <header className="flex items-start justify-between mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2.5 py-0.5 rounded-full capitalize">
            ID: {curtain?.id || id} &bull; Edit Catalog Entry
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight mt-2">
            Update curtain fabric
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#737874]">
            Modify fabric name, category, pricing, photo, or stock availability in the studio catalog.
          </p>
        </div>
      </header>

      {/* Form Body Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Curtain Photo Upload & Preview Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 sm:p-6 border border-[#ECEAE4] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1C201D]">
              Curtain photo
            </span>
            <span className="text-xs text-[#737874]">
              Required
            </span>
          </div>

          {/* Current / Live Preview */}
          {imagePreview && imagePreview.trim() !== "" ? (
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-[#ECEAE4] group">
              <Image
                src={imagePreview.trim()}
                alt={curtainName || "Curtain preview"}
                fill
                className="object-cover"
                unoptimized={imagePreview.startsWith("data:") || imagePreview.includes("cloudinary.com")}
              />
              <div
                onClick={handleBrowseClick}
                className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">Click to Replace Photo</span>
              </div>
            </div>
          ) : (
            <div
              onClick={handleBrowseClick}
              className="w-full aspect-[4/3] rounded-xl border border-dashed border-[#D2D6CF] bg-[#F7F8F5] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors hover:bg-[#F2F4F0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5E9E2] flex items-center justify-center text-[#556057] mb-3">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1C201D] mb-1">
                Drag and drop a curtain photo
              </p>
              <p className="text-[11px] text-[#7A807A]">
                JPG, PNG or WEBP · Max 10 MB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          {/* Change Photo Button */}
          <button
            type="button"
            onClick={handleBrowseClick}
            className="w-full py-2.5 px-4 bg-[#3E4A3E] hover:bg-[#343F34] text-white text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{imagePreview ? "Change curtain photo" : "Browse photo"}</span>
          </button>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#ECEAE4] shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Curtain name */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Curtain name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oatmeal Linen"
                value={curtainName}
                onChange={(e) => setCurtainName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TCurtainCategory)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D] pr-9 cursor-pointer"
                >
                  <option value="curtains">Curtains (Full Drape)</option>
                  <option value="sheers">Sheers (Light Filtering)</option>
                  <option value="rollers">Rollers (Blinds &amp; Blackout)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Fabric / style */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Fabric / style
              </label>
              <input
                type="text"
                placeholder="e.g. Premium Linen · Light filtering"
                value={fabricStyle}
                onChange={(e) => setFabricStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Price (AED / meter)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
              />
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#3E4A3E] rounded border-gray-300 accent-[#3E4A3E] cursor-pointer"
              />
              <span className="text-xs text-[#2D312E] font-semibold">
                In stock &amp; available for studio measurement &amp; installation
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#ECEAE4]">
            <Link href="/dashboard/curtains">
              <button
                type="button"
                className="px-5 py-2.5 bg-white border border-[#D5D8D3] text-[#2D312E] hover:bg-[#F7F8F6] text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3E4A3E] hover:bg-[#343F34] disabled:opacity-60 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating curtain...</span>
                </>
              ) : (
                <span>Save changes</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function UpdateCurtainPage() {
  return (
    <div className="font-sans antialiased text-[#2D312E]">
      <Suspense
        fallback={
          <div className="p-12 text-center text-xs text-gray-400">
            Loading curtain details...
          </div>
        }
      >
        <UpdateCurtainForm />
      </Suspense>
    </div>
  );
}
