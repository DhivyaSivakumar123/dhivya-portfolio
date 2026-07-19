"use client";

import { useState, useEffect, useRef } from "react";
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

  // Resize Side Panel logic
  const [panelWidth, setPanelWidth] = useState(380);
  const isResizing = useRef(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "ew-resize";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 320 && newWidth < 800) {
      setPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "auto";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const outputLines = [
      "> Full Stack Developer | Cloud Enthusiast",
      "> Building reliable, scalable backend APIs & modern web applications."
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

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const hoveredSection = useStore((s) => s.hoveredSection);
  const setHoveredSection = useStore((s) => s.setHoveredSection);

  const activeLabel =
    selected === "about" ? "About" : sections.find((s) => s.id === selected)?.label;

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {/* Header / terminal */}
      <div className="pointer-events-auto absolute top-6 left-6 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-edwardian text-5xl text-teal tracking-wider">Dhivya S</span>
          <span className="inline-block w-1.5 h-5 bg-teal cursor-blink" />
        </div>
        <div className="bg-surface/80 backdrop-blur border border-border rounded-lg px-4 py-3 font-mono text-sm text-textSecondary min-h-[135px] shadow-lg">
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
          className="show-system-cursor pointer-events-auto mt-3 inline-flex items-center justify-center gap-2 w-full bg-tealDim/10 border border-teal text-teal hover:bg-teal hover:text-black transition-all rounded-lg px-4 py-2.5 font-mono text-sm font-bold shadow-[0_0_8px_rgba(20,184,166,0.15)] hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>download_resume.pdf</span>
        </a>
      </div>

      {/* Nav */}
      <nav className="show-system-cursor pointer-events-auto absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur border border-teal/40 shadow-[0_0_15px_rgba(20,184,166,0.2)] rounded-xl p-3 flex flex-col gap-1 min-w-[160px]">
        <button
          onClick={() => setSelected("about")}
          onMouseEnter={() => setHoveredSection("about")}
          onMouseLeave={() => setHoveredSection(null)}
          className={`text-left font-mono text-sm px-3.5 py-2 rounded-lg transition-colors ${
            selected === "about" || hoveredSection === "about"
              ? "text-teal bg-tealDim/30 border-l-2 border-teal"
              : "text-teal/70 hover:text-teal hover:bg-tealDim/10"
          }`}
        >
          about
        </button>
        {sections
          .filter((s) => s.id !== "about")
          .map((s) => {
            const isHighlighted = selected === s.id || hoveredSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                onMouseEnter={() => setHoveredSection(s.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`text-left font-mono text-sm px-3.5 py-2 rounded-lg transition-colors ${
                  isHighlighted
                    ? "text-teal bg-tealDim/30 border-l-2 border-teal"
                    : "text-teal/70 hover:text-teal hover:bg-tealDim/10"
                }`}
              >
                {s.label.toLowerCase()}
              </button>
            );
          })}
      </nav>

      {/* Side panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: `${panelWidth}px` }}
            className="show-system-cursor pointer-events-auto fixed top-0 right-0 h-full w-full sm:w-auto bg-surface/95 backdrop-blur border-l border-border overflow-y-auto"
          >
            {/* Resize Drag Handle */}
            <div
              onMouseDown={startResizing}
              className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-teal/40 active:bg-teal transition-colors group z-20"
            >
              <div className="absolute inset-y-0 left-0 w-[2px] bg-teal opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display">{activeLabel}</h2>
              </div>
              <button
                onClick={reset}
                className="font-mono text-sm border border-borderStrong rounded px-3 py-1.5 text-textSecondary hover:border-teal hover:text-teal transition-colors"
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
