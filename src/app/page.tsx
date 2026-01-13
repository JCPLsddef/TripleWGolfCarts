import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { MobileQuoteForm } from '@/components/sections/MobileQuoteForm';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ChooseYourCart } from '@/components/sections/ChooseYourCart';
import { WhereCartsShine } from '@/components/sections/WhereCartsShine';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { DeliveryArea } from '@/components/sections/DeliveryArea';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { MobileBottomBar } from '@/components/sections/MobileBottomBar';
import { BackToTop } from '@/components/ui/BackToTop';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HeroVisual />
        <MobileQuoteForm />
        <WhyChooseUs />
        <ChooseYourCart />
        <WhereCartsShine />
        <HowItWorks />
        <Testimonials />
        <DeliveryArea />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
      <BackToTop />
    </>
  );
}
