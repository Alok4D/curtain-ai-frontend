"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Eye, EyeOff, Check, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@example.com");
 
  const [password, setPassword] = useState("••••••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

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

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-10" />

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

      {/* Right Column: Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20">
        
        {/* Top Link: Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4D534E] hover:text-[#1C201D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[440px] mx-auto my-auto">
          {/* Header */}
          <div className="mb-6">
            <span className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-[#696F6A] mb-2">
              MAKE YOURSELF AT HOME
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C201D] tracking-tight mb-2">
              A space for your ideas.
            </h1>
            <p className="text-xs sm:text-sm text-[#666B67] leading-relaxed">
              Create an account to keep your room projects and return to the looks you love.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D]"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              {/* Password Requirements Checklist */}
              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-[#636864]">
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#3E4A3E]" />
                  At least 8 characters
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#3E4A3E]" />
                  Letters and a number
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-[#1C201D] mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5D8D3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E4A3E] text-[#1C201D] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C918D] hover:text-[#58615A]"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Match Indicator */}
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-[#636864]">
                <Check className="w-3 h-3 text-[#3E4A3E]" />
                <span>Passwords match</span>
              </div>
            </div>

            {/* Agree Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#525753]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[#C6CAC4] text-[#3E4A3E] focus:ring-[#3E4A3E] accent-[#3E4A3E]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="#terms" className="underline hover:text-[#1C201D]">
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link href="#privacy" className="underline hover:text-[#1C201D]">
                    Privacy policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#3E4A3E] hover:bg-[#323D32] text-white text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Create account</span>
              </button>
            </div>
          </form>

          {/* Already have an account link */}
          <div className="text-center mt-6">
            <p className="text-xs text-[#5F6560]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#1C201D] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A908B] pt-8 mt-6 border-t border-[#EDEBE5]">
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