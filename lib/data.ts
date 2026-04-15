export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  status: "INCOMING" | "ACTIVE" | "COMPLETED";
  logoId: "lumen" | "nasa" | "l3harris" | "unc";
}

export interface Project {
  title: string;
  tech: string;
  description: string;
  colSpan: string;
  rowSpan: string;
  pattern: "neural" | "transit" | "orbital";
}

export interface Certification {
  issuer: string;
  name: string;
  date: string;
  newest?: boolean;
  backDetails: {
    skills: string[];
    status: string;
  };
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "LUMEN TECHNOLOGIES",
    role: "Network Engineer Intern",
    location: "Denver, CO",
    period: "Summer 2026",
    logoId: "lumen",
    highlights: [
      "Supporting enterprise network infrastructure, SD-WAN deployment, and firewall management across large-scale telecom systems",
      "Incoming intern working on network security and infrastructure automation",
    ],
    status: "INCOMING",
  },
  {
    company: "NASA L'SPACE NPWEE",
    role: "Robotics & AI Team Member",
    location: "Remote",
    period: "Jan 2026 — Present",
    logoId: "nasa",
    highlights: [
      "Competitively selected for NASA admissions to contribute to mission-focused robotics and AI proposals aligned with NASA research objectives",
      "Collaborating with cross-disciplinary teams on autonomous systems and aerospace mission concepts using engineering methodologies",
    ],
    status: "ACTIVE",
  },
  {
    company: "PURDUE DATA MINE — L3HARRIS",
    role: "Student Researcher",
    location: "Remote",
    period: "Aug 2025 — Present",
    logoId: "l3harris",
    highlights: [
      "Built ML models for real-time satellite telemetry anomaly detection achieving 98% accuracy mapped to SPARTA and MITRE ATT&CK frameworks",
      "Engineered secure data pipelines processing multi-GB time-series datasets from embedded aerospace systems for production-ready monitoring",
    ],
    status: "ACTIVE",
  },
  {
    company: "COOLER BLAST — UNC",
    role: "Climate Data Scientist",
    location: "Greeley, CO",
    period: "Sep 2025 — Jan 2026",
    logoId: "unc",
    highlights: [
      "Led Smart Transit Greeley — route optimization algorithms analyzing commuting patterns across 114,000+ residents",
      "Built Python ML models projecting 33% urban CO2 reduction; delivered policy recommendations directly to Greeley City Council",
    ],
    status: "COMPLETED",
  },
];

export const projects: Project[] = [
  {
    title: "NFL Stats Prediction Model",
    tech: "Python / TensorFlow / XGBoost",
    description:
      "{{87%}} prediction accuracy on NFL player performance using 5 years of historical data. Accelerated training {{8x}} — from 6 hours to 45 minutes — via NVIDIA GPU parallel computation.",
    colSpan: "md:col-span-2",
    rowSpan: "row-span-2",
    pattern: "neural",
  },
  {
    title: "Smart Transit Greeley",
    tech: "Python / ML / Route Optimization",
    description:
      "Urban transit optimization for {{114,000+}} residents. ML-simulated ridership projecting {{33%}} CO2 reduction. Results delivered to Greeley City Council as actionable policy.",
    colSpan: "md:col-span-1",
    rowSpan: "row-span-2",
    pattern: "transit",
  },
  {
    title: "Satellite Telemetry Anomaly Detection",
    tech: "Python / TensorFlow / SPARTA / MITRE ATT&CK",
    description:
      "Real-time satellite anomaly detection at {{98%}} accuracy. Secure multi-GB data pipelines for embedded aerospace systems. Built in collaboration with L3Harris engineers.",
    colSpan: "md:col-span-3",
    rowSpan: "row-span-1",
    pattern: "orbital",
  },
];

export const certifications: Certification[] = [
  {
    issuer: "Amazon Web Services",
    name: "AWS CLOUD PRACTITIONER",
    date: "April 2026",
    newest: true,
    backDetails: {
      skills: ["Cloud Architecture", "AWS Core Services", "Security & Compliance", "Billing & Pricing"],
      status: "Verified",
    },
  },
  {
    issuer: "CompTIA",
    name: "SECURITY+",
    date: "February 2026",
    backDetails: {
      skills: ["Threat Analysis", "Network Security", "Cryptography", "Risk Management"],
      status: "Verified",
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "LANGUAGES",
    skills: [
      "Python (Advanced)",
      "Java",
      "SQL",
      "JavaScript",
      "C++",
      "HTML/CSS",
    ],
  },
  {
    label: "ML & DATA SCIENCE",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    label: "SECURITY & NETWORKING",
    skills: [
      "SPARTA",
      "MITRE ATT&CK",
      "SD-WAN",
      "Firewalls",
      "IAM",
      "Threat Detection",
    ],
  },
  {
    label: "CLOUD & TOOLS",
    skills: [
      "AWS (CCP)",
      "Docker",
      "Linux/Unix",
      "Git/GitHub",
      "REST APIs",
      "MySQL/PostgreSQL",
    ],
  },
];

export const contactInfo = {
  email: "jeramiahblinks@gmail.com",
  linkedin: "linkedin.com/in/uriel-mendoza",
  github: "github.com/uriel-mendoza",
  website: "mendozauriel.com",
  education: {
    school: "University of Colorado Boulder",
    degree: "B.S. Computer Science",
    minor: "Cybersecurity",
    gpa: "3.8",
    expected: "May 2028",
  },
  currently: [
    "NASA L'SPACE Researcher",
    "Purdue Data Mine",
    "Incoming @ Lumen",
  ],
  location: {
    city: "Denver, CO",
    remote: "Open to Remote",
    availability: "Available Summer 2026",
  },
};

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];
