# Listado de Tareas del CEO y Prompt para Modelo Opus 4.8

Este documento consolida la totalidad de los requerimientos y tareas extraídos de los 6 audios de WhatsApp del CEO, Danger Fernández, y proporciona un prompt robusto y estructurado para guiar al modelo entrante (Opus 4.8) en la implementación lógica definitiva.

---

## 📋 Listado Consolidado de Tareas (CEO Feedback)

### 1. Arquitectura General y SEO
- [ ] **Redirecciones 301**: Crear un mapeo completo de las URLs antiguas de `mediuso.com` (catálogos, precios, etc.) hacia las nuevas páginas correspondientes para preservar el posicionamiento SEO. *Nota: Debe ser el último paso del despliegue.*
- [ ] **Estructura del Menú**: Asegurar un menú de navegación principal con exactamente 10 celdas (Inicio, Sobre Nosotros, CRM & Automatización, Meta & Google Ads, Redes Sociales, Desarrollo Web, Comunidad, Casos, Equipo, Planificación).

### 2. Página de Inicio (Home)
- [ ] **Hero Section (Propuesta de Valor)**:
  - Actualizar copys principales enfocados a negocios que facturan o quieren facturar más de **$30,000, $40,000, $50,000 o $100,000 USD**.
  - Mostrar los 3 pilares del servicio: CRM Personalizados, Soporte y Dirección de Marketing.
  - Integrar el mensaje central en texto prominente: *"Damos dirección de marketing y ventas a los negocios."*
- [ ] **Sección de Testimonios Dinámicos (BTL)**:
  - Crear una sección interactiva rápida donde al hacer scroll se alternen las columnas.
  - Tarjeta vertical de testimonio a un lado (ej. izquierda) y texto descriptivo con flecha indicativa al otro diciendo: *"Ayudamos a esta empresa con [Caso]"*. Al hacer scroll, la siguiente tarjeta se invierte (texto a la izquierda, testimonio a la derecha).
  - Integrar el concepto Below The Line (BTL) en esta sección.
- [ ] **Widget Flotante**:
  - Mantener el widget flotante de contacto existente en la esquina de la pantalla.
  - Añadir la llamada a la acción clara para agendar una cita sin costo: *¿Quieres saber cómo nosotros te ayudamos? Agéndanos una cita, que es sin costo y te demostramos.* (Redirigir a `/planificacion`).
- [ ] **Pop-up de Agendamiento Temporizado**:
  - Implementar un pop-up que aparezca automáticamente tras **5 segundos** de permanencia del usuario.
  - Mostrar una invitación clara a agendar con el copy: *"Agenda tu cita ahora. Hay un cupón disponible."* (Código: `ADCRM-FREE-SET`).

### 3. Página `/servicios` (Catálogo y Planes)
- [ ] **Tablas de Planes de Precios**:
  - Implementar tablas interactivas con los planes de:
    - *Mantenimiento*: Plan Servidor ($24.99/mes), Plan Básico, Plan Premium ($500/mes), Plan Personalizado.
    - *CRM*: Plan Premium CRM ($1500 pago único + $97/mes), Plan CRM Personalizado (Desde $1500), Planes de Soporte CRM (Estándar $500/mes, Full $750/mes, Consultoría VIP con Danger desde $1000/mes), Asistentes de Ventas.
    - *Redes Sociales*: Plan Básico ($500/mes), Plan Premium ($800/mes), Plan Personalizado.
    - *Marketing Digital (Meta/Google Ads)*: Desde $1000/mes.
    - *Desarrollo Web*: Landing Pages ($250-$500), Sitio Web Premium ($2000), Sitio Web Corporativo ($1200-$2000), Tienda en Línea ($2000-$3500), Desarrollo Personalizado ($5000+).
- [ ] **Detalle de Trabajos y Producción**:
  - Detallar los servicios de Grabación de contenido (con fotos del equipo de fotógrafos/camarógrafos como Cadete, etc.), Edición de video, Diseño gráfico y Redes Sociales.
  - Detallar la especialización de Meta Ads (mostrando la insignia *Business Partner de Meta*) y Google Ads.
  - Mostrar especializaciones por **nichos de mercado**, incluyendo la analogía de tener *"un YouTube para cada persona"* en cada nicho (producción de contenido personalizada).

### 4. Página `/equipo` (Líderes de la Media)
- [ ] **Slider de Pantalla Completa**:
  - Asegurar que las tarjetas de los miembros tomen toda la pantalla (`w-screen h-screen`) y se desplacen horizontalmente bloqueando el scroll vertical.
  - Aplicar cadencias e ingresos Parallax escalonados (Foto escala, Nombre desde la derecha, Cargo desde arriba, Bio desde abajo, Footer desde la izquierda).
- [ ] **Miembros y Roles**:
  - Dividir el equipo por departamentos (Dirección, Marketing, Comercial, Desarrollo).
  - Incluir fotos reales (o placeholders coherentes), nombres y sinopsis de cada miembro (Danger, Cadete, Sofía, Natalia, Cristian, Mateo) y placeholders para los nuevos especialistas (Ads, CRM, Web Designer, Video Editor, Copywriter) bajo la consigna *"los principales líderes de la media"*.

