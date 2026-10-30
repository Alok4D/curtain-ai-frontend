"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Is the AI curtain visualizer really free?",
    answer:
      "Yes. You can generate up to 5 AI previews of curtains on your own room photo, completely free — no sign-up, no credit card, no app to install.",
  },
  {
    id: 2,
    question: "How does the AI preview work?",
    answer:
      "Upload a photo of your room, pick a curtain, sheer or roller style you like, and our AI drapes that exact fabric onto your windows in about 20–30 seconds.",
  },
  {
    id: 3,
    question: "Can I preview blinds and sheers, not just curtains?",
    answer:
      "Absolutely. The visualizer supports curtains and drapes, sheers, roller blinds and more — switch between styles and compare them on the same photo.",
  },
  {
    id: 4,
    question: "What happens after I find a look I love?",
    answer:
      "Message us on WhatsApp or book a free home visit. Our team measures your windows, brings fabric samples so you can feel the material, and gives you a fixed quote — with professional installation included.",
  },
  {
    id: 5,
    question: "Does it work on my phone?",
    answer:
      "Yes. Everything runs in your browser, on any phone, tablet or computer. You can even take the room photo with your phone camera as you go.",
  },
];

export default function FaqSection() {

  const [openId, setOpenId] = useState<number | null>(5);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-24 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-2 lg:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[12px] md:text-[13px] font-bold tracking-[0.15em] text-[#043d34] uppercase mb-3">
              QUESTIONS?
            </span>

            <h2 className="text-[32px] md:text-[42px] leading-[1.15] font-bold text-[#043d34] tracking-tight mb-4">
              Frequently asked questions
            </h2>

            <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#4b615d] mb-8 max-w-sm">
              Can&apos;t find your answer here? Message us on WhatsApp — a real person
              from our Dubai team replies within minutes.
            </p>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#045c4f] hover:bg-[#03493e] text-white text-[15px] font-semibold transition-colors duration-200 shadow-sm"
            >
              {/* WhatsApp Icon */}
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12C2.031 13.844 2.531 15.563 3.406 17.063L2 22.188L7.281 20.813C8.719 21.625 10.344 22.063 12.031 22.063C17.547 22.063 22.031 17.578 22.031 12.063C22.031 6.547 17.547 2 12.031 2ZM12.031 20.375C10.531 20.375 9.094 19.969 7.844 19.219L7.531 19.031L4.406 19.844L5.25 16.781L5.031 16.438C4.219 15.156 3.75 13.625 3.75 12C3.75 7.438 7.469 3.719 12.031 3.719C16.594 3.719 20.313 7.438 20.313 12C20.313 16.563 16.594 20.375 12.031 20.375ZM16.563 14.594C16.313 14.469 15.094 13.875 14.875 13.781C14.656 13.688 14.5 13.656 14.344 13.906C14.188 14.156 13.719 14.719 13.563 14.875C13.438 15.063 13.281 15.094 13.031 14.969C12.781 14.844 11.969 14.563 11 13.719C10.25 13.031 9.75 12.188 9.594 11.938C9.469 11.688 9.594 11.531 9.719 11.406C9.844 11.281 9.969 11.094 10.094 10.969C10.219 10.844 10.25 10.75 10.344 10.594C10.438 10.438 10.375 10.281 10.313 10.156C10.25 10.031 9.75 8.781 9.531 8.281C9.313 7.781 9.125 7.844 8.969 7.844C8.844 7.844 8.688 7.844 8.531 7.844C8.375 7.844 8.125 7.906 7.906 8.156C7.688 8.406 7.094 8.969 7.094 10.094C7.094 11.219 7.906 12.313 8.031 12.469C8.156 12.625 9.688 14.969 12 16C12.563 16.25 12.969 16.375 13.313 16.5C13.875 16.656 14.375 16.656 14.781 16.594C15.25 16.531 16.219 16 16.438 15.438C16.656 14.844 16.656 14.375 16.563 14.594Z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Right Column: FAQ Accordion Stack */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="w-full bg-white border border-[#e1e8e6] rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-[16px] md:text-[17px] font-semibold text-[#0a352d] tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[#0a352d] shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 stroke-[2]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 stroke-[2]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-[14.5px] md:text-[15px] leading-[1.65] text-[#556965]">
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