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

  const prevSelected = useRef<string | null>(null);
  const isTransitioning = useRef(false);
  const transitionTime = useRef(0);
  const prevTargetPos = useRef(new THREE.Vector3());

  // Keep OrbitControls enabled always so users can rotate/zoom in 360 degrees
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  }, [controlsRef]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Detect if user starts dragging during transition, and hand over control immediately
    if (isTransitioning.current && controls.state !== undefined && controls.state !== -1) {
      isTransitioning.current = false;
    }

    // Detect target change to restart transition
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      isTransitioning.current = true;
      transitionTime.current = 0;

      if (selected && planetRefs[selected]) {
        const worldPos = new THREE.Vector3();
        planetRefs[selected]!.getWorldPosition(worldPos);
        prevTargetPos.current.copy(worldPos);
      } else {
        prevTargetPos.current.copy(WIDE_TARGET);
      }
    }

    // Get current target coordinate
    const currentTargetPos = new THREE.Vector3();
    if (selected && planetRefs[selected]) {
      planetRefs[selected]!.getWorldPosition(currentTargetPos);
    } else {
      currentTargetPos.copy(WIDE_TARGET);
    }

    // Compute target displacement delta
    const delta = new THREE.Vector3().copy(currentTargetPos).sub(prevTargetPos.current);

    if (isTransitioning.current) {
      // While transitioning, camera must track moving target's orbital translation
      camera.position.add(delta);
      controls.target.add(delta);

      const targetLook = currentTargetPos;
      const targetPos = new THREE.Vector3();
      if (selected) {
        // Taller view height for gas giant Projects planet
        const topHeight = selected === "projects" ? 9 : 6.2;
        targetPos.copy(currentTargetPos).add(new THREE.Vector3(0, topHeight, 0.01));
      } else {
        targetPos.copy(WIDE_POSITION);
      }

      const lerpFactor = reducedMotion ? 1 : 0.05;
      camera.position.lerp(targetPos, lerpFactor);
      controls.target.lerp(targetLook, lerpFactor);
      controls.update();

      // Deactivate transition when close enough or timed out
      transitionTime.current += 1;
      const distToPos = camera.position.distanceTo(targetPos);
      const distToLook = controls.target.distanceTo(targetLook);
      if ((distToPos < 0.05 && distToLook < 0.05) || transitionTime.current > 100) {
        isTransitioning.current = false;
      }
    } else {
      // In tracking mode, update controls.target to follow the moving target.
      // OrbitControls automatically positions the camera at the same spherical offset.
      controls.target.copy(currentTargetPos);
      controls.update();
    }

    prevTargetPos.current.copy(currentTargetPos);
  });

  return null;
}
