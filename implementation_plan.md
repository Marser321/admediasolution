# Plan de Integración: Reestructuración y Nuevas Ideas de AD Media Solution

Este plan de integración detalla la estrategia controlada para implementar el feedback masivo del cliente y reestructurar el sitio web de AD Media Solution sin romper el SEO actual, limpiando código obsoleto y organizando la arquitectura para la posterior intervención del modelo Opus 4.8.

---

## 1. Fase de Limpieza e Higiene del Código (Código Viejo)

Antes de añadir nuevas funcionalidades, sanearemos el espacio de trabajo para evitar "ruido cognitivo" en los modelos de lenguaje:

### Archivos Temporales a Eliminar
*   Log de compilación y lint obsoletos: `build_log*.txt`, `lint*.json`, `lint*.txt`.

### Componentes Huérfanos
*   Identificar componentes no utilizados en `src/app/page.tsx` como `ProblemSection.tsx` y `ScannerSection.tsx`.
*   Moverlos a una carpeta temporal `src/components/archive/` en lugar de borrarlos definitivamente por si contienen código reutilizable.

---

## 2. Fase de Menú y Redirecciones (SEO)

### Estructura de Menú (10 Celdas)
Actualizar el componente [Navbar.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/layout/Navbar.tsx) e [IslandBar.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/layout/IslandBar.tsx) para incluir las siguientes 10 opciones de navegación estructuradas:
1.  **Inicio** (Home)
2.  **Sobre Nosotros** (Historia y Oficinas)
3.  **CRM & Automatización** (AD Media CRM)
4.  **Meta & Google Ads** (Tráfico y Conversión)
5.  **Redes Sociales** (Gestión de Contenido)
6.  **Desarrollo Web** (Sitios y E-commerce)
7.  **Comunidad** (Acceso y Eventos)
8.  **Casos de Éxito** (Danger Fernández)
9.  **Equipo** (Líderes de Media)
10. **Planificación** (Agendamiento de Citas)

### Redirecciones SEO (301)
*   Configurar redirecciones en `next.config.ts` para conservar el valor SEO de los enlaces antiguos indexados de `mediuso.com` (como catálogos o precios genéricos) apuntándolos a las nuevas secciones correspondientes (ej. `/catalogo-servicios` o planes específicos).

---

## 3. Fase de Rediseño y UI de la Página de Inicio (Home)

### Sección de Testimonios Dinámicos con Scroll (Concepto BTL)
*   **Diseño**: Se implementará un componente interactivo basado en Framer Motion donde, al hacer scroll, se alterne el diseño vertical: un testimonio a la izquierda y un bloque de texto descriptivo con flecha a la derecha, invirtiendo la posición en la siguiente sección.
*   **Optimización**: Las tarjetas de testimonio cargarán con placeholders difuminados para garantizar una carga ultrarrápida.

### Copys de Alta Conversión y Dirección Comercial
*   Actualizar [HeroSection.tsx](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/src/components/sections/HeroSection.tsx) con la propuesta de valor enfocada a escala de facturación ($30k, $40k, $50k, $100k USD).
*   Integrar de forma prominente el mensaje: *"Damos dirección de marketing y ventas a los negocios."*

### Widget Flotante y Pop-up de Agendamiento
*   **Widget Flotante**: Modificar el widget existente para incluir una llamada a la acción clara para agendar cita sin costo (enlazado a `/planificacion`).
*   **Pop-up de 5 segundos**: Desarrollar un componente de pop-up inteligente con retraso de 5 segundos que invite al usuario a agendar una cita con el copy *"Agenda tu cita ahora. Hay un cupón disponible."*

---

## 4. Fase de Creación de Páginas Internas

Se estructurarán las siguientes nuevas rutas utilizando el App Router de Next.js (`src/app/`):

### [NEW] `/planificacion` (Página de Consulta)
*   Contendrá un formulario de calificación de leads integrado con el calendario de citas.

### [NEW] `/danger` (Página de Danger Fernández)
*   Página enfocada en el perfil del CEO, compartiendo testimonios reales, capturas de chats reales, y un estilo más cercano y humano.

