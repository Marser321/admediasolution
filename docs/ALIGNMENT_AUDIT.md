# Auditoria Total de Alineacion - AD Media Solution

Fecha: 2026-06-03

<alignment_audit>
  <summary>
    Auditoria completa del estado actual del proyecto contra el feedback del CEO, el plan operativo, las rutas publicas y las validaciones tecnicas/visuales disponibles.
  </summary>

  <status_legend>
    <item>`cumplido`: implementado y validado en codigo/navegador.</item>
    <item>`parcial`: existe implementacion, pero no cumple todo el requerimiento o falta respaldo.</item>
    <item>`faltante`: no se encontro implementacion suficiente.</item>
    <item>`bloqueado por contenido`: requiere datos, enlaces, fotos, testimonios o metricas reales.</item>
    <item>`requiere validacion visual`: pasa checks automaticos, pero necesita decision del vibe/cliente.</item>
  </status_legend>
</alignment_audit>

## Resumen Ejecutivo

El proyecto ya tiene una base fuerte: rutas publicas principales creadas, Home con mensaje central de direccion comercial, CTAs hacia `/planificacion`, popup temporizado, widget flotante, redirecciones SEO basicas, build exitoso y auditorias visuales automatizadas pasando.

El mayor riesgo actual no es tecnico, sino de alineacion y credibilidad: varias secciones muestran testimonios, metricas, chats, marcas, casos, fotos historicas o enlaces como si fueran reales, mientras el codigo los marca como placeholders o no hay respaldo documental visible. Antes de seguir refinando UI, conviene separar lo demostrable de lo provisional.

## Matriz de Alineacion

| Area | Estado | Impacto | Evidencia | Proxima accion recomendada |
| --- | --- | --- | --- | --- |
| Hero Home y mensaje central | cumplido | conversion / marca | `src/components/sections/HeroSection.tsx`; H1 validado en desktop/mobile: "Damos direccion de marketing y ventas..." | Validacion final de copy con el vibe. |
| CTA principal a cita | cumplido | conversion | Click en "AGENDAR CITA GRATIS" navega a `http://127.0.0.1:3000/planificacion` | Mantener. |
| CTA secundario al VSL/sistema | cumplido | conversion | Click en "Ver como funciona" lleva `#vsl-masterclass` a top `0` tras scroll suave | Mantener copy amplio; evitar lenguaje centrado solo en masterclass. |
| Popup cupón 5 segundos | cumplido | conversion | Popup visible, codigo `ADCRM-FREE-SET`, CTA a `/planificacion`, screenshot `/tmp/admedia-alignment-audit/desktop-popup-check.png` | Validar visual con el vibe; funcionalmente esta OK. |
| Widget flotante de cita | cumplido | conversion | `FloatingConsultWidget` conserva copy del CEO y enlaza `/planificacion` | Revisar si debe mostrarse tambien en mobile; hoy esta oculto en `sm` down. |
| Footer legible con IslandBar | cumplido | confianza / UX | `data-footer-legal` observado; `IslandBar` cambia `aria-hidden` a `true` al entrar footer | Mantener. |
| Home directo a VSL sin `ServicesSection` | cumplido | foco / conversion | `src/app/page.tsx` monta `BTLTestimonialsSection` seguido de `VSLSection`; no monta `ServicesSection` | Mantener decision. |
| Testimonios BTL | parcial / bloqueado por contenido | confianza / marca | Componente alternado existe, pero `TESTIMONIALS` tiene comentario placeholder y UI dice "Testimonios reales" | Reemplazar nombres, fotos, videos y metricas por material aprobado o renombrar como ejemplos. |
| Pagina `/danger` | parcial / bloqueado por contenido | confianza / marca | Ruta existe; chats/metricas/testimonios se presentan como reales, pero no hay respaldo visible y hay comentario ambiguo | Validar cada claim, captura y metrica con CEO antes de publicar. |
| Pagina `/casos` | parcial / bloqueado por contenido | confianza / conversion | `CASES` marcado como placeholder, pero H1/copy dicen "Resultados Reales" | Cambiar a casos verificados o degradar copy a "ejemplos de estructura". |
| Pagina `/servicios` y planes | cumplido / requiere validacion comercial | conversion / revenue | Lee `src/lib/data/servicesData.json`; incluye CRM, redes, ads, web, mantenimiento, nichos | Confirmar precios, alcance y claims como "Meta Business Partner" y "Especialistas Google Ads". |
| Servicios: produccion audiovisual | parcial / bloqueado por contenido | marca | Seccion existe, pero visual es placeholder con icono; no hay fotos reales de Cadete/fotografos | Cargar fotos reales o marcar como representativo. |
| Pagina `/planificacion` | parcial | conversion / operacion | Wizard funciona y guarda lead en `localStorage`; comentario indica falta endpoint/CRM real | Conectar a CRM/API real antes de considerarlo operativo. |
| Pagina `/equipo` | parcial / bloqueado por contenido | confianza / marca | Slider/lista existe; solo Danger tiene foto real, otros usan logo/icono y placeholders de futuras posiciones | Reemplazar fotos/sinopsis reales y decidir si "proxima incorporacion" se publica. |
| Pagina `/about-us` | parcial / bloqueado por contenido | confianza / narrativa | Timeline existe con imagenes generadas/placeholder; falta confirmar historia, fechas y fotos reales | Validar fechas, fotos de oficinas y relato con CEO. |
| Pagina `/comunidad` | parcial / bloqueado por contenido | comunidad / conversion | CTA usa `https://chat.whatsapp.com/invite`; videos tienen `videoUrl` vacio | Reemplazar link de invitacion y videos reales. |
| Menu principal de 10 celdas | parcial | navegacion / SEO | Navbar desktop tiene 7 items visibles + 4 sublinks en dropdown de servicios; IslandBar tiene 8 items | Decidir si el requisito "10 celdas" exige 10 visibles o acepta dropdown. |
| Redirecciones SEO 301 | parcial | SEO | `next.config.ts` cubre `/precios`, `/catalogo`, `/catalogo-servicios`, `/nosotros`, `/ceo`, `/contacto` | Hacer inventario real de URLs antiguas de `mediuso.com` antes de despliegue. |
| LogoMarquee / stack del hero | parcial | marca / claridad tecnica | `LogoMarquee` muestra marcas/clientes, no stack de WhatsApp API, GoHighLevel, Meta Ads, OpenAI, Make, Calendly, Stripe | Alinear con decision final: marcas que confian vs tecnologias conectadas. |
| Claims no respaldados | bloqueado por contenido | riesgo reputacional | Aparecen `$80K`, `4.2x ROI`, `+45% conversion`, "casos reales", "testimonios reales" | Crear lista de claims aprobados o degradar el lenguaje. |
| Accesibilidad/responsive automatica | cumplido | UX / calidad | Rhythm 160/160; motion 70/72 con 2 skipped esperados | Mantener auditorias en cada bloque visual grande. |

