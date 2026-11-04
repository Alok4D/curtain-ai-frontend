const VirtualTryOnHero = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Video Column (lg spans 7/12) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <div className="relative aspect-[3/2] w-full max-w-xl lg:max-w-3xl overflow-hidden rounded-none">
              <video
                src="/curtain-video/curtain-visuals-ouput.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content Column (lg spans 5/12) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center justify-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Virtual Try-On
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              See how our curtains look in your room instantly. Upload a photo, choose any fabric, and watch the AI drape it perfectly over your window in seconds.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center border-2 border-black hover:border-[#004642] text-black bg-white font-semibold text-lg px-8 py-3 rounded-md hover:bg-[#004642] hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Try frames now!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTryOnHero;
