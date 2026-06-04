# Auditoria SEO y Fondos Narrativos

Fecha: 2026-06-03
Estado: auditoria inicial, sin cambios de UI publica

## Objetivo

Auditar el sitio publico de AD Media Solution para que SEO, mensaje comercial y fondos visuales trabajen hacia la misma tesis: direccion de marketing y ventas para negocios que necesitan ordenar CRM, pauta, soporte, contenido, web y conversion a cita.

Esta fase no redisenia ni cambia copy visible. Deja trazado que mejorar, que remover y que validar antes de implementar nuevas secciones.

## Fuentes SEO Base

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Structured data gallery: https://developers.google.com/search/docs/guides/search-gallery

Lectura operativa para este proyecto: Google necesita poder rastrear, entender y diferenciar cada pagina. Para AD Media Solution eso implica titulos/descripciones por ruta, contenido util y confiable, sitemap/robots, datos estructurados razonables, enlaces internos descriptivos y una narrativa visual que no parezca generica ni contradiga la promesa comercial.

## Estado Tecnico SEO Detectado

| Area | Estado actual | Riesgo | Prioridad | Accion recomendada |
|---|---|---:|---|---|
| Metadata global | `src/app/layout.tsx` define titulo, descripcion, OG/Twitter y robots globales. | Todas las rutas heredan una senial parecida aunque tengan intenciones distintas. | P0 | Crear metadata por ruta principal y por detalle de servicio. |
| `metadataBase` | Apunta a `https://admediasolution.com`. | Correcto si el dominio final es ese. | P1 | Validar dominio final antes de deploy publico. |
| Sitemap | No se encontro `src/app/sitemap.ts` ni `public/sitemap.xml`. | Google y otros crawlers tienen menos guia de URLs importantes. | P0 | Crear sitemap dinamico con rutas publicas y slugs. |
| Robots | Hay robots metadata global, pero no `src/app/robots.ts` ni `public/robots.txt`. | Falta una politica explicita de crawl y enlace a sitemap. | P0 | Crear `robots.ts` con `sitemap`. |
| Canonical/alternates | No se detectan `alternates.canonical` por ruta. | Riesgo de seniales duplicadas si hay URLs antiguas o variantes. | P1 | Agregar canonical por pagina en metadata. |
| Redirecciones | `next.config.ts` redirige `/precios`, `/catalogo`, `/catalogo-servicios`, `/nosotros`, `/ceo`, `/contacto`. | Bien para preservar entradas antiguas, falta auditar si hay mas legacy URLs. | P1 | Cruzar Search Console o historial real cuando exista. |
| Datos estructurados | No se detecto JSON-LD. | Menos claridad para Organization, servicios, breadcrumbs y FAQ. | P1 | Agregar Organization/LocalBusiness, Service, BreadcrumbList y FAQ solo con datos verificados. |
| OG image | Usa `/brand/logo-full.png` para todas las rutas. | Poco atractivo y poco especifico para compartir paginas internas. | P2 | Crear OG por ruta o al menos por familia: Home, Servicios, Danger, Casos. |
| Imagenes publicas | Hay assets de equipo, testimonials, roadmap y about-us. | Varias fotos requieren aprobacion por credibilidad. | P0 | Mantener registro en `docs/CLAIMS_APPROVAL_REGISTER.md`. |
| Slugs de detalle | `embudos-neurales`, `contenido-generativo`, `ads-autopilot`. | Suenan AI/genericos y menos alineados al lenguaje comercial actual. | P0 | Evaluar slugs SEO en castellano y redirects desde los actuales. |

## Blueprint de Metadata P0

Este blueprint evita claims no aprobados. Los titulos y descripciones priorizan intencion de busqueda, claridad de oferta y conversion a cita. Deben implementarse como metadata por ruta o layouts server, porque varias paginas son client components.

