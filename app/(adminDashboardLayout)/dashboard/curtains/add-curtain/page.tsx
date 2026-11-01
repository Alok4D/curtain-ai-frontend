"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, ChevronDown, ArrowLeft, Loader, Check, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  TCurtainCategory,
  useCreateCurtainMutation,
} from "@/lib/feature/curtain/curtainApi";

const POPULAR_COLORS = [
  "beige",
  "cream",
  "white",
  "grey",
  "blue",
  "olive",
  "caramel",
  "mustard",
  "charcoal",
];

const STYLE_OPTIONS = [
  "modern",
  "minimalist",
  "scandinavian",
  "classic",
  "contemporary",
  "luxury",
  "boho",
];

const ROOM_OPTIONS = [
  { id: "living-room", label: "Living Room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining-room", label: "Dining Room" },
  { id: "office", label: "Home Office" },
  { id: "kids-room", label: "Kids Room" },
];

const OPACITY_OPTIONS = [
  { value: "sheer", label: "Sheer (High Light Filtering)" },
  { value: "semi-sheer", label: "Semi-Sheer (Gentle Light Filtering)" },
  { value: "light-filtering", label: "Light Filtering" },
  { value: "room-darkening", label: "Room Darkening" },
  { value: "blackout", label: "100% Blackout (Complete Privacy)" },
];

