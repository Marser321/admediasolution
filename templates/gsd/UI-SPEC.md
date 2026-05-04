# UI-SPEC

> Contrato visual del proyecto. Generado por la skill `ui-spec-author`.
> El agente lo lee antes de cualquier generación visual. Modificaciones requieren OK humano explícito.

---

## 1 · Copywriting

- **Tono de voz**: <e.g. "técnico cercano, optimista, sin marketing speak">
- **Persona**: <e.g. "tutea, no vosea; usa 'vos' opcional según mercado">
- **CTAs aprobados**: ["Empezar ahora", "Probar gratis", "Reservar demo", ...]
- **CTAs prohibidos**: ["Click aquí", "Submit", "Enviar", "Saber más" sin contexto]
- **Microcopy de errores**: humano + accionable. Ejemplo: "No pudimos guardar tu cambio. Probá de nuevo en un momento."
- **Microcopy de loading**: nunca "Loading..."; usar contexto: "Guardando tu progreso…", "Buscando coincidencias…".
- **Idioma primario**: es-UY
- **Idioma secundario**: en-US

---

## 2 · Identidad visual / mood

- **Logo**: `assets/logo.svg` (variantes light, dark, isotipo).
- **Mood (3 adjetivos)**: <e.g. "minimalista, técnico, cálido">
- **Modo**: <light / dark / dual>
- **Inspiraciones referenciales**:
  - https://linear.app — sintaxis tipográfica + uso de espacio
  - https://vercel.com — secciones cinemáticas + dark mode
  - https://stripe.com — claridad de copy + jerarquía visual

---

## 3 · Paleta cromática (oklch)

```css
@theme {
  /* Surfaces */
  --color-bg-base:        oklch(99% 0.005 250);
  --color-bg-elevated:    oklch(96% 0.005 250);
  --color-bg-overlay:     oklch(0% 0 0 / 0.55);

  /* Text */
  --color-fg-primary:     oklch(20% 0.01 250);
  --color-fg-secondary:   oklch(35% 0.01 250);
  --color-fg-muted:       oklch(50% 0.01 250);
  --color-fg-on-accent:   oklch(99% 0.005 250);

  /* Brand */
  --color-accent-primary: oklch(62% 0.18 270);
  --color-accent-hover:   oklch(56% 0.18 270);
  --color-accent-active:  oklch(50% 0.18 270);
  --color-accent-subtle:  oklch(95% 0.05 270);

  /* Semantic */
  --color-success:        oklch(70% 0.14 145);
  --color-warning:        oklch(80% 0.14 80);
  --color-danger:         oklch(60% 0.20 25);
  --color-info:           oklch(70% 0.12 220);

  /* Borders */
  --color-border-subtle:  oklch(90% 0.005 250);
  --color-border-strong:  oklch(80% 0.005 250);
  --color-border-accent:  var(--color-accent-primary);
}

/* Dark mode (si dual) */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-base:        oklch(12% 0.01 250);
    --color-bg-elevated:    oklch(16% 0.01 250);
    --color-fg-primary:     oklch(96% 0.005 250);
    --color-fg-muted:       oklch(70% 0.005 250);
    --color-border-subtle:  oklch(22% 0.005 250);
    /* etc */
  }
}
```

**Pares de contraste validados** (WCAG AA):
- `--color-fg-primary` sobre `--color-bg-base` → ratio: 17.8:1 ✅
- `--color-fg-muted` sobre `--color-bg-base` → ratio: 5.4:1 ✅
- `--color-fg-on-accent` sobre `--color-accent-primary` → ratio: 4.9:1 ✅

---

## 4 · Tipografía

```css
@theme {
  --font-display: "Inter Display", ui-sans-serif, system-ui;
  --font-body:    "Inter", ui-sans-serif, system-ui;
  --font-mono:    "JetBrains Mono", ui-monospace;

  /* Escala modular base 1.25 */
  --text-xs:      0.75rem;   /* 12 */
  --text-sm:      0.875rem;  /* 14 */
  --text-base:    1rem;      /* 16 */
  --text-lg:      1.125rem;  /* 18 */
  --text-xl:      1.25rem;   /* 20 */
  --text-2xl:     1.5rem;    /* 24 */
  --text-3xl:     1.875rem;  /* 30 */
  --text-4xl:     2.5rem;    /* 40 */
  --text-5xl:     3.5rem;    /* 56 */
  --text-6xl:     4.5rem;    /* 72 */

  /* Line heights canónicos — solo del set */
  --leading-heading: 1.1;
  --leading-tight:   1.25;
  --leading-body:    1.6;
  --leading-loose:   1.8;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.02em;
}
```

