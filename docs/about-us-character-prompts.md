# Prompts utilizados — Historia de AD Media con el personaje **Danger** (/about-us)

Las cuatro escenas históricas de "Sobre Nosotros" fueron corregidas usando tres fotos reales y actuales de Danger Fernández como referencias canónicas de identidad. Este documento conserva los prompts y criterios para futuras regeneraciones.

<identity_reference_policy>
  <canonical_sources>
    <item>`WhatsApp Image 2026-06-12 at 13.43.45.jpeg`: referencia frontal principal, sentado con laptop.</item>
    <item>`WhatsApp Image 2026-06-12 at 13.43.45 (1).jpeg`: referencia de sonrisa, gesto y expresión natural.</item>
    <item>`WhatsApp Image 2026-06-12 at 13.43.45 (2).jpeg`: referencia de cuerpo completo, proporciones y postura.</item>
  </canonical_sources>
  <identity_lock>
    <item>Preservar frente y cabeza anchas, mejillas y mandíbula reales, línea capilar corta, nariz, sonrisa y patrón dental, barba corta, tono de piel y montura transparente color champagne.</item>
    <item>No aceptar gafas negras, rostro estrecho, mandíbula afinada, nariz distinta, barba más densa ni una sonrisa genérica.</item>
    <item>Las fotos fuente permanecen fuera de `public/`; solo se publican los WebP finales.</item>
  </identity_lock>
</identity_reference_policy>

**Decisión de dirección:** Danger presente en **todas** las etapas — **solo** en 2016, **sumando equipo y espacios** desde 2019 en adelante. El hito **2027+ se mantiene como video abstracto del futuro** (sin personaje); abajo queda solo un prompt opcional de respaldo.

## Cómo usarlas
1. Cargá conjuntamente las tres referencias canónicas listadas arriba. `public/team/ceo.webp` puede usarse solo como apoyo secundario, nunca como referencia principal.
2. Generá 4 imágenes (2016, 2019, 2022, 2026) con los prompts de abajo, **mismo personaje** en todas.
3. Exportá a **WebP** y reemplazá in-place (mismos nombres) en `public/about-us/`:
   - `bedroom_start_2016.webp` · `first_office_2019.webp` · `scale_studio_2022.webp` · `modern_headquarters_2026.webp`
   - (Si exportás PNG, corré `node scripts/convert-assets.mjs` para pasarlos a WebP. `next/image` igual re-optimiza a AVIF/WebP al servir.)
4. No hace falta cambiar código: las `imageUrl` ya apuntan a esos `.webp` (hoy con placeholders convertidos). `/about-us` no está en el cache `immutable`, así que el reemplazo se ve al redeployar. Cuando entren las fotos reales, sacá el comentario-marcador PLACEHOLDER de `src/app/about-us/page.tsx`.

---

## Bloque de PERSONAJE + ESTILO COMPARTIDO (pegar al final de cada prompt)

> The recurring subject is **Danger Fernández**. Use all three canonical real-photo references together and prioritize literal identity fidelity over beautification. Lock his broad forehead and head shape, fuller cheeks and jaw, exact hairline, nose, eyes, wide authentic smile and tooth pattern, short beard, medium-brown skin tone and thick translucent champagne-clear rectangular glasses. Keep the same identifiable person across every era, changing age only subtly. Cinematic editorial photograph, ~35mm lens, shallow depth of field, photographic realism. Brand-blue grade over a near-black base. **Aspect 4:3, ≥1600×1200.** Keep Danger off-center, the lower-left badge area clean and key content outside the ±48 px parallax crop. No readable text, logos or watermarks.

Negative prompt sugerido: `different person, lookalike actor, narrow face, tapered jaw, black glasses, wire glasses, wrong clear-frame shape, altered nose, altered smile, different teeth, heavy beard, receding hairline, distorted face, extra fingers, text, logos, watermark, cartoon, illustration, 3d render, plastic skin, low-res`.

---

## 2016 — El inicio, en solitario  → `bedroom_start_2016.webp`
> **Escena:** A much younger Danger Fernández (~10 years younger), **completely alone**, working late at night in a modest bedroom-office: a laptop and a phone on a simple desk, a single warm-to-blue lamp as the only pool of light, sticky notes on the wall, a coffee mug. He is focused, leaning in, hopeful and determined — the lonely-grind energy of someone giving marketing and sales direction to local shops from his room. Intimate, lo-fi, a little raw. He sits toward one side; the rest of the room falls into deep blue shadow.
> `{+ bloque de personaje + estilo}`

## 2019 — La Primera Oficina  → `first_office_2019.webp`
> **Escena:** Danger, slightly older and a bit more polished, **standing/working with 2–3 specialists** (design + paid-ads people) rendered as soft, out-of-focus silhouettes around him in a small shared office. A whiteboard or glass wall behind shows abstract, blurred marketing funnels and arrows (no legible text). Cool natural daylight from a window mixed with brand-blue grade; a sense of a young team finding its structure. Danger is the in-focus anchor on one side; collaborators and the room blur into the negative space.
> `{+ bloque de personaje + estilo}`

## 2022 — Segunda Oficina y Escala  → `scale_studio_2022.webp`
> **Escena:** Danger, now clearly more senior and confident, **leading a larger team** in a production studio: editing bays with glowing blue monitors (abstract blurred video timelines), a cinema camera on a tripod, soft studio lighting, a few crew members as out-of-focus silhouettes. The energy of scale — 50+ recurring clients, a real operation. Danger anchors one third in focus, directing or reviewing; the studio depth and team recede into bokeh.
> `{+ bloque de personaje + estilo}`

## 2026 — Oficinas Actuales & AD Media CRM  → `modern_headquarters_2026.webp`
> **Escena:** Present-day Danger (match the current `team/ceo.webp` look) in a sleek, modern high-performance headquarters: a recording / content room on one side and a development area with large blue-glowing screens (abstract dashboards, no legible text) on the other, a multidisciplinary team as soft silhouettes in the background. Cool blue/cyan premium grade, architectural and confident. Danger stands assured toward one side as the clear protagonist; the HQ opens up as elegant negative space.
> `{+ bloque de personaje + estilo}`

---

## 2027+ — Futuro e Integración Exponencial  *(se mantiene como video)*
La etapa 2027+ **sigue usando el video abstracto existente** (`/videos/about-future-integration-2027.mp4` + póster), sin personaje. No hace falta generar nada.

**Opcional — póster de respaldo** (`/videos/about-future-integration-2027-poster.jpg`) si alguna vez se quiere una imagen en vez de video:
> **Escena:** An abstract, forward-looking brand-blue space suggesting exponential growth and AI integration — flowing light trails, layered glowing data planes, a sense of acceleration over a near-black base. Optional: a single distant, out-of-focus silhouette looking toward the horizon (no identifiable face). Cinematic, premium, brand-blue only. 16:9, no readable text/logos.
> `{+ estilo}`

---

### Notas
- **Consistencia de edad:** el orden 2016 → 2026 debe leerse como **la misma persona madurando**. Si el generador lo permite, fijá seed/identidad y solo variá año, peinado, vestimenta y entorno.
- **Sin caras de terceros:** colaboradores y equipo siempre como **siluetas desenfocadas**, para no inventar personas reconocibles ni chocar con permisos de imagen.
- **Composición:** respetá el recorte de parallax (desktop) y el badge de año abajo-izquierda (móvil); por eso Danger va **descentrado**.
- **Reemplazo:** mismos nombres de archivo → cero cambios de código.
