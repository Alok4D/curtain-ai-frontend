export const OverviewSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse font-['Urbanist',sans-serif]">
      {/* 4 Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-24 bg-gray-200 rounded" />
              <div className="w-9 h-9 rounded-xl bg-gray-200" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded-lg" />
            <div className="h-3 w-36 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* AI Previews Section Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
        <div className="flex justify-between items-center">
          <div className="space-y-1.5">
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-3.5 w-64 bg-gray-100 rounded" />
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-3 border border-gray-100 rounded-xl space-y-3">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg w-full" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-36 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* User Table Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="h-6 w-44 bg-gray-200 rounded" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
        <div className="space-y-3 pt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-12 bg-gray-100 rounded-xl w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

