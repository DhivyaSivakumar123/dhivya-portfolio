"use client";

import {
  about,
  education,
  skillCategories,
  projects,
  certifications,
  contact,
  profile,
  type SectionId
} from "@/data/content";
import { useStore } from "@/store/useStore";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-mono text-textSecondary border border-borderStrong rounded px-2 py-1">
      {children}
    </span>
  );
}

function AboutContent() {
  return (
    <div className="space-y-4">
      {about.paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-textSecondary leading-relaxed">
          {p}
        </p>
      ))}
      <div className="flex gap-6 pt-2">
        <div>
          <div className="font-mono text-xl text-teal">{profile.cgpa}</div>
          <div className="text-[11px] text-textMuted uppercase tracking-wide">CGPA</div>
        </div>
        <div>
          <div className="font-mono text-xl text-teal">{profile.gradYear}</div>
          <div className="text-[11px] text-textMuted uppercase tracking-wide">Graduating</div>
        </div>
      </div>
    </div>
  );
}

function EducationContent() {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-mono text-amber">{education.years}</p>
      <h3 className="text-base font-display">{education.degree}</h3>
      <p className="text-sm text-textSecondary">
        {education.school}, {education.location}
      </p>
      <div className="flex gap-6 pt-2">
        <div>
          <div className="font-mono text-xl text-teal">{education.cgpa}</div>
          <div className="text-[11px] text-textMuted uppercase tracking-wide">CGPA</div>
        </div>
        <div>
          <div className="font-mono text-xl text-teal">{education.status}</div>
          <div className="text-[11px] text-textMuted uppercase tracking-wide">Status</div>
        </div>
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="space-y-4">
      {skillCategories.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: cat.color }}
            />
            <h4 className="text-xs font-mono text-textSecondary">{cat.label}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsContent({ activeProject }: { activeProject: string | null }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <div
          key={p.id}
          id={`project-${p.id}`}
          className={`border rounded-lg p-4 transition-colors ${
            activeProject === p.id
              ? "border-teal bg-tealDim/20"
              : "border-border bg-surfaceRaised"
          }`}
        >
          <h3 className="text-sm font-display mb-1">{p.name}</h3>
          <p className="text-xs text-textSecondary mb-3 leading-relaxed">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {p.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-teal hover:underline"
            >
              View live demo →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function CertificationsContent() {
  return (
    <div className="space-y-3">
      {certifications.map((cert) => (
        <div key={cert.id} className="border border-border rounded-lg p-4 bg-surfaceRaised">
          <span
            className={`inline-block text-[10px] font-mono rounded px-2 py-0.5 mb-2 ${
              cert.status === "completed"
                ? "bg-tealDim text-teal"
                : "bg-amberDim text-amber"
            }`}
          >
            {cert.status === "completed" ? "completed" : "in progress"}
          </span>
          <h3 className="text-sm font-display mb-1">{cert.name}</h3>
          <p className="text-xs text-textSecondary">{cert.issuer}</p>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  const links = [
    { label: "email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "linkedin", value: contact.linkedin, href: `https://${contact.linkedin}` },
    { label: "github", value: contact.github, href: `https://${contact.github}` },
    { label: "leetcode", value: contact.leetcode, href: `https://${contact.leetcode}` }
  ];
  return (
    <div className="space-y-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border border-border rounded-lg px-4 py-3 bg-surfaceRaised hover:border-teal transition-colors"
        >
          <span className="text-[11px] font-mono text-textMuted">{l.label}</span>
          <span className="text-sm text-text">{l.value}</span>
        </a>
      ))}
    </div>
  );
}

export default function SectionPanel({ id }: { id: SectionId }) {
  const activeProject = useStore((s) => s.activeProject);

  switch (id) {
    case "about":
      return <AboutContent />;
    case "education":
      return <EducationContent />;
    case "skills":
      return <SkillsContent />;
    case "projects":
      return <ProjectsContent activeProject={activeProject} />;
    case "certifications":
      return <CertificationsContent />;
    case "contact":
      return <ContactContent />;
    default:
      return null;
  }
}
