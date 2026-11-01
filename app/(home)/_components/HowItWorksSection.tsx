import Image from "next/image";
import Link from "next/link";

interface StepItem {
  step: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const steps: StepItem[] = [
  {
    step: 1,
    title: "Snap your room",
    description:
      "Take a photo of the room with your phone, or upload one you already have.",
    image: "/images/how-it-works/step-1-upload.png",
    alt: "Photographing a bare window with a smartphone to start an AI curtain preview",
  },
  {
    step: 2,
    title: "Pick a style",
    description:
      "Browse real fabrics curtains, sheers and rollers from our Dubai collection.",
    image: "/images/how-it-works/step-2-choose-fabric.png",
    alt: "Browsing curtain, sheer and blind fabrics on Curtainz visualizer",
  },
  {
    step: 3,
    title: "See it on your windows",
    description:
      "Our AI drapes the fabric onto your photo in seconds. Love it? We measure, sew and install.",
    image: "/images/how-it-works/step-3-preview.png",
    alt: "The same window shown dressed with wave-fold curtains in the AI preview",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-heading"
      className="bg-gray-50 font-['Urbanist',sans-serif]"
    >
      <div className="w-full max-w-[1387px] mx-auto px-4 py-12 md:py-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs md:text-sm font-bold tracking-[0.15em] text-[#004642] uppercase">
            How it works
          </p>
          <h2
            id="how-heading"
            className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#004642] tracking-tight mt-1.5 md:mt-2"
          >
            Three steps to your perfect curtains
          </h2>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-6 shadow-sm text-center flex flex-col items-center"
            >
              {/* Number Circle Badge */}
              <div className="w-12 h-12 mx-auto rounded-full bg-[#004642]/10 flex items-center justify-center text-[#004642] font-bold text-lg">
                {item.step}
              </div>

              {/* Step Image */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mt-4 relative">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Step Title */}
              <h3 className="text-lg font-bold text-[#004642] mt-3">
                {item.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}
