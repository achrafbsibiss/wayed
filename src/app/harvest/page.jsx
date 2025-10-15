import HarvestHero from "@/components/harvest/Harvesthero";
import HarvestSeason from "@/components/harvest/HarvestSeason";


export const metadata = {
  title: 'Our Harvest - WAYD Groupe',
  description: 'Explore our premium organic vegetables including tomatoes, cucumbers, and more. View detailed nutritional information and request quotes.',
};

export default function HarvestPage() {
  return (
    <>
      <HarvestHero />
      <HarvestSeason />
    </>
  );
}