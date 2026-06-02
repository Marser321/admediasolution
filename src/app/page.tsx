import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import BTLTestimonialsSection from "@/components/sections/BTLTestimonialsSection";
import VSLSection from "@/components/sections/VSLSection";
import CRMSection from "@/components/sections/CRMSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import ScrollytellingSection from "@/components/sections/ScrollytellingSection";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import SectionTransition from "@/components/animations/SectionTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BlueprintSection from "@/components/sections/BlueprintSection";
import PromoPopup from "@/components/ui/PromoPopup";
import FloatingConsultWidget from "@/components/ui/FloatingConsultWidget";

export default function Home() {
  return (
    <main className="bg-background min-h-screen relative">
      <ScrollProgress />
      <Navbar />
      <PromoPopup />
      <FloatingConsultWidget />
      
      <HeroSection />
      <SectionTransition type="dissolve" />

      <BTLTestimonialsSection />
      <SectionTransition type="wipe-up" />
      
      <VSLSection />
      <SectionTransition type="fog" />
      
      <CRMSection />
      <SectionTransition type="line-expand" />
      
      <BlueprintSection />
      <SectionTransition type="line-expand" />
      
      <AuthoritySection />
      <SectionTransition type="fog" />
      
      <ScrollytellingSection />
      <SectionTransition type="dissolve" />
      
      <ProjectsGallery />
      <SectionTransition type="wipe-up" />
      
      <FooterContact />
      <IslandBar />
    </main>
  );
}
