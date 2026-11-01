import Link from "next/link";
import { MessageSquare, Calendar } from "lucide-react";

interface ConsultationCardProps {
  isGenerated: boolean;
}

export function ConsultationCard({ isGenerated }: ConsultationCardProps) {
  return (
    <div className="border-t border-gray-100 pt-4">
      <p className="text-xs font-semibold text-gray-700 mb-2.5 text-center">
        {isGenerated
          ? "Love the look? Let's make it real"
          : "Need help deciding?"}
      </p>
      <div className="flex flex-col gap-2">
        <a
          href="https://wa.me/971523135707?text=Hi%20Curtainz!%20I'd%20like%20to%20know%20more%20about%20your%20curtains."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#0E7367] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#0B5D54] text-sm transition-colors shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact us on WhatsApp</span>
        </a>

        <Link
          href="/#book-visit"
          className="flex items-center justify-center gap-2 bg-[#004642] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#003431] text-sm transition-colors shadow-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>Book A Free Visit</span>
        </Link>
      </div>
      <p className="text-[11px] text-gray-400 text-center mt-2.5">
        Free consultation - Our experts bring samples to your home.
      </p>
    </div>
  );
}

