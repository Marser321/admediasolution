# AGENTS.md — contrato de los agentes para este proyecto

> Este archivo es leído por **Google Antigravity** (y por Claude Code, ChatGPT, Cursor) al iniciar cualquier sesión sobre este repositorio. Es el **manual del empleado**: decisiones inmutables, restricciones, y protocolos.

---

## 0 · Identidad del proyecto

- **Stack**: <ver `docs/CONTEXT.md` D-01>
- **Tipo**: <A landing / B corporativo / C SaaS / D e-commerce>
- **Estado**: <fase activa>

Antes de cualquier acción, **leer en orden**: `docs/STATE.md` → `docs/CONTEXT.md` → fase activa de `docs/PLAN.md` → `docs/UI-SPEC.md` (si la tarea es visual).

---

## 1 · Skills mandatorias

Activar siempre:
- `00-router` (al inicio de sesión nueva)
- `context-hygiene`
- `rpiv-gate`
- `vertical-slicer`
- `stylistic-audit`, `a11y-audit`, `performance-audit`

Activar según tipo:
- A: `landing-premium`, `motion-polish`
- B: `corporate-site`, `motion-polish`
- C: `saas-auth-stack`
- D: `ecommerce-funnel`, `ghl-bridge`

---

## 2 · Reglas duras del repo

### Lenguaje
- TypeScript estricto. Cero `any`. Cero `@ts-ignore`. Si necesitás `any`, **frená y discutí**.
- Sin `console.log` en main; usar `lib/log.ts` (pino o equivalente) y Sentry para errores.
- Imports absolutos vía `@/...`. Sin imports relativos `../../../`.

### Estilo
- Tailwind v4 + tokens del `UI-SPEC.md`. Cero hex/rgb hardcoded. Cero `text-[14.5px]`, `mt-[13px]`.
- Componentes < 200 líneas; si excede, descomponer.
- shadcn/ui copiados a `components/ui/`. **Prohibido** Material UI, Chakra, Bootstrap.
- Una sola librería de motion por componente (Framer Motion default).

### Estado y data
- Estado UI compartido → Zustand store dedicado.
- Data remoto → TanStack Query o RSC.
- URL state → `nuqs`.
- Validación → `zod`.
- **Nada de `useEffect` para fetching** salvo edge case.

### DB y persistencia
- Drizzle ORM, schemas en `db/schema.ts`. Migraciones en `db/migrations/` versionadas.
- **Prohibido** alterar schema sin generar migración.
- RLS en todas las tablas multi-tenant.
- UUIDs como PK por defecto.

### Auth y seguridad
- Cookies httpOnly + secure + sameSite=lax.
- **Nunca** tokens en localStorage.
- Variables de entorno: `.env.local` (gitignored), `.env.example` con keys vacías.
- Cero credenciales en código (validado en CI con `gitleaks` o equivalente).
- CSP estricto via middleware. CSRF en mutaciones.

### Performance
- `<img>` directo prohibido — `next/image` o `astro:assets`.
- Fonts self-hosted (`next/font` o Fontsource).
- Bundle JS inicial ≤ 180kb gzip mobile.
- Lighthouse Perf mobile ≥ 90, Desktop ≥ 95.

### A11y
- HTML semántico antes que ARIA.
- `:focus-visible` en cada interactivo.
- Lighthouse A11y ≥ 95.
- axe-core en CI; cero `serious`/`critical`.

### Git
- Conventional commits: `feat(auth): T-1 users table with RLS`.
- Una rebanada vertical = un commit (idealmente) o un PR.
- Branch por feature: `feat/<slice-id>-<descripción>`.

---

## 3 · Do NOT (categórico)

- ❌ Instalar dependencias sin aprobación humana explícita.
- ❌ Modificar `package.json`, `tsconfig.json`, `tailwind.config.*` sin OK.
- ❌ Usar `any`, `@ts-ignore`, `// @ts-nocheck`.
- ❌ Hardcodear claves, tokens, IDs sensibles.
- ❌ Tocar archivos de migrations existentes (solo crear nuevas).
- ❌ Hacer side effects en webhook handlers sin idempotency.
- ❌ Usar `localStorage` para datos sensibles o tokens.
- ❌ Mezclar Server y Client Components sin razón clara.
- ❌ Reemplazar shadcn/ui por otra librería sin discutir.
- ❌ Generar > 200 líneas en una sola tarea sin refragmentar.
- ❌ Saltarse las pasadas de `vibe-design-pipeline`.
- ❌ Marcar una fase como `done` sin pasar `VALIDATION.md` en verde.

---

## 4 · Protocolo de iteración (RPIV)

Para cualquier cambio no trivial:

1. **R · Research**: leer estado, decisiones, referencias. Reformular en lenguaje llano.
2. **P · Plan**: producir bloque XML en `PLAN.md` con decisions referenced.
3. **I · Implement**: una tarea T-N por iteración; ≤ 200 líneas; commit atómico.
4. **V · Validate**: ejecutar verification declarada; capturar screenshot/log/test.

Si fallás 3 veces sobre la misma tarea: **frenar**, marcar como `blocked`, escalar al humano.

---

## 5 · Higiene de contexto

- `/clear` cada ~10 mensajes o entre tareas funcionalmente distintas.
- Una sesión = una entidad funcional (auth, billing, hero, etc.).
- Sintetizar STATE.md al cerrar sesión.
- Si el agente se repite o alucina, abrir sesión nueva y rehidratarse desde `STATE.md` y `CONTEXT.md`.

---

## 6 · Two-AI workflow recomendado

- **Escritor**: Antigravity en este workspace (default), o v0/Lovable/Bolt para UI marketing.
- **Revisor**: instancia separada de Claude Code o Antigravity con prompt de auditor:
  > "Revisar el último diff. Buscar: violaciones de UI-SPEC, regresiones de a11y, regresiones de perf, riesgos de seguridad, divergencias de PLAN.md."

---

## 7 · Definition of Done

Una rebanada vertical (S-X.Y) está `done` cuando:

- [ ] Builds verde (`pnpm build` sin warnings nuevos).
- [ ] TypeScript strict pasa (`pnpm typecheck`).
- [ ] Lint y format limpio (`pnpm lint`, `pnpm format:check`).
- [ ] Tests E2E del flow tocado pasan.
- [ ] Lighthouse del flow tocado dentro del budget.
- [ ] axe-core 0 critical/serious.
- [ ] Commit atómico con mensaje convencional.
- [ ] STATE.md actualizado con artefacto (screenshot, log, etc.).
- [ ] PLAN.md tarea T-N marcada `<status>done</status>`.

---

*Si el agente viola cualquier regla de este archivo, el humano lo frena, lo notifica, y la regla se endurece para impedir reincidencia.*
