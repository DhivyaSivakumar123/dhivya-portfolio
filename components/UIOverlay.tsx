"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { sections } from "@/data/content";
import SectionPanel from "./panels/SectionPanel";

export default function UIOverlay() {
  const selected = useStore((s) => s.selected);
  const setSelected = useStore((s) => s.setSelected);
  const reset = useStore((s) => s.reset);

  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);

  useEffect(() => {
    const outputLines = [
      "Full Stack Developer | Cloud Enthusiast",
      "Final-Year B.Tech IT Student @ MSEC (CGPA: 8.53)",
      "Core Java, Spring Boot & Cloud Architectures"
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let timer: NodeJS.Timeout;

    const typeOutputLine = () => {
      if (lineIdx < outputLines.length) {
        const targetLine = outputLines[lineIdx];
        if (charIdx < targetLine.length) {
          setDisplayedOutput((prev) => {
            const next = [...prev];
            next[lineIdx] = targetLine.slice(0, charIdx + 1);
            return next;
          });
          charIdx++;
          timer = setTimeout(typeOutputLine, 25);
        } else {
          lineIdx++;
          charIdx = 0;
          timer = setTimeout(typeOutputLine, 120);
        }
      }
    };

    timer = setTimeout(typeOutputLine, 200);

    return () => clearTimeout(timer);
  }, []);

  const activeLabel =
    selected === "about" ? "About" : sections.find((s) => s.id === selected)?.label;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Header / terminal */}
      <div 
        className="pointer-events-auto absolute top-6 left-6 max-w-xs"
        style={{ fontFamily: "'Edwardian Script ITC', 'Brush Script MT', cursive" }}
      >
        <div className="flex items-center gap-2 text-3xl mb-1.5 font-bold text-white">
          <span>Dhivya S.</span>
          <span className="inline-block w-2.5 h-5 bg-teal cursor-blink" />
        </div>
        <div className="bg-[#0c0a20]/80 backdrop-blur border border-purple-500/20 rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(168,85,247,0.1)] min-h-[145px] flex flex-col justify-between">
          <div className="space-y-0.5">
            {displayedOutput.map((line, idx) => (
              <p 
                key={idx} 
                className={`${
                  idx === 0 
                    ? "text-purple-300 text-2xl font-bold" 
                    : "text-slate-300 text-lg"
                } leading-tight`}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Resume Download Button */}
          <a
            href="/resume.pdf"
            download
            className="mt-3 flex items-center justify-center gap-2 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/35 border border-purple-500/40 text-purple-200 text-base rounded-lg transition-all pointer-events-auto shadow-md"
            style={{ fontFamily: "inherit" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav 
        className="pointer-events-auto absolute bottom-6 left-6 bg-[#0c0a20]/90 backdrop-blur border border-purple-500/30 rounded-xl p-3.5 flex flex-col gap-1 min-w-[160px] shadow-[0_0_15px_rgba(168,85,247,0.15)]"
        style={{ fontFamily: "'Edwardian Script ITC', 'Brush Script MT', cursive" }}
      >
        <button
          onClick={() => setSelected("about")}
          className={`text-left px-3 py-1 rounded transition-colors text-2xl ${
            selected === "about"
              ? "text-purple-300 font-bold bg-purple-500/20 border border-purple-500/40"
              : "text-slate-300 hover:text-white hover:bg-purple-500/10"
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
              className={`text-left px-3 py-1 rounded transition-colors text-2xl ${
                selected === s.id
                  ? "text-purple-300 font-bold bg-purple-500/20 border border-purple-500/40"
                  : "text-slate-300 hover:text-white hover:bg-purple-500/10"
              }`}
            >
              {s.label.toLowerCase()}
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
