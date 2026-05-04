# Stack: Astro 5 + Tailwind v4 + Sanity (o Velite)

> Stack default para landings premium y sitios corporativos. Performance superior, SEO impecable.

## Quick start

```bash
pnpm create astro@latest <project> -- --template minimal --typescript strict --install --git

cd <project>
pnpm add -D @astrojs/tailwind tailwindcss
pnpm add framer-motion lenis lucide-react

# Para corporativo con Sanity:
pnpm add @sanity/client @sanity/image-url
# O para MDX/blog con Velite:
pnpm add velite

# Si SaaS-light o forms:
pnpm add zod react-hook-form @hookform/resolvers
pnpm add @astrojs/react react react-dom

# i18n:
pnpm add @inlang/paraglide-astro

# Email
pnpm add resend
```

## Estructura

```
src/
├── pages/
│   ├── index.astro
│   ├── pricing.astro
│   ├── productos/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── api/
├── content/             # si Velite/Astro Content
│   ├── config.ts
│   └── posts/
├── sections/            # secciones reutilizables (Hero, Pricing, FAQ)
├── components/
├── layouts/
├── lib/
│   ├── sanity.ts
│   └── analytics.ts
└── styles/
    └── global.css       # @theme tokens
```

## Astro config sugerido

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://example.com",
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap()],
  output: "static",         // o "hybrid" si tenés API endpoints
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  experimental: { contentLayer: true },
});
```

## Performance defaults

- Server Islands solo donde necesitan interactividad.
- `astro:assets` para imágenes; AVIF preferido.
- Fonts via Fontsource self-hosted.
- View Transitions activadas para SPA-like nav.

## Skills mandatorias activas

`00-router`, `context-hygiene`, `rpiv-gate`, `vertical-slicer`, `stylistic-audit`, `a11y-audit`, `performance-audit`, `motion-polish`, `landing-premium` o `corporate-site` según tipo.
