"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, ChevronDown } from "lucide-react";

export default function AddCurtainForm() {

  const [curtainName, setCurtainName] = useState("Oatmeal linen");
  const [category, setCategory] = useState("Curtains");
  const [fabricStyle, setFabricStyle] = useState("Premium linen · Light filtering");
  const [status, setStatus] = useState("Active");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="font-sans antialiased text-[#2D312E]">
      <div className="max-w-full mx-auto">
        
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
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
                JPG or PNG · 2 MB max
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
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
            <div className="p-3.5 rounded-xl border border-[#ECEAE4] bg-[#FBF9F5] space-y-2.5">
              <span className="block text-[11px] font-medium text-[#6B716C]">
                Preview
              </span>
              <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden bg-neutral-200">
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
                  alt="Curtain texture preview"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] leading-relaxed text-[#737874]">
                Use a clean product photo that shows the fabric, fold, and overall style.
              </p>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Curtain name */}
              <div>
                <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                  Curtain name
                </label>
                <input
                  type="text"
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
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D] pr-9 cursor-pointer"
                  >
                    <option value="Curtains">Curtains</option>
                    <option value="Sheers">Sheers</option>
                    <option value="Blinds">Blinds</option>
                    <option value="Motorized">Motorized Curtains</option>
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
                  value={fabricStyle}
                  onChange={(e) => setFabricStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D] pr-9 cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2.5 bg-white border border-[#D5D8D3] text-[#2D312E] hover:bg-[#F7F8F6] text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-5 py-2.5 bg-[#3E4A3E] hover:bg-[#343F34] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                Save curtain
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}