### 5. Página `/about-us` (Historia)
- [ ] **Línea de Tiempo Histórica (10 Años)**:
  - Narrar la historia cronológica de la agencia desde el inicio solitario de Danger hace 10 años hasta la actualidad.
  - Mostrar la evolución física de las oficinas con fotos o contenedores dedicados: Primera Oficina (2019), Segunda Oficina (2022) y Oficinas Actuales (2026).

### 6. Página `/comunidad` (Comunidad)
- [ ] **Acceso a Comunidad y Videos**:
  - Ofrecer un botón destacado de acceso directo para unirse a la comunidad de WhatsApp.
  - Mostrar una biblioteca con videos embebidos o placeholders interactivos de masterclasses, eventos de networking y workshops pasados.

### 7. Página `/danger` (Danger Fernández)
- [ ] **Casos de Éxito y Perfil**:
  - Detallar la trayectoria de Danger Fernández como consultor estratégico comercial.
  - Mostrar testimonios reales de clientes que hayan escalado su facturación (ej. de $25K a $80K USD).

---

## 🤖 Prompt Optimizado para el Modelo Opus 4.8

Copia y pega el siguiente prompt en la sesión del modelo Opus 4.8 para guiar la fase de desarrollo lógico:

```markdown
Eres un modelo de IA de alta capacidad (Opus 4.8 con 1M de contexto) y te han asignado la implementación lógica final del sitio web de AD Media Solution. 

### Contexto del Proyecto
El proyecto está construido en Next.js (App Router, React 19) utilizando TypeScript, Tailwind CSS v4, Framer Motion y Lucide Icons. Ya se han realizado las tareas de limpieza del código viejo, se crearon los archivos de tipos estándar y se estructuró una base de datos centralizada de servicios en JSON. También se implementaron los placeholders básicos de rutas y la estructura de un slider horizontal a pantalla completa.

### Tu Objetivo
Tu objetivo es implementar el contenido profundo, el diseño interactivo glassmorphic y los requerimientos lógicos de la web basándote en dos documentos clave que ya se encuentran en el proyecto:
1.  **[docs/CLIENT_FEEDBACK.md](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/docs/CLIENT_FEEDBACK.md)**: El feedback detallado del cliente extraído de audios de WhatsApp.
2.  **[docs/CURRENT_SITE_CONTENT.md](file:///Users/mariomorera/Desktop/AD%20Media%20Solution/docs/CURRENT_SITE_CONTENT.md)**: La estructura de planes, precios y servicios del sitio web anterior que debemos mantener y profundizar.

### Instrucciones de Implementación

1.  **Página Home (`src/app/page.tsx`)**:
    - **HeroSection**: Integra el copy centrado en facturación de empresas ($30K-$100K) y la frase: *"Damos dirección de marketing y ventas a los negocios."*
    - **Testimonios Dinámicos (BTL)**: Implementa la sección interactiva que alterna tarjetas de testimonios verticales y textos de caso con flechas a medida que el usuario hace scroll (concepto BTL).
    - **Widget Flotante**: Modifica el widget flotante para redirigir a `/planificacion` invitando a una cita demostrativa gratis.

2.  **Página de Servicios (`src/app/servicios/page.tsx`)**:
    - Termina de pulir la visualización de las tablas de planes de precios leyendo dinámicamente de `src/lib/data/servicesData.json`.
    - Integra la sección de nichos específicos detallando el concepto de "un YouTube para cada persona" y muestra de forma atractiva la especialización en Meta Ads (insignia de Meta Business Partner) y Google Ads.
    - Describe e ilustra la producción audiovisual (Grabación con fotos de Cadete/fotógrafos y Edición).

3.  **Página de Danger (`src/app/danger/page.tsx`)**:
    - Desarrolla el perfil comercial de Danger Fernández integrando capturas simuladas de chats, métricas de éxito y testimonios reales.

4.  **Página de Equipo (`src/app/equipo/page.tsx`)**:
    - El slider de pantalla completa (`w-screen h-screen`) con bloqueo vertical ya está montado. Asegúrate de que las fotos tipo retrato carguen bien en su marco vertical, y que los badges de especialidades y proyectos de los placeholders se visualicen de forma premium y respondan a los links.

5.  **Página Sobre Nosotros (`src/app/about-us/page.tsx`)**:
    - Da formato a la línea de tiempo histórica y coloca placeholders elegantes para las fotos de la primera, segunda y actuales oficinas.

6.  **Página de Comunidad (`src/app/comunidad/page.tsx`)**:
    - Asegura que el botón de enlace de WhatsApp de la comunidad esté operativo y que la biblioteca de videos cargue placeholders o modales de reproducción.

7.  **Página de Planificación (`src/app/planificacion/page.tsx`)**:
    - Conecta el formulario Wizard de 3 pasos para registrar las solicitudes y redirige a la confirmación de éxito.

### Lineamientos Técnicos
- Mantén el rendimiento óptimo y los tiempos de compilación rápidos (usa Turbopack).
- Conserva el código TypeScript estrictamente tipado importando las interfaces desde `src/lib/types.ts`.
- No dejes secciones vacías ni placeholders de texto lorem ipsum; redacta copys comerciales convincentes en español basados en la marca AD Media.
- Realiza builds de prueba con `node_modules/.bin/next build` para garantizar que no haya roturas en la generación estática.
```
