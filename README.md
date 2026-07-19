# Dhivya Sivakumar — solar system portfolio

An interactive Next.js + WebGL portfolio. The sun is Dhivya; five planets orbiting
it are About/Education/Skills/Projects/Certifications/Contact — click any planet
(or use the nav list bottom-left) to fly in and open that section's content panel.

## Run it locally

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

Easiest path: push this folder to a GitHub repo and import it on
[vercel.com/new](https://vercel.com/new) — zero config needed, it's a
standard Next.js app.

## Where things live

- `data/content.ts` — every piece of text on the site (bio, education, skills,
  projects, certifications, contact links). Edit this file to update content;
  nothing else needs to change.
- `components/SolarSystem.tsx` — orbit radii, planet sizes/colors/speeds.
- `components/Scene.tsx` — camera, lighting, starfield setup.
- `components/UIOverlay.tsx` — the 2D nav and slide-in content panel.
- `store/useStore.ts` — the single piece of shared state (which section is
  selected).

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: orbit animation, camera flythrough, and
  pulsing effects are all disabled/frozen for users who've set that
  preference, without breaking navigation.
- The bottom-left nav list is a fully keyboard/screen-reader accessible way to
  reach every section without touching the 3D canvas.
- Star count and pixel ratio scale down automatically on small viewports.

## Known limitations / good next steps

- There's no WebGL-unsupported fallback yet (very old browsers/devices could
  fail to render the canvas). If that matters for your audience, the
  single-page HTML version from earlier in this conversation is a solid
  fallback to link to.
- Projects without a live link (Luma, Payment Orchestration Platform, Signal)
  currently just show their description and stack — add `link:` entries in
  `data/content.ts` once you have live/GitHub links for them.
- The "Download resume" flow from the earlier version isn't wired in here yet
  — happy to add a resume section/button pointing at a hosted PDF.
