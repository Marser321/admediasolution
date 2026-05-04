# Stack: Next.js 15 + Tailwind v4 + shadcn

> Stack default para SaaS y e-commerce. Uso: copiar esta carpeta como base y arrancar.

## Quick start

```bash
pnpm dlx create-next-app@latest <project> \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/*"

cd <project>
pnpm add @tanstack/react-query zod react-hook-form @hookform/resolvers zustand nuqs
pnpm add framer-motion lucide-react sonner vaul cmdk
pnpm add drizzle-orm postgres dotenv
pnpm add -D drizzle-kit @types/node @types/react

# shadcn init
pnpm dlx shadcn@latest init

# auth
pnpm add better-auth

# observability
pnpm add @sentry/nextjs posthog-js posthog-node

# email
pnpm add resend @react-email/components

# payments
pnpm add stripe
```

## Estructura de carpetas

```
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/             # shadcn
│   └── <feature>/
├── lib/
│   ├── auth.ts
│   ├── db/
│   ├── stripe/
│   ├── email/
│   ├── ghl/            # opcional
│   └── services/
├── hooks/
├── stores/             # Zustand
└── styles/
    └── globals.css     # @theme tokens
```

## Archivos clave a crear inicialmente

- `src/styles/globals.css` con `@import "tailwindcss";` + `@theme { ... }` (tokens del UI-SPEC).
- `src/lib/db/schema.ts` con tablas iniciales.
- `src/lib/auth.ts` con Better Auth config.
- `src/middleware.ts` con protección de rutas.
- `drizzle.config.ts` con DATABASE_URL.
- `src/instrumentation.ts` para Sentry.

## Variables de entorno mínimas

Ver `.env.example` (a crear con keys vacías):

```
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

## CI/CD recomendado

- GitHub Action: typecheck + lint + test + build + drizzle migrate dry-run + Lighthouse CI sobre preview deploy.
- Vercel: deploy automático con env vars de staging y prod separadas.

## Skills mandatorias activas

`00-router`, `context-hygiene`, `rpiv-gate`, `vertical-slicer`, `stylistic-audit`, `a11y-audit`, `performance-audit`, `motion-polish`, `frontend-foundation`, `saas-auth-stack` o `ecommerce-funnel` según tipo.
