import { ChevronDown } from 'lucide-react';

interface InviteModalInputProps {
  label: string;
  placeholder: string;
  type?: 'text' | 'select';
}

export const InviteModalInput = ({ label, placeholder, type = 'text' }: InviteModalInputProps) => {
  return (
    <div className="space-y-2 w-full text-left">
      <label className="text-gray-400 text-xs font-medium">{label}</label>
      <div className="relative">
        {type === 'select' ? (
          <>
            <select className="w-full bg-[#1C1C1C] border border-gray-800 rounded-lg py-3 px-4 text-gray-400 appearance-none focus:outline-none focus:border-gray-600 cursor-pointer text-sm">
              <option value="">{placeholder}</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="unlimited">Unlimited</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </>
        ) : (
          <input
            type="email"
            placeholder={placeholder}
            className="w-full bg-[#1C1C1C] border border-gray-800 rounded-lg py-3 px-4 text-gray-300 text-sm focus:outline-none focus:border-gray-600 transition-colors"
          />
        )}
      </div>
    </div>
  );
};