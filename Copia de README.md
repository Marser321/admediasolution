# WEB-VIBE ARSENAL

> Navaja suiza para construir webs de USD 25K en mínimo tiempo con vibe coding.
> Optimizado para **Google Antigravity** + **v0 / Lovable / Bolt** + stack mixto (Next.js 15, Astro 5, Vite+React).

---

## 1. Filosofía operativa

El arsenal asume que vos NO escribís código línea por línea. Sos el **director**: defines la visión, las restricciones y la barra de calidad; los agentes escriben sintaxis. Para que ese contrato funcione a USD 25K hace falta cuatro capas atadas entre sí:

1. **Curaduría inteligente del proyecto**: la skill `business-research-curator` lee la investigación del negocio y devuelve estilo visual recomendado (de un catálogo de 10 estilos visualmente impactantes), tech stack, y un blueprint sección-por-sección con recetas mágicas concretas.
2. **Reglas persistentes** que bloquean los hábitos malos del LLM (Tailwind ad-hoc, `any`, instalar dependencias sin permiso, hard-codear claves).
3. **Skills modulares** que se activan solo cuando son relevantes — Vibe Designing, Magic Section Designer, A11y, Performance, Motion Polish, RPIV, etc.
4. **Estado cognitivo en disco** (GSD): el agente nunca depende de "recordar" lo que hablamos: lee `STATE.md`, `CONTEXT.md`, `PLAN.md` y refresca contexto cada ciclo.

**Sesgo central del arsenal**: por defecto recomienda estilos visualmente impactantes (Editorial Dramatic, Kinetic Cinematic, Glassmorphic Luxury, Neo-Vivid, Brutalist Bold, Organic Warm, Dark Tech, Retro Futurism, Maximalist Layered). El minimalismo es la **excepción justificada** — solo se aplica cuando la industria, audiencia o cliente lo pide explícitamente. Esto evita la trampa de "sitio prolijo y olvidable" que producen los LLMs por defecto.

Si alguna de las cuatro capas falta, el sitio no llega a USD 25K — llega a USD 800.

---

## 2. Mapa del repositorio

```
ARSENAL/
├── README.md                     # ← estás aquí
├── PLAYBOOK.md                   # flujo end-to-end por tipo de proyecto
├── LIBRARY-CATALOG.md            # librerías next-gen 2026 curadas
├── .agents/skills/               # skills SKILL.md (Antigravity / Claude Code)
│   ├── 00-router/
│   ├── business-research-curator/        # ✱ NEW · curaduría desde research del negocio
│   │   └── references/
│   │       ├── visual-styles.md          # 10 estilos impactantes
│   │       ├── business-style-matrix.md  # señal → estilo
│   │       └── section-recipes.md        # catálogo de recetas mágicas
│   ├── magic-section-designer/           # ✱ NEW · aplica recetas a secciones
│   ├── vibe-design-pipeline/
│   ├── frontend-foundation/
│   ├── ui-spec-author/
│   ├── motion-polish/
│   ├── a11y-audit/
│   ├── performance-audit/
│   ├── stylistic-audit/
│   ├── vertical-slicer/
│   ├── rpiv-gate/
│   ├── context-hygiene/
│   ├── landing-premium/
│   ├── corporate-site/
│   ├── saas-auth-stack/
│   ├── ecommerce-funnel/
│   └── ghl-bridge/
├── templates/
│   ├── gsd/                      # PROJECT.md, REQUIREMENTS.md, STATE.md, etc.
│   ├── stacks/
│   │   ├── nextjs-15-shadcn/     # config base + estructura
│   │   ├── astro-5-content/
│   │   └── vite-react-spa/
│   ├── rules/
│   │   ├── AGENTS.md             # para Antigravity
│   │   ├── CLAUDE.md             # para Claude Code
│   │   └── cursor-rules/         # .mdc condicionales por glob
│   └── prompts/
│       ├── v0-prompts.md
│       ├── lovable-prompts.md
│       ├── stitch-prompts.md
│       └── bolt-prompts.md
└── checklists/
    ├── kickoff-checklist.md
    ├── ui-spec-checklist.md
    ├── pre-deploy-checklist.md
    ├── 25k-quality-bar.md
    └── security-baseline.md
```

---

## 3. Cómo arrancar un proyecto nuevo (4 pasos · impact-first)

### Paso 1 — Clonar el esqueleto al repo del cliente

```bash
# en la raíz del nuevo proyecto del cliente
cp -r ARSENAL/templates/gsd       ./docs
cp -r ARSENAL/.agents             ./.agents
cp ARSENAL/templates/rules/AGENTS.md      ./AGENTS.md     # si usás Antigravity
cp ARSENAL/templates/rules/CLAUDE.md      ./CLAUDE.md     # si Claude Code
cp -r ARSENAL/templates/rules/cursor-rules ./.cursor/rules # si Cursor
```

Eso te deja `.agents/skills/...` cargadas, `docs/` con templates GSD vacíos, y reglas en raíz.

### Paso 2 — Investigación del negocio + Curaduría

Subí o creá un archivo `uploads/research-<cliente>.md` con la investigación del negocio: industria, audiencia, competencia (3-5 referencias), branding existente, KPIs, mood emocional buscado, idiomas, restricciones.

Abrí Antigravity y corré:

```
Activá business-research-curator y context-hygiene.
Acá está el research: <pasar el archivo>.
Generá docs/CURATED-BRIEF.md con el blueprint completo:
estilo visual recomendado, tech stack, skills a activar,
librerías premium, y blueprint sección-por-sección con recetas mágicas.
NO escribas código todavía.
```

