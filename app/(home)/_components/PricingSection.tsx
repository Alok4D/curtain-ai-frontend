"use client";

import { useState } from "react";
import PaymentForm from "./PaymentForm";

const PricingSection = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const plans = [
    {
      name: "Annual Plan",
      price: "$69.95",
      period: "/year",
      features: "",
      highlight: true,
      badge: "Best Value",
    },
    {
      name: "Monthly Plan",
      price: "$9.95",
      period: "/month",
      features: "Includes 7-day free trial",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-0 scroll-mt-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Background Typography & Heading */}
        <div className="relative mb-20 text-center">
          <h2 className="absolute inset-0 flex items-center justify-center font-inter text-[40px] font-bold text-[#FFFFFF14] md:text-[100px] tracking-wider">
            Subscription plan
          </h2>
          <h3 className="font-montserrat relative pt-8 text-3xl font-bold text-[#F2F2F2] md:pt-14 md:text-[40px] leading-[48px]">
            Subscription plan
          </h3>
        </div>

        {/* Pricing Cards Container */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex h-[319px] w-full max-w-[259px] flex-col items-start gap-[48px] rounded-[12px] border border-[#1F2630] bg-[#121821] px-5 py-6 transition-all hover:border-[#00FFA3]/20 ${plan.highlight ? "ring-1 ring-[#00FFA3]/10" : ""
                }`}
            >
              {/* "Best Value" Badge */}
              {plan.badge && (
                <div className="font-montserrat absolute left-[83.5px] top-[-16px] flex items-center justify-center gap-[10px] rounded-[4px] bg-white px-2 py-1 text-[14px] font-medium leading-[24px] text-[#121821]">
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col items-start gap-2">
                <h4 className="font-montserrat text-[24px] md:text-[32px] font-semibold leading-[40px] text-[#FFFFFF]">
                  {plan.name}
                </h4>

                <div className="min-h-[24px]">
                  {plan.features ? (
                    <p className="font-montserrat text-[16px] font-medium leading-[24px] text-[#FFFFFF]">
                      {plan.features}
                    </p>
                  ) : (
                    <div className="h-[24px]" />
                  )}
                </div>

                <div className="font-montserrat mt-4 flex items-baseline gap-1 text-[24px] md:text-[32px] font-semibold leading-[40px] text-[#F2F2F2]">
                  <span>{plan.price}</span>
                  <span className="text-lg opacity-80">{plan.period}</span>
                </div>
              </div>

              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="font-montserrat flex w-full self-stretch items-center justify-center gap-[10px] rounded-[10px] bg-[#00FF88] px-6 py-[14px] text-[16px] font-medium leading-[24px] text-[#0B0F14] transition-all hover:bg-[#00e692] hover:shadow-[0_0_20px_rgba(0,255,163,0.3)] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md">
            <div className="max-h-[90vh] overflow-y-auto rounded-[14px]">
              <PaymentForm onClose={() => setIsPaymentModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingSection;