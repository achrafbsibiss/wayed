import StatsSection from "@/components/home/StatsSection";
import HeroLast from "@/components/last/HeroLast";
import MissionPhilosophySection from "@/components/last/Missionphilosophysection";
import StorytellingSection from "@/components/last/Storytellingsection";

export default function LastPage() {
    return (
        <>
            <HeroLast />
            <MissionPhilosophySection />
            <StatsSection />
            <StorytellingSection />
        </>
    );
}