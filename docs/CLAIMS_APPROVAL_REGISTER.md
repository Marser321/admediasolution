# Registro de Claims Pendientes de Aprobacion

Fecha: 2026-06-03

<claims_approval_register>
  <purpose>
    Mantener el impacto comercial visible del sitio mientras se trazan todos los claims, testimonios, metricas, chats, enlaces, fotos y assets que requieren aprobacion del vibe/CEO antes de publicacion final.
  </purpose>

  <publication_guardrails>
    <item>Este registro no cambia la UI publica ni degrada claims por si mismo.</item>
    <item>Ningun claim se considera aprobado si no tiene evidencia verificable o aprobacion explicita del vibe/CEO.</item>
    <item>Los estados permitidos son `aprobado`, `pendiente de evidencia`, `placeholder visible`, `enlace provisional`, `foto/asset provisional` y `claim comercial sensible`.</item>
    <item>Cuando un claim se apruebe, debe agregarse la evidencia o nota de aprobacion antes de sacarlo de este registro.</item>
  </publication_guardrails>
</claims_approval_register>

## Resumen

El sitio conserva su fuerza comercial actual, pero varias pruebas sociales, metricas y assets aun necesitan validacion. La prioridad editorial antes de publicar es aprobar o reemplazar los claims que pueden afectar reputacion, confianza, operacion o cumplimiento comercial.

## Matriz Por Ruta Publica

