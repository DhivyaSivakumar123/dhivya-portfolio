"use client";

import dynamic from "next/dynamic";
import UIOverlay from "@/components/UIOverlay";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-bg">
      <p className="font-mono text-sm text-textSecondary">
        <span className="text-teal">$</span> booting solar system...
      </p>
    </div>
  )
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-bg">
      <Scene />
      <UIOverlay />
    </main>
  );
}
