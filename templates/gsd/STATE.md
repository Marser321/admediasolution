# STATE

> Bitácora viva del proyecto. Es la **memoria persistente** que el agente lee al inicio de cada sesión.
> Append-only. Nunca borrar entradas históricas; tachá con `~~strikethrough~~` si necesitás retractar.

---

## Current focus
<!-- Una línea: dónde estás parado AHORA. Se actualiza al inicio y al fin de cada sesión. -->

Fase <N> · Slice <S-X.Y> · <descripción breve>

---

## Open issues

<issue id="ISS-01" status="open" since="YYYY-MM-DD">
**Resumen**: Sentry no captura errores de Server Actions en Next 15.
**Impacto**: REQ-050 en riesgo.
**Próximo paso**: probar `Sentry.captureException` manual; investigar @sentry/nextjs version.
**Owner**: <Mario>
</issue>

<issue id="ISS-02" status="open" since="YYYY-MM-DD">
**Resumen**: <descripción>
**Impacto**: <referencia REQ o slice>
**Próximo paso**: <acción concreta>
</issue>

---

## Session log

### 2026-MM-DD HH:MM — sesión <descriptor>

- [done] S-1.1: signup email + verify activo en staging
- [done] CONTEXT.md actualizado con D-04 (Better Auth confirmado)
- [pending] S-1.2: middleware + redirect post-login
- [issue ISS-01] abierto durante prueba de captureException
- artefactos:
  - screenshots/signup-flow-{1,2,3,4}.png
  - logs/playwright-signup-2026-MM-DD.log

### 2026-MM-DD HH:MM — sesión <descriptor>

- [done] ...
- [pending] ...

---

## Next

<!-- Lo que arranca la próxima sesión. Bullet de máximo 3 líneas. -->

1. Implementar S-1.2 con `rpiv-gate`. Verificar que ISS-01 no bloquea.
2. Si ISS-01 sigue abierto, abrir sub-tarea de investigación.
3. Antes de pasar a Fase 2, refrescar `/clear` y validar exit criteria de Fase 1.

---

## Decisions index (resumen — autoridad sigue en CONTEXT.md)

- D-01: Stack Next.js 15 + Tailwind v4 + Drizzle + Postgres (Neon)
- D-02: Auth con Better Auth + organizations plugin
- D-03: Pagos primarios Stripe, secundarios Mercado Pago para LATAM
- D-04: i18n con paraglide
- D-05: ...

---

## Telemetría rápida

- Slices cerrados: <X / total>
- Lighthouse Perf mobile (último deploy): <score>
- Lighthouse A11y (último deploy): <score>
- Errores Sentry últimos 7 días: <count>
- Cobertura tests E2E flows críticos: <% o lista>

---

*Sintetizar STATE.md no es opcional. Es la diferencia entre "el agente recuerda" y "el agente alucina".*
