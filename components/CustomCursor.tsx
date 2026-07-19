"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [localClickable, setLocalClickable] = useState(false);
  const [isSystemUi, setIsSystemUi] = useState(false);

  const hoveredSection = useStore((s) => s.hoveredSection);
  const isHovered = localClickable || hoveredSection !== null;

  // Position of cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Use springs for smooth follower movement (zero-g zero gravity space feel)
  const springConfig = { damping: 22, stiffness: 220, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on desktop devices with hover support
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor size (50px / 2 = 25px) to center it on pointer
      cursorX.set(e.clientX - 25);
      cursorY.set(e.clientY - 25);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Hide custom cursor if hovering over standard system UI elements
      const insideSystemUi = target.closest(".show-system-cursor");
      setIsSystemUi(!!insideSystemUi);

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.getAttribute("cursor") === "pointer" ||
        target.style.cursor === "pointer";

      setLocalClickable(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide custom cursor when not visible, or inside system UI cards/drawers
  if (!visible || isSystemUi) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: "50px",
        height: "50px",
      }}
    >
      <motion.img
        src="/astronaut.png"
        alt="astronaut cursor"
        className="w-12 h-12 select-none pointer-events-none filter drop-shadow-[0_0_4px_rgba(79,216,196,0.3)]"
        animate={{
          scale: isHovered ? 1.3 : 1,
          rotate: isHovered ? 15 : 0,
          opacity: isHovered ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
        }}
      />
    </motion.div>
  );
}
