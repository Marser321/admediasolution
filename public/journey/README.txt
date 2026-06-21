# Fondos del Mapa del Servicio (/equipo) — integrados

Una imagen por etapa (8 en total). Florecen detrás del ServiceJourneyMap al
hacer hover/click en cada nodo, con efecto Ken-Burns.

NOMBRES EXACTOS (no cambiar — el código ya apunta a estos paths):
  1. primera-llamada.webp          (sujeto: tercio DERECHO)
  2. configuracion-crm.webp        (sujeto: tercio IZQUIERDO)
  3. segunda-llamada.webp          (sujeto: tercio DERECHO)
  4. pila-de-arte.webp             (sujeto: tercio IZQUIERDO)
  5. configuraciones-tecnicas.webp (sujeto: tercio DERECHO)
  6. presupuesto-pauta.webp        (sujeto: tercio IZQUIERDO)
  7. lanzamiento-agenda.webp       (sujeto: tercio DERECHO)
  8. optimizacion.webp             (sujeto: tercio IZQUIERDO)

SPECS:
  - Formato WebP · 16:9 · >= 1600x900 px · objetivo < 250 KB (calidad ~80)
  - Estilo/composición y prompt completo de cada una: docs/journey-background-prompts.md
  - Resumen accionable de las 12 imágenes del sitio: docs/image-generation-packet.md

ESTADO:
  - Las 8 imágenes están integradas y JOURNEY_IMAGES_READY = true.
  - Si la bandera vuelve a false, el mapa usa el respaldo SVG de marca (sin 404).
  - Si falta alguna imagen, esa etapa cae sola a su respaldo SVG (onError).