| Ruta | Title recomendado | Description recomendada | Canonical | Robots |
|---|---|---|---|---|
| `/` | `AD Media Solution | Dirección de marketing y ventas` | `Dirección de marketing y ventas para negocios que necesitan CRM, soporte, pauta digital, contenido, web y un sistema claro para convertir más citas.` | `https://admediasolution.com/` | `index, follow` |
| `/servicios` | `Servicios de marketing, CRM y ventas | AD Media Solution` | `Conoce los servicios de AD Media Solution: CRM personalizado, soporte, Meta y Google Ads, redes sociales, producción, desarrollo web y mantenimiento.` | `https://admediasolution.com/servicios` | `index, follow` |
| `/servicios/embudos-neurales` | `AD Media CRM y soporte | Sistema de ventas a medida` | `CRM personalizado para centralizar clientes, automatizar seguimiento, organizar citas y dar soporte al sistema comercial de tu negocio.` | `https://admediasolution.com/servicios/embudos-neurales` | `index, follow` |
| `/servicios/contenido-generativo` | `Dirección de marketing y pauta digital | AD Media Solution` | `Dirección de marketing para coordinar Meta Ads, Google Ads, redes sociales y contenido con una estrategia comercial clara y medible.` | `https://admediasolution.com/servicios/contenido-generativo` | `index, follow` |
| `/servicios/ads-autopilot` | `Soporte y mantenimiento comercial | AD Media Solution` | `Soporte y mantenimiento para CRM, web, campañas y sistemas comerciales, con seguimiento operativo para que el negocio no pierda continuidad.` | `https://admediasolution.com/servicios/ads-autopilot` | `index, follow` |
| `/planificacion` | `Agenda una consulta estratégica | AD Media Solution` | `Agenda una consulta gratuita para revisar tu situación comercial y entender qué sistema de marketing, CRM, pauta o soporte necesita tu negocio.` | `https://admediasolution.com/planificacion` | `index, follow` |
| `/danger` | `Danger Fernández | Dirección comercial y marketing` | `Conoce a Danger Fernández, fundador de AD Media Solution, y su enfoque de dirección comercial, marketing, CRM y sistemas de venta.` | `https://admediasolution.com/danger` | `index, follow` |
| `/casos` | `Casos y resultados | AD Media Solution` | `Explora casos y ejemplos de sistemas comerciales, CRM, pauta y soporte trabajados por AD Media Solution. Validación editorial pendiente antes de publicación final.` | `https://admediasolution.com/casos` | `index, follow` con claims aprobados; considerar `noindex` si los casos siguen placeholder. |
| `/equipo` | `Equipo de marketing, CRM y producción | AD Media Solution` | `Conoce el equipo y las áreas de AD Media Solution: dirección, marketing, CRM, desarrollo web, producción audiovisual y soporte comercial.` | `https://admediasolution.com/equipo` | `index, follow` cuando fotos/roles estén aprobados. |
| `/comunidad` | `Comunidad y workshops | AD Media Solution` | `Comunidad, workshops y recursos para negocios que quieren aprender sobre CRM, pauta digital, contenido y sistemas comerciales.` | `https://admediasolution.com/comunidad` | `index, follow` cuando enlaces/videos sean reales; considerar `noindex` si siguen placeholders. |
| `/about-us` | `Sobre AD Media Solution | Historia y dirección comercial` | `Historia de AD Media Solution, su evolución y enfoque en dirección de marketing, ventas, CRM, pauta digital y soporte para negocios.` | `https://admediasolution.com/about-us` | `index, follow` cuando assets historicos estén aprobados. |
| `/logos` | `Galería interna de logos | AD Media Solution` | `Galería interna para revisión de candidatos de logo de AD Media Solution.` | `https://admediasolution.com/logos` | `noindex, nofollow` si permanece publica. |

## Blueprint de Sitemap y Robots

| Archivo | Contenido esperado | Notas de implementacion |
|---|---|---|
| `src/app/sitemap.ts` | Home, servicios, tres slugs actuales, planificacion, danger, casos, equipo, comunidad, about-us. | Incluir `/logos` solo si se decide mantenerla indexable; recomendacion actual: excluirla del sitemap. |
| `src/app/robots.ts` | Permitir crawl general y enlazar `https://admediasolution.com/sitemap.xml`. | Si `/logos` sigue publica, bloquear o marcar `noindex` via metadata. |
| Metadata layouts | Layouts server por segmento para rutas client: `danger`, `casos`, `comunidad`, `equipo`, `about-us`, `planificacion`, `servicios`, `servicios/[slug]`. | Evita intentar exportar metadata desde paginas con `"use client"`. |
| Metadata global | Mantener `metadataBase`, OG/Twitter global y robots por defecto. | Las rutas internas deben sobrescribir title, description, canonical y robots cuando aplique. |

## Blueprint Semantico de Headings

