import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-[#004642] text-white selection:bg-[#0a6456] selection:text-white font-['Urbanist',sans-serif]">
      {/* Main Container */}
      <div className="w-full max-w-[1387px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 flex flex-col justify-center pt-10 sm:pt-14 md:pt-16 lg:pt-20">
        {/* ==================== FOOTER SECTION ==================== */}
        <footer className="w-full">
          {/* Top Footer Grid (Responsive: 1-col brand + sub-grid for Explore, Legal & Contact) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-8 sm:pb-10 md:pb-14">
            {/* Column 1: Brand Info (Left) */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start pr-0 md:pr-4">
              {/* Brand Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-3.5 sm:mb-4 md:mb-5 group focus:outline-none"
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

              {/* Brand Description */}
              <p className="text-[#cadbd8] text-[13px] sm:text-[13.5px] leading-[1.65] font-normal max-w-sm md:max-w-[320px]">
                Made-to-measure curtains, sheers and blinds in Bangladesh - previewed
                on your own windows with AI before you buy.
              </p>
            </div>

            {/* Columns 2, 3 & 4: Explore, Legal & Contact Grid */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-10">
              {/* Column 2: Navigation Links (EXPLORE) */}
              <div className="flex flex-col">
                <h3 className="text-white text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-3 sm:mb-4">
                  Explore
                </h3>
                <ul className="space-y-2 sm:space-y-2.5 text-[13px] sm:text-[14px]">
                  <li>
                    <Link
                      href="/#ai-visualizer"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      AI Curtain Visualizer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#services"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      Curtain Styles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#book-visit"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      Book a Free Home Visit
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#faq"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Legal Links (LEGAL) */}
              <div className="flex flex-col">
                <h3 className="text-white text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-3 sm:mb-4">
                  Legal
                </h3>
                <ul className="space-y-2 sm:space-y-2.5 text-[13px] sm:text-[14px]">
                  <li>
                    <Link
                      href="/terms"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-[#cadbd8] hover:text-white transition-colors inline-block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact (GET IN TOUCH) */}
              <div className="flex flex-col items-start col-span-2 sm:col-span-1">
                <h3 className="text-white text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-3 sm:mb-4">
                  Get in touch
                </h3>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0b6557] hover:bg-[#0e7464] active:bg-[#09574a] text-white text-[12.5px] sm:text-[13.5px] font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[9px] shadow-sm mb-3 sm:mb-4 transition-all duration-200"
                >
                  {/* WhatsApp Icon */}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.83 7.39C8.64 7.39 8.33 7.46 8.07 7.74C7.81 8.02 7.07 8.71 7.07 10.12C7.07 11.53 8.1 12.89 8.24 13.08C8.38 13.27 10.23 16.14 13.07 17.37C15.43 18.39 15.91 18.19 16.42 18.14C16.94 18.1 18.08 17.47 18.32 16.81C18.55 16.14 18.55 15.56 18.48 15.44C18.41 15.32 18.23 15.25 17.95 15.11C17.67 14.97 16.32 14.3 16.07 14.21C15.82 14.12 15.63 14.07 15.45 14.35C15.26 14.63 14.73 15.25 14.57 15.44C14.41 15.63 14.25 15.65 13.97 15.51C13.69 15.37 12.79 15.08 11.73 14.13C10.9 13.39 10.34 12.48 10.2 12.25C10.06 12.02 10.19 11.89 10.33 11.75C10.45 11.63 10.6 11.43 10.74 11.27C10.88 11.11 10.93 10.99 11.02 10.81C11.11 10.62 11.07 10.46 11 10.32C10.93 10.18 10.37 8.81 10.14 8.25C9.91 7.71 9.68 7.78 9.51 7.78C9.35 7.77 9.17 7.77 8.98 7.77L8.83 7.39Z" />
                  </svg>
                  <span>WhatsApp us</span>
                </a>

                {/* Location text */}
                <p className="text-[#cadbd8] text-[12.5px] sm:text-[13.5px] font-normal">
                  Bangladesh, Dhaka
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Divider Line */}
          <div className="w-full h-[1px] bg-white/10" />

          {/* Bottom Bar: Copyright */}
          <div className="py-5 sm:py-6 md:py-7 flex flex-col items-center justify-center text-center gap-1.5 text-[11.5px] sm:text-[12.5px] text-[#b8ccc8]">
            <div>© {currentYear} Curtainz. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
