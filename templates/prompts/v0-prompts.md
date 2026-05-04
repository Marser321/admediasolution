# Prompts para v0 (Vercel)

> v0.dev brilla generando UI premium en React + shadcn + Tailwind. Estos prompts vienen formateados para sacarle la versión USD 25K, no la genérica.

> **Regla universal**: pegale primero el contexto del UI-SPEC (paleta, tipografía, mood) y después el prompt específico.

---

## Plantilla de pre-prompt (siempre arriba)

```
CONTEXTO DEL PROYECTO:
- Tipo: <landing premium / SaaS dashboard / e-commerce>
- Mood: <minimalista, técnico, cálido / lujoso, oscuro, vivido>
- Modo: <light / dark / dual>
- Paleta (oklch tokens):
  --color-bg-base: oklch(99% 0.005 250)
  --color-fg-primary: oklch(20% 0.01 250)
  --color-accent-primary: oklch(62% 0.18 270)
  --color-accent-hover: oklch(56% 0.18 270)
- Tipografía: Inter Display (headings) + Inter (body), self-hosted.
- Espaciado: escala 4px estricta. Border-radius 8/12/20px.
- Stack: <Next.js 15 + Tailwind v4 + shadcn>.
- Restricciones:
  - Cero hex/rgb hardcoded. Usar variables CSS.
  - Una sola lib de motion (Framer Motion).
  - Cero estilos inline.
  - HTML semántico, focus-visible, alt en imágenes.
  - Componentes < 200 líneas.
```

---

## 1 · Hero de landing premium

```
Generá una sección Hero para una landing premium con estas piezas:

- H1: "<promesa específica de máximo 8 palabras>"
- Subtítulo: "<descripción de máximo 22 palabras: para quién, qué hace, cómo>"
- CTA primario: "Empezar ahora"
- CTA secundario: "Ver demo de 2 minutos"
- Trust bar inmediato debajo del hero: 5 logos de clientes, rating con estrellas y métrica numérica ("Más de 1.247 negocios usándolo").
- Visual: mockup 3D de la app sobre un fondo con beam animado sutil (Aceternity-style), respeto a prefers-reduced-motion.
- Fondo: gradient suave usando los tokens de paleta.

Requisitos técnicos:
- Server Component cuando posible; el beam debe ser Client.
- Import de Framer Motion para reveal stagger del headline → subtítulo → CTA.
- next/image priority para el mockup.
- Sin Third-party scripts.
- A11y: aria-labelledby en la sección, focus-visible en CTAs.
```

---

## 2 · Sección de Pricing (3 planes)

```
Sección Pricing con 3 planes:

- Plan 1: "Free" - $0/mes - features básicas, listadas en bullets con check-icon (lucide).
- Plan 2: "Pro" - $29/mes anual / $39/mes mensual - DESTACADO con badge "Más elegido" y borde acento.
- Plan 3: "Business" - $79/mes anual / $99/mes mensual - todas las features Pro + soporte premium.

Toggle anual/mensual arriba de la grilla con switch shadcn. Mostrar el descuento ("ahorrá 20% con anual") como pill al lado.

CTAs: "Empezar gratis" en Free, "Suscribirme" en Pro, "Hablar con ventas" en Business.

Below: FAQ contextual de 4 preguntas sobre pricing (accordion shadcn).

Requisitos:
- Mobile: 1 columna, plan destacado primero.
- Tablet: 2 columnas.
- Desktop: 3 columnas, plan central destacado con escala visual leve.
- Datos mockeables como prop `plans`.
- Cero magic numbers.
```

---

## 3 · Dashboard SaaS — Sidebar + Topbar + Layout

```
Layout de dashboard SaaS con:

- Sidebar fijo izquierdo, 240px desktop, collapsible a 64px (icon-only).
- Topbar 64px con logo, search command palette (cmdk), avatar+dropdown.
- Main area con max-width 1400px, padding 32px.
- Mobile: sidebar colapsado por defecto, drawer al tocar el menú.
- Sidebar items: Home, Projects, Team, Billing, Settings (lucide icons).
- Indicador de plan actual en sidebar bottom (badge + link a /billing).
- Toggle dark/light en topbar.

Requisitos:
- Tailwind v4, tokens del UI-SPEC.
- Estado de "sidebar collapsed" en Zustand store dedicado.
- Active route highlighted con aria-current="page".
- Keyboard nav completa (Tab, focus visible, Esc cierra dropdowns).
- shadcn primitives.
```

