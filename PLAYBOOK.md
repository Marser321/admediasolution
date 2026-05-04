# PLAYBOOK · Cómo construir webs de USD 25K en mínimo tiempo

> El método paso a paso. Si seguís este playbook, llegás a USD 25K. Si te lo saltás, llegás a USD 800.

---

## Filosofía base

Lo que diferencia un sitio de USD 800 de uno de USD 25K **no es** el código (hoy cualquier LLM lo escribe). Es:

1. **El proceso**: discovery riguroso, decisiones documentadas, validación cruzada.
2. **La calidad de las pasadas**: stylistic, a11y, performance, motion-polish.
3. **La integración con sistemas vivos**: CRM, automation, analytics, monitoring.
4. **El cuidado en los detalles**: copy, microcopy, estados de error, motion timing.
5. **La defensa proactiva**: security baseline, validación, idempotency, RLS.

Las herramientas (Antigravity, v0, Lovable) son aceleradores. La disciplina es el multiplicador.

---

## Línea de tiempo modelo (proyecto SaaS USD 25K)

```
Día 0 ──── Discovery + briefing del cliente
Día 1 ──── PROJECT.md + REQUIREMENTS.md firmados (cliente sabe qué pidió)
Día 2 ──── UI-SPEC.md aprobado + wireframe Stitch navegado por cliente
Día 3 ──── Repo inicializado con templates del arsenal + CI/CD
Día 4-7 ── Fase 1: Auth + Onboarding (slices verticales)
Día 8-12 ─ Fase 2: Core domain (lo que el SaaS hace)
Día 13-15 Fase 3: Billing + integraciones
Día 16-17 Fase 4: Hardening + a11y + performance audits
Día 18 ── Pre-deploy checklist + security review
Día 19 ── DNS cutover + monitoreo
Día 20 ── Capacitación + handoff documentado
```

Aprox 20 días hábiles = 4 semanas. Dependiendo del scope, podés bajar a 2 semanas (landing premium) o subir a 5-6 semanas (e-commerce + funnel completo).

---

## Fase 0 · Discovery (1-2 días, no negociable)

### Sesión con cliente (60-90 min)

Preguntas obligatorias:
1. ¿Qué problema concreto resolvemos para tu cliente final?
2. ¿Qué pasa cuando el sitio funciona perfecto? (define el "éxito").
3. ¿Cuál es el escenario donde fracasa? (define el "fail").
4. ¿Qué referencias visuales te enamoran? (3 sitios, qué te gusta de cada uno).
5. ¿Qué referencias odias? (importantísimo).
6. ¿Cuáles son los 3-5 KPIs que vas a medir?
7. ¿Quién va a editar el contenido después? (define el CMS).
8. ¿Qué integraciones existen ya? (Mailchimp, GHL, HubSpot, Google Sheets, etc.).
9. ¿Hay normas de cumplimiento? (GDPR, HIPAA).
10. ¿Cuál es el deadline real, y qué pasa si no llegás?

### Salidas
- `PROJECT.md` (visión inmutable)
- `REQUIREMENTS.md` (REQ-001..N, con estados MUST/SHOULD/COULD/WONT)
- `ROADMAP.md` (fases y milestones)
- 5-10 decisiones arquitectónicas iniciales en `CONTEXT.md`

### Skills activas en esta fase
`rpiv-gate` (modo Research), `00-router`, `context-hygiene`.

---

## Fase 0.5 · UI-SPEC + wireframes (1-2 días)

### Pasos
1. Activar skill `ui-spec-author` con el manual de marca / referencias del cliente.
2. Generar `UI-SPEC.md` con los 6 pilares.
3. Generar wireframes navegables en **Google Stitch** o v0 (prompts en `templates/prompts/`).
4. Aprobación del cliente sobre wireframes + tokens (no código todavía).
5. Iterar hasta cliente firma.

### Por qué este paso es no-negociable
- Si el cliente cambia de opinión sobre el mood DESPUÉS de tener código, son 5 días perdidos.
- Si cambia ANTES, son 2 horas en Stitch.

---

## Fase 1+ · Implementación con vibe-design-pipeline

### Para cada rebanada vertical

```
1. RPIV · Research
   - Leer STATE, CONTEXT, PLAN.
   - Reformular en lenguaje llano.
   - OK humano.

2. RPIV · Plan
   - Bloque XML en PLAN.md con decisions referenciadas.
   - OK humano.

3. RPIV · Implement (uno por uno)
   - Activar vibe-design-pipeline:
     - P1 frontend-foundation (DOM + estado + data)
     - P2 stylistic-audit (tokens + browser-defaults)
     - P3 a11y-audit (WCAG AA)
     - P4 performance-audit (CWV)
     - P5 motion-polish (si UI-SPEC lo habilita)
   - Commit atómico al cerrar.

4. RPIV · Validate
   - Tests, screenshots, métricas.
   - STATE.md actualizado.

5. /clear y siguiente rebanada.
```

