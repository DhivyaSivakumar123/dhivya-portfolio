"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function OrbitPath({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="white"
      lineWidth={1}
      dashed
      dashScale={1.5}
      dashSize={0.15}
      gapSize={0.1}
      transparent
      opacity={0.3}
    />
  );
}
