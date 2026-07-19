import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

function createRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = h + 0x9e3779b9 | 0;
    let z = h;
    z ^= z >>> 16;
    z = Math.imul(z, 0x21f0aa7c);
    z ^= z >>> 15;
    z = Math.imul(z, 0x735a2d97);
    z ^= z >>> 15;
    return (z >>> 0) / 4294967296;
  };
}

export interface TextureOptions {
  baseColor: string;
  accentColor: string;
  pattern: "rocky" | "banded" | "cratered" | "continents" | "ice";
  seed: string;
  resolutionWidth?: number;
  resolutionHeight?: number;
}

export function generatePlanetTextures(options: TextureOptions) {
  if (typeof window === "undefined") return null;

  const width = options.resolutionWidth || 512;
  const height = options.resolutionHeight || 256;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rCanvas = document.createElement("canvas");
  rCanvas.width = width;
  rCanvas.height = height;
  const rCtx = rCanvas.getContext("2d");
  if (!rCtx) return null;

  const random = createRandom(options.seed);
  const noise2D = createNoise2D(random);

  const base = new THREE.Color(options.baseColor);
  const accent = new THREE.Color(options.accentColor);

  const imgData = ctx.createImageData(width, height);
  const rImgData = rCtx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const phi = v * Math.PI;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const theta = u * 2 * Math.PI;

      // 3D coordinate on sphere surface to avoid mapping seam lines
      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.cos(phi);
      const nz = Math.sin(phi) * Math.sin(theta);

      let nVal = 0;
      let mixVal = 0;
      let roughVal = 0.5;

      if (options.pattern === "rocky" || options.pattern === "cratered") {
        nVal = (noise2D(nx * 3, nz * 3) * 0.6 + noise2D(nx * 8, nz * 8) * 0.3 + noise2D(nx * 20, nz * 20) * 0.1);
        mixVal = THREE.MathUtils.clamp((nVal + 1) / 2, 0, 1);
        roughVal = 0.6 + nVal * 0.2;
      } else if (options.pattern === "continents") {
        nVal = (noise2D(nx * 2.5, nz * 2.5) * 0.7 + noise2D(nx * 6, nz * 6) * 0.3);
        mixVal = nVal > 0.05 ? 1.0 : 0.0;
        roughVal = mixVal > 0.5 ? 0.8 : 0.3;
      } else if (options.pattern === "banded") {
        const stripe = Math.sin(v * 24 + noise2D(nx * 2.2, ny * 10) * 2.5);
        mixVal = THREE.MathUtils.clamp((stripe + 1) / 2, 0, 1);
        roughVal = 0.2 + mixVal * 0.3;
      } else if (options.pattern === "ice") {
        nVal = (noise2D(nx * 4, nz * 4) * 0.5 + noise2D(nx * 15, nz * 15) * 0.35 + noise2D(nx * 40, nz * 40) * 0.15);
        mixVal = THREE.MathUtils.clamp((nVal + 1) / 2, 0, 1);
        roughVal = 0.1 + (1 - mixVal) * 0.4;
      }

      const col = new THREE.Color().copy(base).lerp(accent, mixVal);

      const idx = (y * width + x) * 4;
      imgData.data[idx] = Math.floor(col.r * 255);
      imgData.data[idx + 1] = Math.floor(col.g * 255);
      imgData.data[idx + 2] = Math.floor(col.b * 255);
      imgData.data[idx + 3] = 255;

      const rByte = Math.floor(THREE.MathUtils.clamp(roughVal, 0, 1) * 255);
      rImgData.data[idx] = rByte;
      rImgData.data[idx + 1] = rByte;
      rImgData.data[idx + 2] = rByte;
      rImgData.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  rCtx.putImageData(rImgData, 0, 0);

  if (options.pattern === "cratered") {
    const numCraters = 18;
    for (let i = 0; i < numCraters; i++) {
      const cx = random() * width;
      const cy = random() * height;
      const radius = 6 + random() * 16;

      ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();

      const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fill();

      rCtx.fillStyle = "rgba(255, 255, 255, 0.15)";
      rCtx.beginPath();
      rCtx.arc(cx, cy, radius, 0, 2 * Math.PI);
      rCtx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const roughnessMap = new THREE.CanvasTexture(rCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;

  return { texture, roughnessMap };
}
