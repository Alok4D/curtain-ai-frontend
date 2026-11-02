"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "/#about-us" },
  { name: "AI Visualizer", href: "/#ai-visualizer" },
  { name: "FAQ", href: "/#faq" },
  { name: "Services", href: "/#services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsOpen(false);
    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace(/^\/?#/, "");
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#004642] font-['Urbanist',sans-serif] border-b border-emerald-900/40 shadow-xs">
      <div className="max-w-[1387px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 1. Left: Logo */}
          <div className="flex items-center justify-start shrink-0">
            <Link
              className="inline-flex items-center gap-2 py-1 focus:outline-none group"
              href="/"
              aria-label="Curtain AI home"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-1.5 text-white">
                <span className="flex gap-0.5">
                  <span className="w-1 h-5 bg-white rounded-sm inline-block" />
                  <span className="w-1 h-5 bg-white rounded-sm inline-block" />
                  <span className="w-1 h-5 bg-white rounded-sm inline-block" />
                </span>
                <span className="text-xl sm:text-2xl font-serif font-medium tracking-wide">
                  Curtain AI
                </span>
              </div>
            </Link>
          </div>

          {/* 2. Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-x-8 lg:gap-x-10 flex-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm lg:text-base text-white/90 hover:text-white font-medium transition-colors hover:underline underline-offset-8 decoration-2 decoration-white/60 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Right: Action Button & Mobile Toggle */}
          <div className="flex items-center justify-end gap-x-3 shrink-0">
            {/* Desktop CTA */}
            <Link
              className="hidden md:inline-flex items-center justify-center text-xs lg:text-sm font-bold tracking-wider py-2.5 px-5 bg-white text-neutral-900 rounded-sm hover:bg-neutral-100 active:scale-95 transition-all uppercase shadow-xs whitespace-nowrap"
              href="/#book-visit"
              onClick={(e) => handleNavClick(e, "/#book-visit")}
            >
              Try your room
            </Link>

            {/* Mobile Mini CTA */}
            <Link
              className="md:hidden inline-flex items-center text-[11px] font-bold tracking-wider py-1.5 px-3 bg-white text-neutral-900 rounded-sm hover:bg-neutral-100 transition-colors uppercase whitespace-nowrap"
              href="/#book-visit"
              onClick={(e) => handleNavClick(e, "/#book-visit")}
            >
              Try your room
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#003835] border-t border-white/10 shadow-2xl transition-all duration-300">
          <div className="px-5 pt-3 pb-6 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-base font-semibold text-white/95 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </Link>
            ))}

            <div className="pt-3 mt-1 border-t border-white/10">
              <Link
                href="/#book-visit"
                onClick={(e) => handleNavClick(e, "/#book-visit")}
                className="flex items-center justify-center w-full py-3 px-4 rounded-md bg-white text-[#004642] font-bold text-sm uppercase tracking-wider hover:bg-emerald-50 active:scale-[0.98] transition-all shadow-md"
              >
                Try your room
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
