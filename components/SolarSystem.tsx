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
  mercury: 2.6,
  venus: 3.8,
  earth: 5.0,
  mars: 6.2,
  jupiter: 7.6,
  saturn: 9.4,
  uranus: 11.2,
  neptune: 13.0
};

export default function SolarSystem({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group>
      <Sun reducedMotion={reducedMotion} />

      {Object.values(ORBITS).map((r) => (
        <OrbitPath key={r} radius={r} />
      ))}

      {/* 1. Mercury - Education */}
      <Planet
        id="education"
        label="Education"
        orbitRadius={ORBITS.mercury}
        size={0.24}
        baseColor="#6E7A8A"
        accentColor="#9BB0C7"
        atmosphereColor="#B0C2D6"
        pattern="cratered"
        speed={0.35}
        angleOffset={0.2}
        reducedMotion={reducedMotion}
      />

      {/* 2. Venus - Skills */}
      <Planet
        id="skills"
        label="Skills"
        orbitRadius={ORBITS.venus}
        size={0.34}
        baseColor="#8B6F3E"
        accentColor="#D4A373"
        atmosphereColor="#E9D8A6"
        pattern="rocky"
        speed={0.28}
        angleOffset={2.1}
        reducedMotion={reducedMotion}
      >
        <SkillsRing baseSize={0.34} />
      </Planet>

      {/* 3. Earth - Experience */}
      <Planet
        id="experience"
        label="Experience"
        orbitRadius={ORBITS.earth}
        size={0.38}
        baseColor="#102A45"
        accentColor="#4C9F70"
        atmosphereColor="#82CAFF"
        pattern="continents"
        speed={0.22}
        angleOffset={0.8}
        reducedMotion={reducedMotion}
      />

      {/* 4. Mars - Projects */}
      <Planet
        id="projects"
        label="Projects"
        orbitRadius={ORBITS.mars}
        size={0.28}
        baseColor="#8B3020"
        accentColor="#C8503C"
        atmosphereColor="#FF8A75"
        pattern="cratered"
        speed={0.18}
        angleOffset={4.0}
        reducedMotion={reducedMotion}
      >
        <ProjectList baseSize={0.28} />
      </Planet>

      {/* 5. Jupiter - Certifications */}
      <Planet
        id="certifications"
        label="Certifications"
        orbitRadius={ORBITS.jupiter}
        size={0.75}
        baseColor="#9E5E21"
        accentColor="#FFAA33"
        atmosphereColor="#FFD085"
        pattern="banded"
        speed={0.12}
        angleOffset={1.2}
        reducedMotion={reducedMotion}
      >
        <CertSatellites baseSize={0.75} />
      </Planet>

      {/* 6. Saturn - Achievements */}
      <Planet
        id="achievements"
        label="Achievements"
        orbitRadius={ORBITS.saturn}
        size={0.65}
        baseColor="#9E8D6B"
        accentColor="#E6C48E"
        atmosphereColor="#FFECB3"
        pattern="banded"
        speed={0.09}
        angleOffset={5.3}
        reducedMotion={reducedMotion}
      >
        {/* Saturn Ring Mesh */}
        <mesh rotation={[Math.PI / 2.5, Math.PI / 8, 0]}>
          <ringGeometry args={[0.9, 1.5, 64]} />
          <meshStandardMaterial
            color="#E6C48E"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            roughness={0.5}
          />
        </mesh>
      </Planet>

      {/* 7. Uranus - Future Goals */}
      <Planet
        id="goals"
        label="Future Goals"
        orbitRadius={ORBITS.uranus}
        size={0.45}
        baseColor="#206470"
        accentColor="#7FE5F0"
        atmosphereColor="#A1F1F9"
        pattern="ice"
        speed={0.06}
        angleOffset={2.9}
        reducedMotion={reducedMotion}
      >
        {/* Uranus tilted vertical ring */}
        <mesh rotation={[Math.PI / 6, Math.PI / 2, 0]}>
          <ringGeometry args={[0.65, 0.85, 64]} />
          <meshStandardMaterial
            color="#7FE5F0"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>
      </Planet>

      {/* 8. Neptune - Contact */}
      <Planet
        id="contact"
        label="Contact"
        orbitRadius={ORBITS.neptune}
        size={0.43}
        baseColor="#0F3572"
        accentColor="#4A89FF"
        atmosphereColor="#83AEFF"
        pattern="ice"
        speed={0.04}
        angleOffset={3.3}
        reducedMotion={reducedMotion}
      >
        <ContactPulse reducedMotion={reducedMotion} />
      </Planet>
    </group>
  );
}
