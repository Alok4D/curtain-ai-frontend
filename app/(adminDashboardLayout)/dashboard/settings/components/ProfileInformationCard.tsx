"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Trash2,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/lib/feature/auth/authApi";
import { useAppDispatch } from "@/lib/hooks/redux";
import { updateUser } from "@/lib/feature/auth/authSlice";

interface ProfileInformationCardProps {
  user: any;
}

export default function ProfileInformationCard({ user }: ProfileInformationCardProps) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Form states
  const [fullName, setFullName] = useState("");
  const [region, setRegion] = useState("United Arab Emirates");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Sync with user prop
  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      if (user.location) {
        setRegion(user.location);
      }
      if (user.avatarUrl) {
        setAvatarPreview(user.avatarUrl);
      }
    }
  }, [user]);

  // Handle avatar image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarPreview(reader.result);
        toast.info("Image selected! Click 'Save changes' to apply.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Photo removed. Click 'Save changes' to apply.");
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name cannot be empty.");
      return;
    }

    const payload: {
      name: string;
      phone?: string;
      location?: string;
      avatarUrl?: string;
    } = {
      name: fullName.trim(),
      phone: phone.trim() || undefined,
      location: region.trim() || undefined,
      avatarUrl: avatarPreview || undefined,
    };

    const toastId = toast.loading("Saving profile changes...");

    try {
      const res = await updateProfile(payload).unwrap();
      if (res?.success) {
        dispatch(
          updateUser({
            name: payload.name,
            phone: payload.phone,
            location: payload.location,
            avatarUrl: res.data?.avatarUrl || payload.avatarUrl,
          })
        );
        toast.success(res.message || "Profile updated successfully!", { id: toastId });
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to update profile", { id: toastId });
    }
  };

  // Initials generator
  const getInitials = (name: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-[#1C201D] tracking-tight">
          Profile information
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#737874]">
          Your personal details, profile avatar and contact information.
        </p>
      </div>

      {/* Avatar & Photo Upload Controls */}
      <div className="flex flex-wrap items-center gap-5 mb-8 p-4 rounded-xl bg-[#FBF9F5] border border-[#EFECE5]">
        {/* Avatar Display */}
        <div className="relative group shrink-0">
          {avatarPreview ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#3B463B] shadow-sm">
              <Image
                src={avatarPreview}
                alt={fullName || "Admin Avatar"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#3B463B] text-white flex items-center justify-center text-xl font-serif tracking-wider shadow-sm">
              {getInitials(fullName || user?.name)}
            </div>
          )}

          {/* Quick Click Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
            title="Change photo"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Buttons & Info */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
          />

          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-sm text-[#1C201D]">
              {fullName || user?.name || "Admin"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#E8EFE5] text-[#2E6B34] px-2 py-0.5 rounded-full border border-[#D0E2CA]">
              <ShieldCheck className="w-3 h-3" />
              {user?.role === "admin" ? "Administrator" : "User"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D5D8D3] rounded-lg text-xs font-medium text-[#2D312E] bg-white hover:bg-[#F7F8F6] transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-[#58615A]" />
              <span>Change photo</span>
            </button>

            {avatarPreview && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#F6D0CA] rounded-lg text-xs font-medium text-[#B44335] bg-[#FDF0EE] hover:bg-[#FCE8E5] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}

            <span className="text-[11px] text-[#8C918D]">
              JPG, PNG or WEBP · Max 5 MB
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        {/* Full Name & Region Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              Region / Country
            </label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] pr-9 cursor-pointer"
              >
                <option value="United Arab Emirates">United Arab Emirates (Dubai)</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Qatar">Qatar</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Email Address & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              readOnly
              disabled
              value={email}
              className="w-full px-3.5 py-2 text-sm bg-[#F4F4F1] border border-[#D5D8D3] rounded-lg text-[#666B67] cursor-not-allowed select-none"
            />
            <p className="mt-1 text-[11px] text-[#737874]">
              Primary login account (cannot be changed directly)
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971 50 123 4567"
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D]"
            />
            <p className="mt-1 text-[11px] text-[#737874]">
              Used for client inquiries &amp; alerts
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#ECEAE4]">
          <div className="flex items-center gap-1.5 text-xs text-[#2E6B34]">
            <CheckCircle2 className="w-4 h-4 text-[#2E6B34]" />
            <span>Email verified &amp; active</span>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3B463B] hover:bg-[#303930] disabled:opacity-60 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

