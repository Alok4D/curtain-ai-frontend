"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  Check,
  X,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import initialData from "@/data/curtains.json";

interface FabricItem {
  id: number;
  name: string;
  category: "curtains" | "sheers" | "rollers";
  image_url: string;
  display_image_url: string;
  material?: string;
  price?: number;
  inStock?: boolean;
}

export default function CurtainManagementPage() {
  // Flatten initial fabrics
  const initialList: FabricItem[] = [
    ...initialData.curtains.map((c) => ({
      ...c,
      category: "curtains" as const,
      material: "100% Premium Belgian Linen",
      price: 180,
      inStock: true,
    })),
    ...initialData.sheers.map((c) => ({
      ...c,
      category: "sheers" as const,
      material: "Light-filtering Voile Sheer",
      price: 140,
      inStock: true,
    })),
    ...initialData.rollers.map((c) => ({
      ...c,
      category: "rollers" as const,
      material: "Textured Thermal Blackout",
      price: 160,
      inStock: true,
    })),
  ];

  const [fabrics, setFabrics] = useState<FabricItem[]>(initialList);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFabric, setEditingFabric] = useState<FabricItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "curtains" as "curtains" | "sheers" | "rollers",
    image_url: "",
    display_image_url: "",
    material: "100% Custom Tailored",
    price: 180,
    inStock: true,
  });

  // Filter logic
  const filteredFabrics = fabrics.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDelete = (id: number) => {
    const item = fabrics.find((f) => f.id === id);
    if (confirm(`Are you sure you want to remove "${item?.name || "this fabric"}" from the catalog?`)) {
      setFabrics((prev) => prev.filter((item) => item.id !== id));
      toast.info(`Fabric removed from catalog.`);
    }
  };

  const handleOpenAddModal = () => {
    setEditingFabric(null);
    setFormData({
      name: "",
      category: "curtains",
      image_url: "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
      display_image_url: "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
      material: "Premium Linen Weave",
      price: 190,
      inStock: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: FabricItem) => {
    setEditingFabric(item);
    setFormData({
      name: item.name,
      category: item.category,
      image_url: item.image_url,
      display_image_url: item.display_image_url,
      material: item.material || "100% Linen",
      price: item.price || 180,
      inStock: item.inStock ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSaveFabric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a fabric name.");
      return;
    }

    if (editingFabric) {
      // Update existing
      setFabrics((prev) =>
        prev.map((f) =>
          f.id === editingFabric.id ? { ...f, ...formData } : f
        )
      );
      toast.success(`Updated "${formData.name}" successfully!`);
    } else {
      // Add new
      const newItem: FabricItem = {
        id: Date.now(),
        ...formData,
      };
      setFabrics((prev) => [newItem, ...prev]);
      toast.success(`Added "${formData.name}" to catalog!`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-['Urbanist',sans-serif]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2.5 py-1 rounded-full">
            Inventory &bull; AI Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight mt-2">
            Curtain &amp; Fabric Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Add, update, or remove fabrics used by the AI Room Visualizer and customer store.
          </p>
        </div>

       <Link href={'/dashboard/curtains/add-curtain'}>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Fabric</span>
        </button>
       </Link>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
          {[
            { id: "all", label: "All Fabrics", count: fabrics.length },
            {
              id: "curtains",
              label: "Curtains",
              count: fabrics.filter((f) => f.category === "curtains").length,
            },
            {
              id: "sheers",
              label: "Sheers",
              count: fabrics.filter((f) => f.category === "sheers").length,
            },
            {
              id: "rollers",
              label: "Rollers",
              count: fabrics.filter((f) => f.category === "rollers").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#004642] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-60 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or material…"
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Fabric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredFabrics.map((fabric) => (
          <div
            key={fabric.id}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            {/* Image Preview with Category Badge */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <Image
                src={fabric.display_image_url || fabric.image_url}
                alt={fabric.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                {fabric.category}
              </span>
              <span
                className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded ${
                  fabric.inStock
                    ? "bg-emerald-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {fabric.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 truncate">
                  {fabric.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                  {fabric.material}
                </p>
 
              </div>

              {/* Actions Footer */}
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/select-curtains"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004642] hover:underline"
                  title="Test with AI in Visualizer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Preview</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(fabric)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Fabric"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(fabric.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Fabric"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFabrics.length === 0 && (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-gray-400">
          <Layers className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm font-semibold">No fabrics found</p>
          <p className="text-xs mt-1">Try another search or filter category.</p>
        </div>
      )}

      {/* Add / Edit Fabric Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#004642]">
                {editingFabric ? "Edit Fabric" : "Add New Fabric to Catalog"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFabric} className="space-y-4 mt-4">
              {/* Fabric Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Fabric Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Emerald Velvet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#004642] focus:bg-white"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#004642] focus:bg-white"
                  >
                    <option value="curtains">Curtains</option>
                    <option value="sheers">Sheers</option>
                    <option value="rollers">Rollers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price (AED / meter)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#004642] focus:bg-white"
                  />
                </div>
              </div>

              {/* Material Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Material &amp; Weave
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% Belgian Linen / Blackout Lining"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#004642] focus:bg-white"
                />
              </div>

              {/* Display Image URL */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Fabric Image URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.display_image_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_image_url: e.target.value,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#004642] focus:bg-white"
                />
              </div>

              {/* In Stock Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) =>
                    setFormData({ ...formData, inStock: e.target.checked })
                  }
                  className="w-4 h-4 text-[#004642] rounded border-gray-300"
                />
                <span className="text-xs text-gray-700 font-medium">
                  Available in stock for Dubai customers
                </span>
              </label>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#004642] hover:bg-[#003431] text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  {editingFabric ? "Save Changes" : "Add to Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

