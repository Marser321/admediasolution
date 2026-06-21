# Packet de generación de imágenes — AD Media

Hoja única y accionable para generar las **12 imágenes** que faltan del sitio:
**4 escenas de Danger** (timeline de `/about-us`) + **8 fondos del mapa** (`/equipo`).
Los prompts completos viven en los docs detallados (linkeados abajo); esta hoja
es el "qué generar, con qué nombre y dónde va".

> El código ya está 100% cableado. Cuando sueltes las imágenes con los nombres
> exactos, se ven solas (about-us) o con un flip de una bandera (mapa). Ver
> **Checklist de integración** al final.

---

## Antes de empezar

- **Referencias canónicas de Danger**:
  - `WhatsApp Image 2026-06-12 at 13.43.45.jpeg` — rostro frontal con laptop.
  - `WhatsApp Image 2026-06-12 at 13.43.45 (1).jpeg` — sonrisa y gesto.
  - `WhatsApp Image 2026-06-12 at 13.43.45 (2).jpeg` — cuerpo completo y postura.
  - Las tres se usan juntas y permanecen fuera de `public/`.
- **Exportá directo a WebP** (lo más simple). Si exportás PNG, `scripts/convert-assets.mjs`
  los convierte (`node scripts/convert-assets.mjs`).
- **Consistencia**: generá cada set (about-us / journey) en la misma sesión / seed-style
  para que se lean como una familia.

---

## A · About Us — historia de Danger  → carpeta `public/about-us/`

Specs: **WebP · 4:3 · ≥ 1600×1200**, objetivo < ~300 KB. Danger **descentrado**;
**esquina inferior-izquierda limpia** (badge de año en móvil); evitá contenido en
los **±48 px** arriba/abajo (recorte de parallax en desktop).

| # | Año | Escena (resumen) | Archivo | Personaje |
|---|-----|------------------|---------|-----------|
| 1 | 2016 | Danger ~10 años más joven, **solo**, de noche en su habitación-oficina; laptop + teléfono, una lámpara, grind solitario | `bedroom_start_2016.webp` | Solo Danger |
| 2 | 2019 | Danger + **2–3 especialistas** como siluetas desenfocadas en oficina compartida; embudos borrosos en pizarra | `first_office_2019.webp` | Danger + siluetas |
| 3 | 2022 | Danger **liderando equipo** en estudio de producción; bahías de edición azules, cámara de cine, crew en bokeh | `scale_studio_2022.webp` | Danger + siluetas |
| 4 | 2026 | Danger **actual** (look de `ceo.webp`) en HQ moderna; sala de grabación + área de desarrollo, equipo multidisciplinar de fondo | `modern_headquarters_2026.webp` | Danger + siluetas |

> **2027+ no se genera**: usa el video abstracto existente
> (`/videos/about-future-integration-2027.mp4`). El archivo `future_expansion_2027.webp`
> ya existe como fallback no visible; no hace falta tocarlo.

**Prompts completos (escena por escena) + bloque de personaje/estilo + negative prompt:**
`docs/about-us-character-prompts.md`

---

## B · Mapa del Servicio — fondos por etapa  → carpeta `public/journey/`

Specs: **WebP · 16:9 · ≥ 1600×900**, objetivo < 250 KB. **Sin caras** (gente solo
como siluetas lejanas), **sin texto legible** (pantallas brillan borrosas). Sujeto al
**tercio izq/der** según la fila; **tercio inferior despejado** (ahí va el HUD, ~60 px).

| # | Etapa | Escena (resumen) | Archivo | Sujeto |
|---|-------|------------------|---------|--------|
| 1 | Primera llamada | Home-office / videollamada al atardecer; headset, laptop con gráfico abstracto | `primera-llamada.webp` | DERECHA |
| 2 | Configuración del CRM | Workstation ordenada; 2 monitores con pipeline/kanban borroso, celular con burbuja de chat | `configuracion-crm.webp` | IZQUIERDA |
| 3 | Segunda llamada | Rincón de reunión moderno; mesa, pantalla con propuesta/calendario borroso, café | `segunda-llamada.webp` | DERECHA |
| 4 | Pila de arte | Suite de edición; cámara de cine, claqueta, tablet de color, timeline de video abstracto | `pila-de-arte.webp` | IZQUIERDA |
| 5 | Configuraciones técnicas | Rack/red en penumbra; cables azules, LEDs de estado, pantalla con código ilegible | `configuraciones-tecnicas.webp` | DERECHA |
| 6 | Presupuesto y pauta | Command center de campañas; muro de monitores con dashboards de ads borrosos | `presupuesto-pauta.webp` | IZQUIERDA |
| 7 | Lanzamiento y agenda | Escritorio de ventas; calendario con slots, celular con notificaciones, headset | `lanzamiento-agenda.webp` | DERECHA |
| 8 | Optimización continua | Sala de analítica; monitor curvo con KPIs y curva de crecimiento ascendente | `optimizacion.webp` | IZQUIERDA |

**Prompts completos + bloque de estilo compartido + negative prompt:**
`docs/journey-background-prompts.md`

---

## Reglas compartidas (ambos sets)

- **Grade azul de marca** (#0066FF · #488EFF · #7DD3FC) sobre base casi negra (#040711);
  rim-light frío, neblina volumétrica sutil, grano de film leve. Foto cinematográfica,
  ~35mm, foco selectivo — **no render 3D, no ilustración**.
- **Sin texto/logos/watermarks legibles.** Pantallas siempre borrosas/abstractas.
- **Espacio negativo** del lado opuesto y abajo para HUD / textos / badges.
- **Negative prompt base:** `legible text, words, logos, watermark, identifiable third-party faces, warm/orange cast, cartoon, illustration, 3d render, plastic skin, stock cliché, low-res`.
  (En about-us sumá: `different person, inconsistent face, distorted face, extra fingers`.)

---

## Checklist de integración (lo hace Claude cuando estén las imágenes)

**About Us** — integrado:
- [x] Sobrescribir los 4 `.webp` en `public/about-us/` con las escenas finales de Danger.
- [x] Quitar el comentario-marcador `PLACEHOLDER` en `src/app/about-us/page.tsx`.

**Mapa /equipo:**
- [x] Confirmar las 8 `.webp` en `public/journey/`.
- [x] Poner `JOURNEY_IMAGES_READY = true` en `src/lib/data/serviceJourney.ts`.

**Ambos:**
- [x] Verificar pesos (journey < 250 KB; about-us < ~300 KB) — recomprimir con
      `node scripts/convert-assets.mjs` si hace falta.
- [x] Verificar en preview: `/about-us` (4 slides con Danger, 2027+ video) y `/equipo`
      (hover de cada etapa = su imagen + Ken-Burns, sin 404).