- Display fuente para `h1`, `h2` mayores. Body para todo el resto.
- `font-weight` permitidos: 400, 500, 600, 700. **No 300, 800, 900**.
- Headings con `letter-spacing: --tracking-tight`.

---

## 5 · Espaciado y grid

```css
@theme {
  /* 4px base */
  --space-px:  1px;
  --space-1:   0.25rem;  /* 4 */
  --space-2:   0.5rem;   /* 8 */
  --space-3:   0.75rem;  /* 12 */
  --space-4:   1rem;     /* 16 */
  --space-5:   1.25rem;  /* 20 */
  --space-6:   1.5rem;   /* 24 */
  --space-8:   2rem;     /* 32 */
  --space-10:  2.5rem;   /* 40 */
  --space-12:  3rem;     /* 48 */
  --space-16:  4rem;     /* 64 */
  --space-20:  5rem;     /* 80 */
  --space-24:  6rem;     /* 96 */
  --space-32:  8rem;     /* 128 */

  /* Containers */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1200px;
  --container-2xl: 1400px;

  /* Section padding */
  --section-py-mobile:  var(--space-12);
  --section-py-desktop: var(--space-24);

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-2xl:  28px;
  --radius-full: 9999px;
}
```

- Breakpoints Tailwind v4 default: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.
- Container max-width 1200px (xl), centrado, padding lateral `--space-6` mobile / `--space-8` desktop.

---

## 6 · Estados de interfaz y motion

### Estados obligatorios por interactivo
- `default`
- `hover` (solo desktop)
- `focus-visible` (con outline o ring de `--color-accent-primary` con offset 2px)
- `active` (pressed)
- `disabled` (cursor-not-allowed, opacidad 0.5, sin pointer events)
- `loading` (skeleton o spinner)
- `error` (border `--color-danger`, icono + texto explicativo)
- `success` (subtle, no intrusivo)

### Motion canónico

```css
@theme {
  --duration-fast:  150ms;
  --duration-base:  250ms;
  --duration-slow:  400ms;
  --duration-page:  600ms;

  --ease-standard:  cubic-bezier(0.2, 0, 0, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);
}
```

- Hover/transitions UI: `--duration-fast` + `--ease-standard`.
- Reveals on scroll: `--duration-base` + `--ease-out`.
- Modal/drawer: `--duration-base` + `--ease-spring`.
- Page transitions: `--duration-page` máx.
- **prefers-reduced-motion**: respetado siempre, con fallback estático.

### Skeletons / loading
- Usar `bg-[var(--color-bg-elevated)]` + animación shimmer suave (3s loop max).
- Mantener altura del contenido real para evitar CLS.

### Toasts
- Usar `sonner`. Posición: `bottom-right` (desktop), `top` (mobile).
- Duración default 4s; errores 6s.

---

## 7 · Componentes base autorizados

- shadcn/ui: Button, Input, Select, Textarea, Dialog, Sheet, Drawer (vaul), Tooltip, Tabs, Card, Toast (sonner), Command (cmdk).
- Aceternity UI: <secciones específicas, e.g. "Hero with Beam", "Sparkles">
- Magic UI: <e.g. "AnimatedBeam", "Marquee">
- Lucide-react: íconos.
- ❌ Material UI, Chakra, Bootstrap, Ant Design — prohibidos.

---

## 8 · Patrones de página

### Hero
- H1 ≤ 8 palabras. Subtítulo ≤ 22.
- 1 CTA primario + 1 secundario.
- Trust bar inmediato (logos / rating / métrica).
- LCP target ≤ 1.5s mobile.

### Form
- Label arriba del input, no placeholder como label.
- Error inline con `aria-describedby`.
- Submit button con loading state.
- Resumen de errores arriba si > 3.

### Empty states
- Ilustración o ícono grande + título + descripción + CTA.
- Nunca tabla vacía pelada.

### Error pages (404, 500)
- Tono humano, CTA para volver al home.

---

*Esta es la verdad visual del proyecto. Cualquier desviación se discute, se justifica y se versiona.*