| Ruta | Ubicacion | Claim visible o elemento | Tipo de riesgo | Evidencia actual | Estado | Accion requerida |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Hero | Negocios que quieren facturar `$30,000`, `$40,000`, `$50,000` o `$100,000 USD` al mes | conversion / claim comercial sensible | Pedido del CEO en `docs/CLIENT_FEEDBACK.md` | pendiente de evidencia | Validar que la promesa se mantenga como aspiracional y no como garantia de resultado. |
| `/` | `BTLTestimonialsSection` | "Testimonios reales · BTL", "Negocios reales. Resultados reales." | reputacional | El componente contiene comentario `PLACEHOLDER` para reemplazar testimonios reales | placeholder visible | Aprobar los testimonios, nombres, empresas y videos, o degradar copy en fase futura. |
| `/` | `BTLTestimonialsSection` | Andres Rodriguez / E-commerce, paso de `$25.000` a mas de `$80.000` al mes | reputacional / legal-comercial | No hay evidencia documental visible; imagen en `public/testimonials/ecommerce_founder.png` | claim comercial sensible | Validar caso, permiso de uso, metrica y asset con CEO. |
| `/` | `BTLTestimonialsSection` | Mariana Costa / HealthFit, ROI medible en pauta | reputacional | No hay evidencia documental visible; imagen en `public/testimonials/wellness_founder.png` | claim comercial sensible | Validar nombre, empresa, testimonio y metrica o marcar como ejemplo. |
| `/` | `BTLTestimonialsSection` | Javier Mendez / LogiTec, cierres duplicados | reputacional | No hay evidencia documental visible; imagen en `public/testimonials/ops_director.png` | claim comercial sensible | Validar nombre, empresa, testimonio y metrica o marcar como ejemplo. |
| `/` | `ScrollytellingSection` | Metricas de escala `$30.000 USD`, `$100K`, soporte real e ingresos reales | conversion / reputacional | Comentario `PLACEHOLDER: validar estas metricas con casos reales antes de publicar` | claim comercial sensible | Confirmar si son claims aprobados o mantenerlos solo como benchmarks aspiracionales. |
| `/` | `ProjectsGallery` | "Casos reales" y galeria de empresas con direccion de marketing, CRM y soporte | reputacional | Archivo marcado como casos de ejemplo on-brand | placeholder visible | Validar cada proyecto mostrado o cambiar copy en fase futura. |
| `/` | `PromoPopup` | Cupon `ADCRM-FREE-SET` y "Hay un cupon disponible" | operacion / conversion | Funcionamiento validado; no hay politica comercial del cupon en repo | pendiente de evidencia | Confirmar vigencia, condiciones y uso operativo del cupon. |
| `/danger` | Hero/perfil de Danger | Trayectoria y autoridad comercial de Danger Fernandez | marca / reputacional | Fuente: pedido del CEO y `AuthoritySection`; algunas cifras internas tienen comentario de validacion | pendiente de evidencia | Validar biografia final, rango de autoridad y permisos de imagen. |
| `/danger` | Chat simulado | Conversacion WhatsApp con Andres Rodriguez y `$85,000 USD este mes` | reputacional / legal-comercial | Chat renderizado como simulacion; no hay captura real aprobada | claim comercial sensible | Reemplazar por captura real aprobada o etiquetar como recreacion en fase futura. |
| `/danger` | Metricas de impacto | `+$80K USD/mes`, `+45% Conversion`, `4.2x ROI` | reputacional / legal-comercial | No hay evidencia documental visible | claim comercial sensible | Validar cada metrica con caso, periodo, fuente y permiso. |
| `/danger` | Testimonios | Andres Rodriguez, Mariana Costa, Javier Mendez con roles y empresas | reputacional | Comentario dice "testimonios reales"; no hay evidencia adjunta | pendiente de evidencia | Aprobar testimonios y permisos de uso, o degradar copy. |
| `/casos` | Header | "Resultados Reales" y "No vendemos humo. Ayudamos a empresas reales..." | reputacional | `CASES` marcado como `PLACEHOLDER: casos de ejemplo on-brand` | placeholder visible | Confirmar casos reales o cambiar lenguaje en fase futura. |
| `/casos` | Grid de casos | Tienda en linea `$80K`, negocio de salud agenda llena, servicios con ROI, inmobiliaria `x2` cierres | reputacional / conversion | Casos de ejemplo en codigo, sin evidencia | claim comercial sensible | Validar cada caso, industria, metrica y permiso de publicacion. |
| `/servicios` | Planes y precios | CRM `$1,500 + $97/mes`, soportes `$500/$750`, VIP desde `$1,000`, redes `$500/$800`, ads desde `$1,000`, web `$250-$5,000+` | comercial / conversion | `servicesData.json` y `docs/CURRENT_SITE_CONTENT.md` contienen estructura de precios | pendiente de evidencia | Confirmar precios finales, alcance, impuestos, moneda y vigencia. |
| `/servicios` | Ads | "Meta Business Partner" | legal-comercial / marca | Pedido del CEO lo menciona; no hay insignia/certificado verificable en repo | claim comercial sensible | Validar estatus oficial y permiso de uso de la marca Meta. |
| `/servicios` | Ads | "Especialistas Google Ads", "Certificacion avanzada en Google Search, Display, Shopping y YouTube Ads" | legal-comercial / marca | No hay certificado visible en repo | claim comercial sensible | Validar certificaciones y nombres legales permitidos. |
| `/servicios` | Produccion | Danger y Cadete como fotografos/camarografos experimentados | marca / reputacional | Pedido del CEO menciona fotos de Danger/Cadete; visual actual usa icono/slot | foto/asset provisional | Cargar fotos reales y validar roles antes de publicar como prueba visual. |
| `/servicios` | Nichos | "Un YouTube para cada persona" | marca / estrategia | Pedido textual del CEO | pendiente de evidencia | Confirmar frase exacta y contexto comercial final. |
| `/servicios/[slug]` | Detalles de servicio | Stats `24/7`, `100%`, `0`, `ROI`, `Meta`, `+2` | reputacional / conversion | Comentario `PLACEHOLDER: validar las metricas (stats) con datos reales` | claim comercial sensible | Validar stats o convertirlas a mensajes no numericos en fase futura. |
| `/servicios/[slug]` | Direccion de marketing | "Somos Business Partner de Meta" | legal-comercial | Sin evidencia verificable en repo | claim comercial sensible | Validar estatus oficial y permiso de marca. |
| `/equipo` | Equipo | "Los Lideres Detras de la Operacion", especialistas de la media | marca / reputacional | Estructura de equipo existe; varios miembros son placeholders o proximas incorporaciones | pendiente de evidencia | Confirmar nombres, roles, bios y alcance del posicionamiento "lideres". |
| `/equipo` | Fotos | Solo Danger usa foto real; Cadete/Sofia/Natalia/Cristian/Mateo y roles futuros usan logo/iconos | marca / confianza | Comentario `PLACEHOLDER: fotos ... marcadores` | foto/asset provisional | Sustituir por fotos reales o aprobar placeholders como decision temporal. |
| `/equipo` | Proximas incorporaciones | Ads Specialist, CRM Specialist, Web Designer UX/UI, Video Editor, Copywriter Pro | marca / operacion | Marcados como "Proxima Incorporacion" | placeholder visible | Confirmar si deben ser visibles publicamente o moverse a roadmap interno. |
| `/equipo` | Ads Specialist | TikTok Ads como especialidad | marca / consistencia | El feedback del anotador pidio quitar TikTok Ads del hero; aqui sigue como especialidad futura | pendiente de evidencia | Decidir si TikTok Ads pertenece al stack publico o solo a capacidades futuras. |
| `/comunidad` | CTA WhatsApp | `https://chat.whatsapp.com/invite` | operacion / conversion | Comentario indica reemplazar por enlace real | enlace provisional | Conectar enlace real de comunidad o desactivar antes de publicar. |
| `/comunidad` | Videos | Eventos/masterclasses con `videoUrl` vacio | marca / conversion | Comentario indica eventos de ejemplo | placeholder visible | Cargar videos reales o aprobar placeholders interactivos. |
| `/comunidad` | Comunidad activa | "Comunidad activa ahora" | reputacional / conversion | No hay dato dinamico ni evidencia de actividad | claim comercial sensible | Validar si se mantiene como indicador estetico o se reemplaza por copy neutro. |
| `/about-us` | Historia | Inicio en 2016, primera oficina 2019, segunda oficina 2022, oficinas actuales 2026, futuro 2027+ | reputacional / marca | Pedido del CEO confirma historia general; fechas exactas e imagenes no tienen evidencia visible | pendiente de evidencia | Validar timeline, fechas, narrativa y fotos con CEO. |
| `/about-us` | Imagenes historicas | Assets `bedroom_start_2016`, `first_office_2019`, `scale_studio_2022`, `modern_headquarters_2026`, `future_expansion_2027` | marca / confianza | Assets existen, pero no consta si son fotos reales o generadas | foto/asset provisional | Confirmar si son fotos reales, generadas o placeholders aprobados. |
| `/planificacion` | Formulario | "Consulta Solicitada Exitosamente" y registro en CRM | operacion / conversion | El envio simula API y guarda en `localStorage`; comentario indica conectar endpoint/CRM real | placeholder visible | Conectar endpoint/CRM real antes de operacion comercial. |
| `/planificacion` | Facturacion | Rangos de facturacion hasta `Mas de $100,000 USD / mes` | conversion | Basado en feedback del CEO | pendiente de evidencia | Confirmar rangos del formulario y criterios de calificacion. |
| Global | Navbar/IslandBar | Menu de 10 celdas requerido vs 7 items visibles + dropdown/8 en IslandBar | navegacion / SEO | Auditoria previa lo marco parcial | pendiente de evidencia | Confirmar si el requisito es 10 celdas visibles o dropdown aceptado. |
| Global | SEO redirects | Redirecciones `/precios`, `/catalogo`, `/catalogo-servicios`, `/nosotros`, `/ceo`, `/contacto` | SEO | Mapeo basico en `next.config.ts`; falta inventario real de URLs antiguas | pendiente de evidencia | Hacer inventario de URLs indexadas de `mediuso.com` antes de deploy. |
| Global | Logos/marcas | LogoMarquee muestra marcas que confian; feedback previo pedia stack tecnologico | marca / consistencia | No hay evidencia visible de permisos de marcas/clientes | pendiente de evidencia | Decidir si el marquee representa clientes aprobados o tecnologias conectadas. |

