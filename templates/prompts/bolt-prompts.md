# Prompts para Bolt.new

> Bolt es full-stack instantáneo: te genera frontend + backend + DB en minutos. Excelente para SaaS MVPs y demos de cliente.

---

## Plantilla maestra

```
Stack obligado:
- Next.js 15 (App Router) + Tailwind CSS v4 + shadcn/ui.
- Better Auth para auth.
- Drizzle ORM + Postgres (Neon).
- Stripe para pagos.
- TanStack Query para data fetching cliente.
- zod para validación.

Reglas:
- TypeScript estricto (sin any).
- Cero estilos inline ni hex hardcoded.
- Componentes < 200 líneas.
- HTML semántico, focus-visible, aria correcta.
- prefers-reduced-motion respetado.

Estructura del repo:
src/
├── app/
├── components/ (UI presentacional)
├── components/ui/ (shadcn copiados)
├── lib/ (auth, db, stripe, services)
├── hooks/
├── stores/ (Zustand)
└── styles/

Mover decisiones grandes a /docs/CONTEXT.md como D-01, D-02, etc.
```

---

## 1 · MVP de SaaS de cursos online

```
Construime un MVP de plataforma de cursos online.

FEATURES V1:
- Landing pública con pricing.
- Signup/login (email + Google) con Better Auth.
- Dashboard de alumno con: cursos comprados, progreso, certificados.
- Detalle de curso con video player, lista de lecciones, marca como completada.
- Admin panel: alta de cursos, lecciones, gestión de alumnos.
- Pagos con Stripe Checkout (suscripción mensual + compra one-time por curso).

DATA:
- users, organizations (single tenant V1), courses, lessons, enrollments, lesson_progress, payments.

PÁGINAS:
- / (landing)
- /sign-in, /sign-up
- /dashboard (alumno)
- /courses/[slug]
- /lessons/[id]
- /admin (panel)
- /billing (customer portal)

PRIORIDADES DE IMPLEMENTACIÓN (rebanadas verticales):
S-1: schema + signup/login + dashboard vacío.
S-2: alta de curso desde admin + listado público.
S-3: enrollment + detalle de curso.
S-4: video player + progress tracking.
S-5: pagos Stripe + customer portal.
S-6: emails transaccionales con Resend.
```

---

## 2 · Marketplace de servicios

```
Construime un marketplace donde profesionales (consultores, abogados, terapeutas) ofrecen servicios y clientes los reservan + pagan.

FEATURES V1:
- Búsqueda + filtros de profesionales por categoría, ciudad, idioma.
- Perfil público de profesional con bio, servicios, calendario, reseñas.
- Reserva con elección de slot, notas, pago anticipado (Stripe Connect).
- Dashboard del profesional: agenda, reservas, ingresos.
- Dashboard del cliente: próximas citas, historial, comprobantes.
- Reseñas post-servicio con prompt automático.

DATA:
- users (con role: client|professional|admin), profiles, services, bookings, reviews, payouts.

INTEGRACIONES:
- Stripe Connect (split payment, take fee).
- Calendly-like calendar (interno).
- WhatsApp Cloud API para notificaciones.
- Email Resend.

PRIORIDADES:
S-1: signup con role selection + perfiles base.
S-2: alta de servicios + búsqueda pública.
S-3: calendario del profesional + slots disponibles.
S-4: flujo de reserva con pago Stripe Connect.
S-5: dashboards de cliente y profesional.
S-6: reviews + notificaciones.
```

---

## 3 · Tool interno B2B

```
Construime un tool interno B2B para gestión de inventario.

FEATURES:
- Multi-tenant (organizations).
- Auth con Better Auth (email + Google + 2FA).
- Productos con SKU, stock, ubicación, precio costo, precio venta.
- Movimientos de stock (entrada, salida, transferencia entre depósitos).
- Reportes: stock actual, valor total, rotación, productos por agotar.
- Importación CSV de productos.
- Audit log de movimientos.

DATA (multi-tenant con RLS):
- organizations, memberships, products, warehouses, stock_movements, audit_log.

UI:
- Sidebar dashboard.
- Tablas con filtros, sort, paginación, search.
- Charts (Tremor).
- Modal de movimiento con form + zod.

PRIORIDADES:
S-1: signup + organization + invite.
S-2: CRUD de productos (manual).
S-3: import CSV.
S-4: warehouses + transfer.
S-5: stock movements con audit log.
S-6: reportes + dashboard charts.
```

---

## Cómo aterrizar el output de Bolt

Bolt sale rápido pero a veces sucio. Pipeline obligatoria:

1. Bajar al repo local.
2. Revisar `package.json`: eliminar deps no autorizadas (verificar contra `LIBRARY-CATALOG.md`).
3. Mover decisiones implícitas a `CONTEXT.md`.
4. Reorganizar carpetas si se desviaron de la estructura del arsenal.
5. Aplicar pipeline `stylistic-audit` → `a11y-audit` → `performance-audit`.
6. Setup de `STATE.md` y `ROADMAP.md` post-hoc.
7. CI/CD: agregar Lighthouse CI, axe-core, drizzle migrate check.

---

*Bolt te ahorra 5 días de scaffolding. Las pasadas posteriores te llevan al estándar USD 25K.*