## Validacion Tecnica

| Check | Resultado | Notas |
| --- | --- | --- |
| `./node_modules/.bin/tsc --noEmit` | pasa | Sin salida, exit code 0. |
| ESLint directo con Node empaquetado | pasa con warnings | 2 warnings: `MessageCircle` sin uso en `src/app/danger/page.tsx`; `NAV_CLICK_LOCK_MS` sin uso en `IslandBar`. |
| `next build` directo con Node empaquetado | pasa | Next.js 16.1.6, 12 paginas generadas, `/servicios/[slug]` dinamica. |
| Auditoria estatica motion | pasa | `Motion/parallax static audit passed.` |
| Playwright motion | pasa | 70 passed, 2 skipped. |
| Playwright rhythm/theme | pasa | 160 passed. |
| Navegador local Playwright | pasa | 8 rutas revisadas en desktop/mobile; sin overlays, errores ni overflow horizontal. |
| `npm run ...` global | bloqueado por entorno | El npm global falla antes de ejecutar scripts por `TypeError: Class extends value undefined`. Se usaron binarios directos con Node empaquetado. |

## Evidencia Visual Local

Screenshots generados fuera del repo para no ensuciar archivos versionados:

- `/tmp/admedia-alignment-audit/desktop-home.png`
- `/tmp/admedia-alignment-audit/mobile-home.png`
- `/tmp/admedia-alignment-audit/desktop-popup-check.png`
- `/tmp/admedia-alignment-audit/mobile-servicios.png`
- `/tmp/admedia-alignment-audit/mobile-equipo.png`

## Prioridades Recomendadas

1. Blindar credibilidad: reemplazar o degradar testimonios, casos, chats, metricas y claims no verificados.
2. Conectar operacion real: formulario `/planificacion` a CRM/API y link real de comunidad WhatsApp.
3. Cerrar contenido visual: fotos reales de equipo, oficinas, produccion y eventos.
4. Completar SEO: inventario real de URLs antiguas de `mediuso.com` y mapa 301 definitivo.
5. Resolver navegacion: confirmar si las "10 celdas" deben ser visibles o pueden vivir dentro de dropdown.
6. Limpiar deuda menor: warnings de ESLint y decision final sobre `LogoMarquee`.
