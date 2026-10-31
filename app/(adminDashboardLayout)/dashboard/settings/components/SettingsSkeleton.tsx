export default function SettingsSkeleton() {
  return (
    <div className="font-sans antialiased text-[#2D312E] animate-pulse">
      <div className="max-w-full mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-9 w-72 bg-[#E8E6DF] rounded-lg mb-2" />
          <div className="h-4 w-96 bg-[#EFECE5] rounded-md" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Cards Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Profile Information Card Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="mb-6">
                <div className="h-7 w-48 bg-[#E8E6DF] rounded-md mb-2" />
                <div className="h-4 w-80 bg-[#EFECE5] rounded-md" />
              </div>

              {/* Avatar Skeleton */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#E8E6DF]" />
                <div className="space-y-2">
                  <div className="h-8 w-28 bg-[#E8E6DF] rounded-lg" />
                  <div className="h-3 w-32 bg-[#EFECE5] rounded" />
                </div>
              </div>

              {/* Inputs Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="h-3.5 w-20 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
                <div>
                  <div className="h-3.5 w-20 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="h-3.5 w-24 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
                <div>
                  <div className="h-3.5 w-24 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F2EFE8]">
                <div className="h-4 w-28 bg-[#EFECE5] rounded" />
                <div className="h-9 w-28 bg-[#E8E6DF] rounded-lg" />
              </div>
            </div>

            {/* 2. Change Password Card Skeleton */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="mb-6">
                <div className="h-7 w-48 bg-[#E8E6DF] rounded-md mb-2" />
                <div className="h-4 w-72 bg-[#EFECE5] rounded-md" />
              </div>

              <div className="mb-4">
                <div className="h-3.5 w-28 bg-[#E8E6DF] rounded mb-2" />
                <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="h-3.5 w-24 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
                <div>
                  <div className="h-3.5 w-32 bg-[#E8E6DF] rounded mb-2" />
                  <div className="h-10 w-full bg-[#F4F2EB] rounded-lg border border-[#E5E3DC]" />
                </div>
              </div>

              <div className="h-3 w-80 bg-[#EFECE5] rounded mb-6" />

              <div className="flex items-center justify-between pt-4 border-t border-[#F2EFE8]">
                <div className="h-4 w-32 bg-[#EFECE5] rounded" />
                <div className="h-9 w-32 bg-[#E8E6DF] rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#ECEAE4]">
              <div className="w-10 h-10 rounded-full bg-[#E8E6DF] mb-4" />
              <div className="h-6 w-40 bg-[#E8E6DF] rounded mb-2" />
              <div className="h-4 w-full bg-[#EFECE5] rounded mb-2" />
              <div className="h-4 w-3/4 bg-[#EFECE5] rounded mb-5" />
              <div className="h-4 w-28 bg-[#E8E6DF] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

