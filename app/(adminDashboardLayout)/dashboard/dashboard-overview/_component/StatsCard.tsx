"use client";

import { LucideIcon, ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  Icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  subtitle,
  Icon,
  color = "text-[#004642]",
  bgColor = "bg-[#004642]/10",
}: StatsCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between font-['Urbanist',sans-serif] hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5">
          {change && (
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-[11px] text-gray-400 truncate">
              &bull; {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
