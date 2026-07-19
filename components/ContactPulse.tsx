"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ring({ delay, reducedMotion }: { delay: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    if (reducedMotion) {
      ref.current.scale.setScalar(1.4);
      matRef.current.opacity = 0.2;
      return;
    }
    const t = (state.clock.getElapsedTime() + delay) % 2.4;
    const progress = t / 2.4;
    const scale = 1 + progress * 1.8;
    ref.current.scale.setScalar(scale);
    matRef.current.opacity = 0.35 * (1 - progress);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.62, 0.66, 32]} />
      <meshBasicMaterial ref={matRef} color="#4FD8C4" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function ContactPulse({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group>
      <Ring delay={0} reducedMotion={reducedMotion} />
      <Ring delay={0.8} reducedMotion={reducedMotion} />
      <Ring delay={1.6} reducedMotion={reducedMotion} />
    </group>
  );
}
