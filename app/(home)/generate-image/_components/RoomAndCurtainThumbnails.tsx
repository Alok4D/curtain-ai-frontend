import Image from "next/image";
import Link from "next/link";

interface RoomAndCurtainThumbnailsProps {
  roomImage: string;
  curtainImage: string;
  curtainName: string;
}

export function RoomAndCurtainThumbnails({
  roomImage,
  curtainImage,
  curtainName,
}: RoomAndCurtainThumbnailsProps) {
  return (
    <div className="flex gap-3">
      {/* Your Room Thumbnail */}
      <div className="flex-1 text-center">
        <div className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <Image
            src={roomImage}
            alt="Uploaded Room"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-1">Your Room</p>
      </div>

      {/* Selected Curtain Thumbnail */}
      <div className="flex-1">
        <Link href="/select-curtains" className="group relative block">
          <div className="absolute inset-0 h-20 sm:h-24 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <p className="text-white text-[11px] font-medium">Change</p>
          </div>
          <div className="relative w-full h-20 sm:h-24 rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <Image
              src={curtainImage}
              alt="Selected Curtain"
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <p className="text-[11px] text-gray-500 mt-1 text-center truncate">
          {curtainName}
        </p>
      </div>
    </div>
  );
}

