"use client";

import { Stars } from "@react-three/drei";

export default function Starfield({ compact }: { compact: boolean }) {
  return (
    <Stars
      radius={60}
      depth={40}
      count={compact ? 1500 : 4000}
      factor={2.5}
      saturation={0}
      fade
      speed={0.3}
    />
  );
}
