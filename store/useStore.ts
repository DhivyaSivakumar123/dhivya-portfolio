import { create } from "zustand";
import type { SectionId } from "@/data/content";

interface PortfolioState {
  selected: SectionId | null;
  activeProject: string | null;
  hoveredSection: SectionId | null;
  setSelected: (id: SectionId | null) => void;
  setActiveProject: (id: string | null) => void;
  setHoveredSection: (id: SectionId | null) => void;
  reset: () => void;
}

export const useStore = create<PortfolioState>((set) => ({
  selected: null,
  activeProject: null,
  hoveredSection: null,
  setSelected: (id) => set({ selected: id, activeProject: null }),
  setActiveProject: (id) => set({ activeProject: id }),
  setHoveredSection: (id) => set({ hoveredSection: id }),
  reset: () => set({ selected: null, activeProject: null, hoveredSection: null })
}));
