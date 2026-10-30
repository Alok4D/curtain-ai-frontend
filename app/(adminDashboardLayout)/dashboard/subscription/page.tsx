"use client";

import { useState } from 'react';
import { SubscriptionCard } from "./_components/SubscriptionCard";
import { InviteUserModal } from "./_components/InviteUserModal";

export default function SubscriptionPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-8 sm:mb-12">
          <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Subscription plan
          </h1>
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3 bg-[#00FF85] hover:bg-[#00E676] text-black font-bold rounded-lg transition-colors"
          >
            Invite User
          </button>
        </div>

        {/* Cards Container */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-8">
          <SubscriptionCard
            title="Annual Plan"
            price="$69.95"
            period="year"
            isBestValue={true}
          />
          
          <SubscriptionCard 
            title="Monthly Plan"
            price="$9.95"
            period="month"
            description="Includes 7-day free trial"
            isBestValue={false}
          />
        </div>

        {/* Modals */}
        <InviteUserModal 
          isOpen={isInviteModalOpen} 
          onClose={() => setIsInviteModalOpen(false)} 
        />
      </div>
    </div>
  );
}