| Ruta | Estado detectado | Accion recomendada |
|---|---|---|
| `/danger` | Captura automatizada no detecto `h1`; `AuthoritySection` usa `motion.h2` para el titulo principal. | Cambiar a `motion.h1` sin modificar clases ni apariencia. |
| `/casos` | Tiene `h1`, pero metricas animadas pueden quedar en valores intermedios durante screenshots. | Estabilizar contador en claims sensibles o desactivar animacion para casos pendientes. |
| `/servicios` | `h1` claro y alineado a oferta. | Mantener. |
| `/servicios/[slug]` | `h1` claro, pero slugs no son SEO-friendly. | Mantener en P0; renombrar en fase posterior con redirects. |
| `/logos` | `h1` claro, pero la pagina no parece comercial. | Definir `noindex` o retirar de produccion publica. |

## Tesis SEO por Ruta

| Ruta | Que deberia comunicar a SEO y usuario | Estado actual | Gap principal | Prioridad |
|---|---|---|---|---|
| `/` | Agencia/direccion de marketing y ventas que ordena CRM, pauta, contenido y venta; CTA a cita. | Mensaje global fuerte y visual premium. | Metadata unica para home, secciones con fondos mas narrativos y claims pendientes. | P0 |
| `/servicios` | Catalogo claro de servicios: CRM, soporte, Meta/Google Ads, redes, web, mantenimiento. | Tabs y planes completos. | Metadata especifica, schema Service y fondo por categoria mas semantico. | P0 |
| `/servicios/[slug]` | Detalle de cada servicio con beneficio, proceso, planes y CTA. | Pagina dinamica con fondos por slug. | Slugs/titulos actuales pueden no reflejar la oferta real; falta metadata dinamica. | P0 |
| `/planificacion` | Cita/diagnostico para definir plan de marketing y ventas. | Wizard claro, CTA central. | Falta metadata de conversion y posible Event/ContactAction schema. | P0 |
| `/danger` | Autoridad y direccion estrategica de Danger Fernandez. | Pagina publica, pendiente de claims/credenciales. | SEO de persona/autoridad debe evitar claims no aprobados. | P1 |
| `/casos` | Prueba de resultados, casos reales, impacto y confianza. | Visual de resultados con MetricBurst. | Mayor riesgo de claims; necesita evidencia antes de optimizar para casos. | P0 |
| `/equipo` | Equipo, capacidades y estructura humana. | Narrativa scrollytelling y ConstellationField. | Fotos/roles/proyeccion futura requieren aprobacion. | P1 |
| `/comunidad` | Comunidad, videos, colaboracion y acompanamiento. | ConstellationField coherente. | Videos/URLs y claims de comunidad pendientes. | P1 |
| `/about-us` | Historia, crecimiento, origen y confianza institucional. | GrowthSchematic y timeline. | Assets historicos/futuros deben validarse; metadata institucional faltante. | P1 |
| `/logos` | Exploracion interna de marca/logo. | Ruta publica basica. | Si no es para usuarios finales, decidir index/noindex o retirar de navegacion publica. | P0 |

## Auditoria de Fondos por Seccion

