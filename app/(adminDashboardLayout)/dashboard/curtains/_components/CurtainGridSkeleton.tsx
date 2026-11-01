export default function CurtainGridSkeleton() {
  return (
    <div className="space-y-5 animate-pulse font-['Urbanist',sans-serif]">
      {/* Header Skeleton */}
      <div className="bg-white p-5 rounded-none border border-gray-200 shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded-none mb-2" />
          <div className="h-4 w-72 bg-gray-100 rounded-none" />
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded-none" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="bg-white p-4 rounded-none border border-gray-200 shadow-none flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-gray-200 rounded-none" />
          <div className="h-9 w-20 bg-gray-100 rounded-none" />
          <div className="h-9 w-20 bg-gray-100 rounded-none" />
          <div className="h-9 w-20 bg-gray-100 rounded-none" />
        </div>
        <div className="h-9 w-64 bg-gray-100 rounded-none" />
      </div>

      {/* Grid of 8 Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-none flex flex-col"
          >
            {/* Image Placeholder */}
            <div className="aspect-square bg-gray-200 w-full" />

            {/* Content Placeholders */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-3/4 bg-gray-200 rounded-none" />
                  <div className="h-4 w-12 bg-gray-200 rounded-none" />
                </div>
                <div className="h-3 w-1/2 bg-gray-100 rounded-none" />
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="h-3 w-16 bg-gray-100 rounded-none" />
                <div className="flex gap-1.5">
                  <div className="h-6 w-6 bg-gray-100 rounded-none" />
                  <div className="h-6 w-6 bg-gray-100 rounded-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
