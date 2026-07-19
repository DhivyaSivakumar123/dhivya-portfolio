"use client";

import * as THREE from "three";
import Sun from "./Sun";
import Planet from "./Planet";
import OrbitPath from "./OrbitPath";
import SkillsRing from "./SkillsRing";
import ProjectList from "./ProjectList";
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
        baseColor="#6E7A8A"
        accentColor="#9BB0C7"
        atmosphereColor="#B0C2D6"
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
        baseColor="#0E473C"
        accentColor="#00FFD1"
        atmosphereColor="#00FFD1"
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
        baseColor="#9E5E21"
        accentColor="#FFAA33"
        atmosphereColor="#FFAA33"
        pattern="banded"
        speed={0.1}
        angleOffset={4.0}
        reducedMotion={reducedMotion}
      >
        {/* Saturn-like planetary rings */}
        <mesh rotation={[Math.PI / 2.5, Math.PI / 8, 0]}>
          <ringGeometry args={[1.05, 1.7, 64]} />
          <meshStandardMaterial
            color="#FFAA33"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            roughness={0.5}
          />
        </mesh>
        <ProjectList baseSize={0.75} />
      </Planet>

      <Planet
        id="certifications"
        label="Certifications"
        orbitRadius={ORBITS.certifications}
        size={0.4}
        baseColor="#8B3020"
        accentColor="#FF5E42"
        atmosphereColor="#FF5E42"
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
        baseColor="#0A3F50"
        accentColor="#00E5FF"
        atmosphereColor="#00E5FF"
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
