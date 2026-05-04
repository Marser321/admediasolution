# LIBRARY CATALOG 2026

> Curaduría de librerías next-gen para webs de USD 25K. Cada entrada incluye **cuándo usarla**, **cuándo no**, y la **regla de oro** para que el LLM la consuma bien.

> **Convención de etiquetas**:
> `[CORE]` = base obligatoria del stack · `[PREMIUM]` = sube el techo del 8 al 9.5/10 · `[NICHE]` = úsala solo si calza · `[LATAM]` = relevante en mercado uruguayo/argentino.

---

## 1 · Frameworks de aplicación

| Librería            | Estado 2026 | Cuándo usar                                                              | Cuándo NO usar                                  |
|---------------------|-------------|----------------------------------------------------------------------------|--------------------------------------------------|
| **Next.js 15** `[CORE]` | Estándar de facto para SaaS/e-commerce. RSC + Server Actions + Turbopack estable | Auth, dashboards, e-commerce, multi-tenant      | Sitios estáticos puros (overkill, mejor Astro) |
| **Astro 5** `[CORE]`    | Ganador absoluto en marketing/contenido. Server Islands + Content Layer 2.0      | Landings, corporativos, blogs, docs, portfolios | Apps con auth pesada, dashboards reactivos     |
| **React Router 7 (Remix)** | Estable post-merge. Loader/action paradigm puro | Apps full-stack con énfasis en formularios y SSR | Sitios estáticos, marketing                |
| **SvelteKit 2**     | Sigue ganando terreno en performance | Apps internas con DX top y bundle minúsculo      | Equipos sin experiencia Svelte                  |
| **TanStack Start**  | Beta-gold. SSR sobre TanStack Router | Apps que ya usan TanStack Query intensivo        | Producción crítica (todavía joven)              |

**Regla de oro para el LLM**: fijar la versión exacta en `package.json` y en `AGENTS.md` (`Next.js 15.x`, `Astro 5.x`). Sin esto, mezcla paradigmas (App Router vs Pages, Astro 4 vs 5).

---

## 2 · Sistema de diseño y UI

### CSS / Styling
| Librería               | Etiqueta  | Notas |
|------------------------|-----------|-------|
| **Tailwind CSS v4**    | `[CORE]`  | Engine Oxide, `@theme` directive, CSS variables nativas. Configuración en CSS, no en JS. |
| **CSS Variables nativas** | `[CORE]`  | Para tokens de color/espaciado. No te encierres solo en `tailwind.config`. |
| **PostCSS + Autoprefixer** | `[CORE]`  | Implícito. |

### Componentes base (sistema serio)
| Librería            | Etiqueta   | Cuándo usar                                                     |
|---------------------|------------|------------------------------------------------------------------|
| **shadcn/ui**       | `[CORE]`   | Base universal. Copiás los componentes, no los instalás.        |
| **Radix UI primitives** | `[CORE]`   | Base de shadcn. Acordeones, dialogs, dropdowns headless y a11y. |
| **React Aria Components** | `[NICHE]`  | Cuando A11y es contractual (gobierno, salud, educación).        |

### UI Premium (la diferencia 25K)
| Librería         | Etiqueta    | Súper-poder                                                                       |
|------------------|-------------|-------------------------------------------------------------------------------------|
| **Aceternity UI** | `[PREMIUM]` | Hero sections cinemáticas, parallax 3D, beams, sparkles. Copy-paste.              |
| **Magic UI**      | `[PREMIUM]` | Animaciones micro premium (animated beams, marquee, dock, retro grid).            |
| **Cult UI**       | `[PREMIUM]` | Componentes con glassmorphism y motion bien resuelto. Dialog/popover hermosos.    |
| **Origin UI**     | `[PREMIUM]` | Forms y patrones de dashboard de altísima calidad.                                |
| **Tremor**        | `[PREMIUM]` | Charts y dashboards SaaS listos para producción (sobre Recharts).                 |
| **HextaUI**       | `[PREMIUM]` | Components animados rápidos para landing.                                         |
| **Motion Primitives** | `[PREMIUM]` | Animaciones declarativas sobre Framer Motion.                                  |
| **Cobe**          | `[NICHE]`   | El globe 3D animado que ves en todas las landings premium. Tiny.                  |

