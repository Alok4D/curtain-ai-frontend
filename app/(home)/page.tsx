import FaqSection from "./_components/FaqSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyCurtainzSection from "./_components/WhyCurtainzSection";
import OurCollectionSection from "./_components/OurCollectionSection";
import BeforeAfterSection from "./_components/BeforeAfterSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import HeroSection from "./_components/HeroSection";
import FinishingTouchSection from "./_components/FinishingTouchSection";
import VirtualTryOnHero from "./_components/VirtualTryOnHero";

export default function page() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <OurCollectionSection />

     {/* <FinishingTouchSection />  */}
     <VirtualTryOnHero />
      <FaqSection />
      {/* <WhyCurtainzSection /> */}
      {/* <TestimonialsSection /> */}
    </>
  );
}
