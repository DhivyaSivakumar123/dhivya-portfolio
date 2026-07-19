"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
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
  const [hovered, setHovered] = useState(false);

  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);
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
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
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

      <Text
        position={[0, size + 0.4, 0]}
        fontSize={0.24}
        color={hovered ? "#4FD8C4" : "#9AA5B3"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {children}
    </group>
  );
}