### Trucos para acelerar

- Usar **v0/Lovable/Bolt** para el primer cut estructural; aplicar las pasadas para subir la calidad.
- Para UI premium: pedirle a v0 con contexto del UI-SPEC pegado arriba.
- Mantener una **pre-checklist mental** antes de cada slice:
  - ¿Está en `REQUIREMENTS.md`?
  - ¿Está en el `PLAN.md` de la fase?
  - ¿Tengo todos los assets (copy, imágenes)?
- Si el agente alucina o repite errores: `/clear` + re-hidratar desde `STATE.md`.

---

## Fase Final · Hardening (2-3 días)

### Checklist pre-deploy
Pasar por `checklists/pre-deploy-checklist.md` completo.

### Security review
Pasar por `checklists/security-baseline.md`. Bloquear deploy si algún ítem falla.

### Performance final
- Lighthouse CI sobre todas las routes públicas.
- Bundle analyzer publicado en CI.
- Real User Monitoring (Vercel Speed Insights, PostHog Web Vitals) configurado para 7 días post-launch.

### Auditoría 25K
Pasar por `checklists/25k-quality-bar.md`. Si algún ítem amarillo, escalar al cliente con propuesta:
> "Esto está al 90%. ¿Lo cerramos en V1.1 (1 día) o sale así?"

---

## Fase Operación · Post-launch (1 día + soporte)

### Monitoreo activo 72h
- Sentry alertas a Slack/Telegram.
- Logs revisados cada 6h las primeras 48h.
- Métrica de conversion / activation primeras 24h vs benchmark del cliente.

### Documentación de handoff
- `OPERATIONS.md` con: cómo desplegar, cómo agregar contenido al CMS, cómo cambiar pricing, cómo agregar usuarios admin, troubleshooting común.
- Capacitación grabada (10-20 min Loom) para el equipo del cliente.
- Acceso a herramientas: Sentry, PostHog, GHL, Vercel/Netlify, Stripe.

---

## Errores fatales (cómo evitarlos)

1. **Saltarse Fase 0**: empezás a programar y al día 5 cambia el scope.
   - Antídoto: REQUIREMENTS.md firmado por cliente antes de la primera línea de código.

2. **Megacommits**: el agente genera 800 líneas, las aceptás, después un bug imposible de aislar.
   - Antídoto: regla de 200 líneas + commits atómicos + rebanadas verticales.

3. **Mezclar 4 librerías UI premium**: el sitio queda esquizofrénico.
   - Antídoto: UI-SPEC con whitelist de librerías permitidas; stylistic-audit las controla.

4. **Saltar A11y "porque no se nota"**: hasta que un usuario con teclado se queja.
   - Antídoto: a11y-audit en cada slice, Lighthouse A11y ≥ 95 obligatorio.

5. **Sentir que el agente entiende sin documentar**: en sesión 8, el agente alucinó porque "olvidó" la D-04.
   - Antídoto: context-hygiene + STATE/CONTEXT actualizados religiosamente.

6. **Ignorar el 3-strike**: insistís 12 veces con el mismo bug.
   - Antídoto: tras 3 fallos, sesión nueva o intervención manual.

7. **Hardcodear secretos**: alguien hace push, GitHub avisa, todos rotan keys.
   - Antídoto: gitleaks en pre-commit, .env.example sin valores, checklist de security.

8. **Deploy sin RUM**: la app es lenta para usuarios reales pero no en tu Mac.
   - Antídoto: Speed Insights / PostHog Web Vitals desde el día 1.

9. **No validar en mobile**: 70% del tráfico es mobile y la animación tira al teléfono.
   - Antídoto: throttling 4× CPU + Slow 4G en cada audit performance.

10. **Vender más de lo que el agente puede hacer en X días**: subestimás complejidad.
    - Antídoto: ROADMAP.md realista, scope V1 acotado, V2 por contrato separado.

---

## El sello "USD 25K"

Una web que cobra USD 25K se reconoce por:

✅ Lighthouse Perf 95+ mobile y desktop
✅ A11y Lighthouse 95+
✅ LCP ≤ 1.5s mobile, CLS ≤ 0.05
✅ Cero errores Sentry primeras 72h
✅ Copy revisado, microcopy en cada estado
✅ Motion sutil pero memorable, 60fps en mid-range
✅ Forms con validación AAA, errores humanos
✅ Email transaccional con marca propia
✅ Analytics con eventos de funnel completos
✅ CMS donde el cliente edita sin romper
✅ Documentación de handoff + capacitación
✅ Performance budget enforceado en CI
✅ Security headers + CSP + secret scanning

Si tu sitio no cumple 12 de estos 13, no lo cobres a 25K.

---

*El playbook es el "qué" y el "cómo". Las skills son el "ejecutar". El UI-SPEC es el "cómo se ve". Los tres se necesitan.*
