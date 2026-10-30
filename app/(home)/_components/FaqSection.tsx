"use client";

import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 0,
    question: "Is the AI curtain visualizer really free?",
    answer:
      "Yes. You can generate up to 5 AI previews of curtains on your own room photo, completely free — no sign-up, no credit card, no app to install.",
  },
  {
    id: 1,
    question: "How does the AI preview work?",
    answer:
      "Upload a photo of your room, pick a curtain, sheer or roller style you like, and our AI drapes that exact fabric onto your windows in about 20–30 seconds.",
  },
  {
    id: 2,
    question: "Can I preview blinds and sheers, not just curtains?",
    answer:
      "Absolutely. The visualizer supports curtains and drapes, sheers, roller blinds and more — switch between styles and compare them on the same photo.",
  },
  {
    id: 3,
    question: "What happens after I find a look I love?",
    answer:
      "Message us on WhatsApp or book a free home visit. Our team measures your windows, brings fabric samples, and gives you a fixed quote — with professional installation included.",
  },
  {
    id: 4,
    question: "Does it work on my phone?",
    answer:
      "Yes. Everything runs in your browser, on any phone, tablet or computer. You can even take the room photo with your phone camera as you go.",
  },
];

export default function FaqSection() {
  // First item open by default like curtainz.ai
  const [openId, setOpenId] = useState<number | null>(0);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-gray-50 scroll-mt-20 md:scroll-mt-24 font-['Urbanist',sans-serif]"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Left Column (40% width on md) */}
          <div className="w-full md:w-[40%]">
            <p className="text-xs md:text-sm font-bold tracking-[0.15em] text-[#004642] uppercase">
              Questions?
            </p>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#004642] tracking-tight mt-1.5 md:mt-2"
            >
              Frequently asked questions
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mt-5">
              Can&apos;t find your answer here? Message us on WhatsApp — a real person
              from our Dubai team replies within minutes.
            </p>
            <div className="mt-6">
              <a
                href="https://wa.me/971523135707?text=Hi%20Curtainz!%20I'd%20like%20to%20know%20more%20about%20your%20made-to-measure%20curtains."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0E7367] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#0B5D54] text-sm transition-colors shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column (60% width on md) */}
          <div className="w-full md:w-[60%]">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 bg-white rounded-xl mb-3 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="flex items-center justify-between w-full py-4 px-5 focus:outline-none cursor-pointer text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <span
                      id={`faq-question-${faq.id}`}
                      className="text-base md:text-lg font-semibold text-gray-800 pr-4"
                    >
                      {faq.question}
                    </span>
                    <svg
                      className="w-5 h-5 text-[#004642] shrink-0 transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-content-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-5 pb-4 text-gray-600 text-sm md:text-base leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
