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
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const outputLines = [
      "> Full Stack Developer | Cloud Enthusiast",
      "> Final-Year B.Tech IT Student @ MSEC (CGPA: 8.53)",
      "> Core Java, Spring Boot & Cloud Architectures"
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
      } else {
        setTypingComplete(true);
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
      <div className="pointer-events-auto absolute top-6 left-6 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-edwardian text-4xl text-teal tracking-wide">Dhivya S.</span>
          <span className="inline-block w-1.5 h-5 bg-teal cursor-blink" />
        </div>
        <div className="bg-surface/80 backdrop-blur border border-border rounded-lg px-4 py-3 font-mono text-xs text-textSecondary min-h-[110px] shadow-lg">
          {displayedOutput.map((line, idx) => {
            const isLastLine = idx === displayedOutput.length - 1;
            return (
              <p key={idx} className={`${idx === 0 ? "text-teal font-bold" : "text-textSecondary"} mt-1 leading-relaxed`}>
                {line}
                {isLastLine && !typingComplete && (
                  <span className="inline-block w-1.5 h-3 bg-teal ml-0.5 animate-pulse" />
                )}
              </p>
            );
          })}
        </div>
        <a
          href="/resume.pdf"
          download="Dhivya_Sivakumar_Resume.pdf"
          className="pointer-events-auto mt-3 inline-flex items-center justify-center gap-2 w-full bg-surface/80 backdrop-blur border border-border rounded-lg px-4 py-2.5 font-mono text-xs text-textSecondary hover:border-teal hover:text-teal transition-all shadow-md"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>download_resume.pdf</span>
        </a>
      </div>

      {/* Nav */}
      <nav className="pointer-events-auto absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur border border-teal/40 shadow-[0_0_15px_rgba(20,184,166,0.2)] rounded-xl p-3 flex flex-col gap-1 min-w-[150px]">
        {/* Signature Header */}
        <div className="font-edwardian text-2xl text-teal border-b border-teal/20 pb-1 mb-2 px-3 text-center tracking-wider">
          Dhivya S.
        </div>

        <button
          onClick={() => setSelected("about")}
          className={`text-left font-mono text-xs px-3 py-1.5 rounded transition-colors ${
            selected === "about"
              ? "text-teal bg-tealDim/30 border-l-2 border-teal"
              : "text-teal/70 hover:text-teal hover:bg-tealDim/10"
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
                  ? "text-teal bg-tealDim/30 border-l-2 border-teal"
                  : "text-teal/70 hover:text-teal hover:bg-tealDim/10"
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
