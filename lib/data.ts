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
  gitUrl: string;
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
      "Joining the enterprise network team to support SD-WAN deployment and firewall management across large-scale telecom infrastructure serving Fortune 500 clients.",
      "Focused on network security operations, infrastructure automation, and Fixed Wireless Access systems in a production telecommunications environment.",
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
      "Designed and proposed an autonomous Mars rover system using 360-degree AEOS cameras and reinforcement learning for continuous terrain mapping without Earth command center intervention, presented to NASA engineers.",
      "Engineered LIDAR-integrated navigation architecture with onboard decision-making, reducing mission cost and weight while eliminating signal-delay downtime through autonomous path planning.",
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
      "Built ML models achieving 98% accuracy for real-time satellite telemetry anomaly detection, integrating threat detection and encrypted communications analysis mapped to SPARTA and MITRE ATT&CK frameworks.",
      "Engineered secure data pipelines processing multi-GB time-series datasets from embedded aerospace systems, collaborating directly with L3Harris engineers on production-ready satellite security monitoring.",
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
      "Led Smart Transit Greeley — developed route optimization algorithms analyzing commuting patterns across 114,000+ residents, with ML models projecting up to 33% reduction in urban CO2 emissions.",
      "Delivered data-driven policy recommendations directly to the Greeley City Council, translating computational findings into actionable public transportation strategy.",
    ],
    status: "COMPLETED",
  },
];

export const projects: Project[] = [
  {
    title: "NFL Stats Prediction Model",
    tech: "Python / TensorFlow / XGBoost / NVIDIA CUDA",
    description:
      "{{87%}} prediction accuracy on NFL player performance using ensemble ML pipeline trained on 5 years of historical stats. XGBoost and deep neural network models combined via stacking. Accelerated training {{8x}} from 6 hours to 45 minutes using NVIDIA GPU parallel computation with TensorFlow CUDA backend.",
    colSpan: "md:col-span-2",
    rowSpan: "row-span-2",
    pattern: "neural",
    gitUrl: "https://github.com/Jeramiahmm",
  },
  {
    title: "Smart Transit Greeley",
    tech: "Python / Scikit-learn / Pandas / GeoPandas",
    description:
      "Urban transit optimization system for {{114,000+}} residents. Built ML models simulating ridership behavior and route efficiency, projecting {{33%}} CO2 reduction through data-driven restructuring. Findings presented as actionable policy recommendations directly to the Greeley City Council.",
    colSpan: "md:col-span-1",
    rowSpan: "row-span-2",
    pattern: "transit",
    gitUrl: "https://github.com/Jeramiahmm",
  },
  {
    title: "Satellite Telemetry Anomaly Detection",
    tech: "Python / TensorFlow / SPARTA / MITRE ATT&CK",
    description:
      "Real-time anomaly detection system achieving {{98%}} accuracy on satellite telemetry streams. Processed multi-GB time-series datasets from embedded aerospace sensors through secure pipelines mapped to SPARTA and MITRE ATT&CK threat frameworks. Built in direct collaboration with L3Harris defense engineers.",
    colSpan: "md:col-span-3",
    rowSpan: "row-span-1",
    pattern: "orbital",
    gitUrl: "https://github.com/Jeramiahmm",
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
  linkedin: "linkedin.com/in/uriel-mendoza-94t",
  github: "github.com/Jeramiahmm",
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
