import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        surface: "#12181F",
        surfaceRaised: "#161D26",
        border: "#232B35",
        borderStrong: "#334051",
        text: "#E7ECF2",
        textSecondary: "#9AA5B3",
        textMuted: "#5E6876",
        teal: "#4FD8C4",
        tealDim: "#2B4A45",
        amber: "#F2B84B",
        amberDim: "#4A3D22"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
