import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import ScrollytellingSection from "@/components/sections/ScrollytellingSection";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import ScannerSection from "@/components/sections/ScannerSection";
import FooterContact from "@/components/sections/FooterContact";
import IslandBar from "@/components/layout/IslandBar";

export default function Home() {
  return (
    <main className="bg-bg-deep min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <AuthoritySection />
      <ScrollytellingSection />
      <ProjectsGallery />
      <ScannerSection />
      <FooterContact />
      <IslandBar />
    </main>
  );
}