## Prioridad De Aprobacion

| Prioridad | Items | Motivo |
| --- | --- | --- |
| P0 | Chats, testimonios reales, casos reales, metricas `$80K`, `$85K`, `4.2x ROI`, `+45%`, `x2` cierres | Riesgo reputacional y comercial alto si no hay evidencia. |
| P0 | Link de WhatsApp comunidad y formulario `/planificacion` simulado | Impacta operacion real de captacion. |
| P1 | Meta Business Partner, Google Ads certificado/especialistas, permisos de marcas/clientes | Riesgo de marca, compliance y confianza. |
| P1 | Fotos de equipo, oficinas, produccion y eventos | Afecta confianza visual y narrativa de trayectoria. |
| P2 | Precios, planes, rangos de facturacion y cupon | Necesitan confirmacion comercial antes de venta activa. |
| P2 | Menu de 10 celdas, redirecciones SEO antiguas, LogoMarquee | Importante para coherencia y despliegue, menos urgente que claims sensibles. |

## Flujo De Aprobacion Recomendado

1. El vibe/CEO revisa los items P0 y marca cada uno como aprobado, reemplazar o degradar.
2. Marketing aporta evidencia: capturas, videos, nombres autorizados, fotos, certificados o URLs reales.
3. Desarrollo actualiza copy/assets/enlaces solo despues de la aprobacion.
4. Se reejecutan `tsc`, ESLint, build y auditorias Playwright antes de publicar.

## Notas De Validacion

- Este documento es el registro editorial; no modifica la experiencia publica.
- La politica elegida para esta fase es mantener los claims visibles y listarlos para aprobacion posterior.
- El estado `aprobado` queda reservado para claims con evidencia o aprobacion explicita; por eso la mayoria de items quedan en estados pendientes.
