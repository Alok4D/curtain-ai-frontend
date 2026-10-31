"use client";

import { useState } from "react";
import { Upload, ChevronDown, CheckCircle2, Eye, EyeOff, MessageSquare, ArrowUpRight } from "lucide-react";

export default function AdminProfileSecurity() {
  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("Alex Morgan");
  const [region, setRegion] = useState("United States");
  const [email, setEmail] = useState("alex@example.com");

  return (
    <div className="font-sans antialiased text-[#2D312E]">
      <div className="max-w-full mx-auto">
        
        {/* Page Title & Subtitle */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight">
            Admin profile &amp; security
          </h1>
          <p className="mt-1.5 text-sm text-[#666B67]">
            Update your admin profile and manage password settings.
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Forms) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Profile Information Card */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="mb-6">
                <h2 className="text-2xl font-serif text-[#1C201D] tracking-tight">
                  Profile information
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#737874]">
                  Your personal details and where we can reach you.
                </p>
              </div>

              {/* Avatar & Photo Upload */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#E5E9E2] flex items-center justify-center text-[#58615A] text-lg font-serif">
                  AM
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#D5D8D3] rounded-lg text-xs sm:text-sm font-medium text-[#2D312E] bg-white hover:bg-[#F7F8F6] transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#58615A]" />
                    Change photo
                  </button>
                  <p className="mt-1.5 text-[11px] text-[#8C918D]">
                    JPG or PNG · Up to 2 MB
                  </p>
                </div>
              </div>

              {/* Name & Region Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                    Region
                  </label>
                  <div className="relative">
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] pr-9 cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#737874] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D]"
                />
                <p className="mt-1.5 text-xs text-[#737874]">
                  Your login email and destination for account updates.
                </p>
              </div>

              {/* Footer Section: Verification & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#525753]">
                  <CheckCircle2 className="w-4 h-4 text-[#525753]" />
                  <span>Email verified</span>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#3B463B] hover:bg-[#303930] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Save changes
                </button>
              </div>
            </section>

            {/* 2. Change Password Card */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="mb-6">
                <h2 className="text-2xl font-serif text-[#1C201D] tracking-tight">
                  Change password
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#737874]">
                  Keep your account secure with a password you don&apos;t use elsewhere.
                </p>
              </div>

              {/* Current Password */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                  >
                    {showCurrentPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
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
                      placeholder="Create new password"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                    >
                      {showNewPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
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
                      placeholder="Repeat new password"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B463B] text-[#1C201D] placeholder:text-[#A0A5A1] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements Helper Text */}
              <p className="text-[11px] text-[#737874] mb-6">
                Use at least 8 characters, including letters and a number. Your new password must be different from your current one.
              </p>

              {/* Footer Section: Forgot Password & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <a
                  href="#forgot-password"
                  className="text-xs font-semibold text-[#1C201D] hover:underline"
                >
                  Forgot your password?
                </a>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#3B463B] hover:bg-[#303930] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Update password
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Help Sidebar Card */}
          <div className="lg:col-span-1">
            <aside className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#58615A] mb-4">
                <MessageSquare className="w-5 h-5 text-[#58615A]" />
              </div>
              
              <h3 className="text-xl font-serif text-[#1C201D] tracking-tight mb-2">
                Need a little help?
              </h3>

              <p className="text-xs sm:text-sm text-[#666B67] leading-relaxed mb-5">
                For questions about your admin profile or account security, our team is a message away.
              </p>

              <a
                href="#contact-support"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1C201D] hover:underline"
              >
                <span>Contact support</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#1C201D]" />
              </a>
            </aside>
          </div>

        </div>

      </div>
    </div>
  );
}