
const FeaturesSection = () => {
  const features = [
    {
      title: "Market Intelligence",
      description:
        "Real-time odds comparison, expected value calculations, and sharp money tracking across all major markets.",
      icon: (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 24C50.9117 24 63 19.9706 63 15C63 10.0294 50.9117 6 36 6C21.0883 6 9 10.0294 9 15C9 19.9706 21.0883 24 36 24Z" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 15V57C9 59.387 11.8446 61.6761 16.9081 63.364C21.9716 65.0518 28.8392 66 36 66C43.1608 66 50.0284 65.0518 55.0919 63.364C60.1554 61.6761 63 59.387 63 57V15" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 36C9 38.3869 11.8446 40.6761 16.9081 42.364C21.9716 44.0518 28.8392 45 36 45C43.1608 45 50.0284 44.0518 55.0919 42.364C60.1554 40.6761 63 38.3869 63 36" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Historical Edge",
      description:
        "Deep historical data analysis, trend identification, and pattern recognition to uncover systematic advantages.",
      icon: (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M66 21L40.5 46.5L25.5 31.5L6 51" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M48 21H66V39" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "SharpBot AI",
      description:
        "AI-powered assistant that explains complex data patterns in plain language, structured around facts.",
      icon: (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 24V12H24" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M54 24H18C14.6863 24 12 26.6863 12 30V54C12 57.3137 14.6863 60 18 60H54C57.3137 60 60 57.3137 60 54V30C60 26.6863 57.3137 24 54 24Z" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 42H12" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 42H66" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M45 39V45" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M27 39V45" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#0B0E11] py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Header Section */}
        <div className="relative mb-16 text-center">
          <h2 className="absolute inset-0 flex items-center justify-center font-inter text-[40px] font-bold text-[#FFFFFF14] md:text-[100px] whitespace-nowrap">
            Data-First Intelligence
          </h2>
          <h3 className="font-montserrat relative pt-6 text-3xl font-bold text-[#F2F2F2] md:pt-10 md:text-[40px] leading-[48px]">
            How it works
          </h3>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex w-full max-w-[384px] flex-col items-start gap-[48px] rounded-[12px] border border-[#1F2630] bg-[#121821] px-6 py-5 transition-all hover:border-[#00FFA3]/30"
            >
              {/* Icon Container */}
              <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-[28px] bg-[#00FF880A] px-3 aspect-square">
                {feature.icon}
              </div>

              {/* Content Block */}
              <div className="flex flex-col gap-4">
                <h4 className="font-montserrat text-[24px] md:text-[32px] font-semibold leading-[40px] text-[#FFFFFF]">
                  {feature.title}
                </h4>
                <p className="font-montserrat self-stretch text-[16px] md:text-[20px] font-normal leading-[32px] text-[#B7B7B7]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;