"use client";

import { projects } from "@/data/content";
import { Billboard, Text } from "@react-three/drei";

interface ProjectListProps {
  baseSize: number;
  planetHovered?: boolean;
}

export default function ProjectList({ baseSize, planetHovered }: ProjectListProps) {
  if (!planetHovered) return null;

  return (
    <group position={[0, -baseSize * 0.7 - 0.35, baseSize * 0.7 + 0.4]}>
      <Billboard>
        {projects.map((p, i) => (
          <Text
            key={p.id}
            position={[0, -i * 0.24, 0]}
            fontSize={0.16}
            color="#FFB74D"
            anchorX="center"
            anchorY="middle"
          >
            • {p.name}
          </Text>
        ))}
      </Billboard>
    </group>
  );
}
