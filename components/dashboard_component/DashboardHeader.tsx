"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function DashboardHeader() {
  return (
    <div className="w-full border-b border-[#00FF88]/20 py-4 px-6 z-40 bg-[#181818]">
      <div className="w-full mx-auto flex justify-between items-center gap-4">
        <div className="flex-1">
          {/* <h1 className="text-[20px] sm:text-[20px] font-medium text-white font-montserrat">
            Welcome to Clash Admin Dashboard
          </h1> */}
        </div>

        {/* Right side - User info */}
        <div className="flex items-center gap-3 sm:gap-4">


          <Avatar className="h-9 w-9 sm:h-10 sm:w-10 ring-2 ring-[#00FF88]/40 ring-offset-2 ring-offset-[#181818] transition-transform hover:scale-105">
          <Link href={"/dashboard/account"}>
            <AvatarImage
              src="/dashboard-logo/Ellipse 6.svg"
              alt="User"
              className="object-cover cursor-pointer"
            />
          </Link>
            <AvatarFallback className="bg-linear-to-br from-[#00FF88]/20 to-[#00FF88]/10 text-white font-semibold text-sm sm:text-base">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-[18px] font-normal font-montserrat text-white leading-[32px]">
              Clash Admin
            </p>
            <p className="text-[13px] font-medium font-montserrat text-gray-200 leading-[16px]">
              democlash@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
