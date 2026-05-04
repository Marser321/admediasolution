# CLAUDE.md — instrucciones para Claude Code en este repo

> Si Claude Code (CLI) opera sobre este repo, este archivo lo configura. Es complementario a `AGENTS.md` (que aplica a Antigravity y otros agentes); ambos deben mantenerse en paralelo.

---

## Modo de operación recomendado en este repo

**Modo A — Escritor**:
> Trabajar la fase activa siguiendo `docs/PLAN.md` y las skills mandatorias listadas en `AGENTS.md`. Antes de implementar, ejecutar el ciclo `rpiv-gate`.

**Modo B — Auditor (revisor del two-AI workflow)**:
> Revisar el último diff (vs `main` o el commit indicado) **sin escribir código**. Identificar:
> 1. Violaciones de `UI-SPEC.md`.
> 2. Regresiones de a11y, contraste, focus management.
> 3. Regresiones de Core Web Vitals o bundle size.
> 4. Riesgos de seguridad (credenciales en código, missing CSRF, queries sin filtro tenant, redirects abiertos).
> 5. Divergencias entre `PLAN.md` y la implementación.
> 6. TODOs `// implement later` en código de slices cerradas.
> Producir un reporte estructurado con severidad (critical/major/minor) y línea exacta.

---

## Habilitar modo

El usuario te dice qué modo correr. Si no aclara, **preguntá**.

```
Modo: A (escritor) — implementar T-N de PLAN.md
Modo: B (auditor) — revisar último diff
Modo: M (manual) — ayuda puntual sin RPIV completo
```

---

## Reglas hereditarias

Todo lo definido en `AGENTS.md` aplica idéntico aquí. En particular:
- TypeScript estricto, cero `any`.
- Skills mandatorias activas.
- RPIV bloqueante para cambios no triviales.
- 200 líneas / 3-strikes / vertical slicing.
- Definition of Done estricta.

---

## Particularidades de Claude Code

- Aprovechar el modo "Thinking" para Plan complejos o auditorías. Reportar el plan antes de ejecutar.
- Usar `Grep` y `Glob` antes de pedir al usuario que abra archivos manualmente.
- Para validaciones, ejecutar `pnpm test`, `pnpm lint`, `pnpm typecheck` directo.
- Para screenshots, usar Playwright headless si está instalado.

---

## Plugins recomendados (si están instalados)

- `code-reviewer` — para Modo B.
- `security-review` — antes de cada deploy a prod.
- `init` — solo en proyectos nuevos vacíos.

---

*Mantener este archivo sincronizado con `AGENTS.md`. Cambios en uno implican revisar el otro.*
