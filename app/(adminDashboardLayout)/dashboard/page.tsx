import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Layers,
  TrendingUp,
  ArrowUpRight,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

// Static mock data for overview metrics & tables
const metrics = [
  {
    title: "AI Room Previews",
    value: "1,842",
    change: "+24.5%",
    subtitle: "Rooms transformed with AI",
    icon: Sparkles,
    color: "text-[#004642]",
    bgColor: "bg-[#004642]/10",
  },
  {
    title: "Home Visit Requests",
    value: "128",
    change: "+18.2%",
    subtitle: "16 pending consultations",
    icon: Calendar,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Active Fabric Catalog",
    value: "24",
    change: "3 Categories",
    subtitle: "Curtains, Sheers, Rollers",
    icon: Layers,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
  },
  {
    title: "Consultation Pipeline",
    value: "AED 94,500",
    change: "+14.0%",
    subtitle: "Estimated custom orders",
    icon: TrendingUp,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
];

const recentAiPreviews = [
  {
    id: 1,
    client: "Sarah Al-Maktoum",
    area: "Palm Jumeirah",
    fabric: "Emerald Velvet",
    category: "Curtains",
    time: "12 mins ago",
    roomImage: "/before_image.png",
    fittedImage: "/after_image.png",
  },
  {
    id: 2,
    client: "David Harrison",
    area: "Dubai Marina",
    fabric: "Blue Lenin",
    category: "Curtains",
    time: "45 mins ago",
    roomImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    fittedImage: "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
  },
  {
    id: 3,
    client: "Fatima Al-Zahra",
    area: "Downtown Dubai",
    fabric: "Plain Arctic",
    category: "Sheers",
    time: "2 hours ago",
    roomImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    fittedImage: "/after_image.png",
  },
  {
    id: 4,
    client: "Michael Vance",
    area: "Arabian Ranches",
    fabric: "Weiss Ice",
    category: "Rollers",
    time: "3 hours ago",
    roomImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    fittedImage: "https://curtainz-ae.b-cdn.net/media/curtain_options/display/Generated_Image_September_04_2025_-_10_15PM.jpeg",
  },
];

const recentBookings = [
  {
    id: "BK-1082",
    name: "Amina Rahman",
    phone: "+971 50 123 4567",
    area: "Dubai Hills Estate",
    curtainType: "Wave-Fold Curtains & Sheers",
    preferredDate: "Tomorrow, 2:00 PM",
    status: "Pending",
  },
  {
    id: "BK-1081",
    name: "James Thornton",
    phone: "+971 52 987 6543",
    area: "Bluewaters Island",
    curtainType: "Motorized Blackout Drapes",
    preferredDate: "Nov 02, 11:00 AM",
    status: "Confirmed",
  },
  {
    id: "BK-1080",
    name: "Elena Rostova",
    phone: "+971 55 432 1098",
    area: "Jumeirah Golf Estates",
    curtainType: "Custom Linen Drapes",
    preferredDate: "Nov 03, 4:00 PM",
    status: "Confirmed",
  },
  {
    id: "BK-1079",
    name: "Tariq Mansoor",
    phone: "+971 54 876 5432",
    area: "Al Barari",
    curtainType: "Double Track Roller Blinds",
    preferredDate: "Nov 04, 10:30 AM",
    status: "Pending",
  },
  {
    id: "BK-1078",
    name: "Chloe Dupont",
    phone: "+971 50 334 5566",
    area: "City Walk, Al Wasl",
    curtainType: "Floor-Length Silk Sheers",
    preferredDate: "Completed Oct 29",
    status: "Completed",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 font-['Urbanist',sans-serif]">

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  {metric.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl ${metric.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {metric.value}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-bold text-emerald-600 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {metric.change}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    &bull; {metric.subtitle}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Recent AI In-Situ Visualizations */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-[#004642] tracking-tight">
              Recent AI Room Previews
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Live previews generated by customers across Dubai
            </p>
          </div>
          <Link
            href="/generate-image"
            className="text-xs font-semibold text-[#004642] hover:underline"
          >
            Launch Visualizer &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentAiPreviews.map((preview) => (
            <div
              key={preview.id}
              className="group border border-gray-100 bg-gray-50/50 rounded-xl p-3 hover:bg-white hover:border-[#004642]/30 hover:shadow-md transition-all duration-200"
            >
              {/* Image Preview Thumb */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-3 shadow-inner">
                <Image
                  src={preview.fittedImage}
                  alt={preview.fabric}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {preview.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-[#004642]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {preview.time}
                </span>
              </div>

              {/* Client & Choice Info */}
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-gray-800 truncate">
                  {preview.fabric}
                </p>
                <p className="text-[11px] text-gray-500">
                  {preview.client} &bull;{" "}
                  <span className="text-[#004642] font-medium">
                    {preview.area}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
