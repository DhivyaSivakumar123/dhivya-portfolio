"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { certifications } from "@/data/content";

export default function CertSatellites({ baseSize }: { baseSize: number }) {
  const setSelected = useStore((s) => s.setSelected);

  const positions = useMemo(() => {
    return certifications.map((_, i) => {
      const angle = (i / certifications.length) * Math.PI * 2 + 0.4;
      const r = baseSize + 0.55;
      return [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number];
    });
  }, [baseSize, certifications]);

  return (
    <group>
      {certifications.map((cert, i) => (
        <mesh
          key={cert.id}
          position={positions[i]}
          onClick={(e) => {
            e.stopPropagation();
            setSelected("certifications");
          }}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#F2B84B"
            transparent
            opacity={cert.status === "completed" ? 1 : 0.35}
          />
        </mesh>
      ))}
    </group>
  );
}
