"use client";

import { useState } from 'react';
import { EditSubscriptionModal } from './EditSubscriptionModal';

interface SubscriptionCardProps {
  title: string;
  description?: string;
  price: string;
  period: string;
  isBestValue?: boolean;
}

export const SubscriptionCard = ({ 
  title, 
  description, 
  price, 
  period, 
  isBestValue 
}: SubscriptionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <EditSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      {isBestValue && (
        <div className="absolute -top-3 left-22 z-10">
          <span className="bg-white text-black text-[11px] font-medium px-3 py-1 rounded-sm shadow-lg">
            Best Value
          </span>
        </div>
      )}

      <div className={`w-[260px] h-[340px] bg-[#0D121F] border border-gray-800 rounded-xl p-8 flex flex-col justify-between items-center text-center transition-all hover:border-gray-700`}>
        <div className="space-y-4">
          <h3 className="text-white text-2xl font-semibold tracking-tight">{title}</h3>
          {description && (
            <p className="text-gray-400 text-xs font-medium">{description}</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white text-3xl font-bold">{price}</span>
          <span className="text-white text-xl font-bold">/{period}</span>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 bg-[#00FF85] hover:bg-[#00E676] text-black font-bold rounded-lg transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};