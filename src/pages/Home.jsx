import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import PromoBanner from '../components/PromoBanner';
import TrustSection from '../components/TrustSection';
import BrandSection from '../components/BrandSection';
import AboutSection from '../components/AboutSection';
import StoreLocations from '../components/StoreLocations';
import ContactCTA from '../components/ContactCTA';

function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
      <TrustSection />
      <BrandSection />
      <AboutSection />
      <StoreLocations />
      <ContactCTA />
    </>
  );
}

export default Home;
