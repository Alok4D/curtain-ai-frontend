interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Amazing customer service from start to finish! The team was friendly, knowledgeable, and kept me informed every step of the way. As an interior designer, I was definitely satisfied with the work and will continue to work with them.",
    author: "Kseniia Igumnova",
  },
  {
    id: 2,
    text: "Great customer service, quick execution, good quality product, competitive prices. Very happy with their services. Will surely use them again for future projects.",
    author: "Christina Scholze",
  },
  {
    id: 3,
    text: "We got curtains for three of our rooms. They were very nicely done \u2014 sleek and modern. They were also quick to deliver and install. Definitely recommend.",
    author: "Lana Rayes",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#FFFFFF] py-16 md:py-16 font-['Urbanist',sans-serif]">
      <div className="max-w-[1387] mx-auto px-6 md:px-12 lg:px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="block text-[12px] md:text-[13px] font-bold tracking-[0.16em] text-[#043d34] uppercase mb-2">
            3000+ Happy Clients
          </span>
          <h2 className="text-[32px] md:text-[42px] leading-[1.2] font-bold text-[#043d34] tracking-tight">
            What our clients say
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#F9FAFB] rounded-[22px] p-8 md:p-9 flex flex-col justify-between transition-transform duration-200"
            >
              <div>
                {/* Chartreuse / Lime Accent Quote Mark */}
                <div className="text-[#cfd820] text-3xl font-serif font-bold leading-none mb-5 select-none">
                  &#10077;&#10077;
                </div>

                {/* Review Text */}
                <p className="text-[14.5px] md:text-[15px] leading-[1.65] text-[#425551]">
                  {item.text}
                </p>
              </div>

              {/* Author Name */}
              <div className="mt-8 pt-2">
                <span className="text-[14px] md:text-[15px] font-bold text-[#043d34] tracking-tight">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}