| Ruta/seccion | Fondo actual | Coherencia narrativa | Riesgo | Accion recomendada |
|---|---|---|---|---|
| Home - Hero | Aurora + textura + `OrbitalCore` 3D. | Impacta, pero puede sentirse generico si no representa sistema comercial. | Marca/conversion | Reorientar como sistema vivo: CRM, pauta, calendario, leads y ventas convergiendo en una direccion. |
| Home - BTL/Testimonios | Glow ambiental e imagenes de thumbnails/testimonios. | La seccion vende prueba, pero el fondo no cuenta "caso real" ni recorrido. | Credibilidad/conversion | Crear fondo de prueba: linea de lead a resultado, clips/capturas aprobadas, estados antes/despues sin inventar datos. |
| Home - VSL | Textura grid + mockup video. | Bastante alineado a video/diagnostico. | Conversion | Conectar visualmente el video con decision de agenda y no solo con estetica tech. |
| Home - CRM | `GhlLogoBackground` + workflow. | Muy alineado: explica operacion CRM. | Bajo | Mantener base, reforzar con estados de venta y soporte si se redisenia. |
| Home - Blueprint | Aurora + grid + GHL. | Alineado a arquitectura, pero todavia abstracto. | Marca | Convertir en mapa de implementacion: diagnostico, CRM, pauta, soporte, reporting. |
| Home - Scrollytelling | Floating icons CRM + cards metricas. | Cuenta mejor la promesa operacional. | Credibilidad | Mantener, pero separar metricas placeholder del relato visual hasta aprobacion. |
| Home - ProjectsGallery | FloatingIcons creative + Aurora + gradientes por card. | Mas creativo que probatorio. | Credibilidad/marca | Para casos/proyectos, usar fondo de portafolio verificable: brief, ejecucion, resultado, activo real. |
| Footer/CTA | Aurora + FloatingIcons social + textura. | Premium, pero generico para cierre. | Conversion | Hacer que el fondo guie al usuario a la cita: agenda, diagnostico, proxima accion. |
| `/servicios` - CRM | `FlowField`. | Correcto: embudos/leads hacia CRM. | Bajo | Mantener y volver mas legible el flujo si se redisenia. |
| `/servicios` - Ads | `SignalGrid`. | Correcto: pauta, optimizacion, senales. | Bajo | Mantener, agregar lectura de conversion/pixel/ROI solo con claims aprobados. |
| `/servicios` - Redes/Contenido | `ConstellationField`. | Parcial: comunidad/equipo, pero no produccion editorial. | Marca/SEO | Cambiar a storyboard/calendario/contenido/canal si se aprueba redisenio. |
| `/servicios` - Produccion | `ConstellationField`. | Parcial: no comunica camara, edicion, piezas o delivery. | Marca | Crear fondo tipo pipeline de produccion: guion, grabacion, edicion, publicacion. |
| `/servicios` - Web/Mantenimiento | `BlueprintLayer`. | Correcto para arquitectura y soporte. | Bajo | Mantener, sumar capas de performance/seguridad sin claims no verificados. |
| `/servicios/[slug]` | `FlowField`, `SignalGrid`, `BlueprintLayer` segun slug. | Componentes utiles, slugs menos alineados. | SEO/marca | Renombrar concepto visual y URL a lenguaje de servicio real, con redirects. |
| `/planificacion` | `BlueprintLayer`, `MetricBurst` en success. | Correcto: proceso por etapas y resultado. | Bajo | Reforzar que es diagnostico comercial, no solo formulario. |
| `/casos` | `MetricBurst`. | Correcto para resultados. | Credibilidad alto | No potenciar mas claims hasta evidencia; preparar variantes visuales con datos aprobados. |
| `/equipo` | `ConstellationField` + fondos roadmap. | Coherente con equipo y crecimiento. | Foto/asset provisional | Validar fotos y que cada escena represente rol real. |
| `/comunidad` | `ConstellationField`. | Coherente con comunidad. | Enlaces/video | Conectar videos reales y no thumbnails genericos. |
| `/about-us` | `GrowthSchematic` + fotos timeline. | Coherente con historia. | Foto/asset provisional | Validar origen/fechas/fotos; evitar imagenes futuristas si no estan aprobadas. |
| `/danger` | Sin fondo contextual fuerte detectado en exploracion inicial. | Depende mucho de copy/foto/autoridad. | Reputacional | Crear narrativa sobria de liderazgo, estrategia y direccion, no celebridad generica. |
| `/logos` | Layout utilitario. | No es una pagina comercial. | SEO/operacion | Definir si debe quedar noindex o salir de produccion publica. |

## Que Remover o Reducir en Futuras Fases

| Elemento | Motivo | Accion futura |
|---|---|---|
| Auroras/glows cuando aparecen solos | Se sienten premium pero genericos si no explican el negocio. | Usarlos solo como profundidad, no como historia principal. |
| Slugs AI-like (`embudos-neurales`, `contenido-generativo`, `ads-autopilot`) | Pueden alejarse del lenguaje del cliente y de busquedas de servicios reales. | Evaluar slugs descriptivos: CRM, contenido, ads, web, soporte. |
| Fondos de "constelacion" para produccion/contenido | Comunican red/comunidad, no necesariamente proceso creativo o delivery. | Reemplazar por pipeline editorial/produccion cuando toque esa seccion. |
| Casos/testimonios/metricas sin evidencia | Riesgo reputacional y comercial. | Mantener trazabilidad en claims, aprobar o degradar en fase editorial. |
| Ruta `/logos` indexable si es solo interna | Puede diluir SEO y mostrar exploracion no final. | Definir noindex o retirar de produccion publica. |
| OG generico para todas las rutas | Pierde contexto al compartir servicios/casos/Danger. | Crear imagenes OG por familia de pagina. |

## Mejoras Priorizadas

