import React from 'react';
import { ModalInput } from './ModalInput';

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditSubscriptionModal = ({ isOpen, onClose }: EditSubscriptionModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#0D121F] border border-gray-800 w-full max-w-md rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-2xl font-bold mb-8">Edit Subscription</h2>
        
        <div className="space-y-6">
          <ModalInput 
            label="Plan Name" 
            value="Monthly Subscription" 
          />
          
          <ModalInput 
            label="Price" 
            value="$9.95" 
          />
          
          <ModalInput 
            label="Duration" 
            placeholder="eg, 30 days" 
            type="select"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">
          <button 
            onClick={onClose}
            className="w-full py-3 border border-[#22C55E] text-[#22C55E] font-bold rounded-lg hover:bg-[#22C55E]/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#00FF85] hover:bg-[#00E676] text-black font-bold rounded-lg transition-colors"
          >
            Update Plan
          </button>
        </div>
      </div>
    </div>
  );
};