**Regla de oro**: en `UI-SPEC.md` listá explícitamente qué libraries de UI premium podés mezclar y cuáles no. Aceternity + Magic UI + shadcn conviven; mezclar 5 librerías genera incoherencia visual.

---

## 3 · Animación y Motion

| Librería          | Etiqueta    | Cuándo usar                                                                |
|-------------------|-------------|----------------------------------------------------------------------------|
| **Framer Motion** | `[CORE]`    | 80% de los casos. `motion.div`, layout animations, gestures, scroll.       |
| **GSAP 3.x**      | `[PREMIUM]` | Cuando necesitás timeline complejo, ScrollTrigger, MotionPath, Flip.       |
| **Lenis**         | `[CORE]`    | Smooth scroll de calidad agencia. Imprescindible en landings premium.      |
| **Motion One**    | `[NICHE]`   | Bundle ultra liviano si no querés FM completo.                             |
| **Auto-animate (FormKit)** | `[NICHE]` | Animar listas/grids con una línea. Bueno para SaaS.                  |
| **Tailwind Animate** | `[CORE]` | Plugin oficial. `animate-in`, `fade-in`, etc.                              |

**Regla de oro**: en `motion-polish` skill, prohibir mezclar GSAP y Framer Motion en el mismo componente. Una librería por unidad funcional.

---

## 4 · 3D / Canvas / Visualización

| Librería               | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **React Three Fiber + drei** | `[PREMIUM]` | 3D real en React. Drei tiene presets de cámara, controles, helpers. |
| **Spline**             | `[NICHE]`   | Diseño 3D no-code y export a React. Útil para hero 3D rápido.        |
| **Three.js**           | `[CORE]`    | Backbone de R3F.                                                      |
| **Lottie (lottie-react)** | `[CORE]`  | Animaciones vectoriales exportadas de After Effects.                  |
| **Recharts / Visx**    | `[CORE]`    | Charts. Recharts para 90% de SaaS, Visx para custom data viz.        |
| **D3 v7**              | `[NICHE]`   | Si necesitás visualizaciones custom no resueltas en Recharts.        |
| **Mapbox GL JS / MapLibre** | `[NICHE]` | Mapas premium.                                                  |

---

## 5 · Formularios y validación

| Librería            | Etiqueta  | Notas |
|---------------------|-----------|-------|
| **react-hook-form** | `[CORE]`  | Sigue siendo el estándar en React.                                 |
| **zod**             | `[CORE]`  | Schema validation universal. Compartilo entre client/server/DB.    |
| **conform**         | `[NICHE]` | Si usás Remix/React Router 7 con Server Actions.                   |
| **valibot**         | `[NICHE]` | Alternativa a zod con bundle más chico, si performance crítico.    |
| **TanStack Form**   | `[NICHE]` | Si ya usás TanStack stack completo.                                |

**Regla de oro**: forzar `zod schema → react-hook-form resolver → server validation`. Triple gate.

---

## 6 · Estado y Data Fetching

| Librería            | Etiqueta  | Cuándo usar                                                         |
|---------------------|-----------|---------------------------------------------------------------------|
| **TanStack Query v5** | `[CORE]`  | Caching de servidor en cualquier app con datos remotos.             |
| **Zustand**         | `[CORE]`  | Estado UI global liviano. El doc lo prescribe explícitamente.       |
| **Jotai**           | `[NICHE]` | Si preferís estado atómico granular.                                |
| **nuqs**            | `[CORE]`  | Estado en URL params con typesafety. Imprescindible para filtros.   |
| **Redux Toolkit**   | `[NICHE]` | Solo si el cliente lo exige por estandar corporativo.               |

**Regla de oro**: el `frontend-foundation` skill obliga Zustand para estado UI. El LLM tiende a inventar useState anidados — bloquearlo en reglas.

---

## 7 · Autenticación

