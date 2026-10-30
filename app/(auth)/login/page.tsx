"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Authenticating…");

    setTimeout(() => {
      setIsLoading(false);
      Cookies.set("accessToken", "demo_jwt_access_token", { expires: 7 });
      localStorage.setItem("userRole", "ADMIN");
      localStorage.setItem("userEmail", data.email);

      toast.success("Welcome back to Curtainz Studio!", { id: toastId });

      if (data.email.toLowerCase().includes("admin") || !callbackUrl) {
        router.push("/dashboard");
      } else {
        router.push(callbackUrl);
      }
    }, 800);
  };

  const handleQuickAdminLogin = () => {
    setValue("email", "admin@curtainz.ai");
    setValue("password", "curtainz2026");
    onSubmit({
      email: "admin@curtainz.ai",
      password: "curtainz2026",
      rememberMe: true,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#032c26] font-['Urbanist',sans-serif] text-slate-800">
      {/* Left Column: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-white z-10 shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#004642] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to website</span>
          </Link>

          {/* Curtainz Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <svg
              className="w-5 h-6 text-[#004642]"
              viewBox="0 0 26 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 19C4 11 10 4 19 2C19 9 14 17 5 19Z" fill="#a4df3b" />
              <path
                d="M9 24C11 18 16 12 23 11C21 18 16 23 10 25Z"
                fill="#004642"
                opacity="0.8"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight text-[#004642]">
              Curtainz
            </span>
          </Link>
        </div>

        {/* Center: Login Form */}
        <div className="max-w-md w-full mx-auto my-8">
          <div className="mb-8 text-left">
            <span className="inline-block text-[11px] font-bold tracking-widest text-[#004642] uppercase bg-[#004642]/10 px-2.5 py-1 rounded-full mb-3">
              Admin &amp; Studio Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage your made-to-measure curtain catalog, bookings &amp; AI visualizer.
            </p>
          </div>

          {/* Quick Demo Access Pill */}
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full mb-6 p-3 bg-[#e9f3f1] hover:bg-[#d8ece8] border border-[#b8dfd8] rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#004642] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#004642]">
                  Quick Demo: Login as Admin
                </p>
                <p className="text-[11px] text-gray-500">
                  Click to auto-fill credentials &amp; open dashboard
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#004642] group-hover:translate-x-0.5 transition-transform">
              &rarr;
            </span>
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@curtainz.ai"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#004642] focus:ring-1 focus:ring-[#004642]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#004642] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#004642] focus:ring-1 focus:ring-[#004642]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-[#004642] rounded border-gray-300 focus:ring-[#004642]"
                />
                <span className="text-xs text-gray-600 font-medium">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-[#004642] hover:bg-[#003431] text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Signing in…</span>
                </span>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Sign Up Redirect */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#004642] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-400">
          Curtainz AI &bull; Made-to-measure window dressings &amp; AI visualizer
        </div>
      </div>

      {/* Right Column: Visual Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#04362f] flex-col justify-between p-12 text-white overflow-hidden">
        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#a4df3b]/10 blur-3xl pointer-events-none" />

        {/* Top Badge */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a4df3b] animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
            Dubai’s #1 AI Curtain Platform
          </span>
        </div>

        {/* Center Visual Mockup Card */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-emerald-950/50">
            <Image
              src="/after_image.png"
              alt="Curtain Studio Preview"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="inline-block bg-[#004642]/90 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                In-Situ AI Fitting
              </span>
              <h3 className="text-xl font-bold text-white">
                Transform any room in 20 seconds
              </h3>
              <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                Preview real made-to-measure fabrics on real windows before measuring, sewing and installation in Dubai.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Feature Highlights */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="font-bold text-white text-base">5 Free</p>
            <p className="text-emerald-200 text-[11px]">AI previews per user</p>
          </div>
          <div>
            <p className="font-bold text-white text-base">100%</p>
            <p className="text-emerald-200 text-[11px]">Room preservation</p>
          </div>
          <div>
            <p className="font-bold text-white text-base">Dubai</p>
            <p className="text-emerald-200 text-[11px]">Free home consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#004642] flex items-center justify-center text-white text-sm">Loading login…</div>}>
      <LoginForm />
    </Suspense>
  );
}
