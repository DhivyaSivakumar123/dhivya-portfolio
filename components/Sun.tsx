"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { profile } from "@/data/content";
import { planetRefs } from "@/lib/refs";

export default function Sun({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const setSelected = useStore((s) => s.setSelected);

  useEffect(() => {
    planetRefs["about"] = groupRef.current;
    return () => {
      planetRefs["about"] = null;
    };
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.4) * 0.04;
    if (meshRef.current) meshRef.current.scale.setScalar(pulse);
    if (glowRef.current) glowRef.current.scale.setScalar(pulse * 1.35);
    if (meshRef.current) meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("about");
      }}
    >
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.9, 24, 24]} />
        <meshBasicMaterial color="#F2B84B" transparent opacity={0.08} />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#F2B84B"
          emissive="#B5842E"
          emissiveIntensity={0.6}
          roughness={0.6}
          flatShading
        />
      </mesh>
      <pointLight color="#F2D9A0" intensity={2.2} distance={40} decay={1.5} />
      <Text
        position={[0, -2.4, 0]}
        fontSize={0.42}
        color="#E7ECF2"
        anchorX="center"
        anchorY="middle"
      >
        {profile.name}
      </Text>
      <Text
        position={[0, -3.05, 0]}
        fontSize={0.24}
        color="#4FD8C4"
        anchorX="center"
        anchorY="middle"
      >
        {profile.role}
      </Text>
    </group>
  );
}