| Prioridad | Mejora | Impacto | Dependencia |
|---|---|---|---|
| P0 | Metadata por ruta publica y metadata dinamica de servicios. | SEO/conversion | Confirmar titulos y descripciones finales. |
| P0 | `sitemap.ts` y `robots.ts` con URLs canonicas. | SEO tecnico | Confirmar dominio final. |
| P0 | Decidir tratamiento de `/logos`: noindex, ocultar o mantener solo interno. | SEO/marca | Decision del vibe/CEO. |
| P0 | Revisar slugs de detalles de servicio y crear redirects. | SEO/marca/conversion | Definir nombres finales de ofertas. |
| P0 | Mantener claims sensibles fuera de mejoras SEO hasta evidencia. | Credibilidad/legal | `docs/CLAIMS_APPROVAL_REGISTER.md`. |
| P1 | JSON-LD Organization/LocalBusiness y Service. | SEO/claridad | Datos legales, direccion/area si aplica, redes oficiales. |
| P1 | Breadcrumbs visibles o estructurados en servicios. | UX/SEO | Arquitectura final de rutas. |
| P1 | Redisenar fondos de Home Hero, BTL y ProjectsGallery como relatos comerciales. | Conversion/marca | Aprobacion visual. |
| P1 | Crear fondos especificos para contenido/produccion. | Marca/SEO | Definir oferta final y assets reales. |
| P2 | OG images por familia de ruta. | Marca/social | Assets aprobados. |
| P2 | Afinar footer CTA como cierre de diagnostico. | Conversion | Copy/CTA final. |

## Matriz de Implementacion Sugerida

| Fase futura | Trabajo | Validacion |
|---|---|---|
| SEO tecnico P0 | `sitemap.ts`, `robots.ts`, metadata por ruta, canonicals. | `tsc --noEmit`, ESLint, `next build`, ver rutas generadas. |
| SEO contenido P0/P1 | Titulos/descripciones por ruta, slugs finales, redirects. | Build, revision de metadata renderizada, validacion de links internos. |
| Credibilidad editorial | Aprobar/degradar claims segun registro. | Comparar UI contra `CLAIMS_APPROVAL_REGISTER.md`. |
| Fondos narrativos Home | Hero, BTL, ProjectsGallery y Footer con historia comercial. | Playwright mobile/desktop, motion/rhythm, screenshots. |
| Fondos narrativos Servicios | Pipeline editorial/produccion y refinamiento de service detail. | Playwright por tabs y slugs, contraste/legibilidad. |

## Mapa Accionable de Fondos

| Componente/fondo | Metafora actual | Uso recomendado | Estado | Motivo |
|---|---|---|---|---|
| `FlowField` | Leads dispersos que convergen en CRM. | CRM, embudos, seguimiento, detalle de CRM. | Mantener y reutilizar | Comunica organizacion comercial de forma clara y no depende de claims. |
| `SignalGrid` | Celdas de campania que se optimizan. | Ads, pauta, conversiones, detalle de direccion de marketing. | Mantener y reutilizar | La metafora de optimizacion de anuncios es entendible y ligera. |
| `BlueprintLayer` | Arquitectura por etapas y nodos activos. | Planificacion, web, mantenimiento, sistemas, procesos. | Mantener y reforzar | Encaja con diagnostico, roadmap, soporte y construccion de sistema. |
| `ConstellationField` | Red de personas conectadas. | Comunidad y equipo. | Mantener con alcance limitado | Muy bueno para personas/red, debil para produccion o contenido editorial. |
| `MetricBurst` | Curva ascendente y resultado. | Success states y casos con evidencia aprobada. | Congelar en zonas de claims | Potente, pero amplifica metricas sensibles si se usa en casos no aprobados. |
| `GrowthSchematic` | Historia y crecimiento por hitos. | About Us y trayectoria. | Mantener condicionado | La metafora funciona, pero las fotos/fechas requieren aprobacion. |
| `AuroraBackground` | Atmosfera premium abstracta. | Profundidad secundaria. | Reducir protagonismo | Cuando opera solo, se siente generico y no agrega informacion de valor. |
| `FloatingIcons` | Iconos por categoria. | Refuerzo sutil desktop. | Ajustar por contexto | Ayuda si los iconos son semanticos; como fondo principal se siente decorativo. |
| `OrbitalCore` | Nucleo 3D abstracto. | Hero solo si se reinterpreta como sistema comercial. | Reorientar | Impacta, pero hoy no explica CRM, pauta, agenda ni soporte por si solo. |

## Fondos Nuevos Recomendados