export default function AddCurtainForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createCurtain, { isLoading }] = useCreateCurtainMutation();

  // Basic Details
  const [curtainName, setCurtainName] = useState("");
  const [category, setCategory] = useState<TCurtainCategory>("curtains");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [inStock, setInStock] = useState<boolean>(true);

  // Specifications
  const [fabric, setFabric] = useState("linen");
  const [pattern, setPattern] = useState("plain");
  const [opacity, setOpacity] = useState("semi-sheer");
  const [texture, setTexture] = useState("natural linen");

  // Multi-value Fields
  const [colors, setColors] = useState<string[]>(["beige", "cream"]);
  const [colorInput, setColorInput] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["modern", "minimalist"]);
  const [suitableRooms, setSuitableRooms] = useState<string[]>(["living-room", "bedroom"]);

  // Images
  const [imagePreview, setImagePreview] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

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

  // Color tag management
  const addColor = (col: string) => {
    const trimmed = col.trim().toLowerCase();
    if (trimmed && !colors.includes(trimmed)) {
      setColors([...colors, trimmed]);
    }
    setColorInput("");
  };

  const removeColor = (col: string) => {
    setColors(colors.filter((c) => c !== col));
  };

  // Style toggle
  const toggleStyle = (st: string) => {
    if (selectedStyles.includes(st)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== st));
    } else {
      setSelectedStyles([...selectedStyles, st]);
    }
  };

  // Room toggle
  const toggleRoom = (roomId: string) => {
    if (suitableRooms.includes(roomId)) {
      setSuitableRooms(suitableRooms.filter((r) => r !== roomId));
    } else {
      setSuitableRooms([...suitableRooms, roomId]);
    }
  };

  // Add additional image URL
  const addImageUrl = () => {
    const trimmed = newImageUrl.trim();
    if (trimmed && !additionalImages.includes(trimmed)) {
      setAdditionalImages([...additionalImages, trimmed]);
      setNewImageUrl("");
    }
  };

  const removeAdditionalImage = (img: string) => {
    setAdditionalImages(additionalImages.filter((i) => i !== img));
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

    // Build all images list
    const allImages = [imagePreview, ...additionalImages];

    try {
      const res = await createCurtain({
        name: curtainName.trim(),
        category,
        colors,
        fabric: fabric.trim() || "linen",
        pattern: pattern.trim() || "plain",
        style: selectedStyles,
        opacity,
        texture: texture.trim() || "natural linen",
        suitableRooms,
        images: allImages,
        isActive,
        inStock,
        display_image_url: imagePreview,
        image_url: imagePreview,
        material: `${fabric} · ${texture}`,
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
    <div className="font-['Urbanist',sans-serif] text-[#1C201D] pb-12">
      <div className="max-w-full mx-auto space-y-6">
        {/* Top Back Link */}
        <div>
          <Link
            href="/dashboard/curtains"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#525753] hover:text-[#1C201D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Curtain Management</span>
          </Link>
        </div>

        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight">
              Add New Curtain
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#737874]">
              Configure complete product details, colors, fabric specs, room suitability, and images.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 border ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            >
              {isActive ? "Status: Active" : "Status: Draft"}
            </span>
          </div>
        </header>

        {/* Form Body Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Images */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 border border-[#ECEAE4] space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1C201D]">
                Product Images
              </span>
              <span className="text-xs text-[#004642] font-semibold">
                Required primary
              </span>
            </div>

            {/* Drag & Drop Area */}
            <div
              onClick={handleBrowseClick}
              className="w-full aspect-[4/3] border border-dashed border-[#D2D6CF] bg-[#F7F8F5] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors hover:bg-[#F2F4F0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5E9E2] flex items-center justify-center text-[#556057] mb-3">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1C201D] mb-1">
                Upload primary curtain photo
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

            <button
              type="button"
              onClick={handleBrowseClick}
              className="w-full py-2.5 px-4 bg-[#004642] hover:bg-[#003734] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Browse primary photo</span>
            </button>

            {/* Primary Live Preview */}
            {imagePreview && imagePreview.trim() !== "" && (
              <div className="p-3.5 border border-[#ECEAE4] bg-[#FBF9F5] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#004642] uppercase tracking-wider">
                    Primary Image Preview
                  </span>
                  <span className="text-[10px] text-gray-500">Ready</span>
                </div>
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-200 border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Curtain texture preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {/* Additional Images (images array) */}
            <div className="pt-3 border-t border-gray-100 space-y-2.5">
              <label className="block text-xs font-bold text-[#1C201D]">
                Additional Image URLs (Gallery)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642]"
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold border border-gray-300 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {additionalImages.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {additionalImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[11px] bg-gray-50 border border-gray-200 px-2.5 py-1.5"
                    >
                      <span className="truncate max-w-[240px] text-gray-600">{img}</span>
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(img)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Full Specifications Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#ECEAE4] space-y-6">
            {/* Section 1: Basic Information */}
            <div>
              <h2 className="text-sm font-bold text-[#004642] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                1. General Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Curtain name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1C201D] mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oatmeal Pure Linen"
                    value={curtainName}
                    onChange={(e) => setCurtainName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642] text-[#1C201D]"
                  />
                </div>

                {/* Category */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1C201D] mb-1">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TCurtainCategory)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] appearance-none focus:outline-none focus:ring-1 focus:ring-[#004642] text-[#1C201D] pr-9 cursor-pointer"
                    >
                      <option value="curtains">Curtains (Full Drapes)</option>
                      <option value="sheers">Sheers (Light Filtering)</option>
                      <option value="rollers">Rollers (Blinds &amp; Blackout)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Colors & Fabric Details */}
            <div>
              <h2 className="text-sm font-bold text-[#004642] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                2. Colors, Fabric &amp; Visual Appearance
              </h2>

              <div className="space-y-4">
                {/* Colors (tags) */}
                <div>
                  <label className="block text-xs font-bold text-[#1C201D] mb-1">
                    Colors
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {colors.map((col) => (
                      <span
                        key={col}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-[#F0F5F4] text-[#004642] px-2.5 py-1 border border-[#CCE0DC] capitalize"
                      >
                        {col}
                        <button
                          type="button"
                          onClick={() => removeColor(col)}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a color and press Add..."
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addColor(colorInput);
                        }
                      }}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642]"
                    />
                    <button
                      type="button"
                      onClick={() => addColor(colorInput)}
                      className="px-3 py-2 bg-[#004642] text-white text-xs font-semibold cursor-pointer"
                    >
                      Add Color
                    </button>
                  </div>

                  {/* Quick-add color suggestions */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] text-gray-500">Quick add:</span>
                    {POPULAR_COLORS.map((pc) => (
                      <button
                        key={pc}
                        type="button"
                        onClick={() => addColor(pc)}
                        className={`text-[11px] px-2 py-0.5 border cursor-pointer capitalize ${
                          colors.includes(pc)
                            ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                        disabled={colors.includes(pc)}
                      >
                        +{pc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric, Pattern, Opacity & Texture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fabric */}
                  <div>
                    <label className="block text-xs font-bold text-[#1C201D] mb-1">
                      Fabric
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. linen, velvet, silk, voile"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642]"
                    />
                  </div>

                  {/* Pattern */}
                  <div>
                    <label className="block text-xs font-bold text-[#1C201D] mb-1">
                      Pattern (Design pattern)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. plain, striped, geometric"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642]"
                    />
                  </div>

                  {/* Opacity */}
                  <div>
                    <label className="block text-xs font-bold text-[#1C201D] mb-1">
                      Opacity
                    </label>
                    <div className="relative">
                      <select
                        value={opacity}
                        onChange={(e) => setOpacity(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] appearance-none focus:outline-none focus:ring-1 focus:ring-[#004642] pr-9 cursor-pointer"
                      >
                        {OPACITY_OPTIONS.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Texture */}
                  <div>
                    <label className="block text-xs font-bold text-[#1C201D] mb-1">
                      Texture
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. natural linen, textured weave, smooth"
                      value={texture}
                      onChange={(e) => setTexture(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] focus:outline-none focus:ring-1 focus:ring-[#004642]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Interior Match & Suitable Rooms */}
            <div>
              <h2 className="text-sm font-bold text-[#004642] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                3. Style &amp; Suitable Rooms
              </h2>

              <div className="space-y-4">
                {/* Style options */}
                <div>
                  <label className="block text-xs font-bold text-[#1C201D] mb-1.5">
                    Interior Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STYLE_OPTIONS.map((st) => {
                      const isSelected = selectedStyles.includes(st);
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => toggleStyle(st)}
                          className={`px-3 py-1.5 text-xs font-semibold border cursor-pointer capitalize flex items-center gap-1.5 transition-colors ${
                            isSelected
                              ? "bg-[#004642] text-white border-[#004642]"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          <span>{st}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Suitable Rooms */}
                <div>
                  <label className="block text-xs font-bold text-[#1C201D] mb-1.5">
                    Suitable Rooms
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ROOM_OPTIONS.map((room) => {
                      const isSelected = suitableRooms.includes(room.id);
                      return (
                        <label
                          key={room.id}
                          className={`flex items-center gap-2 px-3 py-2 border text-xs font-semibold cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-emerald-50 border-emerald-400 text-emerald-900"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRoom(room.id)}
                            className="rounded-none border-gray-300 text-[#004642] accent-[#004642]"
                          />
                          <span>{room.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Status & Availability */}
            <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#004642] rounded-none border-gray-300 accent-[#004642] cursor-pointer"
                />
                <span className="text-xs text-[#2D312E] font-bold">
                  isActive
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#004642] rounded-none border-gray-300 accent-[#004642] cursor-pointer"
                />
                <span className="text-xs text-[#2D312E] font-bold">
                  In Stock for tailor measurement
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#ECEAE4]">
              <Link href="/dashboard/curtains">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-white border border-[#D5D8D3] text-[#2D312E] hover:bg-[#F7F8F6] text-xs sm:text-sm font-semibold rounded-none transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#004642] hover:bg-[#003734] disabled:opacity-60 text-white text-xs sm:text-sm font-bold rounded-none transition-colors cursor-pointer shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Saving to catalog...</span>
                  </>
                ) : (
                  <span>Save Product</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
