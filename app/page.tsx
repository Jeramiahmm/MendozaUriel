import { SideNav } from "@/components/side-nav";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <SideNav />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
