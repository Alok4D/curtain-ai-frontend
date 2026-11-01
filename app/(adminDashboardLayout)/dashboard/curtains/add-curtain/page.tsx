"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, ChevronDown, ArrowLeft, Loader2, CheckCircle2, Loader } from "lucide-react";
import { toast } from "sonner";
import {
  TCurtainCategory,
  useCreateCurtainMutation,
} from "@/lib/feature/curtain/curtainApi";

export default function AddCurtainForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createCurtain, { isLoading }] = useCreateCurtainMutation();

  const [curtainName, setCurtainName] = useState("");
  const [category, setCategory] = useState<TCurtainCategory>("curtains");
  const [fabricStyle, setFabricStyle] = useState("Premium Belgian Linen");
  const [price, setPrice] = useState<number>(180);
  const [inStock, setInStock] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string>("");

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

    if (!curtainName.trim()) {
      toast.error("Please provide a curtain name.");
      return;
    }

    if (!imagePreview) {
      toast.error("Please upload a curtain photo.");
      return;
    }

    const toastId = toast.loading("Adding curtain to catalog...");

    try {
      const res = await createCurtain({
        name: curtainName.trim(),
        category,
        material: fabricStyle.trim(),
        price: Number(price) || 180,
        inStock,
        display_image_url: imagePreview,
        image_url: imagePreview,
      }).unwrap();

      toast.success(res?.message || "Curtain added successfully!", { id: toastId });
      router.push("/dashboard/curtains");
    } catch (err: any) {
      console.error("Add curtain error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to add curtain.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="font-sans antialiased text-[#2D312E]">
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
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight">
              Add curtain
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#737874]">
              Upload a curtain photo, choose the category, and add fabric details before saving to the catalog.
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

            {/* Drag & Drop Area */}
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

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />

            {/* Browse photos button */}
            <button
              type="button"
              onClick={handleBrowseClick}
              className="w-full py-2.5 px-4 bg-[#3E4A3E] hover:bg-[#343F34] text-white text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Browse photos</span>
            </button>

            {/* Preview Box Card */}
            {imagePreview && imagePreview.trim() !== "" && (
              <div className="p-3.5 rounded-xl border border-[#ECEAE4] bg-[#FBF9F5] space-y-2.5 animate-in fade-in duration-150">
                <span className="block text-[11px] font-medium text-[#6B716C]">
                  Live Preview
                </span>
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-neutral-200">
                  <Image
                    src={imagePreview}
                    alt="Curtain texture preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p className="text-[11px] leading-relaxed text-[#737874]">
                  Photo ready for AI visualizer and customer studio catalog.
                </p>
              </div>
            )}
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
                  placeholder=""
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
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3E4A3E] hover:bg-[#343F34] disabled:opacity-60 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving to catalog...</span>
                  </>
                ) : (
                  <span>Save curtain</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
