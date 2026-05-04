# VALIDATION

> Mapa entre `REQUIREMENTS.md` y la cobertura real (tests automáticos, validaciones manuales, métricas).
> Gestionado por la skill auditora (Capa Nyquist). El delta entre requerido y cubierto debe ser visible siempre.

---

## Convenciones

- **Cobertura**: `none` / `manual` / `e2e` / `unit` / `integration` / `metric` / `visual`.
- **Estado**: `passing` / `failing` / `pending` / `blocked`.
- Toda fila debe apuntar a un artefacto (test file, screenshot, dashboard URL, log).

---

## Cobertura por requisito

| REQ      | Descripción breve                          | Cobertura      | Artefacto                                                           | Estado    |
|----------|--------------------------------------------|----------------|---------------------------------------------------------------------|-----------|
| REQ-001  | Signup email + verify                      | e2e            | `e2e/auth/signup.spec.ts`                                           | passing   |
| REQ-002  | Signup Google                              | e2e            | `e2e/auth/oauth-google.spec.ts`                                     | passing   |
| REQ-004  | Recuperación de password                   | e2e            | `e2e/auth/reset.spec.ts`                                            | pending   |
| REQ-005  | Sesión expira a 30 días                    | unit           | `lib/auth/session.test.ts`                                          | passing   |
| REQ-010  | Suscripción Stripe                          | e2e            | `e2e/billing/stripe.spec.ts`                                        | passing   |
| REQ-011  | Suscripción Mercado Pago                    | e2e            | `e2e/billing/mp.spec.ts`                                            | failing   |
| REQ-012  | Webhook Stripe idempotente                  | integration    | `tests/integration/stripe-webhook.test.ts`                          | passing   |
| REQ-020  | Responsive 320–1920                        | visual+manual  | `screenshots/responsive/{mobile,tablet,desktop}.png`                | passing   |
| REQ-021  | Lighthouse Perf ≥ 90 mobile                 | metric         | `lighthouse-ci/.lighthouseci/perf-mobile.json`                      | passing   |
| REQ-022  | Lighthouse A11y ≥ 95                        | metric         | `lighthouse-ci/.lighthouseci/a11y.json`                             | passing   |
| REQ-030  | Sitemap.xml dinámico                        | e2e            | `e2e/seo/sitemap.spec.ts`                                           | passing   |
| REQ-040  | Resend form contacto                        | integration    | `tests/integration/resend.test.ts`                                  | passing   |
| REQ-041  | GHL upsert lead                             | integration    | `tests/integration/ghl-leads.test.ts`                               | passing   |
| REQ-050  | Sentry captura 5xx                          | manual         | `validation/sentry-error-test.md`                                   | failing   |
| REQ-051  | PostHog tracks de funnel                    | manual         | `validation/posthog-events.md`                                      | passing   |

---

## Brechas detectadas (gap analysis)

Requisitos `MUST` sin cobertura `e2e` o `integration`:

- REQ-XYZ — sin cobertura. **Acción**: crear test E2E antes de pasar a Fase N+1.

Requisitos con cobertura pero estado `failing`:

- REQ-011 (Mercado Pago) → root cause: webhook IPN llega a 401, falta validación de firma. **Owner**: <Mario>. **ETA**: <fecha>.
- REQ-050 (Sentry 5xx) → ISS-01 abierto en `STATE.md`.

---

## Métricas operativas (snapshot)

```yaml
last_updated: 2026-MM-DD HH:MM
lighthouse:
  perf_mobile_home: 92
  perf_mobile_dashboard: 88   # bajo el budget, investigar
  a11y_avg: 96
  seo_avg: 98
core_web_vitals_p75:
  lcp_ms: 1900
  cls: 0.03
  inp_ms: 180
test_coverage:
  e2e_critical_flows: 8/10    # falta reset-password y subscription-cancel
  unit: 312 tests, 91% pass rate
sentry_last_7d:
  errors_total: 4
  errors_unique: 2
  crash_free_users: 99.6%
```

---

## Exit gates

Para que una fase pase a `done`:

- [ ] Todos los `MUST` de la fase tienen cobertura ≠ `none`.
- [ ] Cero `failing` en requisitos `MUST`.
- [ ] Métricas operativas dentro de budgets.
- [ ] STATE.md actualizado con resumen de la fase.
- [ ] Brechas restantes documentadas con owner + ETA.

---

*La skill auditora corre este archivo como check final antes de marcar una fase done. Si la auditoría encuentra inconsistencia entre REQUIREMENTS, PLAN y VALIDATION, frena la fase.*
