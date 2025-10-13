import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import MissionSection from '@/components/home/MissionSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import TechnologySection from '@/components/home/TechnologySection';
import InnovationSection from '@/components/home/InnovationSection';
import NewsletterSection from '@/components/home/Newslettersection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <ProductShowcase />
      <TechnologySection />
      <InnovationSection />
      <NewsletterSection />
    </>
  );
}