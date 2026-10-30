import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface StepItem {
  step: number;
  title: string;
  description: string;
  image: string;
}

const steps: StepItem[] = [
  {
    step: 1,
    title: "Snap your room",
    description: "Take a photo of the room with your phone, or upload one you already have.",
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1000&auto=format&fit=crop",
  },
  {
    step: 2,
    title: "Pick a style",
    description: "Browse real fabrics \u2014 curtains, sheers and rollers \u2014 from our Dubai collection.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    step: 3,
    title: "See it on your windows",
    description: "Our AI drapes the fabric onto your photo in seconds. Love it? We measure, sew and install.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-16 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-2 lg:px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="block text-[11px] md:text-[12px] font-bold tracking-[0.2em] text-[#004642] uppercase mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-[30px] md:text-[40px] leading-[1.2] font-bold text-[#004642] tracking-tight">
            Three steps to your perfect curtains
          </h2>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 md:mb-14">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-[#edf2f0] rounded-[24px] p-5 sm:p-6 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-transform duration-200"
            >
              {/* Step Pill Badge */}
              <div className="w-7 h-7 rounded-full bg-[#e8efed] text-[#004642] text-[12px] font-bold flex items-center justify-center mb-5">
                {item.step}
              </div>

              {/* Step Image */}
              <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-6 bg-[#f4f7f6]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Step Title */}
              <h3 className="text-[17px] md:text-[18px] font-bold text-[#004642] tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="text-[13.5px] md:text-[14px] leading-[1.6] text-[#556965] max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#004642] hover:bg-[#003431] text-white text-[15px] font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <span>Try it now — it&apos;s free</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </section>
  );
}