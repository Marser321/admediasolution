# ROADMAP

> Mapeo de requisitos a fases de entrega. Cada fase es un milestone con criterios de aceptación claros.

---

## Convenciones

- Cada fase tiene un estado: `pending` / `in_progress` / `done` / `blocked`.
- Cada fase referencia los `REQ-NNN` que cierra.
- Cada fase tiene `entry_criteria` (qué debe estar listo antes) y `exit_criteria` (qué se entrega).

---

## Fase 0 — Discovery & Foundation
**Estado**: pending
**Cubre**: estructura del proyecto + UI-SPEC + decisiones arquitectónicas
**Entry criteria**:
- PROJECT.md completo
- REQUIREMENTS.md V1 firmado por cliente

**Exit criteria**:
- UI-SPEC.md aprobado
- CONTEXT.md con D-01..D-05 (stack, hosting, DB, auth, idioma)
- Repo inicializado con templates del arsenal
- CI/CD básico funcionando (PR → preview deploy)

---

## Fase 1 — <Nombre del milestone>
**Estado**: pending
**REQs cubiertos**: REQ-001, REQ-002, REQ-004, REQ-005, REQ-020
**Duración estimada**: <X días>
**Entry criteria**:
- Fase 0 done
- Schemas DB aprobados

**Exit criteria**:
- Auth completa funcionando en staging
- Tests E2E del flow de signup
- Lighthouse mobile ≥ 90 en /sign-in y /sign-up
- VALIDATION.md actualizado con coverage

**Slices verticales**:
- S-1.1 Signup email + verify
- S-1.2 Login + middleware
- S-1.3 OAuth Google
- S-1.4 Forgot/reset password

---

## Fase 2 — <Nombre>
**Estado**: pending
**REQs cubiertos**: REQ-010, REQ-011, REQ-012, REQ-013
**Duración estimada**: <X días>
**Entry criteria**: Fase 1 done
**Exit criteria**:
- Stripe + MP funcionando con webhooks idempotentes
- Tests E2E de compra completa con tarjeta de prueba
- Customer portal accesible

**Slices verticales**:
- S-2.1 Pricing page + plan selector
- S-2.2 Checkout Stripe
- S-2.3 Webhook handler + plan sync DB
- S-2.4 Checkout Mercado Pago (rama LATAM)
- S-2.5 Customer portal + cancellation

---

## Fase 3 — <Nombre>
**Estado**: pending
**REQs cubiertos**: <lista>
**...**

---

## Fase N — Hardening + Go-live
**Estado**: pending
**Entry criteria**: todas las fases anteriores done
**Exit criteria**:
- Pre-deploy checklist 100% verde (`checklists/pre-deploy-checklist.md`)
- 25K quality bar 100% verde (`checklists/25k-quality-bar.md`)
- Security baseline aprobado
- Documentación de operación entregada al cliente
- Capacitación a editores del CMS (si aplica)
- DNS cutover y monitoreo activo 72h post-launch

---

## Tracking de fases

| Fase | Estado        | Inicio       | Entrega prevista | Entrega real |
|------|---------------|--------------|------------------|--------------|
| 0    | pending       | -            | -                | -            |
| 1    | pending       | -            | -                | -            |
| 2    | pending       | -            | -                | -            |
| 3    | pending       | -            | -                | -            |
| N    | pending       | -            | -                | -            |

---

*Update tras cada cierre de fase. La fila se cierra solo cuando exit_criteria está 100%.*
