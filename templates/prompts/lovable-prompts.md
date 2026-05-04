# Prompts para Lovable

> Lovable es ideal para arrancar landings y MVPs ultra rápidos. Tu objetivo es darle un brief tan denso que el primer cut ya respete tu UI-SPEC.

---

## Plantilla maestra (pegar SIEMPRE arriba del brief)

```
Estoy construyendo <tipo de proyecto> para <cliente / nicho>.

DESIGN SYSTEM (no negociable):
- Mood: <minimalista, técnico, cálido / lujoso, oscuro, vivido>
- Modo: <light/dark/dual>
- Paleta primaria: <oklch values>
- Tipografía: Inter Display (headings) + Inter (body), self-hosted via Fontsource.
- Border-radius: 8px botones / 12px cards / 20px secciones.
- Escala de espaciado base 4px.

STACK:
- React 18 + Tailwind CSS v4 (tokens vía @theme).
- shadcn/ui como base de componentes.
- Framer Motion para animaciones (sin GSAP).
- lucide-react para íconos.

REGLAS:
- Cero hex hardcoded; todo via CSS variables.
- HTML semántico (header/main/section/article/footer).
- focus-visible en cada interactivo.
- prefers-reduced-motion respetado.
- Imágenes con alt descriptivo y next/image-style optimization.
- Componentes < 200 líneas, descomponer si excede.

NO QUIERO:
- Material UI ni Bootstrap.
- Animaciones que tomen > 600ms.
- Hover effects que oculten contenido.
- Texto que aparece letra por letra.
```

---

## 1 · Landing premium full

```
Construime una landing premium para <producto/servicio>.

ESTRUCTURA EXACTA:
1. Header sticky con logo + 5 nav links + 1 CTA "Empezar".
2. Hero: H1 (≤ 8 palabras), subtítulo (≤ 22), 1 CTA primario, 1 secundario, trust bar (logos + métrica).
3. Pain point: párrafo articulando el dolor con visual de contraste.
4. Solution: 3 value props con iconos custom + 1 párrafo cada uno.
5. Demo: video loop o screenshots interactivos del producto.
6. Social proof: 3 testimonials con foto + métricas duras.
7. How it works: 4 pasos con stagger reveal on scroll.
8. Pricing: 3 planes, plan central destacado, toggle anual/mensual.
9. FAQ: 6 preguntas accordion.
10. Final CTA + 1 garantía.
11. Footer: 4 cols + newsletter + bottom bar legal.

VALORES:
- Producto: <nombre>
- USP: <una frase>
- CTA primario: "<verbo + beneficio>"
- Plan central: "<plan name>" - $<precio>/mes
- Trust: <X clientes, Y rating>

MOTION:
- Reveal on scroll con stagger 80ms.
- Smooth scroll global con Lenis.
- Hover scale 1.02 en cards de pricing.
- Respeto reducido-motion.

PERFORMANCE:
- LCP target ≤ 1.5s mobile.
- Hero image optimizada AVIF.
- Lazy-load below-the-fold.
- Fonts preload solo principal.
```

---

## 2 · Dashboard SaaS MVP

```
Dashboard SaaS para <vertical>.

LAYOUT:
- Sidebar 240px, collapsible.
- Topbar con search ⌘K (cmdk), notifications, avatar dropdown.
- Main area con cards y charts.

PÁGINAS:
- /dashboard: KPI cards (4) + chart de actividad (Tremor).
- /dashboard/projects: tabla de proyectos con filtros, paginación, search.
- /dashboard/team: grid de miembros con roles, invitar nuevos.
- /dashboard/billing: plan actual + invoices + customer portal link.
- /dashboard/settings: form de cuenta + form de organización + danger zone.

FEATURES:
- Multi-tenant (organizations).
- RBAC: owner, admin, member.
- Empty states ilustrados en cada lista.
- Skeleton loading consistente.
- Toasts con sonner.

A11y:
- Sidebar accesible por teclado.
- Tablas con thead correcto y aria-rowcount.
- Modal/dialog con focus trap + esc.

DATA MOCK:
- Generá data sintética para demo (faker).
- Hook useProjects, useTeam, useBilling con TanStack Query mocks.
```

---

## 3 · E-commerce mínimo

```
Tienda online para <vertical>.

PÁGINAS:
- / : storefront con hero + grid de productos destacados + categorías + footer.
- /productos : catálogo con filtros (categoría, precio range, search).
- /productos/[slug] : detalle con galería, descripción, talles/variantes, CTA "Agregar al carrito" + "Comprar ya".
- /carrito : drawer + página dedicada.
- /checkout : 3 pasos (dirección, pago, confirmación).
- /gracias : thank you + tracking si aplica.

CART:
- Zustand persist en localStorage.
- Drawer con vaul, abre al agregar.
- Update cantidad inline, eliminar con confirm.

CHECKOUT:
- Form único con secciones (dirección, contacto, pago).
- Stripe Checkout primario, Mercado Pago si país LATAM.
- Aplicar cupones inline.

NOTAS:
- Imágenes de producto AVIF + sharp.
- Schema.org Product en JSON-LD.
- breadcrumb accesible.
```

---

## 4 · Agente de captura tipo "exit intent"

```
Componente de captura de leads con dos modos:

1. Banner sticky bottom: "¿Te ayudo a elegir? Dejame tu email y te mando una guía", con botón.
2. Modal exit-intent: detecta mouseleave hacia toolbar; muestra modal con headline + form email + botón.

Ambos:
- Solo se muestran 1 vez por sesión (cookie + Zustand state).
- Cierre con X visible y aria-label.
- Form con zod, POST a /api/leads.
- Estado success in-place con check + microcopy de gracias.

NO:
- Pop-ups que tapen contenido en mobile (mejor banner).
- Sound alerts.
- Animaciones agresivas.

Si el deal del cliente es premium, usar diseño elegante: sombras sutiles, border-radius generoso, motion suave (250ms).
```

---

## Cómo iterar después de Lovable

1. Exportar el proyecto.
2. Bajarlo localmente al repo del cliente.
3. Refactor: eliminar deps no autorizadas (verificar contra `LIBRARY-CATALOG.md`).
4. Aplicar pipeline completa: stylistic → a11y → performance → motion-polish.
5. Migrar a estructura GSD: PROJECT.md, REQUIREMENTS.md, etc.
6. Commit como Fase 0 cerrada del proyecto.

---

*Lovable te ahorra 1-2 días de scaffolding. Las pasadas posteriores te suben de 6/10 a 9/10.*
