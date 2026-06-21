# Prompts de imágenes — Fondos del Mapa del Servicio (/equipo)

Imágenes enfocadas por paso que florecen detrás del mapa interactivo del recorrido del servicio. Una por etapa (8 en total).

**Dirección visual (v2 — aprobada por dirección):** **entornos reales y cinematográficos** por área, no render 3D glassmorphic. Cada fondo es una **fotografía de un espacio/escena real** que se lee al instante como el área de esa etapa (sala de reunión, suite de edición, command center de pauta…), **oscurecida y graduada hacia el azul de marca**, sutil, con el sujeto a un costado para dejar **espacio negativo** para el HUD y los textos del mapa.

> Cambio respecto a v1: antes el set era glass abstracto en negro (estilo `public/roadmap/*.png`). Se reemplaza por foto-realismo cinematográfico de entornos. Se mantiene la paleta azul de marca, el peso negro de fondo y la alternancia izquierda/derecha.

## Cómo usarlas
1. Generá las 8 imágenes con los prompts de abajo (cualquier generador foto-realista: Midjourney, Flux, Ideogram, etc.).
2. Exportá a **WebP**, **16:9, ≥ 1600×900**, y guardalas en `public/journey/` con estos nombres exactos:
   - `primera-llamada.webp` · `configuracion-crm.webp` · `segunda-llamada.webp` · `pila-de-arte.webp` · `configuraciones-tecnicas.webp` · `presupuesto-pauta.webp` · `lanzamiento-agenda.webp` · `optimizacion.webp`
3. En `src/lib/data/serviceJourney.ts` poné `JOURNEY_IMAGES_READY = true`. Listo: el mapa usa las imágenes (con Ken-Burns) en vez del efecto animado de respaldo.

---

## Bloque de ESTILO COMPARTIDO (pegar al final de cada prompt para cohesión)

