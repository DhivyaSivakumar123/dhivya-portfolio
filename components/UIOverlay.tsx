"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { sections, profile } from "@/data/content";
import SectionPanel from "./panels/SectionPanel";

export default function UIOverlay() {
  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);
  const reset = useStore((s) => s.reset);

  const activeLabel =
    selected === "about" ? "About" : sections.find((s) => s.id === selected)?.label;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Header / terminal */}
      <div className="pointer-events-auto absolute top-6 left-6 max-w-xs">
        <div className="flex items-center gap-2 font-mono text-sm mb-3">
          <span>dhivya.dev</span>
          <span className="inline-block w-2 h-4 bg-teal cursor-blink" />
        </div>
        <div className="bg-surface/80 backdrop-blur border border-border rounded-lg px-4 py-3 font-mono text-xs text-textSecondary">
          <p>
            <span className="text-teal">$</span> select role from career_goals;
          </p>
          <p className="text-text">&gt; {profile.role}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="pointer-events-auto absolute bottom-6 left-6 flex flex-col gap-1">
        <button
          onClick={() => setSelected("about")}
          className={`text-left font-mono text-xs px-3 py-1.5 rounded transition-colors ${
            selected === "about"
              ? "text-teal bg-tealDim/40"
              : "text-textMuted hover:text-textSecondary"
          }`}
        >
          about
        </button>
        {sections
          .filter((s) => s.id !== "about")
          .map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`text-left font-mono text-xs px-3 py-1.5 rounded transition-colors ${
                selected === s.id
                  ? "text-teal bg-tealDim/40"
                  : "text-textMuted hover:text-textSecondary"
              }`}
            >
              {s.id}
            </button>
          ))}
      </nav>

      {/* Side panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto fixed top-0 right-0 h-full w-full sm:w-[380px] bg-surface/95 backdrop-blur border-l border-border overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] text-teal">-- {selected}</p>
                <h2 className="text-lg font-display">{activeLabel}</h2>
              </div>
              <button
                onClick={reset}
                className="font-mono text-xs border border-borderStrong rounded px-3 py-1.5 text-textSecondary hover:border-teal hover:text-teal transition-colors"
              >
                back
              </button>
            </div>
            <div className="px-6 py-6">
              <SectionPanel id={selected} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
