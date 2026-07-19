"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { projects } from "@/data/content";

function Moon({
  index,
  total,
  baseSize,
  reducedMotion
}: {
  index: number;
  total: number;
  baseSize: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const angleRef = useRef((index / total) * Math.PI * 2);
  const radius = baseSize + 0.9;
  const speed = 0.35 + index * 0.05;
  const project = projects[index];

  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);
  const setActiveProject = useStore((s) => s.setActiveProject);
  const paused = (selected !== null && selected !== "projects") || reducedMotion;

  useFrame((_, delta) => {
    if (!paused) angleRef.current += delta * speed;
    const angle = angleRef.current;
    if (ref.current) {
      ref.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("projects");
        setActiveProject(project.id);
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#F0997B" roughness={0.6} />
      </mesh>
      <Text position={[0, 0.32, 0]} fontSize={0.15} color="#9AA5B3" anchorX="center">
        {project.name.split(" ")[0]}
      </Text>
    </group>
  );
}

export default function ProjectMoons({
  baseSize,
  reducedMotion
}: {
  baseSize: number;
  reducedMotion: boolean;
}) {
  return (
    <group>
      {projects.map((_, i) => (
        <Moon
          key={i}
          index={i}
          total={projects.length}
          baseSize={baseSize}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}
