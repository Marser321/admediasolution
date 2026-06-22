# Fondos exteriores del recorrido de /equipo

Los ocho WebP de producción viven exclusivamente en `public/journey/exterior/`.
Cubren la introducción completa según el paso activo y también alimentan las
tarjetas del recorrido móvil.

Especificación:
  - WebP, 16:9, 1600x900 px y menos de 250 KB.
  - Ancla narrativa alternada en los extremos.
  - Corredor central oscuro para título, HUD y rail 01-08.
  - Sin texto, logos, marcas de agua ni rostros identificables.

Fuente de verdad:
  - Datos y paths: src/lib/data/serviceJourney.ts
  - Prompts: docs/journey-background-prompts.md
  - Inventario: docs/image-generation-packet.md

No existen banderas de activación ni imágenes interiores duplicadas. Si una
imagen falla, la interfaz conserva su base oscura y el contenido sigue operativo.
