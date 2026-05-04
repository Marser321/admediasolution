# REQUIREMENTS

> Requisitos funcionales atómicos rastreables. Cada uno con identificador único `REQ-NNN`.
> **Atómico** = no se puede partir más sin perder sentido. Si una entrada empieza con "el sistema permite gestionar X", no es atómico.

---

## Convenciones

- **Estado**:
  - `MUST` — V1 obligatorio. Si falla, no se entrega.
  - `SHOULD` — V1 deseable. Negociable si time/budget aprietan.
  - `COULD` — V2 o backlog.
  - `WONT` — explícitamente fuera de scope.
- **Cobertura**: rastreado contra `PLAN.md` y `VALIDATION.md`.
- Cada requisito debe poder validarse con un test, screenshot o verificación humana concreta.

---

## REQ por dominio

### Auth & cuentas

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-001  | MUST   | Usuario puede registrarse con email + password (con verificación email)      | Flow E2E + email recibido                 |
| REQ-002  | MUST   | Usuario puede registrarse con Google                                          | OAuth roundtrip exitoso                   |
| REQ-003  | SHOULD | Usuario puede registrarse con magic link                                      | Click en link recibido completa session   |
| REQ-004  | MUST   | Usuario puede recuperar password                                              | Email + reset flow                        |
| REQ-005  | MUST   | Sesión se cierra tras 30 días de inactividad                                  | Cookie expiry verificado                  |

### Pagos / billing

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-010  | MUST   | Usuario puede suscribirse al plan mensual con tarjeta                         | Stripe test card → suscripción activa     |
| REQ-011  | MUST   | Usuario puede pagar con Mercado Pago (LATAM)                                  | MP sandbox → suscripción activa           |
| REQ-012  | MUST   | Webhook de Stripe activa el plan en DB de forma idempotente                   | Doble webhook → un solo cambio            |
| REQ-013  | SHOULD | Usuario puede cancelar suscripción desde el portal                            | Click → suscripción cancelada al fin del periodo |

### UI / UX

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-020  | MUST   | Sitio responde correctamente desde 320px hasta 1920px                          | Manual test 4 breakpoints                 |
| REQ-021  | MUST   | Lighthouse Performance ≥ 90 mobile en home                                     | Lighthouse CI                             |
| REQ-022  | MUST   | Lighthouse A11y ≥ 95 en todas las páginas públicas                             | axe-core + Lighthouse                     |
| REQ-023  | MUST   | i18n con fallback a español                                                    | Cambio de idioma sin reload errores       |

### Contenido / SEO

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-030  | MUST   | Sitemap.xml generado dinámicamente desde el CMS                                | Verificar /sitemap.xml                    |
| REQ-031  | MUST   | Cada página tiene OpenGraph + JSON-LD                                          | Inspector de OG tags                      |
| REQ-032  | SHOULD | Blog con paginación y RSS                                                      | /blog y /rss.xml                          |

### Integraciones

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-040  | MUST   | Form de contacto envía email vía Resend                                        | Email recibido en cuenta de prueba        |
| REQ-041  | MUST   | Lead form crea contact en GHL con tag `lead-v1`                                | Verificar contact en sub-account GHL      |
| REQ-042  | SHOULD | Compra dispara workflow `post_purchase` en GHL                                 | Workflow ejecutado con contact correcto   |

### Operación / observabilidad

| ID       | Estado | Descripción                                                                  | Verificación                              |
|----------|--------|------------------------------------------------------------------------------|-------------------------------------------|
| REQ-050  | MUST   | Errores 5xx capturados en Sentry con contexto                                  | Forzar error → ver en Sentry dashboard    |
| REQ-051  | MUST   | Eventos de funnel tracked en PostHog                                           | Disparar event → ver en PostHog           |
| REQ-052  | SHOULD | Health endpoint `/api/health` que valida DB + GHL                              | curl con 200 OK + body correcto           |

---

## Backlog explícito (V2)

- <REQ-100 que se mueve a V2>
- <REQ-101 idem>

---

*La autoridad de scope vive aquí. Si algo no está documentado en este archivo, NO está en el contrato.*