### [NEW] `/equipo` (Página de Equipo por Departamentos)
*   Estructura por departamentos (Dirección, Marketing, Comercial, Desarrollo).
*   Visualización coherente de fotos profesionales y sinopsis que refuercen la solidez del equipo ("Principales Líderes de la Media").

### [NEW] `/comunidad` (Comunidad de AD Media)
*   Integración de enlaces directos a la comunidad y galería de videos embebidos de eventos y masterclasses pasadas.

### [NEW] `/about-us` (Sobre Nosotros)
*   Narrativa de los 10 años de historia de la agencia.
*   Línea de tiempo visual con fotos de la 1ª oficina, 2ª oficina y las oficinas actuales.

### [NEW] `/servicios` (Catálogo Completo y Planes)
*   Desglose visual de servicios (Meta Ads, Google Ads, Redes Sociales, CRM, Sitios Web y Producción Audiovisual con fotos reales de los fotógrafos).
*   Tablas comparativas interactivas de planes según los datos extraídos del sitio actual.

---

## 5. Preparación para Opus 4.8 (Arquitectura y Tipos)

Para facilitar que el modelo de 1M de contexto implemente la lógica compleja de las páginas internas en la siguiente fase:
*   **Contratos de Datos**: Crear interfaces claras en `src/lib/types.ts` para testimonios, planes de precios, proyectos de galería, y perfiles de equipo.
*   **Estructuración del Estado**: Modularizar las configuraciones de los servicios en un archivo JSON común (`src/lib/data/servicesData.json`) de modo que tanto la Home como la página de servicios leer de la misma fuente de verdad.

---

## Plan de Verificación

### Pruebas Automatizadas
*   Ejecutar `npm run build` para asegurar la integridad de tipos y compilación de Next.js tras las limpiezas iniciales.
*   Ejecutar `npm run lint` para validar la calidad del código TypeScript.

### Verificación Manual
*   Revisar la correcta navegación y visualización de la barra de menú expandida en dispositivos móviles y de escritorio.

---

## 6. Auditoria de Rendimiento y Pendientes Aprobada

<approved_execution_plan>
  <summary>
    Primera pasada balanceada para corregir bloqueos tecnicos que impiden feedback confiable sin apagar el look premium del sitio.
  </summary>

  <baseline>
    <item>`next build` pasa con Next.js 16.1.6 y Turbopack.</item>
    <item>`tsc --noEmit` pasa sin errores.</item>
    <item>ESLint falla por un patron de rendimiento React en `VSLSection`.</item>
    <item>La auditoria estatica de motion falla en `GhlLogoBackground` por animaciones infinitas sin reduced motion.</item>
    <item>Playwright visual pasa 64/72; las fallas se concentran en la ausencia de `#servicios` dentro de la home.</item>
  </baseline>

  <implementation_scope>
    <item>Montar `ServicesSection` en `src/app/page.tsx` para restaurar el ancla `#servicios`, el CTA del hero y la navegacion inferior.</item>
    <item>Refactorizar `VSLSection.tsx` para evitar `setState` sincronico dentro de efectos, limpiar imports/vars sin uso y reemplazar el `img` del logo por `next/image`.</item>
    <item>Agregar `useReducedMotion` en `GhlLogoBackground.tsx` para que las animaciones infinitas queden estaticas cuando el usuario pide menos movimiento.</item>
    <item>Revisar `AnimatePresence mode="wait"` en componentes compartidos, priorizando `Button`, que genera warnings repetidos por multiples hijos.</item>
    <item>Limpiar warnings de lint que no cambian copy ni decisiones de contenido.</item>
  </implementation_scope>

  <out_of_scope>
    <item>No inventar testimonios, metricas, chats, videos, enlaces reales de comunidad ni cifras no verificadas.</item>
    <item>No eliminar el hero 3D en esta pasada; si despues del feedback sigue pesado, se difiere o degrada en mobile como fase posterior.</item>
    <item>No instalar Lighthouse ni analizadores de bundle en esta pasada.</item>
  </out_of_scope>

  <validation>
    <item>Usar el Node empaquetado de Codex porque el `npm` global local falla antes de ejecutar scripts.</item>
    <item>Validar TypeScript, ESLint, auditoria estatica de motion, build de Next y Playwright motion.</item>
    <item>Dejar corriendo `next dev` en `127.0.0.1` para anotaciones despues de validar.</item>
  </validation>
