"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Calendar,
  Sparkles,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
} from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const mainMenuItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
      badge: null,
    },
    {
      title: "Curtain Management",
      icon: Layers,
      href: "/dashboard/curtains",
      badge: "24",
    },
    {
      title: "Settings & Profile",
      icon: Settings,
      href: "/dashboard/settings",
      badge: null,
    },
  ];

  const secondaryMenuItems = [
    {
      title: "AI Visualizer",
      icon: Sparkles,
      href: "/generate-image",
      isExternal: false,
    },
    {
      title: "Live Website",
      icon: ExternalLink,
      href: "/",
      isExternal: true,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#004642] text-white border-r border-[#033633] overflow-hidden font-['Urbanist',sans-serif]">
      {/* Brand Header */}
      <div
        className={cn(
          "flex items-center justify-between px-6 py-5 border-b border-white/10",
          collapsed && "justify-center px-2 py-4"
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          {/* Brand Logo with Leaf Flourish */}
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
            <svg
              className="w-5 h-6 text-white"
              viewBox="0 0 26 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 19C4 11 10 4 19 2C19 9 14 17 5 19Z" fill="#a4df3b" />
              <path
                d="M9 24C11 18 16 12 23 11C21 18 16 23 10 25Z"
                fill="#5eead4"
                opacity="0.8"
              />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                Curtainz
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-medium">
                Admin Studio
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors cursor-pointer",
            collapsed && "hidden"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-5 overflow-y-auto space-y-6 custom-scrollbar">
        {/* Section 1: Main Management */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-emerald-300/70 mb-2">
              Management
            </p>
          )}
          <ul className="space-y-1">
            {mainMenuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                      isActive
                        ? "bg-white text-[#004642] shadow-sm font-semibold"
                        : "text-emerald-100/90 hover:bg-white/10 hover:text-white",
                      collapsed && "justify-center px-0 h-11 w-11 mx-auto"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform group-hover:scale-105",
                        isActive ? "text-[#004642]" : "text-emerald-300"
                      )}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.title}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          "px-2 py-0.5 text-[10px] font-bold rounded-full",
                          isActive
                            ? "bg-[#004642]/10 text-[#004642]"
                            : "bg-white/15 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-emerald-300/70 mb-2">
              Studio &amp; Tools
            </p>
          )}
          <ul className="space-y-1">
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-100/90 hover:bg-white/10 hover:text-white transition-all group",
                      collapsed && "justify-center px-0 h-11 w-11 mx-auto"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0 text-emerald-300/80 group-hover:scale-105" />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer / Admin User Profile */}
      <div className="p-3 border-t border-white/10 bg-[#003734]">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-white/5",
            collapsed && "justify-center p-1"
          )}
        >
          {/* Avatar & Name -> Link to Settings */}
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer"
            title="Account Settings"
          >
            <div className="w-8 h-8 rounded-full bg-[#a4df3b] text-[#004642] font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              AD
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate group-hover:text-emerald-200 transition-colors">
                  Curtainz Admin
                </p>
                <p className="text-[10px] text-emerald-200/70 truncate">
                  admin@curtainz.ai
                </p>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-emerald-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed Expand Button */}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="w-full mt-2 py-1.5 text-emerald-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button Floating */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-[#004642] text-white rounded-lg shadow-md"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-300 h-screen",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
