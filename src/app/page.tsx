import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import ScrollytellingSection from "@/components/sections/ScrollytellingSection";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";
import SectionTransition from "@/components/animations/SectionTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="bg-bg-deep min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <HeroSection />
      <SectionTransition type="dissolve" />
      
      <ServicesSection />
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
