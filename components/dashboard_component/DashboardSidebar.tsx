"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/lib/feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { logOut } from "@/lib/feature/auth/authSlice";

export function DashboardSidebar() {

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reduxUser = useAppSelector((state) => state.auth.user);
  const { data: meData } = useGetMeQuery();

  const user = meData?.data || reduxUser;

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
    dispatch(logOut());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Compute initials
  const getInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#004642] text-white border-r border-[#033633] overflow-hidden font-['Urbanist',sans-serif]">
      {/* Brand Header */}
      <div
        className={cn(
          "flex items-center justify-between px-6 py-5 border-b border-white/10",
          collapsed && "justify-center px-2 py-4"
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1.5 text-white">
            <span className="flex gap-0.5">
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
              <span className="w-1 h-5 bg-white rounded-sm inline-block" />
            </span>
            {!collapsed && (
              <span className="text-xl font-serif font-medium tracking-wide text-white">
                Curtain AI
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex w-7 h-7 rounded-sm bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors cursor-pointer",
            collapsed && "hidden"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-5 overflow-y-auto space-y-6 custom-scrollbar">
        <div>
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all group",
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
      </div>

      {/* Footer / Admin User Profile connected to API */}
      <div className="p-3 border-t border-white/10 bg-[#003734]">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-sm bg-white/5",
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
            {user?.avatarUrl ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#a4df3b]/40 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.name || "Admin"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#a4df3b] text-[#004642] font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                {getInitials(user?.name)}
              </div>
            )}

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate group-hover:text-emerald-200 transition-colors">
                  {user?.name || "Curtain AI Admin"}
                </p>
                <p className="text-[10px] text-emerald-200/70 truncate">
                  {user?.email || "admin@Curtain AI.ai"}
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
            className="w-full mt-2 py-1.5 text-emerald-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
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
          className="p-2 bg-[#004642] text-white rounded-lg shadow-md cursor-pointer"
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