| Librería               | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **Better Auth**        | `[PREMIUM]` | El standard moderno 2026 — full-featured, framework-agnostic, plugins (2FA, magic link, passkeys, organizations). |
| **Clerk**              | `[CORE]`    | Hosted. Llave en mano para SaaS. Buen pricing por usuario activo.    |
| **Supabase Auth**      | `[CORE]`    | Si usás Supabase como DB.                                            |
| **Auth.js (NextAuth)** | `[NICHE]`   | Si Better Auth no encaja por algún motivo.                           |
| **Lucia**              | `[DEPRECATED]` | Migración recomendada hacia Better Auth.                          |
| **WorkOS / Stytch**    | `[NICHE]`   | Cuando hay enterprise SSO/SAML obligado.                             |

**Regla de oro**: en `saas-auth-stack` skill, forzar HTTPOnly cookies + middleware de protección de rutas + RLS si la DB lo soporta.

---

## 8 · Pagos

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Stripe**          | `[CORE]`    | Estándar global. Stripe Checkout / Payment Element / Subscriptions / Connect. |
| **Mercado Pago**    | `[LATAM]`   | Imprescindible para Uruguay/Argentina/Brasil.                          |
| **Lemon Squeezy**   | `[NICHE]`   | Merchant of record. Útil si no querés lidiar con tax/IVA.              |
| **Polar.sh**        | `[NICHE]`   | MoR alternativa con mejor DX para SaaS indie.                          |
| **dLocal**          | `[LATAM]`   | Pasarela LATAM con cobertura amplia.                                   |
| **Plataforma 10 / Banred / Plexo** | `[LATAM]` | Pasarelas locales UY si el cliente lo exige.                |

**Regla de oro**: webhooks en endpoints separados, validación de firma estricta, idempotency keys. Documentar en `CONTEXT.md` qué eventos disparan qué.

---

## 9 · CMS y contenido

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Sanity v3**       | `[CORE]`    | Headless CMS top. Studio en código, Portable Text, GROQ.              |
| **Payload CMS 3**   | `[PREMIUM]` | Self-hostable, Next.js native, admin auto-generado. Mejor para clientes que quieren todo on-prem. |
| **Contentlayer 2 / Velite** | `[CORE]` | MDX type-safe para blogs y docs.                                |
| **TinaCMS**         | `[NICHE]`   | Editor en vivo sobre archivos del repo.                               |
| **MDX + remark/rehype** | `[CORE]` | Para docs propios y blogs sin CMS.                                    |
| **Notion API**      | `[NICHE]`   | Cliente que ya escribe en Notion, sirve como CMS lite.                |
| **Storyblok**       | `[NICHE]`   | Visual editing si el cliente prioriza eso.                            |

---

## 10 · Base de datos y ORM

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Postgres (siempre)** | `[CORE]` | El doc lo dictamina (D-01 típica). UUIDs por defecto.                 |
| **Supabase**        | `[CORE]`    | Postgres gestionado + Auth + Storage + Realtime + Edge Functions.     |
| **Neon**            | `[CORE]`    | Postgres serverless con branching. Mejor DX para ramas de feature.    |
| **Turso (libSQL)**  | `[NICHE]`   | SQLite distribuido. Para edge-first.                                   |
| **Drizzle ORM**     | `[CORE]`    | El ORM TS estándar 2026. SQL-first, type-safe, migraciones limpias.   |
| **Prisma**          | `[NICHE]`   | Si el equipo viene con experiencia previa.                            |
| **Kysely**          | `[NICHE]`   | Query builder type-safe sin runtime overhead.                          |

**Regla de oro**: prohibir alterar el schema sin generar migración explícita en `drizzle/migrations/` o `supabase/migrations/`. Esto va en `AGENTS.md`.

---

## 11 · Email transaccional

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Resend**          | `[CORE]`    | API moderna, integración directa con React Email. DKIM/SPF guiado.    |
| **React Email**     | `[CORE]`    | Templates como componentes React. Preview local.                       |
| **Postmark**        | `[NICHE]`   | Transaccional clásico. Mejor entregabilidad que Resend en algunos casos.|
| **Loops**           | `[NICHE]`   | Si el cliente quiere mezclar transaccional + marketing.               |

---

