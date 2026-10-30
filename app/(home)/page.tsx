import Navbar from "./_components/Navbar";
import Intro from "./_components/Intro";
import FeaturesSection from "./_components/FeaturesSection";
import GetStarted from "./_components/GetStarted";
import PricingSection from "./_components/PricingSection";
import Footer from "./_components/Footer";
import FaqSection from "./_components/FaqSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyCurtainzSection from "./_components/WhyCurtainzSection";
import OurCollectionSection from "./_components/OurCollectionSection";
import BeforeAfterSection from "./_components/BeforeAfterSection";
import HowItWorksSection from "./_components/HowItWorksSection";

export default function page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
        
       
          <Navbar />
          <Intro />
   

      {/* Other Sections */}
  
        <FeaturesSection />
        <GetStarted />
        <PricingSection />
       

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
