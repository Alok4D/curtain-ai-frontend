"use client";

import  { useState } from 'react';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  Icon: LucideIcon;
  showPasswordToggle?: boolean;
}

export const InputField = ({ label, placeholder, type = "text", Icon, showPasswordToggle }: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determine current input type
  const currentType = showPasswordToggle 
    ? (isPasswordVisible ? "text" : "password") 
    : type;

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="space-y-2 w-full">
      <label className="text-gray-400 text-sm font-medium">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-500">
          <Icon size={18} />
        </div>
        <input
          type={currentType}
          placeholder={placeholder}
          className="w-full bg-transparent border border-gray-800 rounded-lg py-3 pl-12 pr-12 text-gray-300 focus:outline-none focus:border-gray-600 transition-colors"
        />
        {showPasswordToggle && (
          <button 
            type="button"
            onClick={toggleVisibility}
            className="absolute right-4 text-gray-500 hover:text-gray-300 focus:outline-none"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};