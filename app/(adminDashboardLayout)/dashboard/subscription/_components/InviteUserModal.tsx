import { InviteModalInput } from './InviteModalInput';

export const InviteUserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#0D121F] border border-gray-800 w-full max-w-[400px] rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-2xl font-bold mb-8">Invite User</h2>
        
        <div className="space-y-6">
          <InviteModalInput 
            label="Email" 
            placeholder="Enter email address" 
          />
          
          <InviteModalInput 
            label="Duration" 
            placeholder="eg, 30 days" 
            type="select"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">
          <button 
            onClick={onClose}
            className="w-full py-3 border border-[#065F46] text-[#10B981] font-bold rounded-lg hover:bg-[#10B981]/5 transition-colors text-sm"
          >
            Cancel
          </button>
          <button className="w-full py-3 bg-[#00FF85] hover:bg-[#00E676] text-black font-bold rounded-lg transition-colors text-sm">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};