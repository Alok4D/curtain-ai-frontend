import Image from "next/image";

export default function Intro() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        {/* Hero Title */}
        <h1 className="font-montserrat mx-auto mb-8 max-w-5xl text-[40px] md:text-[72px] font-bold tracking-tight text-[#F2F2F2] leading-normal">
          Find +EV <span className="italic text-[#00FF88] font-normal">Opportunities</span> <br />
          Before the Market Moves
        </h1>

        {/* Hero Description */}
        <p className="mx-auto mb-10 max-w-[946px] text-[18px] md:text-[24px] font-normal leading-[32px] text-[#B7B7B7] font-montserrat">
          Advanced sports analytics powered by real-time data, historical trends, and AI-driven insights. 
          Identify value where others see noise.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-24">
          <button className="group flex items-center justify-center gap-[10px] rounded-[10px] bg-[#00FF88] px-6 py-[14px] text-lg font-bold text-black transition-all hover:bg-[#00e692] hover:shadow-[0_0_25px_rgba(0,255,163,0.5)] active:scale-95">
            Get Early Access
          </button>
          
          <button className="flex items-center justify-center gap-[10px] rounded-[10px] border border-white bg-transparent px-6 py-[14px] text-lg font-bold text-white transition-all hover:bg-white/10 active:scale-95">
            View Dashboard
          </button>
        </div>

        {/* Dashboard Preview Image */}
        <div className="relative mx-auto max-w-[1146px] group">
          {/* Enhanced Outer Glow */}
          {/* <div className="absolute -inset-10 bg-[#00FFA3]/15 blur-[120px] opacity-60 group-hover:opacity-80 transition-opacity" /> */}
          
          <div className="relative overflow-hidden rounded-3xl  border-white/10 bg-[#0A0C10]/40 shadow-2xl backdrop-blur-sm">
             <Image 
              src="/banner-dashboard-image.svg" 
              alt="Sharp Matrix AI Dashboard" 
              width={1200} 
              height={800} 
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
