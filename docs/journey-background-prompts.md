# Prompts de imágenes — Fondos del Mapa del Servicio (/equipo)

Imágenes enfocadas por paso que florecen detrás del mapa interactivo del recorrido del servicio. Una por etapa (8 en total). Estilo de referencia: las primeras `public/roadmap/*.png` (render 3D glassmorphic sobre negro, azul de marca, un protagonista claro por concepto).

## Cómo usarlas
1. Generá las 8 imágenes con los prompts de abajo (cualquier generador: Midjourney, DAL·E, Flux, Ideogram, etc.).
2. Exportá a **WebP**, 16:9, ≥ 1600×900, y guardalas en `public/journey/` con estos nombres exactos:
   - `primera-llamada.webp` · `configuracion-crm.webp` · `segunda-llamada.webp` · `pila-de-arte.webp` · `configuraciones-tecnicas.webp` · `presupuesto-pauta.webp` · `lanzamiento-agenda.webp` · `optimizacion.webp`
3. En `src/lib/data/serviceJourney.ts` poné `JOURNEY_IMAGES_READY = true`. Listo: el mapa usa las imágenes (con Ken-Burns) en vez del efecto animado de respaldo.

---

## Bloque de ESTILO COMPARTIDO (pegar al final de cada prompt para cohesión)

> 3D glassmorphic product render, frosted translucent glass with crisp edge highlights, set on a deep near-black studio background (#040711). Brand-blue palette only: electric blue #0066FF, sky cyan #7DD3FC, azure #488EFF, with clean white rim-light; absolutely no warm/orange/green/purple tones. Soft volumetric light, gentle bloom, subtle depth-of-field, faint floating dust particles and thin light-streaks. Cinematic, premium, minimal. The hero subject sits in the {LEFT/RIGHT} third of the frame, leaving generous empty negative space on the other side and across the center for UI overlays. Consistent camera lens (~35mm), consistent lighting and material across the set. 16:9, ultra-detailed, high dynamic range. No text, no letters, no numbers, no logos, no watermarks, no human faces.

Negative prompt sugerido: `text, words, letters, numbers, logo, watermark, ui mockup screenshots with readable text, warm colors, orange, gold, green, purple, neon clutter, busy background, faces, hands, low-res, jpeg artifacts`.

---

## 1 · Primera llamada — Diagnóstico  → `primera-llamada.webp`
**Subject (RIGHT third):** A single glass headset / call icon floating above a translucent glass magnifying lens that hovers over a faint, softly-glowing line chart and a few diagnostic gauge rings. Conveys "we listen, we read your business, we find the gaps." Calm, focused, one clear hero object.
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 2 · Configuración del CRM — La base del sistema  → `configuracion-crm.webp`
**Subject (LEFT third):** A glass smartphone showing an abstract CRM pipeline (stacked translucent cards / stages) connected by thin glowing lines to a small glass WhatsApp-style chat bubble and a couple of automation nodes. Like the reference `roadmap/3.png` but pure brand-blue. Conveys "your CRM, pipelines and WhatsApp wired together."
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 3 · Segunda llamada — Plan de acción  → `segunda-llamada.webp`
**Subject (RIGHT third):** Two abstract glass avatar silhouettes (no faces — just frosted glass busts/orbs) facing a floating translucent blueprint document and a small glass calendar, connected by a thin light line (agreement / alignment). Conveys "we present the plan, the budget and the calendar; we agree on the start."
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 4 · Pila de arte — Identidad y creativos  → `pila-de-arte.webp`
**Subject (LEFT third):** A small stack of glass color swatches and a translucent clapperboard / play-triangle next to a floating creative canvas with abstract brush strokes and shape layers, all in frosted blue glass. Conveys "design + video production: the creative stack." (Creativity shown through form and light, still blue-only.)
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 5 · Configuraciones técnicas — Todo conectado  → `configuraciones-tecnicas.webp`
**Subject (RIGHT third):** A cluster of glass integration nodes / API connectors plugged together with glowing cables, plus faint floating terminal/code lines (abstract, unreadable) and a small monitoring pulse graph. Conveys "integrations, tracking and monitoring; the technical plumbing is stable."
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 6 · Presupuesto y pauta — Campañas al aire  → `presupuesto-pauta.webp`
**Subject (LEFT third):** A translucent glass marketing funnel with a luminous blue arrow rising up through it, flanked by a couple of floating glass ad cards and ascending bar-graph blocks. Directly echoes the reference `roadmap/1.png` but with a blue arrow instead of gold. Conveys "paid campaigns bringing qualified leads."
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 7 · Lanzamiento y agenda — Citas entrando  → `lanzamiento-agenda.webp`
**Subject (RIGHT third):** A glass calendar with several glowing appointment pins dropping/landing into its slots, plus a couple of small incoming chat bubbles and a soft notification halo. Conveys "appointments start landing in your calendar; sales follows up."
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 8 · Optimización continua — Crecer y ajustar  → `optimizacion.webp`
**Subject (LEFT third):** A rising glass growth curve breaking past a peak, surrounded by floating translucent metric tiles / KPI rings and a couple of slowly-turning glass gears. Conveys "we measure, adjust and keep growing on real numbers."
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

---

### Notas
- **Alternancia izq/der**: los sujetos alternan tercio izquierdo/derecho (pasos pares vs impares) para que, combinados con el sendero que serpentea, siempre haya aire para los textos y el HUD.
- **Consistencia**: generá las 8 en la misma sesión / con la misma seed-style si el generador lo permite, para que el set se vea como una familia.
- **Peso**: apuntá a < 250 KB por WebP (calidad ~80). `next/image` igual las re-optimiza a AVIF/WebP al servirlas.
