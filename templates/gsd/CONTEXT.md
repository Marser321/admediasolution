# CONTEXT

> Decisiones arquitectónicas inmutables. Se acumulan, nunca se borran. Si una decisión cambia, se registra una nueva con un identificador nuevo y la vieja se marca como `superseded by D-NN`.

> Cada decisión debe estar referenciada explícitamente en `PLAN.md` cuando aplica. La skill `rpiv-gate` bloquea planes que omitan decisiones críticas.

---

## Convenciones

- **Identificador**: `D-NN` con NN cero-padded (D-01, D-02, ..., D-99).
- **Fecha**: ISO `YYYY-MM-DD`.
- **Estado**: `active` / `superseded by D-NN`.
- **Tag**: dominio (`stack`, `auth`, `payments`, `ux`, `infra`, `security`, `data`, `i18n`).

---

## Decisiones

<decisions>

- **D-01** (2026-MM-DD, active, tag: stack)
  **Decisión**: usar Next.js 15 (App Router) + Tailwind CSS v4 + shadcn/ui.
  **Por qué**: project_type C (SaaS) requiere RSC + Server Actions; Tailwind v4 es estado del arte; shadcn da control sin lock-in.
  **Implicancias**: prohibido Pages Router; prohibido material-ui o chakra.

- **D-02** (2026-MM-DD, active, tag: auth)
  **Decisión**: usar Better Auth con plugins `organization`, `magicLink`, `passkey`, `twoFactor`.
  **Por qué**: framework-agnostic, multi-tenant nativo, mejor DX que NextAuth en 2026.
  **Implicancias**: prohibido Clerk salvo migración futura; cookies httpOnly + secure obligatorias.

- **D-03** (2026-MM-DD, active, tag: data)
  **Decisión**: Postgres en Neon como DB primaria; Drizzle ORM; UUIDs como PK por defecto.
  **Por qué**: serverless con branching por feature; type-safe; SQL-first.
  **Implicancias**: prohibido Prisma; migrations versionadas en `db/migrations/`; schema reviewed antes de cada PR.

- **D-04** (2026-MM-DD, active, tag: payments)
  **Decisión**: Stripe primario; Mercado Pago para países LATAM (UY, AR, BR, MX, CL, PE).
  **Por qué**: Stripe global; MP cobertura local + métodos de pago locales (Abitab, RedPagos, Pix).
  **Implicancias**: factory pattern en `lib/checkout/`; tests E2E con sandbox de ambos.

- **D-05** (2026-MM-DD, active, tag: i18n)
  **Decisión**: paraglide-astro / paraglide-next; idiomas iniciales `es` (default), `en`.
  **Por qué**: tree-shaking por idioma + type-safety en mensajes.
  **Implicancias**: estructura `/[lang]/...`; hreflang en heads; URL canonical sin trailing slash.

- **D-06** (2026-MM-DD, active, tag: ux)
  **Decisión**: motion library única por componente: Framer Motion default; GSAP solo para timeline complejo (sticky scroll telling).
  **Por qué**: prohibido mezclar; FM cubre 90%, GSAP solo cuando agrega valor.
  **Implicancias**: stylistic-audit valida import único.

- **D-07** (2026-MM-DD, active, tag: infra)
  **Decisión**: Vercel para hosting; Sentry + PostHog observability; Cloudflare como DNS + WAF.
  **Por qué**: DX óptima Next.js; PostHog product analytics + feature flags; Cloudflare protege contra DDoS y bots.
  **Implicancias**: env vars en Vercel + Vercel CLI para staging; Sentry source maps en CI.

- **D-08** (2026-MM-DD, active, tag: security)
  **Decisión**: Security headers via middleware (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
  **Por qué**: baseline obligatorio para cualquier proyecto USD 25K.
  **Implicancias**: CSP estricto, no `unsafe-inline`; nonce inyectado por request en scripts inline.

- **D-09** (2026-MM-DD, active, tag: ux)
  **Decisión**: Cookies de sesión httpOnly, sameSite=lax, secure en prod. localStorage prohibido para tokens.
  **Por qué**: protección XSS.
  **Implicancias**: Better Auth session storage en cookies; cero JWT en localStorage.

- **D-10** (2026-MM-DD, active, tag: data)
  **Decisión**: RLS habilitada en todas las tablas multi-tenant; `SET LOCAL app.org_id` por request.
  **Por qué**: defensa en profundidad; si la app falla en filtrar, la DB no leakea datos cross-tenant.
  **Implicancias**: cada query con scope tenant; testing con dos tenants paralelos en CI.

</decisions>

---

## Decisiones obsoletas (histórico)

<!-- Cuando una D se reemplaza, copiarla aquí con la nota -->

<!-- Ejemplo:
- **D-XX** (2026-MM-DD, superseded by D-YY, tag: stack)
  Decisión original: usar Tailwind v3.
  Motivo del cambio: v4 estable y trae @theme; mejor DX y bundle.
-->

---

*El motor de decisiones del proyecto vive acá. La skill `rpiv-gate` valida que estas decisiones estén referenciadas en cada PLAN.md activo.*
