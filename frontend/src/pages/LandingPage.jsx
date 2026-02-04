import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SafetySection } from "@/components/landing/SafetySection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" data-testid="landing-page">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />
      <main>
        <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <SafetySection />
        <HowItWorksSection />
        <ProductPreviewSection />
        <AudienceSection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <Footer />
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}