El agente devuelve un brief con `primary_style` (uno de los 10 del catálogo, sesgado a impacto), stack y blueprint con recetas como `hero: A.4 hero-beam-spotlight-dark`. Vos validás, el cliente firma.

### Paso 3 — Discovery formal + UI-SPEC

Con el CURATED-BRIEF aprobado:

```
Activá rpiv-gate y ui-spec-author.
Completá docs/PROJECT.md, REQUIREMENTS.md y ROADMAP.md desde el research.
Después generá docs/UI-SPEC.md con tokens del estilo Y del CURATED-BRIEF.
```

El UI-SPEC sale calibrado al estilo: paleta oklch, tipografía, motion canónico, etc. Si el estilo es Kinetic Cinematic, los tokens son dark + acento eléctrico. Si es Editorial Dramatic, paper + serif bold + grid asimétrico. **No oklch pastel "seguro"**.

### Paso 4 — Construcción sección por sección con recetas mágicas

```
Activá vibe-design-pipeline y magic-section-designer.
Para cada sección del blueprint del CURATED-BRIEF:
1. magic-section-designer aplica la receta del catálogo.
2. frontend-foundation cierra estructura.
3. stylistic-audit → a11y-audit → performance-audit → motion-polish.
4. Commit atómico.
Empezá por hero (sección id=hero, treatment=<X.Y>).
```

Cada sección llega visualmente cargada por la receta del catálogo (no genérica), validada por las 5 pasadas de la pipeline, dentro del budget de performance. Eso es lo que hace la diferencia USD 25K.

---

## 4. Mapa: qué skill para qué tipo de proyecto

| Tipo de proyecto         | Skills mandatorias                                                                                                                                         | Stack default                |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| Landing premium          | business-research-curator, magic-section-designer, vibe-design-pipeline, motion-polish, performance-audit, landing-premium                                    | Astro 5 + Tailwind v4         |
| Corporativo / institucional | business-research-curator, magic-section-designer, vibe-design-pipeline, a11y-audit, stylistic-audit, corporate-site                                          | Astro 5 + Sanity/Payload      |
| SaaS con auth            | business-research-curator, magic-section-designer, frontend-foundation, saas-auth-stack, vertical-slicer, rpiv-gate, performance-audit                        | Next.js 15 + Better Auth      |
| E-commerce + funnel CRM  | business-research-curator, magic-section-designer, ecommerce-funnel, ghl-bridge, vibe-design-pipeline, performance-audit                                      | Next.js 15 + GHL + Stripe     |

Las skills **transversales obligatorias** en TODOS los proyectos: `business-research-curator`, `magic-section-designer`, `rpiv-gate`, `vertical-slicer`, `context-hygiene`, `stylistic-audit`, `a11y-audit`.

---

## 5. Reglas de oro (no negociables)

1. **Regla de 200 líneas**: ningún cambio puede agregar > 200 líneas a un archivo. Si excede, refragmentar el plan.
2. **3-strike rule**: si el agente falla 3 iteraciones sobre el mismo bug, frenás todo, abrís sesión limpia o intervenís manual.
3. **RPIV obligatorio** sobre todo lo que pase de prototipo: Research → Plan → Implement → Validate.
4. **Vertical slicing**: schema → controlador → routing → UI → hooks. Una rebanada por vez. Documentá al cerrar cada slice.
5. **Context hygiene**: `/clear` cada ~10 mensajes o entre tareas funcionalmente distintas. Una sesión = una entidad funcional.
6. **Security by default**: cero credenciales en código, `httpOnly` cookies, validación zod en boundaries, RLS si hay DB compartida.
7. **No `any` en TypeScript**, no `console.log` en main, no instalar deps sin aprobación.
8. **Two-AI workflow** sobre todo lo crítico: un escritor (v0/Lovable/Antigravity) + un revisor (Claude Code o Antigravity en modo audit).

---

## 6. Cómo cargar las skills

### Antigravity (workspace scope — recomendado)
Las skills viven en `<workspace-root>/.agents/skills/<skill-name>/SKILL.md`. Antigravity las descubre automáticamente al abrir el workspace.

### Antigravity (global scope)
Para uso transversal a todos los proyectos:
```bash
mkdir -p ~/.gemini/antigravity/skills
cp -r ARSENAL/.agents/skills/* ~/.gemini/antigravity/skills/
```

### Claude Code
Las skills SKILL.md también funcionan nativamente. Copiar a `~/.claude/skills/` o usar el `.plugin` empaquetado.

### Cursor
No usa SKILL.md, pero las reglas en `.cursor/rules/*.mdc` (incluidas en `templates/rules/cursor-rules/`) cubren los mismos workflows como reglas condicionales por glob.

---

## 7. Mantenimiento del arsenal

Después de cada proyecto:
1. ¿Qué skill faltó? Crear el SKILL.md con `skill-creator`.
2. ¿Qué regla del playbook se violó? Endurecer `AGENTS.md` / `CLAUDE.md`.
3. ¿Qué librería usaste por primera vez y rindió? Sumarla a `LIBRARY-CATALOG.md` con el caso de uso.
4. ¿Qué prompt te dio el mejor resultado? Sumarlo a `templates/prompts/`.

El arsenal es vivo. Si no evoluciona cada 2-3 proyectos, pierde filo.

---

## 8. Próximo paso recomendado

Leer en orden:
1. `PLAYBOOK.md` — el flujo end-to-end con timelines reales.
2. `LIBRARY-CATALOG.md` — qué usar para qué en 2026.
3. `.agents/skills/vibe-design-pipeline/SKILL.md` — el corazón operativo.
4. `templates/gsd/PROJECT.md` — para entender el esquema GSD.

---

*Construido con base en el reporte técnico "Vibe Coding: Guía de Desarrollo Web" (mayo 2026). Versión 1.0.*
