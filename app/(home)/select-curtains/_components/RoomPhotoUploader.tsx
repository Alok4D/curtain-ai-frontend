import React from "react";
import { Camera } from "lucide-react";

interface RoomPhotoUploaderProps {
  onUploadClick: () => void;
}

export const RoomPhotoUploader: React.FC<RoomPhotoUploaderProps> = ({
  onUploadClick,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8 max-w-2xl mx-auto text-center border border-gray-100">
      <h2 className="text-base md:text-lg font-semibold text-[#004642] mb-1">
        First, add a photo of your room
      </h2>
      <p className="text-gray-500 text-sm mb-5">
        The AI needs your room photo to show curtains on your actual windows.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onUploadClick}
            className="cta-button border-2 rounded-lg px-8 py-5 text-black cursor-pointer w-full relative overflow-hidden gradient-border-flow"
          >
            <div className="flex items-center gap-4 justify-center">
              <Camera className="w-6 h-6 text-[#004642]" />
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-semibold text-neutral-900 leading-tight">
                  Upload your room photo
                </span>
                <span className="text-xs text-neutral-600 font-normal">
                  Free AI preview in ~20 seconds
                </span>
              </div>
            </div>
          </button>
          <p className="text-xs text-gray-400 mt-2">
            or drag & drop your image here
          </p>
        </div>
      </div>
    </div>
  );
};

