// Convierte fuentes raster pesadas a WebP (calidad ~82) preservando dimensiones.
// next/image igual re-optimiza a AVIF/WebP al servir; esto reduce el peso de la
// FUENTE en el repo y el costo/latencia de la primera optimización en el server.
//
// npm/npx están rotos en este entorno (validate-engines/Node 20.12): correr con
// node directo →  node scripts/convert-assets.mjs
//
// Convierte los placeholders de public/about-us/* a WebP para dejar la timeline
// de Sobre Nosotros en estado drop-in: cuando entren las fotos reales de Danger
// (mismos nombres .webp) se ven sin tocar código. Los retratos del equipo ya se
// convirtieron en una corrida previa (sus .png fuente ya no están en el repo).
// NO toca public/roadmap/* (sin referencias en src/, material suelto).

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

// Fuentes a convertir ahora: los placeholders de la timeline de Sobre Nosotros.
const TARGETS = [
  "public/about-us/bedroom_start_2016.png",
  "public/about-us/first_office_2019.png",
  "public/about-us/scale_studio_2022.png",
  "public/about-us/modern_headquarters_2026.png",
  "public/about-us/future_expansion_2027.png",
];

const QUALITY = 82;

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

let savedTotal = 0;
for (const rel of TARGETS) {
  const src = path.join(ROOT, rel);
  const out = src.replace(/\.png$/i, ".webp");
  try {
    const input = await readFile(src);
    const before = input.length;
    const webp = await sharp(input).webp({ quality: QUALITY, effort: 6 }).toBuffer();
    await writeFile(out, webp);
    const saved = before - webp.length;
    savedTotal += saved;
    console.log(
      `✓ ${rel}\n    ${fmtKB(before)} → ${fmtKB(webp.length)}  (−${fmtKB(saved)})  → ${path.basename(out)}`
    );
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}`);
  }
}
console.log(`\nTotal ahorrado en fuentes: ${fmtKB(savedTotal)}`);
console.log("Recordá: actualizá las referencias .png → .webp y borrá los .png originales.");
