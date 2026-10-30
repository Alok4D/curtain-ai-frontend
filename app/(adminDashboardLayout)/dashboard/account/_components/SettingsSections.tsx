"use client";

import { useState, useRef } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { InputField } from './InputField';

export const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState("/dashboard-logo/3a0e755d9cdd0c4a7cfd70e129a33021024dedf6 (1).jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#0D121F]/30 border border-gray-800 rounded-2xl p-8 space-y-8">
      <h3 className="text-gray-300 text-lg font-medium">Profile Information</h3>
      
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
          <img src={profileImage} alt="admin profile image" className="w-full h-full object-cover" />
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageChange}
        />
        
        <button 
          onClick={triggerFileInput}
          className="bg-[#00FF85] hover:bg-[#00E676] text-black font-medium py-2.5 px-6 rounded-lg text-sm transition-colors"
        >
          Change your photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full name" placeholder="Clash" Icon={User} />
        <InputField label="Email" placeholder="clash@example.com" Icon={Mail} />
      </div>

      <div className="flex justify-end">
        <button className="bg-[#00FF85] hover:bg-[#00E676] text-black font-medium py-2.5 px-10 rounded-lg transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};

export const ChangePassword = () => (
  <div className="bg-[#0D121F]/30 border border-gray-800 rounded-2xl p-8 space-y-6">
    <h3 className="text-gray-300 text-lg font-medium">Change Password</h3>
    
    <InputField label="Old password" placeholder="********" type="password" Icon={Lock} />
    <InputField label="Password" placeholder="********" type="password" Icon={Lock} showPasswordToggle />
    <InputField label="Confirm password" placeholder="********" type="password" Icon={Lock} showPasswordToggle />

    <div className="flex justify-end pt-4">
      <button className="bg-[#00FF85] hover:bg-[#00E676] text-black font-medium py-3 px-8 rounded-lg transition-colors">
        Update password
      </button>
    </div>
  </div>
);