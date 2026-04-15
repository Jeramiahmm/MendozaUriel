import { SideNav } from "@/components/side-nav";
import { MobileNav } from "@/components/mobile-nav";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { GeometricDivider } from "@/components/geometric-divider";

export default function Home() {
  return (
    <main id="main-content">
      <SideNav />
      <MobileNav />
      <HeroSection />
      <GeometricDivider variant="diamond" />
      <ExperienceSection />
      <GeometricDivider variant="circuit" />
      <ProjectsSection />
      <SkillsSection />
      <GeometricDivider variant="hexagon" />
      <CertificationsSection />
      <GeometricDivider variant="dots" />
      <ContactSection />
    </main>
  );
}
