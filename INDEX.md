# INDEX · Mapa rápido del Arsenal

> Un solo archivo para encontrar lo que necesitás en menos de 30 segundos.

---

## Por dónde empezar (orden de lectura)

1. **[README.md](./README.md)** — filosofía y mapa general (impact-first).
2. **[PLAYBOOK.md](./PLAYBOOK.md)** — flujo end-to-end de un proyecto.
3. **[LIBRARY-CATALOG.md](./LIBRARY-CATALOG.md)** — qué librería usar para qué.
4. **[.agents/skills/business-research-curator/SKILL.md](./.agents/skills/business-research-curator/SKILL.md)** — la entrada al sistema.
5. **[.agents/skills/business-research-curator/references/visual-styles.md](./.agents/skills/business-research-curator/references/visual-styles.md)** — los 10 estilos visualmente impactantes.
6. **[.agents/skills/business-research-curator/references/section-recipes.md](./.agents/skills/business-research-curator/references/section-recipes.md)** — recetas mágicas por sección.
7. **[.agents/skills/vibe-design-pipeline/SKILL.md](./.agents/skills/vibe-design-pipeline/SKILL.md)** — orquestador de las 5 pasadas.
8. **[templates/gsd/PROJECT.md](./templates/gsd/PROJECT.md)** — esquema GSD.

---

## Por necesidad inmediata

### "Estoy arrancando un proyecto nuevo"
→ [BOOTSTRAP.md](./BOOTSTRAP.md) + [checklists/kickoff-checklist.md](./checklists/kickoff-checklist.md)

### "Tengo que generar un Hero / Pricing / Form"
→ [templates/prompts/v0-prompts.md](./templates/prompts/v0-prompts.md)

### "Tengo que clasificar el proyecto"
→ [.agents/skills/00-router/SKILL.md](./.agents/skills/00-router/SKILL.md)

### "Tengo que decidir un stack o librería"
→ [LIBRARY-CATALOG.md](./LIBRARY-CATALOG.md)

### "El agente está alucinando"
→ [.agents/skills/context-hygiene/SKILL.md](./.agents/skills/context-hygiene/SKILL.md)

### "Voy a deployar a producción"
→ [checklists/pre-deploy-checklist.md](./checklists/pre-deploy-checklist.md) + [checklists/security-baseline.md](./checklists/security-baseline.md)

### "¿Esto cobra USD 25K o no?"
→ [checklists/25k-quality-bar.md](./checklists/25k-quality-bar.md)

---

## Por tipo de skill

### Skills transversales (todo proyecto)
- [business-research-curator](./.agents/skills/business-research-curator/SKILL.md) — ✱ entrada del sistema · curaduría desde research del negocio.
- [magic-section-designer](./.agents/skills/magic-section-designer/SKILL.md) — ✱ aplica recetas mágicas a cada sección.
- [00-router](./.agents/skills/00-router/SKILL.md) — clasifica el proyecto.
- [rpiv-gate](./.agents/skills/rpiv-gate/SKILL.md) — Research / Plan / Implement / Validate.
- [vertical-slicer](./.agents/skills/vertical-slicer/SKILL.md) — rebanadas atómicas.
- [context-hygiene](./.agents/skills/context-hygiene/SKILL.md) — STATE.md vivo.

### Skills de pipeline visual
- [ui-spec-author](./.agents/skills/ui-spec-author/SKILL.md) — contrato de diseño.
- [vibe-design-pipeline](./.agents/skills/vibe-design-pipeline/SKILL.md) — orquestador 5 pasadas.
- [frontend-foundation](./.agents/skills/frontend-foundation/SKILL.md) — pasada 1.
- [stylistic-audit](./.agents/skills/stylistic-audit/SKILL.md) — pasada 2.
- [a11y-audit](./.agents/skills/a11y-audit/SKILL.md) — pasada 3.
- [performance-audit](./.agents/skills/performance-audit/SKILL.md) — pasada 4.
- [motion-polish](./.agents/skills/motion-polish/SKILL.md) — pasada 5.

### Skills por tipo de proyecto
- [landing-premium](./.agents/skills/landing-premium/SKILL.md) — tipo A.
- [corporate-site](./.agents/skills/corporate-site/SKILL.md) — tipo B.
- [saas-auth-stack](./.agents/skills/saas-auth-stack/SKILL.md) — tipo C.
- [ecommerce-funnel](./.agents/skills/ecommerce-funnel/SKILL.md) — tipo D.
- [ghl-bridge](./.agents/skills/ghl-bridge/SKILL.md) — integración CRM.

