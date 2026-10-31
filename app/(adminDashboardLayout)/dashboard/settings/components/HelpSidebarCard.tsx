"use client";

import React from "react";
import { MessageSquare, ArrowUpRight } from "lucide-react";

export default function HelpSidebarCard() {
  return (
    <aside className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
      <div className="w-10 h-10 rounded-full bg-[#F4F2EB] flex items-center justify-center text-[#58615A] mb-4">
        <MessageSquare className="w-5 h-5 text-[#58615A]" />
      </div>

      <h3 className="text-xl font-serif text-[#1C201D] tracking-tight mb-2">
        Need a little help?
      </h3>

      <p className="text-xs sm:text-sm text-[#666B67] leading-relaxed mb-5">
        For questions about your admin profile or account security, our support team is just a message away.
      </p>

      <a
        href="mailto:support@curtainz.ai"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1C201D] hover:underline"
      >
        <span>Contact support</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#1C201D]" />
      </a>
    </aside>
  );
}

