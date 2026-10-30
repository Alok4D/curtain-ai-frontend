import { Hexagon, Shield, Star, CreditCard } from "lucide-react";

interface FeatureItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: <Hexagon className="w-7 h-7 text-[#043d34] stroke-[1.75]" />,
    title: "Premium fabrics",
    description: "Hotel-grade materials selected for Dubai's sun, chosen to last.",
  },
  {
    id: 2,
    icon: <Shield className="w-7 h-7 text-[#043d34] stroke-[1.75]" />,
    title: "Free measurement",
    description: "We visit your home, measure every window and bring fabric samples — at no cost.",
  },
  {
    id: 3,
    icon: <Star className="w-7 h-7 text-[#043d34] stroke-[1.75]" />,
    title: "Expert tailoring",
    description: "Skilled artisans stitch every curtain to your exact measurements.",
  },
  {
    id: 4,
    icon: <CreditCard className="w-7 h-7 text-[#043d34] stroke-[1.75]" />,
    title: "Flexible payment",
    description: "Pay in full or split into a 3-month installment plan — your choice.",
  },
];

export default function WhyCurtainzSection() {
  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-24 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387px] mx-auto px-2 md:px-2 lg:px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="block text-[12px] md:text-[13px] font-bold tracking-[0.16em] text-[#043d34] uppercase mb-2">
            WHY CURTAINZ
          </span>
          <h2 className="text-[32px] md:text-[42px] leading-[1.2] font-bold text-[#043d34] tracking-tight">
            From preview to installation, we handle everything
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-[#edf2f0] rounded-[22px] p-7 md:p-8 flex flex-col justify-start transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              {/* Icon */}
              <div className="mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-[17px] md:text-[18px] font-bold text-[#043d34] tracking-tight mb-2.5">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] md:text-[14.5px] leading-[1.6] text-[#4f6360]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}