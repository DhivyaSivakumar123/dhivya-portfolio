"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { planetRefs } from "@/lib/refs";
import type { SectionId } from "@/data/content";
import { generatePlanetTextures } from "@/lib/planetTexture";
import { useIsCompact } from "@/hooks/useIsCompact";
import Atmosphere from "./Atmosphere";

interface PlanetProps {
  id: SectionId;
  label: string;
  orbitRadius: number;
  size: number;
  baseColor: string;
  accentColor: string;
  atmosphereColor: string;
  pattern: "rocky" | "banded" | "cratered" | "continents" | "ice";
  speed: number;
  angleOffset: number;
  reducedMotion: boolean;
  children?: React.ReactNode;
}

const getOverviewItems = (id: SectionId): string[] => {
  switch (id) {
    case "education":
      return [
        "MSEC - B.Tech IT (2023 - 2027)",
        "CGPA: 8.53 (Final year)"
      ];
    case "skills":
      return [
        "Core Java, Python, SQL, JS",
        "Spring Boot, REST APIs, Node.js",
        "MySQL, MongoDB, PostgreSQL",
        "React.js, Next.js, Git & GitHub"
      ];
    case "experience":
      return [
        "Symposium Coordinator @ MSEC",
        "Event planning & administration"
      ];
    case "projects":
      return [
        "LoanAI Predictor (FastAPI/ML)",
        "Luma AI Mental Health (Node)",
        "Payment Orchestration (Spring Boot)",
        "Signal Smart Workspace (React)",
        "MediMind AI (FastAPI/Gemini)"
      ];
    case "certifications":
      return [
        "Oracle Java SE (Ongoing)",
        "Full Stack Developer (Ongoing)",
        "IBM Artificial Intelligence"
      ];
    case "achievements":
      return [
        "School First in 12th Board (92.16%)",
        "Technical Paper Presentation Participant"
      ];
    case "goals":
      return [
        "JVM Concurrency & Performance tuning",
        "Spring Cloud Microservices Architecture",
        "Docker, Kubernetes, AWS basics"
      ];
    case "contact":
      return [
        "Email: dhivyasivakumar00@gmail.com",
        "LinkedIn: linkedin.com/in/dhivya08",
        "GitHub: DhivyaSivakumar123",
        "LeetCode: dhivya2006"
      ];
    default:
      return [];
  }
};

export default function Planet({
  id,
  label,
  orbitRadius,
  size,
  baseColor,
  accentColor,
  atmosphereColor,
  pattern,
  speed,
  angleOffset,
  reducedMotion,
  children
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(angleOffset);
  
  const [localHovered, setLocalHovered] = useState(false);

  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);
  const hoveredSection = useStore((s) => s.hoveredSection);
  const setHoveredSection = useStore((s) => s.setHoveredSection);

  const hovered = localHovered || hoveredSection === id;
  const paused = selected !== null || reducedMotion;

  const compact = useIsCompact();

  const maps = useMemo(() => {
    return generatePlanetTextures({
      baseColor,
      accentColor,
      pattern,
      seed: id,
      resolutionWidth: compact ? 256 : 512,
      resolutionHeight: compact ? 128 : 256
    });
  }, [baseColor, accentColor, pattern, id, compact]);

  useEffect(() => {
    return () => {
      if (maps) {
        maps.texture.dispose();
        maps.roughnessMap.dispose();
      }
    };
  }, [maps]);

  useEffect(() => {
    planetRefs[id] = groupRef.current;
    return () => {
      planetRefs[id] = null;
    };
  }, [id]);

  useFrame((state, delta) => {
    if (!paused) {
      angleRef.current += delta * speed;
    }
    const angle = angleRef.current;
    if (groupRef.current) {
      groupRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      );
    }
    if (bodyRef.current && !paused) {
      bodyRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={bodyRef}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHovered(true);
          setHoveredSection(id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setLocalHovered(false);
          setHoveredSection(null);
          document.body.style.cursor = "auto";
        }}
        scale={hovered ? 1.12 : 1}
      >
        <sphereGeometry args={[size, compact ? 24 : 48, compact ? 24 : 48]} />
        <meshStandardMaterial
          map={maps?.texture || null}
          roughnessMap={maps?.roughnessMap || null}
          roughness={1}
          metalness={0}
        />
      </mesh>

      <Atmosphere size={size} color={atmosphereColor} />

      {/* Screen-facing 2D HTML Label */}
      <Html position={[0, size + 0.15, 0]} center distanceFactor={8} zIndexRange={[50, 0]} pointerEvents="none">
        <div className={`font-mono text-[10px] px-2 py-0.5 rounded border border-borderStrong backdrop-blur transition-all select-none pointer-events-none whitespace-nowrap ${
          hovered ? "text-teal bg-slate-900 border-teal/40 font-bold scale-105" : "text-textSecondary bg-slate-950/60"
        }`}>
          {label}
        </div>
      </Html>

      {/* Holographic Tooltip Box */}
      {hovered && (
        <Html position={[0, size + 0.5, 0]} center distanceFactor={8} zIndexRange={[100, 50]} pointerEvents="none">
          <div className="bg-slate-950/90 backdrop-blur border border-teal/40 rounded-lg p-3 text-white font-mono text-[10px] w-64 shadow-lg shadow-teal/15 pointer-events-none select-none mt-12">
            <h4 className="text-teal font-bold mb-1.5 border-b border-teal/20 pb-0.5 uppercase tracking-wider text-xs text-center">{label}</h4>
            <ul className="space-y-1 text-slate-300">
              {getOverviewItems(id).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1 leading-normal">
                  <span className="text-teal font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Html>
      )}

      {children && React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { planetHovered: hovered } as any) : child
      )}
    </group>
  );
}
