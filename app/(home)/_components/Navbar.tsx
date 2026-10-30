"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If the link is an anchor on the current page
    if (href.startsWith("/#") && window.location.pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <nav className="fixed left-0 right-0 z-50 px-4 md:px-0">
      <div className="mx-auto max-w-[1200px]">
        {/* Main Navbar Container */}
        <div className="relative flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-[#1A1C1E]/80 px-6 backdrop-blur-xl lg:px-10">

          {/* Logo Section */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex flex-col items-center">
              <Image src="/footer-image/Group 1171275819.svg" alt="Footer Logo" width={100} height={100} className="w-[55px] h-[42px]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex font-montserrat">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  color: '#FFF',
                  fontFamily: 'var(--text-style-text-style, Montserrat), sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '24px'
                }}
                className="transition-colors hover:text-[#00FFA3]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Log In Button (Desktop) */}
          <div className="hidden md:block">
            <Link href="/login">
              <button
                style={{
                  display: 'flex',
                  padding: 'var(--space-padding-8-px, 8px) var(--space-padding-space-between-desktop, 24px)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: 'var(--button-radius, 10px)',
                  background: 'var(--button-primary, #0F8)',
                  color: 'var(--button-text, #0B0F14)',
                  fontFamily: 'var(--text-style-text-style, Montserrat), sans-serif',
                  fontSize: 'var(--typography-scale-body-small, 14px)',
                  fontWeight: 500,
                  lineHeight: '24px'
                }}
                className="transition-all hover:opacity-90 active:scale-95 shadow-[0_0_15px_rgba(0,255,163,0.3)]"
              >
                Log In
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#1A1C1E] p-6 shadow-2xl md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{
                  color: '#FFF',
                  fontFamily: 'var(--text-style-text-style, Montserrat), sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '28px'
                }}
                className="hover:text-[#00FFA3]"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
          <Link href={"/login"}>
            <button
              style={{
                display: 'flex',
                width: '100%',
                padding: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: 'var(--button-radius, 10px)',
                background: 'var(--button-primary, #0F8)',
                color: 'var(--button-text, #0B0F14)',
                fontFamily: 'var(--text-style-text-style, Montserrat), sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '28px'
              }}
              className="active:scale-95 transition-all"
            >
              Log In
            </button>
    </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;