| Fondo propuesto | Secciones candidatas | Historia que debe contar | Dependencias |
|---|---|---|---|
| `RevenueSystemMap` | Home Hero, Footer CTA, VSL puente. | Leads entran por pauta/contenido, se ordenan en CRM, pasan a agenda, soporte y venta. | Aprobacion visual; no requiere claims nuevos. |
| `ProductionPipeline` | Servicios - Redes/Contenido, Produccion, ProjectsGallery cards creativas. | Guion, grabacion, edicion, calendario, publicacion y aprendizaje por canal. | Definir oferta final de produccion/contenido. |
| `ProofSystemFlow` | BTL, ProjectsGallery, Casos. | Brief, implementacion, evidencia aprobada, resultado y siguiente accion. | No debe usar cifras o logos sin aprobacion editorial. |
| `StrategyDesk` | Danger, AuthoritySection, consultoria VIP. | Diagnostico, cuello de botella, decision estrategica y plan de accion. | Validar claims de autoridad/testimonios antes de intensificar. |

## Primer Paquete Visual Seguro

| Paquete | Archivos | Cambio conceptual | Riesgo | Recomendacion |
|---|---|---|---|---|
| Hero + Footer | `HeroSection.tsx`, `FooterContact.tsx`, nuevo `RevenueSystemMap`. | Convertir atmosfera abstracta en sistema comercial que guia a cita. | Bajo/medio | Ejecutar despues de SEO tecnico P0; no depende de testimonios. |
| Servicios contenido/produccion | `servicios/page.tsx`, nuevo `ProductionPipeline`. | Reemplazar constelacion por proceso editorial y audiovisual. | Bajo | Buen primer cambio visual porque corrige una metafora incorrecta sin tocar claims. |
| BTL/Projects/Casos | `BTLTestimonialsSection.tsx`, `ProjectsGallery.tsx`, `casos/page.tsx`, nuevo `ProofSystemFlow`. | Convertir prueba social en flujo de evidencia. | Alto | Esperar aprobacion editorial o degradar copy antes de hacerlo mas persuasivo. |
| Danger/Authority | `danger/page.tsx`, `AuthoritySection.tsx`, nuevo `StrategyDesk`. | Sobriedad estrategica en vez de espectaculo/celebridad generica. | Alto | Depende de validacion de chats, metricas y testimonios. |

## Evidencia Visual Local

Capturas realizadas localmente el 2026-06-03 en `classic`, desktop `1440x900` y mobile `390x844`, sobre Home, Home BTL, Home Portafolio, Home Footer, Servicios, detalle CRM, Planificacion, Danger, Casos, Comunidad, Equipo, About Us y Logos. Las capturas temporales se guardaron fuera del repositorio en `/tmp/admedia-visual-audit`.

| Hallazgo visual | Evidencia | Impacto | Accion recomendada |
|---|---|---|---|
| No hubo errores de consola ni overflow horizontal en las rutas capturadas. | Script Playwright local sobre 26 capturas. | Positivo tecnico | Mantener el enfoque de cambios pequenos y validar de nuevo tras cada fase. |
| Home Hero desktop impacta, pero el fondo visible sigue siendo orbita/nucleo abstracto. | `home-hero-desktop.png` | Marca/conversion | `RevenueSystemMap` debe hacer visible CRM, pauta, agenda y venta sin competir con el H1. |
| Home Hero mobile pierde casi toda la narrativa visual porque el 3D se oculta y queda atmosfera minima. | `home-hero-mobile.png` | Marca/conversion | El nuevo fondo debe tener version mobile ligera, no solo desktop. |
| BTL/Testimonios muestra prueba social con mucho espacio oscuro y sin fondo que explique evidencia/caso. | `home-btl-desktop.png` | Credibilidad/conversion | Mantener congelado hasta aprobar testimonios o disenar un flujo de evidencia neutro. |
| ProjectsGallery puede verse demasiado tenue durante el reveal, con cards oscuras y contenido poco probatorio. | `home-portfolio-desktop.png` | Marca/credibilidad | Revisar timing/contraste si se implementa `ProofSystemFlow`; no potenciar claims sin evidencia. |
| Servicios CRM tiene fondo narrativo correcto: las lineas de flujo si sugieren sistema/embudo. | `servicios-desktop.png` | Positivo | Mantener `FlowField` para CRM y usarlo como referencia de calidad narrativa. |
| Servicios mobile mantiene legibilidad y sin overflow, pero el tab horizontal deja ver parcialmente el siguiente rubro. | `servicios-mobile.png` | UX menor | Aceptable; revisar solo si se toca el tab bar en una fase posterior. |
| Danger no expone un `h1` detectable en la captura automatizada; el primer heading detectado fue `h2`. | `danger-desktop.png` | SEO/accesibilidad | En fase SEO/contenido, asegurar heading semantico principal sin cambiar el tono visual. |
| Casos puede capturar metricas animadas en valores intermedios, por ejemplo `$56K` mientras el claim final esperado es `$80K`. | `casos-desktop.png` | Credibilidad/visual QA | Revisar `AnimatedCounter` en claims sensibles; evitar que auditorias/snapshots muestren cifras transitorias no aprobadas. |
| Casos y Danger son visualmente persuasivas, pero sus fondos/metricas amplifican claims pendientes. | `danger-desktop.png`, `casos-desktop.png` | Reputacional | Priorizar aprobacion editorial antes de aumentar narrativa visual en esas rutas. |

