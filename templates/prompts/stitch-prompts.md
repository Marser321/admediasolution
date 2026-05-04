# Prompts para Google Stitch

> Stitch genera mocks navegables y wireframes a partir de descripciones, bocetos o referencias. Lo usás **antes** de Antigravity / v0 para tener una topología visual aprobable por el cliente sin tocar código.

---

## Workflow recomendado

```
1. Brief del cliente → 2. Stitch genera wireframe navegable
                    ↓
3. Iterar en Stitch hasta cliente feliz
                    ↓
4. Exportar tokens (paleta, tipografía, spacing) a UI-SPEC.md
                    ↓
5. MCP / handoff hacia Antigravity → genera React + Tailwind
                    ↓
6. Pipeline de refinamiento (stylistic → a11y → perf → motion)
```

---

## Plantilla de prompt — Landing premium

```
Diseñá una landing premium para <producto>.

VARIABLES:
- Audiencia: <descripción demográfica + psicográfica>
- Promesa de valor: <una frase>
- Tono: <e.g. minimalista, técnico, cercano>
- Modo: <light/dark/dual>
- Inspiraciones: linear.app, vercel.com, stripe.com (sintetizar el lenguaje visual de los tres).

ESTRUCTURA OBLIGATORIA (en este orden):
1. Header sticky minimalista (5 nav links + 1 CTA).
2. Hero ATF: H1 (8 palabras), subtítulo (22), 2 CTAs, trust bar (5 logos + métrica numérica).
3. Pain point (texto + visual de contraste).
4. Solution: 3 value props.
5. Demo en producto (mockup 3D o screenshots).
6. Social proof (3 testimonials con foto real, métricas duras).
7. Pricing (3 planes, plan central destacado).
8. FAQ (6 preguntas).
9. Final CTA + garantía.
10. Footer con 4 cols + newsletter + legal.

OUTPUTS QUE NECESITO:
- Wireframe interactivo navegable.
- Tokens exportados (paleta oklch, escala tipográfica, espaciado, radius).
- Variantes mobile/tablet/desktop.
- Estados clave (hover, focus, loading) en componentes interactivos.
- Schema de copy aprobable (headlines, CTAs, microcopy).

NO QUIERO:
- Carruseles auto-play.
- Más de 7 secciones.
- 4 tipografías distintas.
- Fotos de stock obvio en testimonials.
```

---

## Plantilla — Dashboard SaaS

```
Diseñá un dashboard SaaS para <vertical>.

LAYOUT:
- Sidebar 240px collapsible / 64px icon-only.
- Topbar 64px con search ⌘K, notifications, avatar.
- Main con max-width 1400px.

PÁGINAS:
- /dashboard (overview con 4 KPI cards + 1 chart grande)
- /projects (tabla con filtros y paginación)
- /team (grid de miembros + invite)
- /billing (plan actual + invoices)
- /settings (cuenta + org + danger zone)

ESTADOS:
- Empty state ilustrado en cada lista vacía.
- Skeleton loading de cards y tablas.
- Error states de network.

COMPONENTES:
- Tabla con sort, filter, búsqueda.
- Modal de confirmación de acciones destructivas.
- Toast de éxito/error.
- Drawer mobile.

OUTPUT:
- Variantes light + dark.
- Tokens completos.
- Variants responsive.
- Hand-off a React + Tailwind v4 + shadcn.
```

---

## Plantilla — E-commerce + funnel

```
Diseñá una tienda online + sistema de captura de leads.

PÁGINAS:
- Storefront / con hero + 6 productos destacados + categorías + testimonials + footer.
- Catálogo /productos con filtros (categoría, precio, search).
- Detalle /productos/[slug] con galería, variantes, "Add to cart" + "Comprar ya".
- Carrito (drawer + página).
- Checkout 3 pasos (dirección, pago, review).
- Thank you / con tracking.

ELEMENTOS DE CAPTURA:
- Pop-up exit-intent en /productos.
- Banner sticky en /productos/[slug] tras 30s sin add-to-cart.
- Inline lead form en thank-you page para upsell.

ESTADOS:
- Cart vacío con CTA "Ver productos".
- Checkout con error de pago.
- Producto sin stock con notify-me CTA.

TOKENS:
- Modo dual.
- Paleta cálida o tech según vertical.
- Iconografía coherente (lucide).

OUTPUT:
- Wireframe navegable.
- Tokens.
- Variants responsive.
- Estados de carga y error explícitos.
```

---

## Cómo extraer tokens de Stitch hacia UI-SPEC.md

Cuando Stitch te da el wireframe aprobado:

1. Exportar tokens (en Stitch: panel "Design Tokens").
2. Pasar al formato del UI-SPEC:
   ```css
   @theme {
     --color-bg-base: oklch(<convertido>);
     --color-fg-primary: oklch(<convertido>);
     ...
   }
   ```
3. Traducir escalas de tipografía a la modular base 1.25.
4. Validar pares de contraste (WCAG AA) con tooling (`contrast-ratio.com` o axe).
5. Documentar en `UI-SPEC.md` y commit.
6. **Solo entonces** pasar a Antigravity / v0 para generación de código.

---

*Stitch es la fase de pre-vibe. No saltearla en proyectos USD 25K — el cliente aprueba un wireframe en 2 días, no después de 3 iteraciones de código.*
