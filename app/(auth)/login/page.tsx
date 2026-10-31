"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FBF9F5] font-sans antialiased text-[#2D312E]">
      
      {/* Left Column: Visual Showcase Banner */}
      <div className="relative w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop"
          alt="Warm living room with soft curtains"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40 z-10" />

        {/* Top Logo */}
        <div className="relative z-20 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-white">
            <span className="flex gap-0.5">
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
            </span>
            <span className="text-xl sm:text-2xl font-serif font-medium tracking-wide">
              Curtainz
            </span>
          </div>
        </div>

        {/* Bottom Banner Content */}
        <div className="relative z-20 max-w-lg text-white mt-auto pt-16">
          <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80 mb-3">
            A MORE BEAUTIFUL EVERYDAY
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif leading-[1.2] font-normal mb-4 tracking-tight">
            A little light. <br />
            A softer space. <br />
            A room that&apos;s yours.
          </h2>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6 font-light">
            Explore thoughtful fabrics and see the difference in your own room, before you decide.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-white/75">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Imagined with AI Curtain Studio</span>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form & Navigation */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20">
        
        {/* Top Link: Back to Home */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4D534E] hover:text-[#1C201D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[440px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#696F6A] mb-2">
              YOUR SPACE, REVISITED
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight mb-2">
              Welcome home.
            </h1>
            <p className="text-xs sm:text-sm text-[#666B67] leading-relaxed">
              Log in to return to your projects, favourite fabrics and room transformations.
            </p>
          </div>

          {/* Error Alert Box */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#FDF0EE] border border-[#F6D0CA] flex items-start gap-2.5 text-[#B44335]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-[#A43B2E]">
              We couldn&apos;t sign you in. Check your email and password, then try again.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#4D534E]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#C6CAC4] text-[#3E4A3E] focus:ring-[#3E4A3E] accent-[#3E4A3E]"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="#forgot-password"
                className="text-xs text-[#4D534E] hover:text-[#1C201D] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#3E4A3E] hover:bg-[#323D32] text-white text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Log in</span>
              </button>
            </div>
          </form>

          {/* Bottom Footnote Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-[#5F6560]">
              New to Curtainz?{" "}
              <Link href="/signup" className="font-semibold text-[#1C201D] hover:underline">
                Create an account
              </Link>
            </p>
            <p className="text-[11px] text-[#7E847F]">
              Just exploring?{" "}
              <Link href="#preview" className="underline hover:text-[#1C201D]">
                Try 5 free AI previews without signing up.
              </Link>
            </p>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A908B] pt-10 mt-6 border-t border-[#EDEBE5]">
          <span>&copy; 2026 Curtainz</span>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link href="#privacy" className="hover:underline">
              Privacy policy
            </Link>
            <Link href="#terms" className="hover:underline">
              Terms of use
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}