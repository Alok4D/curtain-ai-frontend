"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    id: 1,
    question: "How accurate is the AI visualizer compared to the finished curtains?",
    answer:
      "Our AI model accounts for ambient light, folds, and fabric weight to provide an exceptionally realistic rendering of how the texture and drape will look in your physical space.",
  },
  {
    id: 2,
    question: "Do I need special room lighting or photography equipment?",
    answer:
      "No specialized equipment is needed. A simple photo taken with your smartphone in daylight or standard interior lighting works perfectly.",
  },
  {
    id: 3,
    question: "What happens after I visualize my room?",
    answer:
      "Once you save your preferred look, our team can visit your home to take precise measurements, present physical fabric swatches, and provide an all-inclusive quote.",
  },
  {
    id: 4,
    question: "Can you accommodate motorized tracks and recessed ceiling slots?",
    answer:
      "Yes, we specialize in flush ceiling recesses, motorized smart systems, and custom architectural tracks integrated seamlessly into your space.",
  },
];

export default function AtelierFaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#F9FAFB] py-20 md:py-24 px-4 font-sans antialiased text-[#2D312E]">
      <div className="max-w-[820px] mx-auto">
        
        {/* Header Area */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="block text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-[#7D786F] mb-3">
            ATELIER KNOWLEDGE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-serif font-normal leading-[1.2] text-[#1E221E] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="flex flex-col space-y-3.5">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="w-full bg-gray-200 hover:bg-gray-200 rounded-lg transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-[15px] sm:text-[16px] font-medium text-[#222723] pr-4">
                    {item.question}
                  </span>
                  <span className="text-[#555B56] shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-5 pt-1 text-[14px] leading-relaxed text-[#5F6560] border-t border-[#EBE6DF]/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}