import StatsSection from "@/components/home/StatsSection";
import HeroSustainability from "@/components/last/HeroSustainability";
import MissionPhilosophySection from "@/components/last/Missionphilosophysection";
import StorytellingSection from "@/components/last/Storytellingsection";

export default function SustainabilityPage() {
    return (
        <>
            <HeroSustainability />
            <MissionPhilosophySection />
            <StatsSection />
            <StorytellingSection />
        </>
    );
}