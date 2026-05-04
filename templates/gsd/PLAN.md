# PLAN

> Plan de la fase activa: Optimización Premium y Auditoría de Arsenal.
> Generado bajo el protocolo RPIV y Sequential Workflow Orchestrator.

---

```xml
<plan phase="2" name="Optimization & Branding Audit" generated="2026-05-03" owner="Antigravity">
  <decisions_referenced>
    <ref id="D-01" reason="stack base" />
    <ref id="D-06" reason="motion polish" />
    <ref id="D-08" reason="security baseline" />
  </decisions_referenced>

  <prerequisites>
    <item>Repositorio actualizado con arsenal de skills.</item>
    <item>Acceso a assets de marca (logos, fuentes).</item>
  </prerequisites>

  <tasks>
    <task id="T-1" status="pending">
      <title>Stylistic Audit & Neutral Spanish Pass</title>
      <files>
        <file>src/components/layout/Navbar.tsx</file>
        <file>src/components/sections/FooterContact.tsx</file>
        <file>src/components/sections/AuthoritySection.tsx</file>
      </files>
      <expected_lines>~200</expected_lines>
      <verification>
        Revisión de copy: no debe haber voseo (completá, tenés, etc.).
      </verification>
    </task>

    <task id="T-2" status="pending">
      <title>A11y & Performance Baseline (Lighthouse)</title>
      <files>
        <file>src/app/layout.tsx</file>
        <file>src/app/page.tsx</file>
      </files>
      <expected_lines>~100</expected_lines>
      <verification>
        Lighthouse score > 95 en Desktop.
      </verification>
    </task>

    <task id="T-3" status="pending">
      <title>Motion Polish: Transiciones Orgánicas</title>
      <files>
        <file>src/app/globals.css</file>
        <file>src/components/ui/AuditQuiz.tsx</file>
      </files>
      <expected_lines>~150</expected_lines>
      <verification>
        Suavidad de 60FPS en scroll y transiciones de estado.
      </verification>
    </task>
  </tasks>

  <out_of_scope>
    <item>Migración de base de datos o Auth (Fase 3).</item>
    <item>Nuevas funcionalidades complejas no descritas.</item>
  </out_of_scope>

  <risks>
    <risk>Hydration errors por el uso intensivo de Framer Motion en SSR.</risk>
    <risk>Conflictos de Tailwind v4 si no está configurado correctamente.</risk>
  </risks>
</plan>
```
