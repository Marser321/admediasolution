# Stack: Vite + React + Tailwind (SPA)

> Para apps internas, dashboards aislados, o cuando NO necesitás SSR/SSG. Bundle pequeño, control total.

## Quick start

```bash
pnpm create vite@latest <project> -- --template react-ts

cd <project>
pnpm install
pnpm add @tanstack/react-query @tanstack/react-router zustand zod react-hook-form @hookform/resolvers
pnpm add tailwindcss @tailwindcss/vite framer-motion lucide-react sonner
pnpm dlx shadcn@latest init

# auth client-side via API
pnpm add better-auth

# observability client
pnpm add @sentry/react posthog-js

# email solo si tu API la maneja
```

## Estructura

```
src/
├── main.tsx
├── App.tsx
├── routes/             # TanStack Router
├── components/
│   └── ui/
├── lib/
├── stores/
├── hooks/
└── styles/
    └── index.css       # @theme tokens
```

## Vite config

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```

## Cuándo usar este stack

- App interna sin necesidad de SEO.
- Dashboard standalone que consume API existente.
- Demo o herramienta puntual.

## Cuándo NO usar

- Marketing pages (Astro gana).
- SaaS público (Next.js gana por SSR + ISR).
- E-commerce SEO-sensible (Next.js o Astro).

## Skills mandatorias activas

`00-router`, `context-hygiene`, `rpiv-gate`, `vertical-slicer`, `stylistic-audit`, `a11y-audit`, `performance-audit`, `frontend-foundation`.
