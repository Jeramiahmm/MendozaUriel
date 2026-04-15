import { SideNav } from "@/components/side-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { GeometricDivider } from "@/components/geometric-divider";
import { SectionTransition } from "@/components/section-transition";

export default function Home() {
  return (
    <main id="main-content">
      <SideNav />
      <MobileNav />
      <ThemeToggle />
      <HeroSection />
      <GeometricDivider variant="diamond" />
      <SectionTransition>
        <ExperienceSection />
      </SectionTransition>
      <GeometricDivider variant="circuit" />
      <SectionTransition>
        <ProjectsSection />
      </SectionTransition>
      <SectionTransition>
        <SkillsSection />
      </SectionTransition>
      <GeometricDivider variant="hexagon" />
      <SectionTransition>
        <CertificationsSection />
      </SectionTransition>
      <GeometricDivider variant="dots" />
      <SectionTransition>
        <ContactSection />
      </SectionTransition>
    </main>
  );
}
