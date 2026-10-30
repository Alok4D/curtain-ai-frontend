import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import FaqSection from "./_components/FaqSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyCurtainzSection from "./_components/WhyCurtainzSection";
import OurCollectionSection from "./_components/OurCollectionSection";
import BeforeAfterSection from "./_components/BeforeAfterSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import HeroSection from "./_components/HeroSection";

export default function page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">  
          <Navbar />
          <HeroSection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <OurCollectionSection />
      <WhyCurtainzSection />
      <TestimonialsSection />
      <FaqSection />
       <Footer />
    </main>
  );
}
