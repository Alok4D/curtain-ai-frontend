import FaqSection from "./_components/FaqSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyCurtainzSection from "./_components/WhyCurtainzSection";
import OurCollectionSection from "./_components/OurCollectionSection";
import BeforeAfterSection from "./_components/BeforeAfterSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import HeroSection from "./_components/HeroSection";

export default function page() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BeforeAfterSection />
      <OurCollectionSection />
      <WhyCurtainzSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
