# Prompts canónicos — Fondos exteriores del recorrido de `/equipo`

Este set contiene los ocho fondos cinematográficos que transforman la introducción completa del recorrido según la etapa activa. No son miniaturas, nodos ni imágenes interiores: cada pieza cubre el ancho total de la sección detrás del título, HUD y rail `01–08`.

## Especificación compartida

- WebP, 16:9, mínimo 1600×900 y objetivo menor a 250 KB.
- Ruta final: `public/journey/exterior/`.
- Fotografía cinematográfica realista, lente aproximada de 35 mm y profundidad de campo selectiva.
- Base near-black `#040711`, luz editorial azul `#0066FF`, `#488EFF` y `#7DD3FC`.
- Ancla narrativa alternada en los extremos: pasos impares a la derecha y pares a la izquierda.
- Corredor central oscuro, limpio y con poco detalle para proteger título, HUD y rail.
- Sin texto, números, logos, marcas de agua, manos protagonistas ni rostros identificables.
- Pantallas y paneles siempre abstractos y desenfocados.
- Misma óptica, contraste, grano, iluminación y tratamiento de color en las ocho piezas.

### Bloque de estilo compartido

> Cinematic photorealistic environment for a premium full-width website background, 16:9. Shot on an approximately 35mm lens with selective depth of field, realistic materials and restrained film grain. Near-black base #040711, premium editorial lighting graded in electric blue #0066FF, azure #488EFF and sky cyan #7DD3FC, subtle cool rim light, faint volumetric haze and minimal bokeh. Place the main narrative anchor in the requested outer third and keep a broad, underexposed, uncluttered central corridor for a title, glass HUD and navigation rail. Preserve important objects around the vertical middle so the scene survives responsive object-cover crops. No identifiable people or faces, no foreground hands, no readable words, letters or numbers, no logos or watermarks, no warm dominant colors, no neon clutter, no illustration, no CGI or 3D-render appearance.

## Los ocho fondos

### 01 · Diagnóstico — `primera-llamada.webp`

> Quiet premium home-office at dusk. A large over-ear headset and an open laptop form the clear narrative anchor in the far right third; the laptop emits only a soft abstract blue analytic glow. A notebook and pen add restrained realism. The center and left side dissolve into calm near-black negative space. The scene communicates attentive listening and business diagnosis.

### 02 · CRM — `configuracion-crm.webp`

> Tidy professional workstation anchored in the far left third. Two monitors show an abstract blurred pipeline made of broad vertical columns and cards; a nearby smartphone carries only a generic soft chat glow. Neatly routed cables and precise blue reflections communicate an organized commercial system. Keep the center and right side dark and quiet.

### 03 · Plan de acción — `segunda-llamada.webp`

> Small modern meeting room anchored in the far right third: an oval table, empty chair and wide wall display with broad abstract planning blocks. One closed laptop and a coffee cup add scale without competing. Cool blue light and soft shadows communicate a prepared proposal and a clear next step. Preserve a dark central corridor.

### 04 · Pila de arte — `pila-de-arte.webp`

> Cinematic editing suite anchored in the far left third. A professional cinema camera with a prominent circular lens, a diagonal clapperboard and a color-grading surface create a tactile production cluster. A background monitor shows only broad blurred timeline bands. Keep the center and right side underexposed and uncluttered.

### 05 · Configuración técnica — `configuraciones-tecnicas.webp`

> Dark technical operations space anchored in the far right third. A compact server rack or patch panel, carefully routed blue cables and restrained status lights form a readable connected-system silhouette. A distant monitor contains only abstract monitoring pulses. The scene feels stable, engineered and secure; the central corridor remains near-black.

### 06 · Presupuesto y pauta — `presupuesto-pauta.webp`

> Advertising command center anchored in the far left third. A controlled cluster of monitors carries abstract ascending bars and one smooth growth curve, with all interface detail intentionally unreadable. A keyboard and reflective desk catch subtle blue rim light. Energetic but disciplined; center and right remain dark for the interface.

### 07 · Lanzamiento — `lanzamiento-agenda.webp`

> Premium commercial desk anchored in the far right third. A large abstract calendar grid with softly illuminated appointment slots, a smartphone with restrained notification halos and a headset communicate that qualified meetings are arriving. No dates or text. Keep the middle and left areas calm, dark and compositionally empty.

### 08 · Optimización — `optimizacion.webp`

> Calm analytics room anchored in the far left third. A curved display presents one abstract ascending performance curve and a restrained circular optimization motif, all unreadable and softly luminous. Reflections on the desk add depth while the center and right side remain near-black. The mood is precise, measured and continuously improving.

## Estado de integración

- Generadas mediante ocho llamadas independientes a la herramienta integrada de imagegen.
- Optimizadas a WebP 1600×900 y almacenadas en `public/journey/exterior/`.
- Integradas como fondo full-bleed del paso activo en escritorio y tablet.
- Reutilizadas como fondo individual de cada tarjeta en móvil.
- No existe bandera de activación: `JourneyStage.backgroundImage` es la fuente de verdad y cada carga conserva fallback visual oscuro.
