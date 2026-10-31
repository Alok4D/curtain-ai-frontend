"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Sparkles, Camera } from "lucide-react";
import { toast } from "sonner";
import {
  ICurtain,
  TCurtainCategory,
  useCreateCurtainMutation,
  useUpdateCurtainMutation,
} from "@/lib/feature/curtain/curtainApi";

interface CurtainModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingFabric: ICurtain | null;
}

export default function CurtainModal({
  isOpen,
  onClose,
  editingFabric,
}: CurtainModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createCurtain, { isLoading: isCreating }] = useCreateCurtainMutation();
  const [updateCurtain, { isLoading: isUpdating }] = useUpdateCurtainMutation();

  const isSaving = isCreating || isUpdating;

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TCurtainCategory>("curtains");
  const [material, setMaterial] = useState("100% Belgian Linen");
  const [price, setPrice] = useState<number>(180);
  const [inStock, setInStock] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editingFabric) {
      setName(editingFabric.name || "");
      setCategory(editingFabric.category || "curtains");
      setMaterial(editingFabric.material || "100% Belgian Linen");
      setPrice(editingFabric.price || 180);
      setInStock(editingFabric.inStock !== false);
      const url = editingFabric.display_image_url || editingFabric.image_url || "";
      setImageUrl(url);
      setImagePreview(url);
    } else {
      setName("");
      setCategory("curtains");
      setMaterial("100% Premium Belgian Linen");
      setPrice(180);
      setInStock(true);
      const defaultSample =
        "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg";
      setImageUrl(defaultSample);
      setImagePreview(defaultSample);
    }
  }, [editingFabric, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload
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
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a fabric name.");
      return;
    }

    if (!imagePreview) {
      toast.error("Please provide or upload a fabric image.");
      return;
    }

    const payload: Partial<ICurtain> = {
      name: name.trim(),
      category,
      material: material.trim(),
      price: Number(price) || 180,
      inStock,
      display_image_url: imagePreview,
      image_url: imagePreview,
    };

    const toastId = toast.loading(
      editingFabric ? "Updating fabric..." : "Adding fabric to catalog..."
    );

    try {
      if (editingFabric) {
        const idToUpdate = editingFabric._id || editingFabric.id;
        const res = await updateCurtain({
          id: idToUpdate,
          body: payload,
        }).unwrap();
        toast.success(res.message || "Fabric updated successfully!", { id: toastId });
      } else {
        const res = await createCurtain(payload).unwrap();
        toast.success(res.message || "Fabric added to catalog!", { id: toastId });
      }
      onClose();
    } catch (err: any) {
      console.error("Save fabric error:", err);
      toast.error(
        err?.data?.message || err?.message || "Failed to save fabric.",
        { id: toastId }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-['Urbanist',sans-serif]">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2 py-0.5 rounded">
              {editingFabric ? "Update Fabric" : "New Fabric"}
            </span>
            <h3 className="text-xl font-bold text-[#004642] mt-1">
              {editingFabric ? `Edit: ${editingFabric.name}` : "Add Fabric to Catalog"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          {/* Photo Upload & Preview Section */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Fabric Photo
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />

            <div className="flex gap-4 items-center p-3 rounded-xl bg-gray-50 border border-gray-200/80">
              {imagePreview ? (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt="Fabric Preview"
                    fill
                    className="object-cover"
                    unoptimized={imagePreview.startsWith("data:") || imagePreview.includes("cloudinary.com")}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs shrink-0">
                  No Photo
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                </button>
                <p className="text-[11px] text-gray-500">
                  PNG, JPG, or WEBP up to 10MB. Or paste an image URL below.
                </p>
              </div>
            </div>

            {/* Direct Image URL input */}
            <div className="mt-2">
              <input
                type="text"
                placeholder="Or paste direct image URL (https://...)"
                value={imageUrl.startsWith("data:") ? "" : imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#004642] focus:bg-white"
              />
            </div>
          </div>

          {/* Fabric Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Fabric Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Emerald Velvet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-colors"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TCurtainCategory)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="curtains">Curtains (Full Drape)</option>
                <option value="sheers">Sheers (Light Filtering)</option>
                <option value="rollers">Rollers (Blinds &amp; Blackout)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price (AED / meter)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Material & Weave */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Material &amp; Weave Specification
            </label>
            <input
              type="text"
              placeholder="e.g. 100% Belgian Linen · Blackout Thermal Lining"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-colors"
            />
          </div>

          {/* In Stock Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#004642] rounded border-gray-300 accent-[#004642] cursor-pointer"
              />
              <span className="text-xs text-gray-700 font-semibold">
                Available in stock for Dubai studio installations
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#004642] hover:bg-[#003431] disabled:opacity-60 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingFabric ? "Save Changes" : "Add to Catalog"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

