"use client";

import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { profile } from "@/data/content";
import { planetRefs } from "@/lib/refs";
import { useIsCompact } from "@/hooks/useIsCompact";

const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 glowColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    gl_FragColor = vec4(glowColor, intensity * 0.7);
  }
`;

export default function Sun({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const setSelected = useStore((s) => s.setSelected);
  const compact = useIsCompact();

  const uniforms = useMemo(
    () => ({ glowColor: { value: new THREE.Color("#F2B84B") } }),
    []
  );

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
    if (glowRef.current) glowRef.current.scale.setScalar(pulse * 1.18);
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
      <mesh ref={glowRef} scale={1.18}>
        <sphereGeometry args={[1.5, compact ? 24 : 48, compact ? 24 : 48]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, compact ? 24 : 48, compact ? 24 : 48]} />
        <meshStandardMaterial
          color="#F2B84B"
          emissive="#B5842E"
          emissiveIntensity={0.6}
          roughness={0.6}
        />
      </mesh>
      <pointLight color="#F2D9A0" intensity={2.2} distance={40} decay={1.5} />
      <Billboard position={[0, -2.4, 0]}>
        <Text
          fontSize={0.42}
          color="#E7ECF2"
          anchorX="center"
          anchorY="middle"
        >
          {profile.name}
        </Text>
      </Billboard>
      <Billboard position={[0, -3.05, 0]}>
        <Text
          fontSize={0.24}
          color="#4FD8C4"
          anchorX="center"
          anchorY="middle"
        >
          {profile.role}
        </Text>
      </Billboard>
    </group>
  );
}