## Backlog Maestro por Ruta

| Ruta/seccion | Sacar o reducir | Arreglar | Mejorar | Fase sugerida |
|---|---|---|---|---|
| `/` Hero | Reducir dependencia de orbita abstracta como historia principal. | Dar narrativa mobile ligera; hoy el 3D se oculta y queda poca informacion visual. | `RevenueSystemMap`: pauta/contenido -> CRM -> agenda -> soporte -> venta. | 20 |
| `/` BTL/Testimonios | No amplificar "testimonios reales" hasta evidencia. | Separar visualmente prueba aprobada de placeholder. | `ProofSystemFlow` neutro cuando haya claims validados o copy degradado. | Editorial + visual posterior |
| `/` VSL | Reducir textura/grid si compite con mockup. | Conectar mejor video con diagnostico/agenda. | Puente visual hacia sistema comercial y cita. | 20/visual menor |
| `/` CRM | Mantener; no sacar. | Ajustar solo legibilidad/opacidad si se toca tema. | Usar como referencia de fondo narrativo correcto. | Mantener |
| `/` Blueprint | Reducir aurora decorativa si no explica proceso. | Volver mas explicita la secuencia diagnostico -> CRM -> pauta -> soporte. | Integrarlo con `BlueprintLayer` o `RevenueSystemMap`. | 20/visual posterior |
| `/` Scrollytelling | No potenciar metricas sin evidencia. | Mantener registro de KPIs pendientes. | Cuando se aprueben, convertir en dashboard de operacion real. | Editorial primero |
| `/` ProjectsGallery | Reducir claims de "casos reales" si no hay aprobacion. | Mejorar contraste/timing de reveal; evitar cards demasiado tenues. | Convertir de galeria creativa a flujo de caso verificable. | Editorial + visual posterior |
| `/` Footer | Reducir social/aurora como fondo principal. | Alinear fondo con cita/diagnostico. | Cierre visual con ruta clara hacia agenda. | 20 |
| `/servicios` CRM | Mantener `FlowField`. | Ningun arreglo critico detectado. | Afinar flujo si se redisenia cards. | Mantener |
| `/servicios` Ads | Mantener `SignalGrid`. | Evitar reforzar claims de partners/certificaciones sin evidencia. | Mostrar conversion/pixel/senales de campania sin prometer ROI no aprobado. | 19 + editorial |
| `/servicios` Redes/Contenido | Sacar `ConstellationField` como metafora principal. | Reemplazar por proceso editorial. | `ProductionPipeline`: brief, calendario, pieza, publicacion, aprendizaje. | 20 |
| `/servicios` Produccion | Sacar `ConstellationField` como metafora principal. | Representar camara/edicion/delivery. | `ProductionPipeline` con guion, grabacion, edicion y entrega. | 20 |
| `/servicios` Web/Mantenimiento | Mantener `BlueprintLayer`. | No introducir claims de performance/seguridad no medidos. | Reforzar arquitectura, continuidad y soporte. | 19/visual menor |
| `/servicios/[slug]` | No renombrar todavia sin redirects. | Metadata dinamica y canonicals por slug. | Fase posterior de slugs SEO-friendly. | 19 + SEO contenido |
| `/planificacion` | No sacar; fondo esta alineado. | Conectar formulario a CRM real en fase operativa. | Metadata de conversion y cierre visual de diagnostico. | 19 + operacion |
| `/danger` | No intensificar testimonios/chats/metrica sin evidencia. | Corregir `h1` semantico. | `StrategyDesk` sobrio cuando claims esten aprobados. | 21 + editorial |
| `/casos` | Reducir/pausar metricas no aprobadas si publica. | Evitar capturas con counters en valores intermedios. | `ProofSystemFlow` solo con evidencia aprobada. | 21 + editorial |
| `/equipo` | Reducir visibilidad de roles futuros si confunden. | Validar fotos, roles y bios. | Mantener red/equipo con assets reales. | Editorial |
| `/comunidad` | Sacar enlaces genericos/videos vacios antes de publicar. | Conectar WhatsApp y videos reales. | Mantener `ConstellationField`; enriquecer con eventos reales. | Operacion/editorial |
| `/about-us` | Evitar imagenes historicas/futuras generadas si no aprobadas. | Validar fechas, fotos y narrativa institucional. | Mantener `GrowthSchematic` como historia visual. | Editorial |
| `/logos` | Sacar de sitemap/index si es interna. | Aplicar `noindex` o retirar de produccion publica. | Mantener solo como herramienta interna si es necesaria. | 19 |

