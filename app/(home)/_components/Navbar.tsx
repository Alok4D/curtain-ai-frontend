"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
    href: string
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
    <header className="fixed inset-x-0 top-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-[#004642] font-['Urbanist',sans-serif]">
      <nav className="relative max-w-[1387px] mx-auto w-full flex flex-wrap md:flex-nowrap basis-full items-center justify-between px-2 sm:px-4 lg:px-4 py-4 md:py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            className="flex-none rounded-md inline-flex items-center py-2 focus:outline-none focus:opacity-90 group"
            href="/"
            aria-label="Curtainz home"
          >
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
          </Link>
          <div className="ms-1 sm:ms-2" />
        </div>

        {/* Right CTA & Mobile Toggle */}
        <div className="md:order-3 flex items-center gap-x-3">
          <div className="md:ps-3">
            <Link
              className="group inline-flex items-center gap-x-2 text-xs md:text-base py-2 px-3.5 bg-white font-semibold whitespace-nowrap text-neutral-800 rounded-sm focus:outline-none uppercase hover:bg-neutral-100 transition-colors shadow-sm"
              href="/#book-visit"
              onClick={(e) => handleNavClick(e, "/#book-visit")}
            >
              Try your room
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="size-9 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`overflow-hidden transition-all duration-300 basis-full grow md:block ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-y-3 md:gap-y-0 py-3 md:py-0 md:ps-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="pe-3 ps-px py-2 sm:px-3 md:py-4 text-base text-white hover:text-neutral-300 font-medium transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
