"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "#about" },
  { name: "AI Visualizer", href: "#visualizer" },
  { name: "FAQ", href: "#faq" },
  { name: "Services", href: "#services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#004642] sticky top-0 z-50 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-4 lg:px-4">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo */}
          <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90">
            <Image
              src="https://curtainz.ai/_app/immutable/assets/curtainzLogoWhite.DNEf-IQo.svg"
              alt="Curtainz Logo"
              width={140}
              height={36}
              priority
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links & Action */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[16px] leading-[24px] font-normal text-[#D4D4D4] hover:text-white transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <Link
              href="#book-visit"
              className="bg-white hover:bg-neutral-100 text-[#004642] text-[13.5px] font-bold tracking-[0.06em] uppercase px-5 py-2.5 rounded-sm transition-colors duration-150 shadow-sm"
            >
              BOOK A FREE VISIT
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#D4D4D4] hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#003835] border-t border-[#005a55] px-6 py-5">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[16px] font-medium text-[#D4D4D4] hover:text-white py-1 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#book-visit"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full bg-white hover:bg-neutral-100 text-[#004642] text-[13.5px] font-bold tracking-[0.06em] uppercase py-3 rounded-sm transition-colors"
              >
                BOOK A FREE VISIT
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}