> Cinematic photograph of a real environment, shot on a ~35mm lens, shallow depth of field, photographic — NOT a 3D render or illustration. Moody and darkened, premium editorial lighting graded toward brand blue (electric blue #0066FF, azure #488EFF, sky cyan #7DD3FC) over a near-black base (#040711); cool blue rim-light, soft volumetric haze, faint bokeh and a few floating dust motes. The hero subject/anchor sits in the **{LEFT/RIGHT} third** of the frame; the opposite side and the lower-center stay quiet, underexposed and uncluttered as negative space for UI overlays. People only as distant, soft, out-of-focus silhouettes — **no identifiable faces**. No readable text, no on-screen words, no logos, no watermarks (any screens glow abstractly, blurred). Consistent lens, lighting and grade across the whole set so the 8 images read as one family. 16:9, ultra-detailed, high dynamic range.

Negative prompt sugerido: `legible text, words, letters, numbers, readable ui screenshots, logo, watermark, identifiable faces, close-up people, warm colors, orange, gold, green, purple, neon clutter, busy background, cartoon, illustration, 3d render, cgi, low-res, jpeg artifacts`.

**Composición / técnica (vale para las 8):**
- El contenedor en desktop es ~**2.6:1** con `object-cover`, así que la imagen 16:9 se recorta arriba/abajo: **mantené el ancla visual centrada verticalmente** y dejá **el tercio inferior despejado** (ahí va el HUD, ~60 px).
- **Alternancia izq/der**: el sujeto va al tercio izquierdo o derecho según el paso (impares DER, pares IZQ) para que, con el sendero que serpentea, siempre haya aire para textos y HUD.
- **Consistencia**: generá las 8 en la misma sesión / misma seed-style si el generador lo permite.
- **Peso**: apuntá a **< 250 KB** por WebP (calidad ~80). `next/image` igual las re-optimiza a AVIF/WebP al servirlas.

---

## 1 · Primera llamada — Diagnóstico  → `primera-llamada.webp`  *(sujeto: tercio DERECHO)*
**Escena (RIGHT third):** A quiet, dim home-office / video-call setup at dusk: a single over-ear headset resting beside a laptop whose screen glows softly with an abstract, out-of-focus rising line-chart and a couple of gauge rings (no readable numbers), an open notebook and a pen catching cool blue light. The mood is calm, attentive, one-on-one — "we listen, we read your business and find the gaps." The left side and center fall into soft shadow.
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 2 · Configuración del CRM — La base del sistema  → `configuracion-crm.webp`  *(sujeto: tercio IZQUIERDO)*
**Escena (LEFT third):** A tidy workstation seen at a slight angle: two monitors glowing blue with an abstract, blurred CRM pipeline / kanban of stacked cards and stages, a smartphone propped up showing a soft glowing chat bubble, neatly routed cables. Engineered, organised, "the base of the system — CRM, pipelines and WhatsApp wired together." Right side open and dark.
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 3 · Segunda llamada — Plan de acción  → `segunda-llamada.webp`  *(sujeto: tercio DERECHO)*
**Escena (RIGHT third):** A small modern meeting corner: a sleek table with two empty chairs, a wall screen or projection glowing with an abstract, blurred plan/calendar/proposal layout (no legible text), a coffee cup and a closed laptop. Cool blue daylight from a window edge. Reads as "we present the full structure — offer, budget, calendar — and agree how it starts." Left side quiet.
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 4 · Pila de arte — Identidad y creativos  → `pila-de-arte.webp`  *(sujeto: tercio IZQUIERDO)*
**Escena (LEFT third):** A creative editing suite in low light: a cinema camera and a clapperboard on a desk, a color-grading tablet/control surface, and editing monitors glowing with an abstract blurred video timeline and shape/colour layers. Tactile, crafted, "design + video production — the creative stack." Brand-blue grade keeps it on-palette despite the creative tools. Right side dark and open.
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 5 · Configuraciones técnicas — Todo conectado  → `configuraciones-tecnicas.webp`  *(sujeto: tercio DERECHO)*
**Escena (RIGHT third):** A network / server nook or a developer environment in the dark: a small rack or patch panel with blue patch cables and rows of tiny blinking status LEDs, plus a screen glowing with abstract, unreadable code lines and a faint monitoring pulse graph. Stable, plumbed-in, "integrations, tracking and monitoring — the technical layer is solid." Left and center underexposed.
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 6 · Presupuesto y pauta — Campañas al aire  → `presupuesto-pauta.webp`  *(sujeto: tercio IZQUIERDO)*
**Escena (LEFT third):** A campaign command center: a wall or cluster of monitors glowing blue with abstract, blurred ad dashboards and ascending bar/line graphs (no legible text), a desk with a keyboard catching rim-light. Energetic but controlled, "paid campaigns live on Meta and Google, bringing qualified leads." Right side open negative space.
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

## 7 · Lanzamiento y agenda — Citas entrando  → `lanzamiento-agenda.webp`  *(sujeto: tercio DERECHO)*
**Escena (RIGHT third):** A sales desk where appointments are landing: a screen or wall calendar glowing with abstract filled time-slots, a smartphone lighting up with soft incoming notification halos, a headset on the desk. A sense of momentum, "appointments start dropping into your calendar; sales follows up." Left and center calm and dark.
`{+ bloque de estilo, subject en el tercio DERECHO}`

## 8 · Optimización continua — Crecer y ajustar  → `optimizacion.webp`  *(sujeto: tercio IZQUIERDO)*
**Escena (LEFT third):** A calm analytics / control room: a curved monitor or panel glowing blue with abstract rising KPI dashboards, dials and a smooth ascending growth curve breaking past a peak (no legible numbers), reflective desk surface. Serene mastery, "we measure, adjust and keep growing on real numbers." Right side open for overlays.
`{+ bloque de estilo, subject en el tercio IZQUIERDO}`

---

### Notas
- **Por qué entornos reales:** los respaldos SVG animados (blueprint/flow/presence…) se sentían genéricos y se repetían. Una foto cinematográfica de cada espacio da contexto inmediato y un acabado premium, sin competir con el texto gracias al espacio negativo y al grado azul/oscuro.
- **Sin caras, sin texto legible:** mantiene foco en el ambiente, evita el "valle inquietante" de rostros generados y problemas de marca/legibilidad.
- **Respaldo intacto:** mientras `JOURNEY_IMAGES_READY = false`, el mapa sigue mostrando el SVG de marca (sin 404, `audit:rhythm` limpio). El flip se hace recién cuando estén las 8.
