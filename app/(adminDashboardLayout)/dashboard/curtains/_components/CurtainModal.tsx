"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Sparkles, Check } from "lucide-react";
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

const OPACITY_OPTIONS = [
  { value: "sheer", label: "Sheer" },
  { value: "semi-sheer", label: "Semi-Sheer" },
  { value: "light-filtering", label: "Light Filtering" },
  { value: "room-darkening", label: "Room Darkening" },
  { value: "blackout", label: "100% Blackout" },
];

const ROOM_OPTIONS = [
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining-room", label: "Dining Room" },
  { id: "office", label: "Office" },
];

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
  const [inStock, setInStock] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [fabric, setFabric] = useState("linen");
  const [pattern, setPattern] = useState("plain");
  const [opacity, setOpacity] = useState("semi-sheer");
  const [texture, setTexture] = useState("natural linen");
  const [colorsText, setColorsText] = useState("beige, cream");
  const [stylesText, setStylesText] = useState("modern, minimalist");
  const [suitableRooms, setSuitableRooms] = useState<string[]>(["living-room", "bedroom"]);

  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editingFabric) {
      setName(editingFabric.name || "");
      setCategory(editingFabric.category || "curtains");
      setInStock(editingFabric.inStock !== false);
      setIsActive(editingFabric.isActive !== false);

      setFabric(editingFabric.fabric || editingFabric.material || "linen");
      setPattern(editingFabric.pattern || "plain");
      setOpacity(editingFabric.opacity || "semi-sheer");
      setTexture(editingFabric.texture || "natural linen");

      setColorsText(editingFabric.colors?.join(", ") || "beige, cream");
      setStylesText(editingFabric.style?.join(", ") || "modern, minimalist");
      setSuitableRooms(editingFabric.suitableRooms || ["living-room", "bedroom"]);

      const primary =
        (editingFabric.images && editingFabric.images[0]) ||
        editingFabric.display_image_url ||
        editingFabric.image_url ||
        "";
      setImagePreview(primary);
    } else {
      setName("");
      setCategory("curtains");
      setInStock(true);
      setIsActive(true);
      setFabric("linen");
      setPattern("plain");
      setOpacity("semi-sheer");
      setTexture("natural linen");
      setColorsText("beige, cream");
      setStylesText("modern, minimalist");
      setSuitableRooms(["living-room", "bedroom"]);

      const defaultSample =
        "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg";
      setImagePreview(defaultSample);
    }
  }, [editingFabric, isOpen]);

  if (!isOpen) return null;

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

  const toggleRoom = (roomId: string) => {
    if (suitableRooms.includes(roomId)) {
      setSuitableRooms(suitableRooms.filter((r) => r !== roomId));
    } else {
      setSuitableRooms([...suitableRooms, roomId]);
    }
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

    const parsedColors = colorsText
      .split(",")
      .map((c) => c.trim().toLowerCase())
      .filter(Boolean);

    const parsedStyles = stylesText
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const payload: Partial<ICurtain> = {
      name: name.trim(),
      category,
      colors: parsedColors.length > 0 ? parsedColors : ["beige", "cream"],
      fabric: fabric.trim() || "linen",
      pattern: pattern.trim() || "plain",
      style: parsedStyles.length > 0 ? parsedStyles : ["modern", "minimalist"],
      opacity,
      texture: texture.trim() || "natural linen",
      suitableRooms,
      images: [imagePreview],
      isActive,
      inStock,
      display_image_url: imagePreview,
      image_url: imagePreview,
      material: `${fabric} · ${texture}`,
    };

    const toastId = toast.loading(
      editingFabric ? "Updating fabric details..." : "Creating new curtain..."
    );

    try {
      if (editingFabric) {
        const idToUpdate = (editingFabric._id || editingFabric.id || "") as string | number;
        await updateCurtain({ id: idToUpdate, body: payload }).unwrap();
        toast.success("Curtain fabric updated successfully!", { id: toastId });
      } else {
        await createCurtain(payload).unwrap();
        toast.success("Curtain added to collection!", { id: toastId });
      }
      onClose();
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to save curtain.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-['Urbanist',sans-serif]">
      <div className="bg-white rounded-none border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#F9FAFB]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#004642]" />
            <h2 className="font-bold text-base text-gray-900">
              {editingFabric ? "Edit Curtain Product" : "Add New Curtain to Catalog"}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-none hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Product Image *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />

            <div className="flex gap-4 items-center p-3 bg-gray-50 border border-gray-200">
              {imagePreview && imagePreview.trim() !== "" ? (
                <div className="relative w-20 h-20 overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                  <Image
                    src={imagePreview.trim()}
                    alt="Fabric Preview"
                    fill
                    className="object-cover"
                    unoptimized={imagePreview.startsWith("data:") || imagePreview.includes("cloudinary.com")}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 text-xs shrink-0">
                  No Photo
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-none flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose local file</span>
                </button>
                <input
                  type="url"
                  placeholder="Or paste image URL (https://...)"
                  value={imagePreview.startsWith("data:") ? "" : imagePreview}
                  onChange={(e) => setImagePreview(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#004642]"
                />
              </div>
            </div>
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pure Belgian Linen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TCurtainCategory)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642] cursor-pointer"
              >
                <option value="curtains">Curtains (Full Drapes)</option>
                <option value="sheers">Sheers (Light Filtering)</option>
                <option value="rollers">Rollers (Blinds &amp; Blackout)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fabric
              </label>
              <input
                type="text"
                placeholder="linen, velvet, silk"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Pattern
              </label>
              <input
                type="text"
                placeholder="plain, striped, geometric"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Opacity
              </label>
              <select
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642] cursor-pointer"
              >
                {OPACITY_OPTIONS.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Texture
              </label>
              <input
                type="text"
                placeholder="natural linen, textured weave"
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Colors (Comma separated, e.g. beige, cream, white)
              </label>
              <input
                type="text"
                placeholder="beige, cream"
                value={colorsText}
                onChange={(e) => setColorsText(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Style (Comma separated, e.g. modern, minimalist)
              </label>
              <input
                type="text"
                placeholder="modern, minimalist"
                value={stylesText}
                onChange={(e) => setStylesText(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#004642]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Suitable Rooms
              </label>
              <div className="flex flex-wrap gap-2">
                {ROOM_OPTIONS.map((room) => {
                  const isSelected = suitableRooms.includes(room.id);
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => toggleRoom(room.id)}
                      className={`px-3 py-1 text-xs font-semibold border flex items-center gap-1 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#004642] text-white border-[#004642]"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      <span>{room.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded-none text-[#004642] accent-[#004642]"
                />
                <span className="text-xs font-bold text-gray-700">isActive</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded-none text-[#004642] accent-[#004642]"
                />
                <span className="text-xs font-bold text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#004642] hover:bg-[#003835] text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingFabric ? "Save Changes" : "Add Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
