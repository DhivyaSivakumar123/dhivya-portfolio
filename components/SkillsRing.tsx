"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { skillCategories } from "@/data/content";

export default function SkillsRing({ baseSize }: { baseSize: number }) {
  const setSelected = useStore((s) => s.setSelected);

  const positions = useMemo(() => {
    return skillCategories.map((_, i) => {
      const angle = (i / skillCategories.length) * Math.PI * 2;
      const r = baseSize + 0.7;
      return [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number];
    });
  }, [baseSize, skillCategories]);

  return (
    <group>
      {skillCategories.map((cat, i) => (
        <mesh
          key={cat.id}
          position={positions[i]}
          onClick={(e) => {
            e.stopPropagation();
            setSelected("skills");
          }}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={cat.color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