## Trazabilidad del Objetivo

| Requisito del objetivo | Evidencia actual | Estado | Siguiente paso |
|---|---|---|---|
| Auditar puntos clave e importantes del proyecto completo. | `docs/ALIGNMENT_AUDIT.md`, `docs/SEO_VISUAL_NARRATIVE_AUDIT.md`, backlog maestro por ruta. | Cumplido documentalmente | Mantener actualizado al implementar fases. |
| Considerar directrices SEO y lo que cada pagina debe comunicar. | Fuentes Google Search Central, blueprint de metadata P0, tesis SEO por ruta. | Cumplido documentalmente | Implementar fase 19. |
| Identificar problemas de fondos genericos o demasiado AI-like. | Auditoria de fondos por seccion, mapa accionable de fondos, evidencia visual local. | Cumplido documentalmente | Implementar fase 20. |
| Definir fondos que cuenten algo coherente con la informacion en pantalla. | Propuestas `RevenueSystemMap`, `ProductionPipeline`, `ProofSystemFlow`, `StrategyDesk`. | Parcial | Implementar y validar visualmente por fases. |
| Aplicar el criterio a cada centimetro de la web. | Backlog maestro cubre Home por secciones y rutas publicas principales. | Parcial | Ejecutar backlog por fase y re-auditar screenshots. |
| Identificar que se puede mejorar. | Secciones `Mejoras Priorizadas`, `Primer Paquete Visual Seguro`, backlog maestro. | Cumplido documentalmente | Priorizar fase 19 o 20. |
| Identificar que hay que sacar o reducir. | `Que Remover o Reducir en Futuras Fases` y columna `Sacar o reducir` del backlog. | Cumplido documentalmente | Aprobar fases editoriales/SEO/visual. |
| Identificar que hay que arreglar. | Backlog maestro y fase 21 para `h1` Danger + counters de Casos. | Cumplido documentalmente | Implementar fase 21 si se prioriza. |
| Preservar credibilidad y no inventar claims. | `docs/CLAIMS_APPROVAL_REGISTER.md` y restricciones en fases 19-21. | Cumplido documentalmente | CEO/vibe debe aprobar o degradar claims. |
| Validar con evidencia tecnica/visual. | Checks previos, capturas locales, Playwright/rhythm/motion disponibles. | Parcial | Re-ejecutar validaciones despues de cada implementacion real. |
| Implementar mejoras reales en el sitio. | Fase 19 implementada localmente; fases 20 y 21 siguen en `pending_vibe_approval`. | Parcial | Aprobar fase 20 o 21 para continuar con fondos/semantica. |

## Conclusiones

El sitio ya tiene una direccion visual fuerte y varias bases buenas: CRM con workflow, Ads con SignalGrid, sistemas con BlueprintLayer, comunidad/equipo con ConstellationField y resultados con MetricBurst. El gap principal no es "falta de efectos"; es que algunos fondos aun funcionan como ambiente generico y no como evidencia visual de valor.

SEO tambien esta en una base correcta pero incompleta: existe metadata global, redirects y robots metadata, pero faltan seniales por pagina, sitemap/robots de archivo, canonicals y datos estructurados. La prioridad antes de redisenar mas es decidir que pagina quiere rankear por que intencion, y luego hacer que copy, metadata, fondo, CTA y evidencia digan la misma cosa.
