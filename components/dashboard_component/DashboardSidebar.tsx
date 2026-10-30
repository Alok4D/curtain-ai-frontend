"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  LayoutGrid,
  User,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {

  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-collapse on mobile
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

  const handleLogout = async () => {
    console.log("logout");


  };


  const menuItems = [
    { title: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { title: "Subscription", icon: DollarSign, href: "/dashboard/subscription" },
    { title: "Account", icon: User, href: "/dashboard/account" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#181818] border-r border-[#00FF88]/0 overflow-hidden">
      {/* Logo & Toggle */}
      <div className={cn("flex items-center gap-3 px-6 py-8", collapsed && "justify-center px-2")}>
        <Link href="/" className="flex items-center gap-3">
          <div className="shrink-0">
            <Image
              src="/dashboard-logo/admin-dashboard-logo.svg"
              alt="Logo"
              width={65}
              height={65}
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <span className="text-white font-medium text-[18px] leading-[24px] tracking-[-0.5px] font-montserrat whitespace-nowrap">
              Sharp Matrix AI
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-[#059669] text-white shadow-[0_10px_20px_-5px_rgba(5,150,105,0.5),inset_6px_0_0_0_#00FF88]"
                      : "text-[#B7B7B7] hover:text-white hover:bg-white/5",
                    collapsed && "justify-center px-0 h-12 w-12 mx-auto"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 shrink-0 transition-all duration-300",
                      isActive ? "text-white" : "text-[#B7B7B7] group-hover:text-white"
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-6 mt-auto">
      <Link href={"/"}>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center justify-center gap-3 w-full py-3.5 rounded-md transition-all duration-300 bg-linear-to-r from-[#8B1A1A] to-[#631212] hover:from-[#A52A2A] hover:to-[#8B1A1A] text-white shadow-[0_10px_20px_-5px_rgba(139,26,26,0.4)] group relative overflow-hidden",
            collapsed && "px-0 h-12 w-12 rounded-full"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 transition-transform group-hover:scale-110" />
          {!collapsed && <span className="font-medium text-base">Logout</span>}
        </button>
      </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#181818] shadow-md rounded-lg p-2 text-[#B7B7B7] hover:text-white transition border border-white/10"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-60 flex flex-col bg-[#181818] shadow-2xl lg:shadow-none transition-all duration-300 lg:relative lg:translate-x-0 h-screen overflow-hidden border-r border-[#00FF88]/20",
          collapsed ? "w-20" : "w-70",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Toggle Button */}
      <Button
        onClick={() => setCollapsed(!collapsed)}
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-10 h-6 w-6 rounded-full border border-white/10 bg-[#181818] shadow-md z-100 hover:bg-white/5 hidden lg:flex transition-all duration-300 text-[#B7B7B7] hover:text-white",
          collapsed ? "left-[68px]" : "left-[268px]"
        )}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </Button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}