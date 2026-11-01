import React from "react";
import { CurtainCard } from "./CurtainCard";
import { CurtainItem } from "./types";

interface CurtainGridProps {
  curtains: (CurtainItem | any)[];
  isLoading: boolean;
  onSelectCurtain: (curtain: CurtainItem | any) => void;
}

export const CurtainGrid: React.FC<CurtainGridProps> = ({
  curtains,
  isLoading,
  onSelectCurtain,
}) => {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mb-10"
        aria-busy="true"
        aria-label="Loading best curtains"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="rounded-2xl border-2 border-gray-200 bg-white p-2.5 w-full animate-pulse"
          >
            {/* Skeleton Image Area */}
            <div className="relative aspect-square bg-gray-200 rounded-xl mb-2.5 overflow-hidden" />
            {/* Skeleton Title Line */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto my-1" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mb-10"
      role="tabpanel"
    >
      {curtains.map((curtain) => (
        <CurtainCard
          key={curtain._id || curtain.id}
          curtain={curtain}
          onSelect={() => onSelectCurtain(curtain)}
        />
      ))}
    </div>
  );
};