## 12 · AI / LLM (para integrar en webs)

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Vercel AI SDK 4** | `[CORE]`    | Streaming, tool calling, multi-provider (Anthropic, OpenAI, Google).   |
| **OpenAI SDK**      | `[CORE]`    | Cuando OpenAI directo.                                                 |
| **Anthropic SDK**   | `[CORE]`    | Para Claude — recomendado para chat de soporte y agentes.              |
| **LangChain.js**    | `[NICHE]`   | Solo si necesitás chains complejas. Generalmente AI SDK alcanza.      |
| **ElevenLabs SDK**  | `[PREMIUM]` | TTS premium para landing/demos.                                       |
| **Replicate**       | `[NICHE]`   | Modelos de imagen/video on-demand.                                    |

---

## 13 · CRM, Marketing, Funnels

| Librería / Servicio    | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **GoHighLevel (GHL)**  | `[CORE]`    | El doc lo prescribe. API v2 + PIT auth + webhooks. AI Studio + Agent Studio nativos. |
| **OpenClaw**           | `[PREMIUM]` | Capa cognitiva externa. Self-hosted, local-first. Para automatización profunda + WhatsApp/Telegram/Slack. |
| **HubSpot API**        | `[NICHE]`   | Cuando el cliente exige HubSpot.                                       |
| **n8n self-hosted**    | `[CORE]`    | Workflows automatizados, integra con todo. Self-hosted = control total.|
| **Make / Zapier**      | `[NICHE]`   | Para clientes que ya viven ahí.                                       |
| **Twilio + WhatsApp Cloud API** | `[CORE]` | Mensajería transaccional al canal preferido del usuario.        |
| **Customer.io**        | `[NICHE]`   | Si el cliente pide segmentación pesada.                                |

---

## 14 · Deploy / Hosting

| Plataforma          | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **Vercel**          | `[CORE]`    | Default para Next.js. Edge functions, Image Optimization, Analytics nativo. |
| **Netlify**         | `[CORE]`    | Default para Astro. Functions, Forms, Edge Handlers.                   |
| **Cloudflare Pages + Workers** | `[CORE]` | Cuando performance edge es crítico, o costos en escala.       |
| **Railway**         | `[NICHE]`   | Cuando hay servicios stateful (Postgres, Redis, queues).              |
| **Fly.io**          | `[NICHE]`   | Apps con websockets pesados o regiones específicas.                   |
| **VPS (Hetzner/DO)** | `[NICHE]`  | OpenClaw self-hosted, n8n, queues custom.                             |

---

## 15 · Analytics y Monitoring

| Librería               | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **PostHog**            | `[CORE]`    | Product analytics + session replay + feature flags + experimentos. Self-hostable. |
| **Plausible**          | `[CORE]`    | Privacy-first, sin cookie banner. EU-friendly.                         |
| **Vercel Analytics + Speed Insights** | `[CORE]` | Real User Monitoring zero-config si vas con Vercel.        |
| **Sentry**             | `[CORE]`    | Error tracking obligatorio en cualquier proyecto serio.                |
| **Logtail / Better Stack** | `[NICHE]` | Log aggregation cuando hay backend propio.                          |
| **Umami**              | `[NICHE]`   | Plausible self-hosted alternative.                                    |
| **Google Analytics 4** | `[NICHE]`   | Solo si el cliente lo exige por reportería existente.                 |

---

## 16 · Testing

| Librería               | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **Vitest 2**           | `[CORE]`    | Unit testing estándar 2026.                                            |
| **Playwright**         | `[CORE]`    | E2E. Imprescindible si querés que el agente valide con browser real.   |
| **Testing Library**    | `[CORE]`    | DOM testing.                                                           |
| **MSW**                | `[NICHE]`   | Mock de API a nivel de red.                                            |
| **Storybook 8**        | `[NICHE]`   | Solo si el cliente paga por design system documentado.                 |

---

## 17 · Performance / Bundle

| Librería               | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **Million.js**         | `[PREMIUM]` | Compilador que acelera React. Drop-in en Next.js.                      |
| **Sharp**              | `[CORE]`    | Optimización de imágenes server-side.                                  |
| **next/image, astro:assets** | `[CORE]` | Optimización implícita. No usar `<img>` directo nunca.            |
| **Bundle Analyzer**    | `[CORE]`    | Auditoría obligada antes de deploy.                                    |
| **Partytown**          | `[NICHE]`   | Mover scripts de terceros a web worker (GTM pesado, etc.).             |

