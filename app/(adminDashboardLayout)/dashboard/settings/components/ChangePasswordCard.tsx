"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/lib/feature/auth/authApi";

export default function ChangePasswordCard() {
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from your current password.");
      return;
    }

    const toastId = toast.loading("Updating password...");

    try {
      const res = await changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();

      if (res?.success) {
        toast.success(res.message || "Password changed successfully!", { id: toastId });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      console.error("Change password error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to change password", { id: toastId });
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-[#1C201D] tracking-tight">
          Change password
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#737874]">
          Keep your account secure with a password you don&apos;t use elsewhere.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
            Current password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
              aria-label="Toggle current password visibility"
            >
              {showCurrentPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create new password"
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Requirements Helper Text */}
        <p className="text-[11px] text-[#737874] mb-6">
          Use at least 6 characters, including letters and numbers. Your new password must be different from your current one.
        </p>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#ECEAE4]">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-[#1C201D] hover:underline"
          >
            Forgot your password?
          </Link>

          <button
            type="submit"
            disabled={isChanging}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3B463B] hover:bg-[#303930] disabled:opacity-60 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            {isChanging ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Update password</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