---

## 4 · Form de signup con validación zod

```
Generá un componente SignUpForm con:

- Campos: nombre, email, password, confirm password.
- Validación zod inline:
  - nombre: 2-80 chars.
  - email: formato válido + minúsculas.
  - password: 8 chars min, al menos 1 mayúscula y 1 número.
  - confirmPassword: debe coincidir.
- react-hook-form con zodResolver.
- Botón "Crear cuenta" con loading state (icon spinner).
- Botón secundario "Continuar con Google" arriba del divider "o".
- Microcopy debajo del submit: "Al registrarte aceptás los Términos y Privacidad" (links).
- Errores inline aria-describedby; resumen arriba si > 2 errores.

Requisitos:
- Client Component.
- Cero estilos inline.
- shadcn Input, Button, Label.
- A11y completa (autocomplete attributes, aria-invalid, focus-visible).
```

---

## 5 · Card de testimonio con foto

```
Componente TestimonialCard con:

- Foto del cliente, circular 56px, con border subtle.
- Nombre completo en h3 medium weight.
- Rol + empresa en text-sm muted.
- Quote en text-base con line-height loose.
- Icono de quote sutil arriba del texto (lucide Quote).
- Logo de la empresa abajo, max-h 24px, muted opacity 0.6 hover 1.

Variants: "compact" (sin foto, solo iniciales en avatar circle) y "expanded" (con foto).

Requisitos:
- Server Component.
- Foto optimizada con next/image.
- alt text generado desde nombre.
```

---

## 6 · Newsletter / Lead capture inline

```
Componente LeadCapture inline para final de blog post:

- Heading: "Recibí estas guías directo en tu inbox"
- Subtitle corto motivacional.
- Input email + botón "Suscribirme" en línea (stacked en mobile).
- Microcopy: "Sin spam. Cancelás cuando quieras."
- Estado de éxito: badge verde + "✓ Listo. Revisá tu inbox." reemplaza el form.
- Estado de error: inline message + retry.

Requisitos:
- zod + react-hook-form.
- POST a /api/newsletter, integrado con GHL o Resend según prop `provider`.
- aria-live="polite" en estado success/error.
- Cero animaciones excesivas (entrada con fade simple).
```

---

## 7 · Sección "How it works" con stagger reveal

```
Sección "Cómo funciona" con 4 pasos en grid:

- Cada paso: número grande (1, 2, 3, 4) en font-display, título corto, descripción 1-2 líneas.
- Conexión visual entre pasos: línea sutil (svg) que aparece al hacer scroll.
- Reveal on scroll con stagger: cada paso aparece 100ms después del anterior.
- Mobile: stack vertical, conexión vertical.
- Desktop: 4 columnas, conexión horizontal.

Requisitos:
- Framer Motion con whileInView, viewport { once: true }.
- Respeto a prefers-reduced-motion.
- duration 250ms, ease del UI-SPEC.
```

---

## 8 · Footer corporativo

```
Footer con:

- Grid: 4 columnas desktop, 2 mobile, 1 small mobile.
- Cols: Producto / Compañía / Recursos / Legal.
- Cada col con title + 4-6 links.
- Newsletter signup en col separada o full-width.
- Logo arriba.
- Bottom bar: copyright + redes sociales (lucide icons) + idioma toggle.
- Background sutil gradient o solid bg-elevated.
- Espaciado generoso (--space-16 vertical).

Requisitos:
- Server Component.
- Links con aria-label si tienen solo ícono.
- Hover states sutiles.
```

---

## Cómo iterar después de v0

Cuando v0 te da el primer cut:

1. Bajalo al repo (`v0 add <component>` o copy-paste).
2. Activá `stylistic-audit` skill: reemplazar hex sueltos, line-heights mal, deps no autorizadas.
3. Activá `a11y-audit`: verificar focus, aria, contraste.
4. Activá `performance-audit`: lazy-load, image opt, bundle.
5. Activá `motion-polish`: ajustar duraciones, reduced-motion.
6. Recién entonces commit como rebanada vertical cerrada.

---

*Si v0 sale con algo "casi listo pero…", la pipeline cierra el casi.*
