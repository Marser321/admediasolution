# PROJECT

> Visión inmutable del proyecto. Se llena una sola vez al inicio. NO se edita después.
> Si algo cambia fundamentalmente, se versionea (`PROJECT-v2.md`) y se documenta el motivo en `CONTEXT.md`.

---

## Identidad

- **Nombre del proyecto**: <NOMBRE>
- **Cliente**: <CLIENTE / EMPRESA>
- **Sector / industria**: <e.g. salud, e-learning, retail, agencia>
- **Tipo de proyecto**: <A · landing premium / B · corporativo / C · SaaS / D · e-commerce + funnel>
- **Inicio**: <YYYY-MM-DD>
- **Fecha objetivo de entrega**: <YYYY-MM-DD>
- **Ticket / honorarios**: <USD>

---

## Visión en una frase

> <Máximo 25 palabras. Si no entra, todavía no está claro.>

Ejemplo: *"Plataforma de cursos online de yoga con suscripción mensual, área de miembro, comunidad y pagos LATAM."*

---

## Audiencia objetivo

- **Persona primaria**: <descripción demográfica + psicográfica>
- **Persona secundaria** (si aplica): <descripción>
- **Mercados**: <Uruguay / LATAM / global>
- **Idiomas**: <es / en / pt>
- **Dispositivo dominante**: <mobile-first / desktop-first / mixto>

---

## Promesa de valor

- **Qué resuelve**:
- **Para quién**:
- **Por qué importa ahora**:
- **Diferencial frente a alternativas**:

---

## Entregables del scope V1

- [ ] <Entregable concreto 1, e.g. "Landing pública con 5 secciones">
- [ ] <Entregable concreto 2, e.g. "Sistema de signup + login con email + Google">
- [ ] <Entregable concreto 3>

Lo que **NO** está en el scope V1 (explícito):

- <feature que se deja para V2>

---

## Restricciones técnicas duras

- **Stack obligado por el cliente**: <ninguno / Next.js / WordPress migration / etc.>
- **Hosting obligado**: <Vercel / Netlify / VPS propio del cliente>
- **Compliance**: <GDPR / HIPAA / PCI-DSS / ninguno>
- **Compatibilidad navegadores**: <últimos 2 evergreen / IE11 también — dios no quiera>

---

## Stakeholders y roles

| Persona              | Rol                       | Contacto / canal     |
|----------------------|---------------------------|----------------------|
| <nombre>             | Decision maker cliente    | <email / WhatsApp>   |
| <nombre>             | PM / arquitecto agencia   | <email>              |
| <nombre>             | Desarrollador             | <email>              |

---

## Estructura de archivos GSD

Este `PROJECT.md` se acompaña de los siguientes archivos en `/docs/`:

- `REQUIREMENTS.md` — requisitos atómicos REQ-NNN
- `ROADMAP.md` — fases de entrega
- `STATE.md` — bitácora viva (se edita constantemente)
- `CONTEXT.md` — decisiones D-NN (se acumula)
- `PLAN.md` — plan de la fase activa (XML)
- `UI-SPEC.md` — contrato visual
- `VALIDATION.md` — gestionado por la skill auditora

---

*Generado por la skill `rpiv-gate` · fase R · NO editar a mano salvo correcciones de tipeo.*
