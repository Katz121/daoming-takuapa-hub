import { HeroSection } from "@/components/hero/HeroSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { GableExplorer } from "@/components/gable/GableExplorer";
import { ArchiveGallery } from "@/components/archive/ArchiveGallery";
import { VisionPillars } from "@/components/vision/VisionPillars";
import { SpacesExplorer } from "@/components/spaces/SpacesExplorer";
import { EventsSection } from "@/components/events/EventsSection";
import { IdeasSection } from "@/components/ideas/IdeasSection";
import { SpaceBookingSection } from "@/components/spaces/SpaceBookingSection";
import { VisitSection } from "@/components/visit/VisitSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <GableExplorer />
      <ArchiveGallery />
      <VisionPillars />
      <SpacesExplorer />
      <EventsSection />
      <IdeasSection />
      <SpaceBookingSection />
      <VisitSection />
    </>
  );
}
