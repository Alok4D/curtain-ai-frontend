"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Camera,
  Check,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Sparkles,
  KeyRound,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  bio: string;
  avatarUrl: string;
}

interface NotificationSettings {
  emailOnBooking: boolean;
  whatsappAlerts: boolean;
  aiUsageThreshold: boolean;
  marketingUpdates: boolean;
  currency: string;
}

const DEFAULT_PROFILE: AdminProfile = {
  name: "Curtainz Studio Admin",
  email: "admin@curtainz.ai",
  phone: "+971 52 313 5707",
  role: "Chief Store Administrator",
  location: "Dubai Design District (d3), UAE",
  bio: "Managing Curtainz AI Visualizer catalog, client fabric consultations, and luxury drape fittings across Dubai.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailOnBooking: true,
  whatsappAlerts: true,
  aiUsageThreshold: true,
  marketingUpdates: false,
  currency: "AED",
};

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Tab: 'profile' | 'security' | 'preferences'
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile");

  // Profile Form State
  const [profile, setProfile] = useState<AdminProfile>(DEFAULT_PROFILE);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Studio Preferences State
  const [preferences, setPreferences] = useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("curtainz_admin_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }

      const storedPrefs = localStorage.getItem("curtainz_admin_preferences");
      if (storedPrefs) {
        setPreferences(JSON.parse(storedPrefs));
      }
    } catch {
      // Fallback to default state
    }
  }, []);

  // Handle Avatar Change
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setProfile((prev) => ({ ...prev, avatarUrl: dataUrl }));
        toast.success("Profile photo updated in preview. Click Save to persist.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setProfile((prev) => ({
      ...prev,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    }));
    toast.info("Avatar reset to default.");
  };

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      toast.error("Please enter a valid admin name.");
      return;
    }
    if (!profile.email.trim() || !profile.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSavingProfile(true);
    setTimeout(() => {
      try {
        localStorage.setItem("curtainz_admin_profile", JSON.stringify(profile));
        toast.success("Admin profile updated successfully!");
      } catch {
        toast.error("Failed to save changes to local storage.");
      } finally {
        setIsSavingProfile(false);
      }
    }, 400);
  };

  // Reset Profile to Default
  const handleResetProfile = () => {
    if (confirm("Reset profile details to default?")) {
      setProfile(DEFAULT_PROFILE);
      localStorage.setItem("curtainz_admin_profile", JSON.stringify(DEFAULT_PROFILE));
      toast.info("Profile reset to default values.");
    }
  };

  // Change Password Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match. Please verify.");
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      // Simulate password change success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
      toast.success("Password changed successfully! Keep your credentials safe.");
    }, 600);
  };

  // Save Studio Preferences Handler
  const handleSavePreferences = () => {
    setIsSavingPreferences(true);
    setTimeout(() => {
      try {
        localStorage.setItem("curtainz_admin_preferences", JSON.stringify(preferences));
        toast.success("Studio preferences and alerts saved!");
      } catch {
        toast.error("Failed to save preferences.");
      } finally {
        setIsSavingPreferences(false);
      }
    }, 350);
  };

  return (
    <div className="space-y-8 font-['Urbanist',sans-serif] max-w-6xl mx-auto pb-12">
      {/* Top Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#004642] bg-[#004642]/10 px-2.5 py-1 rounded-full">
            Admin Studio Settings
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#004642] tracking-tight mt-2">
            Account &amp; Studio Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your administrator profile, security credentials, and studio notification preferences.
          </p>
        </div>

        {/* Live Admin Tag */}
        <div className="flex items-center gap-3 bg-emerald-50/80 border border-emerald-200/70 py-2 px-3.5 rounded-xl self-start sm:self-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <p className="text-xs font-bold text-emerald-900 leading-tight">
              {profile.name}
            </p>
            <p className="text-[10px] text-emerald-700 leading-tight">
              {profile.role}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200/80 shadow-xs overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-[#004642] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile &amp; Personal Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "security"
              ? "bg-[#004642] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Security &amp; Password</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preferences")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "preferences"
              ? "bg-[#004642] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Studio Preferences &amp; Alerts</span>
        </button>
      </div>

      {/* TAB 1: Profile & Personal Info */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Avatar & Hero Box */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Camera className="w-4 h-4 text-[#004642]" />
              <span>Admin Profile Photo</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#004642]/20 shadow-sm shrink-0 bg-gray-100">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Upload Controls */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="text-sm font-bold text-gray-800">
                  Upload high-resolution profile picture
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: Square JPG or PNG, at least 400x400 pixels.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 bg-[#004642] hover:bg-[#003431] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="w-4 h-4 text-[#004642]" />
              <span>Personal &amp; Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="admin@curtainz.ai"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="+971 52 313 5707"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Role / Designation */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Admin Role / Designation
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value })
                    }
                    placeholder="Chief Store Administrator"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Studio Location */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Studio Location / Headquarters
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    placeholder="Dubai Design District (d3), UAE"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Bio / Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Admin Bio / Studio Note
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Tell clients or team members about your role..."
                  className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleResetProfile}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60"
              >
                {isSavingProfile ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving Changes…</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === "security" && (
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Lock className="w-4 h-4 text-[#004642]" />
                <span>Change Administrator Password</span>
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                Ensure your account is using a strong, unique password to safeguard admin operations and client consultation data.
              </p>
            </div>

            <div className="space-y-4 max-w-xl">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Check className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5 text-[11px] text-gray-600">
                <p className="font-semibold text-gray-800">Password Checklist:</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      newPassword.length >= 8
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span>Minimum 8 characters length</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      newPassword && newPassword === confirmPassword
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span>Passwords match exactly</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60"
              >
                {isChangingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating Password…</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: Studio Preferences & Alerts */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Bell className="w-4 h-4 text-[#004642]" />
                <span>Consultation Alerts &amp; Notifications</span>
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                Configure how and when the admin team is notified about user interactions and consultation requests.
              </p>
            </div>

            <div className="space-y-4">
              {/* Toggle 1: Email on Booking */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="space-y-0.5 pr-4">
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    Email Alert on Home Visit Booking
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive an immediate email whenever a client in Dubai books a free in-home consultation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.emailOnBooking}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        emailOnBooking: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004642]" />
                </label>
              </div>

              {/* Toggle 2: WhatsApp Alerts */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="space-y-0.5 pr-4">
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    WhatsApp Instant Dispatch
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable direct WhatsApp click-to-chat triggers for rapid response with booking leads.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.whatsappAlerts}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        whatsappAlerts: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004642]" />
                </label>
              </div>

              {/* Toggle 3: AI Usage Alerts */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="space-y-0.5 pr-4">
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    AI Visualizer Usage Spike Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Notify admin team when OpenAI Visualizer daily previews exceed 500 rooms.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.aiUsageThreshold}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        aiUsageThreshold: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004642]" />
                </label>
              </div>

              {/* Currency Preference */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Studio Default Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences({ ...preferences, currency: e.target.value })
                  }
                  className="w-full sm:w-64 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#004642] focus:bg-white"
                >
                  <option value="AED">AED (United Arab Emirates Dirham)</option>
                  <option value="USD">USD (United States Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="BDT">BDT (Bangladeshi Taka)</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={handleSavePreferences}
                disabled={isSavingPreferences}
                className="inline-flex items-center gap-2 bg-[#004642] hover:bg-[#003431] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60"
              >
                {isSavingPreferences ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving Preferences…</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Studio Preferences</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

