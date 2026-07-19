"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { planetRefs } from "@/lib/refs";

const WIDE_POSITION = new THREE.Vector3(0, 8, 17);
const WIDE_TARGET = new THREE.Vector3(0, 0, 0);

export default function CameraRig({
  controlsRef,
  reducedMotion
}: {
  controlsRef: React.MutableRefObject<any>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const selected = useStore((s) => s.selected);
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = selected === null;
    }
  }, [selected, controlsRef]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (selected && planetRefs[selected]) {
      const worldPos = new THREE.Vector3();
      planetRefs[selected]!.getWorldPosition(worldPos);

      const direction = worldPos.clone().setY(0);
      if (direction.lengthSq() < 0.001) direction.set(1, 0, 0);
      direction.normalize();

      targetPos.current
        .copy(worldPos)
        .add(direction.multiplyScalar(3.2))
        .add(new THREE.Vector3(0, 1.6, 0));
      targetLook.current.copy(worldPos);
    } else {
      targetPos.current.copy(WIDE_POSITION);
      targetLook.current.copy(WIDE_TARGET);
    }

    const lerpFactor = reducedMotion ? 1 : 0.045;
    camera.position.lerp(targetPos.current, lerpFactor);
    controls.target.lerp(targetLook.current, lerpFactor);
    controls.update();
  });

  return null;
}