---

## Por tipo de archivo del arsenal

### Reglas para agentes
- [templates/rules/AGENTS.md](./templates/rules/AGENTS.md) — Antigravity, ChatGPT.
- [templates/rules/CLAUDE.md](./templates/rules/CLAUDE.md) — Claude Code.
- [templates/rules/cursor-rules/](./templates/rules/cursor-rules/) — `.mdc` por glob.

### Templates GSD (estado cognitivo)
- [PROJECT.md](./templates/gsd/PROJECT.md)
- [REQUIREMENTS.md](./templates/gsd/REQUIREMENTS.md)
- [ROADMAP.md](./templates/gsd/ROADMAP.md)
- [STATE.md](./templates/gsd/STATE.md)
- [CONTEXT.md](./templates/gsd/CONTEXT.md)
- [PLAN.md](./templates/gsd/PLAN.md)
- [UI-SPEC.md](./templates/gsd/UI-SPEC.md)
- [VALIDATION.md](./templates/gsd/VALIDATION.md)

### Templates de stacks
- [Next.js 15 + shadcn](./templates/stacks/nextjs-15-shadcn/README.md)
- [Astro 5 + content](./templates/stacks/astro-5-content/README.md)
- [Vite + React SPA](./templates/stacks/vite-react-spa/README.md)

### Prompts para generadores
- [v0](./templates/prompts/v0-prompts.md)
- [Lovable](./templates/prompts/lovable-prompts.md)
- [Stitch](./templates/prompts/stitch-prompts.md)
- [Bolt](./templates/prompts/bolt-prompts.md)

### Checklists
- [Kickoff](./checklists/kickoff-checklist.md)
- [UI-SPEC](./checklists/ui-spec-checklist.md)
- [Pre-deploy](./checklists/pre-deploy-checklist.md)
- [Security baseline](./checklists/security-baseline.md)
- [25K quality bar](./checklists/25k-quality-bar.md)

---

## Diagrama de uso (mental model · impact-first)

```
                    ┌──────────────────────────────────┐
Research del negocio ▶│ business-research-curator       │
(uploads/research.md) │ (skill principal)               │
                      │ ↓ produces                       │
                      │ docs/CURATED-BRIEF.md            │
                      │  · primary_style                 │
                      │  · tech_stack                    │
                      │  · skills a activar              │
                      │  · section blueprint con recetas │
                      └──────────────┬───────────────────┘
                                     │
                                     ▼
                    ┌──────────────────────────┐
                    │   00-router (valida)      │
                    │   PROJECT.md (template)   │
                    │   REQUIREMENTS.md         │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   ui-spec-author (skill) │
                    │   UI-SPEC.md (tokens del estilo)│
                    │   Stitch / v0 wireframes  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   AGENTS.md / CLAUDE.md   │
                    │   .cursor/rules/*.mdc     │
                    │   Skills cargadas         │
                    └────────────┬─────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
        ┌────────────────────┐     ┌──────────────────────┐
        │  rpiv-gate (R/P)   │     │  vertical-slicer     │
        │  PLAN.md (XML)     │◀───▶│  (descomposición)    │
        └─────────┬──────────┘     └──────────────────────┘
                  │
                  ▼
        ┌──────────────────────────────────────────────┐
        │  magic-section-designer (aplica recetas)     │
        │  consume blueprint del CURATED-BRIEF         │
        │  ↓                                           │
        │  vibe-design-pipeline (orquesta 5 pasadas)   │
        │  P1 frontend-foundation                      │
        │  P2 stylistic-audit                          │
        │  P3 a11y-audit                               │
        │  P4 performance-audit                        │
        │  P5 motion-polish                            │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │   STATE.md actualizado    │
                    │   /clear próxima sesión   │
                    └──────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │   pre-deploy-checklist    │
                    │   security-baseline       │
                    │   25k-quality-bar         │
                    └──────────────────────────┘
                               │
                               ▼
                            🚀 GO LIVE
```

---

*Cada archivo del arsenal es ejecutable. Si un archivo no se usa nunca, sobra. Si hay algo que tenés que hacer y no está documentado, falta. Iterá el arsenal después de cada proyecto.*
