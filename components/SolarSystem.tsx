"use client";

import Sun from "./Sun";
import Planet from "./Planet";
import OrbitPath from "./OrbitPath";
import SkillsRing from "./SkillsRing";
import ProjectMoons from "./ProjectMoons";
import CertSatellites from "./CertSatellites";
import ContactPulse from "./ContactPulse";

const ORBITS = {
  education: 3.4,
  skills: 5.2,
  projects: 7.4,
  certifications: 9.6,
  contact: 11.8
};

export default function SolarSystem({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group>
      <Sun reducedMotion={reducedMotion} />

      {Object.values(ORBITS).map((r) => (
        <OrbitPath key={r} radius={r} />
      ))}

      <Planet
        id="education"
        label="Education"
        orbitRadius={ORBITS.education}
        size={0.32}
        baseColor="#5B6470"
        accentColor="#7A8494"
        atmosphereColor="#8B96A5"
        pattern="cratered"
        speed={0.22}
        angleOffset={0.2}
        reducedMotion={reducedMotion}
      />

      <Planet
        id="skills"
        label="Skills"
        orbitRadius={ORBITS.skills}
        size={0.55}
        baseColor="#1F3D37"
        accentColor="#4FD8C4"
        atmosphereColor="#4FD8C4"
        pattern="continents"
        speed={0.15}
        angleOffset={2.1}
        reducedMotion={reducedMotion}
      >
        <SkillsRing baseSize={0.55} />
      </Planet>

      <Planet
        id="projects"
        label="Projects"
        orbitRadius={ORBITS.projects}
        size={0.75}
        baseColor="#8A5A28"
        accentColor="#C98A3E"
        atmosphereColor="#F2B84B"
        pattern="banded"
        speed={0.1}
        angleOffset={4.0}
        reducedMotion={reducedMotion}
      >
        <ProjectMoons baseSize={0.75} reducedMotion={reducedMotion} />
      </Planet>

      <Planet
        id="certifications"
        label="Certifications"
        orbitRadius={ORBITS.certifications}
        size={0.4}
        baseColor="#4A3E30"
        accentColor="#6C5B4A"
        atmosphereColor="#F2B84B"
        pattern="cratered"
        speed={0.08}
        angleOffset={1.2}
        reducedMotion={reducedMotion}
      >
        <CertSatellites baseSize={0.4} />
      </Planet>

      <Planet
        id="contact"
        label="Contact"
        orbitRadius={ORBITS.contact}
        size={0.5}
        baseColor="#1B4B44"
        accentColor="#4FD8C4"
        atmosphereColor="#4FD8C4"
        pattern="ice"
        speed={0.06}
        angleOffset={3.3}
        reducedMotion={reducedMotion}
      >
        <ContactPulse reducedMotion={reducedMotion} />
      </Planet>
    </group>
  );
}
