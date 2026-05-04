# BOOTSTRAP · Arrancar un proyecto nuevo en 10 minutos

> Pasos exactos para tomar el arsenal y dejarlo listo en un repo nuevo. Copy-paste friendly.

---

## 0 · Pre-requisitos en tu compu

```bash
# Node 22+
node -v

# pnpm 9+
pnpm -v

# git
git --version

# (opcional) gh para crear repos
gh --version
```

---

## 1 · Crear el repo y clonar el arsenal base

```bash
# Crear carpeta del proyecto
mkdir <cliente-proyecto> && cd <cliente-proyecto>

# Inicializar git
git init -b main

# Inicializar el stack según tipo de proyecto:

# A · Landing premium / B · Corporativo
pnpm create astro@latest . -- --template minimal --typescript strict --install

# C · SaaS / D · E-commerce
pnpm dlx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

---

## 2 · Copiar el arsenal a la raíz

```bash
# (suponiendo que ARSENAL está en ~/dev/ARSENAL o en el desktop)
ARSENAL=~/OneDrive/Desktop/Diseño\ WEB/ARSENAL

# Copiar reglas para agentes
cp "$ARSENAL/templates/rules/AGENTS.md" ./AGENTS.md
cp "$ARSENAL/templates/rules/CLAUDE.md" ./CLAUDE.md
mkdir -p .cursor/rules
cp "$ARSENAL"/templates/rules/cursor-rules/*.mdc .cursor/rules/

# Copiar skills al workspace (Antigravity las descubre automáticamente)
cp -r "$ARSENAL/.agents" ./.agents

# Copiar templates GSD a docs/
mkdir -p docs
cp "$ARSENAL"/templates/gsd/*.md docs/

# (Opcional) copiar checklists para tener referencia local
cp -r "$ARSENAL/checklists" ./docs/checklists
```

---

## 3 · Configuración inicial del repo

```bash
# .gitignore mínimo (ajustar según stack)
cat > .gitignore <<'EOF'
node_modules
.next
dist
.turbo
.vercel
.netlify
.astro
.env
.env.local
*.log
.DS_Store
EOF

# .env.example
cat > .env.example <<'EOF'
# DB
DATABASE_URL=

# Auth (Better Auth)
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Pagos
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
MERCADO_PAGO_ACCESS_TOKEN=

# Email
RESEND_API_KEY=

# Observabilidad
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# CRM (si aplica)
GHL_PIT_TOKEN=
GHL_LOCATION_ID=
GHL_WEBHOOK_SECRET=
EOF

# Pre-commit hooks con lefthook o husky
pnpm add -D lefthook
pnpm dlx lefthook install
```

`lefthook.yml` recomendado:
```yaml
pre-commit:
  parallel: true
  commands:
    typecheck:
      glob: "*.{ts,tsx}"
      run: pnpm typecheck
    lint:
      glob: "*.{ts,tsx,js,jsx}"
      run: pnpm lint
    secrets:
      run: pnpm dlx gitleaks detect --no-git -v
```

---

## 4 · Llenar PROJECT.md y REQUIREMENTS.md

Abrí Antigravity (o Claude Code) en el repo y ejecutá:

```
Activá la skill 00-router y la skill rpiv-gate.

Voy a pasarte el brief del cliente. Tu tarea:
1. Completá docs/PROJECT.md con la visión.
2. Generá docs/REQUIREMENTS.md con REQ-001..N (estados MUST/SHOULD/COULD/WONT).
3. Generá docs/ROADMAP.md con fases y exit criteria.
4. Sumá decisiones iniciales a docs/CONTEXT.md (D-01..D-05).
5. NO escribas código todavía.

BRIEF:
<pegar brief del cliente acá>
```

Iterá hasta que el cliente firme `REQUIREMENTS.md`. Tildá los ítems del [kickoff-checklist.md](./checklists/kickoff-checklist.md).

---

## 5 · UI-SPEC y wireframes

```
Activá la skill ui-spec-author.

Generá docs/UI-SPEC.md con los 6 pilares completos basándote en:
- PROJECT.md
- Manual de marca / referencias del cliente (uploaded files)
- Mood: <minimalista / lujoso / técnico / cálido>

Generá también el bloque @theme con los tokens listos para tailwind.
```

Después usá los prompts de Stitch o v0 (templates/prompts/) para generar wireframes navegables. Aprobación del cliente sobre el wireframe + tokens **antes** de generar código.

Tildá [ui-spec-checklist.md](./checklists/ui-spec-checklist.md).

---

## 6 · Primer commit

```bash
git add .
git commit -m "chore: bootstrap arsenal + GSD docs + reglas para agentes"
```

---

## 7 · Empezar Fase 1

```
Activá vibe-design-pipeline + frontend-foundation + rpiv-gate.

Implementá la primera rebanada vertical de docs/ROADMAP.md Fase 1.
Seguí RPIV: Research → Plan (XML en PLAN.md) → Implement (≤200 líneas) → Validate.

Después de cada slice cerrada:
- Update STATE.md.
- Commit atómico.
- /clear y siguiente slice.
```

---

## 8 · Setup de servicios externos

Mientras escribís código, en paralelo:

- [ ] Crear proyecto en Vercel/Netlify, conectar repo, env vars staging.
- [ ] Crear DB en Neon/Supabase, copiar connection string.
- [ ] Crear Sentry project, copiar DSN.
- [ ] Crear PostHog project, copiar key.
- [ ] Stripe account en test mode, secret key.
- [ ] Resend con dominio verificado (tarda 24-48h, arrancar ahora).
- [ ] Si aplica: GHL sub-account, PIT token, configurar webhook URL.

---

## Atajos de productividad

### Snippet para arrancar sesión nueva (pegale al agente al abrir)

```
Activá las skills mandatorias del proyecto: 00-router, rpiv-gate, vertical-slicer, context-hygiene, stylistic-audit, a11y-audit, performance-audit + las específicas del tipo.

Leé en orden:
1. docs/STATE.md
2. docs/CONTEXT.md
3. fase activa de docs/PLAN.md

Resumime en 3 bullets dónde estamos y cuál es la próxima tarea. NO escribas código todavía.
```

### Snippet para cerrar sesión

```
Sintetizá los cambios de esta sesión en docs/STATE.md con timestamp.
Marcá las tareas T-N de PLAN.md que cerramos como done.
Identificá qué arranca la próxima sesión y dejalo en la sección Next.
```

### Snippet para auditoría cruzada (modo B Claude Code)

```
Modo: B (auditor)
Revisá el último diff (vs origin/main).
Buscá: violaciones UI-SPEC, regresiones a11y, regresiones perf, riesgos seguridad, divergencias con PLAN.md.
Reportá con severidad critical/major/minor + línea exacta. NO escribas código.
```

---

*El arsenal te ahorra ~3-4 días de scaffolding por proyecto. Si seguís el bootstrap religiosamente, el día 1 ya tenés el repo listo para producir código de calidad.*
