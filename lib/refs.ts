import type { Group } from "three";
import type { SectionId } from "@/data/content";

export const planetRefs: Partial<Record<SectionId, Group | null>> = {};
export const moonRefs: Record<string, Group | null> = {};
