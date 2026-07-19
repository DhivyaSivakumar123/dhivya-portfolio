"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "./SolarSystem";
import Starfield from "./Starfield";
import CameraRig from "./CameraRig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsCompact } from "@/hooks/useIsCompact";

export default function Scene() {
  const controlsRef = useRef<any>(null);
  const reducedMotion = useReducedMotion();
  const compact = useIsCompact();

  return (
    <Canvas
      dpr={compact ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 8, 17], fov: 50 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0f14"]} />
      <fog attach="fog" args={["#0b0f14", 20, 42]} />
      <ambientLight intensity={0.15} />
      <directionalLight color="#2B4A45" intensity={0.08} position={[-10, 4, -10]} />
      <hemisphereLight args={["#4FD8C4", "#0b0f14", 0.15]} />

      <Starfield compact={compact} />
      <SolarSystem reducedMotion={reducedMotion} />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={4}
        maxDistance={26}
        enableDamping={!reducedMotion}
        dampingFactor={0.08}
      />
      <CameraRig controlsRef={controlsRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
