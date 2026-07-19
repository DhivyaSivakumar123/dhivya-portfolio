export type SectionId =
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "contact";

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  link?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
}

export const profile = {
  name: "Dhivya Sivakumar",
  role: "Backend Developer",
  tagline:
    "Final-year B.Tech Information Technology student building reliable, scalable backend systems.",
  cgpa: "8.5",
  gradYear: "2027"
};

export const about = {
  paragraphs: [
    "I'm a final-year B.Tech Information Technology student at Meenakshi Sundararajan Engineering College (MSEC) with a CGPA of 8.5. I enjoy solving programming problems in Java and continuously sharpening my problem-solving skills through Data Structures and Algorithms.",
    "My goal is to become a Backend Developer building scalable applications — strengthening my knowledge of Java, databases, and REST APIs while learning modern tools and industry best practices."
  ]
};

export const education = {
  degree: "Bachelor of Technology, Information Technology",
  school: "Meenakshi Sundararajan Engineering College (MSEC)",
  location: "Kodambakkam",
  years: "2023 — 2027",
  cgpa: "8.5",
  status: "Final year"
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    color: "#4FD8C4",
    skills: ["Java", "Python", "JavaScript", "SQL"]
  },
  {
    id: "backend",
    label: "Backend",
    color: "#F2B84B",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Spring Boot"]
  },
  {
    id: "databases",
    label: "Databases",
    color: "#7F9CF5",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firestore"]
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#F0997B",
    skills: ["React.js", "Next.js", "HTML", "CSS"]
  },
  {
    id: "core-cs",
    label: "Core CS",
    color: "#D4537E",
    skills: ["DSA", "OOP", "DBMS", "OS", "Theory of Computation"]
  },
  {
    id: "tools",
    label: "Tools",
    color: "#9AA5B3",
    skills: ["Git", "GitHub", "VS Code", "MySQL Workbench"]
  }
];

export const projects: Project[] = [
  {
    id: "loanai",
    name: "LoanAI Predictor",
    description:
      "AI-based loan approval prediction platform with SHAP-based explainability, built to automate loan screening with quick, data-driven decisions.",
    stack: ["React.js", "FastAPI", "Python", "Firestore", "Machine Learning"],
    link: "https://loan-aipredictor.vercel.app"
  },
  {
    id: "luma",
    name: "Luma — AI Mental Health Assistant",
    description:
      "A mental wellness platform offering AI-assisted conversations, mood tracking, and personalized wellness suggestions in a safe, accessible environment.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "OpenAI API"]
  },
  {
    id: "payment-orchestration",
    name: "Payment Orchestration Platform",
    description:
      "A backend-focused platform unifying multiple payment gateways behind one interface — handling intelligent transaction routing, retries, and secure workflows.",
    stack: ["Java", "Spring Boot", "REST APIs", "MySQL", "JWT"]
  },
  {
    id: "signal",
    name: "Signal — Smart Manager Workspace",
    description:
      "A centralized productivity dashboard integrating Gmail, Slack, Outlook, and Calendar into one view — helping managers track communication and tasks efficiently.",
    stack: ["React", "Node.js", "MongoDB", "Google APIs", "MS Graph API", "Slack API"]
  }
];

export const certifications: Certification[] = [
  {
    id: "ibm-ai",
    name: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    status: "completed"
  },
  {
    id: "java-cert",
    name: "Java Certification",
    issuer: "Core Java and OOP concepts",
    status: "in-progress"
  },
  {
    id: "fullstack-cert",
    name: "Full Stack Development Certification",
    issuer: "Frontend, backend, databases, REST APIs, deployment",
    status: "in-progress"
  }
];

export const contact = {
  email: "dhivyasivakumar00@gmail.com",
  linkedin: "linkedin.com/in/dhivya08",
  github: "github.com/DhivyaSivakumar123",
  leetcode: "leetcode.com/u/dhivya2006"
};

export const sections: { id: SectionId; label: string; command: string }[] = [
  { id: "about", label: "About", command: "cd ./about" },
  { id: "education", label: "Education", command: "cd ./education" },
  { id: "skills", label: "Skills", command: "cd ./skills" },
  { id: "projects", label: "Projects", command: "cd ./projects" },
  { id: "certifications", label: "Certifications", command: "cd ./certifications" },
  { id: "contact", label: "Contact", command: "cd ./contact" }
];
