"use client";

import {  CreditCard, ChevronDown, X } from "lucide-react";

interface PaymentFormProps {
  onClose?: () => void;
}

const PaymentForm = ({ onClose }: PaymentFormProps) => {
  return (
    <div className="relative flex w-full max-w-md flex-col items-start gap-[10px] rounded-[14px] border border-[#00FF8833] bg-[#0B0F14] p-6 shadow-[0_2px_8px_0_rgba(0,255,163,0.20)]">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <form className="space-y-6">
        {/* Email field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Email</label>
          <input
            type="text"
            placeholder="Full name on card"
            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#00FFA3]/50 transition-colors"
          />
        </div>

        {/* Card Information - Grouped */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Card information</label>
          <div className="overflow-hidden rounded-xl border border-white/20">
            <div className="relative flex items-center border-b border-white/20 px-4 py-3">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full bg-transparent text-white placeholder-gray-600 outline-none"
              />
              <div className="flex gap-1 ml-2 opacity-80">
                <div className="h-5 w-8 rounded bg-white/10" /> {/* Visa Placeholder */}
                <div className="h-5 w-8 rounded bg-white/10" /> {/* Master Placeholder */}
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="MM / YY"
                className="w-1/2 border-r border-white/20 bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none"
              />
              <div className="relative flex w-1/2 items-center px-4 py-3">
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full bg-transparent text-white placeholder-gray-600 outline-none"
                />
                <CreditCard size={18} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Cardholder name</label>
          <input
            type="text"
            placeholder="Full name on card"
            className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#00FFA3]/50"
          />
        </div>

        {/* Country or Region - Grouped */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Country or region</label>
          <div className="overflow-hidden rounded-xl border border-white/20">
            <div className="relative flex items-center border-b border-white/20 bg-transparent px-4 py-3">
              <select className="w-full appearance-none bg-transparent text-white outline-none">
                <option>United States</option>
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ZIP"
              className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 outline-none"
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          className="font-montserrat flex w-full self-stretch items-center justify-center gap-[10px] rounded-[10px] bg-[#00FF88] px-7 py-[14px] text-[16px] font-medium leading-[24px] text-[#0B0F14] transition-all hover:bg-[#00e692] hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] active:scale-[0.98]"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;