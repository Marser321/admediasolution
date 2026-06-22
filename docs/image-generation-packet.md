# Packet de generación de imágenes — AD Media Solution

Inventario canónico de las 12 imágenes editoriales generadas para el sitio: cuatro escenas de la historia de Danger y ocho fondos exteriores del recorrido de `/equipo`.

## A · Historia de Danger

Ruta: `public/about-us/`

Especificación: WebP, 4:3, mínimo 1600×1200 y objetivo menor a 300 KB.

| Año | Archivo | Escena |
|---|---|---|
| 2016 | `bedroom_start_2016.webp` | Comienzo individual en habitación-oficina |
| 2019 | `first_office_2019.webp` | Primera oficina con especialistas |
| 2022 | `scale_studio_2022.webp` | Liderazgo de equipo en estudio de producción |
| 2026 | `modern_headquarters_2026.webp` | Operación multidisciplinar en headquarters |

Prompts y referencias de personaje: `docs/about-us-character-prompts.md`.

## B · Recorrido de servicio de `/equipo`

Ruta: `public/journey/exterior/`

Especificación: WebP, 16:9, 1600×900 y menor a 250 KB. Son fondos full-width de la sección, con ancla alternada en los extremos y corredor central oscuro para el HUD.

| Paso | Archivo | Composición |
|---|---|---|
| 01 | `primera-llamada.webp` | Headset y laptop, ancla derecha |
| 02 | `configuracion-crm.webp` | Workstation con pipeline, ancla izquierda |
| 03 | `segunda-llamada.webp` | Sala de reunión, ancla derecha |
| 04 | `pila-de-arte.webp` | Cámara y suite de edición, ancla izquierda |
| 05 | `configuraciones-tecnicas.webp` | Servidores y conexiones, ancla derecha |
| 06 | `presupuesto-pauta.webp` | Command center publicitario, ancla izquierda |
| 07 | `lanzamiento-agenda.webp` | Calendario y escritorio comercial, ancla derecha |
| 08 | `optimizacion.webp` | Sala de analítica, ancla izquierda |

Prompts completos y dirección compartida: `docs/journey-background-prompts.md`.

## Reglas compartidas

- Base near-black `#040711` y grade azul de marca.
- Fotografía cinematográfica realista; sin aspecto de render 3D.
- Sin texto, números, logos, marcas de agua ni rostros identificables.
- Pantallas abstractas y desenfocadas.
- Los originales generados se conservan fuera del repositorio; en `public/` solo viven los WebP optimizados de producción.

## Estado

- [x] Cuatro escenas de About Us integradas.
- [x] Ocho fondos exteriores generados, optimizados e integrados el 21 de junio de 2026.
- [x] El recorrido inicia en el paso 01 y cambia fondo/contenido mediante el rail accesible `01–08`.
- [x] Móvil presenta una tarjeta con fondo y scrim por etapa.
- [x] La dirección descartada de nodos cuadrados y fondos panorámicos interiores fue retirada.