</approved_execution_plan>

---

## 7. Feedback del Anotador: Home Directo a VSL

<browser_feedback_resolution>
  <source>Comentario sobre `section#servicios` en la home.</source>
  <request>Sacar la seccion "Lo que hacemos" del flujo principal y pasar directo a VSL.</request>
  <implementation_scope>
    <item>Eliminar `ServicesSection` de `src/app/page.tsx` sin tocar la pagina interna `/servicios`.</item>
    <item>Actualizar el CTA secundario del hero para navegar a `#vsl-masterclass`.</item>
    <item>Actualizar `IslandBar` para usar un item `VSL` en lugar del ancla removida `#servicios`.</item>
    <item>Actualizar la prueba de estabilidad de scroll para auditar `#vsl-masterclass`.</item>
  </implementation_scope>
</browser_feedback_resolution>

---

## 8. Feedback del Anotador: Legibilidad del Footer

<browser_feedback_resolution>
  <source>Comentario sobre el `IslandBar` flotante en la parte inferior de la home.</source>
  <request>Evitar que la navegacion inferior bloquee la legibilidad del pie de pagina.</request>
  <implementation_scope>
    <item>Marcar el bloque legal del footer como zona de lectura sensible.</item>
    <item>Actualizar `IslandBar` para ocultarse cuando esa zona entra en viewport.</item>
    <item>Mantener la navegacion flotante intacta fuera del footer y sin alterar contenido legal ni CTAs.</item>
  </implementation_scope>
  <business_benefit>
    <item>Mejora la confianza al dejar visibles copyright, privacidad y terminos sin competir con controles flotantes.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 9. Feedback del Anotador: Centrado de Iconos del IslandBar

<browser_feedback_resolution>
  <source>Comentario sobre el item `Contacto` dentro del `IslandBar` inferior.</source>
  <request>Centrar cada icono correctamente dentro de su burbuja correspondiente.</request>
  <implementation_scope>
    <item>Eliminar el desplazamiento visual causado por `gap` cuando las etiquetas estan colapsadas.</item>
    <item>Dar a cada icono una celda fija con `items-center` y `justify-center`.</item>
    <item>Mantener las etiquetas desktop/mobile, pero con margen solo cuando son visibles.</item>
  </implementation_scope>
  <business_benefit>
    <item>La navegacion flotante se percibe mas precisa y premium, especialmente durante scroll cuando queda compacta.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 10. Feedback del Anotador: Tecnologias del Hero

<browser_feedback_resolution>
  <source>Comentario sobre el marquee `Plataformas conectadas` del hero.</source>
  <request>Quitar TikTok Ads y Google Ads; enfocar el stack en WhatsApp API, GoHighLevel, Meta Ads y tecnologias compatibles.</request>
  <implementation_scope>
    <item>Actualizar `LogoMarquee` para representar integraciones reales de CRM, WhatsApp, Meta y automatizacion.</item>
    <item>Eliminar del marquee las etiquetas `Google Ads` y `TikTok Ads`.</item>
    <item>Agregar tecnologias afines como OpenAI, Make, Calendly y Stripe sin inventar metricas ni claims.</item>
  </implementation_scope>
  <business_benefit>
    <item>El primer viewport comunica mejor el stack operativo que sostiene la promesa comercial del sitio.</item>
  </business_benefit>
</browser_feedback_resolution>

---

## 11. Feedback del Anotador: Quitar Meta CAPI

<browser_feedback_resolution>
  <source>Comentario sobre la tecnologia `Meta CAPI` dentro del marquee del hero.</source>
  <request>Quitar `Meta CAPI` porque no es una tecnologia reconocida por el equipo.</request>
  <implementation_scope>
    <item>Eliminar la etiqueta `Meta CAPI` de `LogoMarquee`.</item>
    <item>Limpiar el icono/import asociado para evitar codigo muerto.</item>
    <item>Mantener el resto del stack conectado sin agregar nuevas siglas no aprobadas.</item>
  </implementation_scope>
  <business_benefit>
    <item>Reduce friccion y mantiene el hero alineado con tecnologias que el equipo puede explicar con seguridad.</item>
  </business_benefit>
</browser_feedback_resolution>