---

## 18 · Accesibilidad

| Herramienta            | Etiqueta    | Notas |
|------------------------|-------------|-------|
| **axe-core**           | `[CORE]`    | Audit programático en CI.                                              |
| **eslint-plugin-jsx-a11y** | `[CORE]` | Lint de A11y en código.                                              |
| **Lighthouse (CI)**    | `[CORE]`    | Score >= 90 obligatorio antes de cobrar.                                |
| **PA11Y**              | `[NICHE]`   | Audit por línea de comando.                                            |

---

## 19 · Iconos y tipografía

| Librería            | Etiqueta    | Notas |
|---------------------|-------------|-------|
| **lucide-react**    | `[CORE]`    | Set de íconos universal, ligero, consistente.                          |
| **Tabler Icons**    | `[NICHE]`   | Cuando lucide se queda corto.                                          |
| **Phosphor Icons**  | `[NICHE]`   | Familias múltiples (light, fill, duotone).                             |
| **Fontsource**      | `[CORE]`    | Self-host de Google Fonts. Mejor performance + privacy.                 |
| **next/font**       | `[CORE]`    | Si vas con Next.js, optimización automática.                           |

---

## 20 · Misceláneo de alto impacto

| Librería            | Etiqueta    | Para qué |
|---------------------|-------------|----------|
| **react-hot-toast / sonner** | `[CORE]` | Toasts modernos. Sonner es preferido en 2026. |
| **vaul**            | `[CORE]`    | Drawer/Bottom Sheet de calidad mobile-first.                           |
| **cmdk**            | `[CORE]`    | Command palette ⌘K (Notion-like).                                      |
| **embla-carousel**  | `[CORE]`    | Carousel headless, performante, sin dependencias.                      |
| **next-intl / paraglide** | `[CORE]` | i18n moderno (Next.js / Astro).                                  |
| **react-pdf / pdf-lib** | `[NICHE]` | Generar facturas y reportes desde el front.                          |
| **Uppy**            | `[NICHE]`   | Uploader pro con resumable, S3 multipart, preview.                     |
| **Stream Chat / GetStream** | `[NICHE]` | Si el SaaS necesita chat o feed social.                          |

---

## 21 · Anti-recomendaciones (no usar en webs nuevas 2026)

- **Bootstrap / Material UI** salvo migración legacy.
- **jQuery** — jamás.
- **Lucia** (deprecado, usar Better Auth).
- **MomentJS** — usar `date-fns` o `Temporal` API.
- **Lodash full** — `lodash-es` cherry-picked o nada.
- **Axios** — `fetch` nativo + TanStack Query es suficiente.
- **Redux clásico (sin Toolkit)** — Zustand cubre el 95%.
- **Pages Router de Next.js** — todo nuevo va en App Router.

---

## 22 · Stacks "llave en mano" recomendados

### A · Landing premium (≤ 1 semana)
```
Astro 5 + Tailwind v4 + shadcn (alguno) + Aceternity/Magic UI + Framer Motion + Lenis
+ Resend (form) + Plausible + Netlify
```

### B · Sitio corporativo + blog (1-2 semanas)
```
Astro 5 + Tailwind v4 + Sanity v3 + Velite (docs) + next-intl/paraglide (i18n)
+ Resend + PostHog + Vercel/Netlify
```

### C · SaaS con auth + pagos (3-5 semanas)
```
Next.js 15 + Tailwind v4 + shadcn + Tremor (charts)
+ Better Auth + Drizzle + Postgres (Neon/Supabase)
+ Stripe + Resend + React Email
+ Sentry + PostHog + Vercel
```

### D · E-commerce + funnel CRM (3-4 semanas)
```
Next.js 15 + Tailwind v4 + shadcn + Aceternity (hero) + Framer Motion
+ Stripe / Mercado Pago + Sanity (catálogo) o headless commerce
+ GoHighLevel (CRM + funnel) + OpenClaw (capa cognitiva opcional)
+ n8n + Twilio/WhatsApp Cloud
+ Sentry + PostHog + Vercel
```

---

*Catálogo curado para mayo 2026. Validar versiones cada 90 días. Si hay novedad relevante, sumarla con caso de uso real.*
