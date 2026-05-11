# Implementation Plan: Usar Logo Real De AD Media CRM

<vibe_coding_protocol>
  <reasoning_before_action>
    Este plan debe aprobarse explicitamente antes de mutar componentes,
    estilos, scripts, assets, dependencias o ejecutar trabajo de implementacion.
  </reasoning_before_action>

  <business_goal>
    Reemplazar el lockup provisional del nodo central por el logo real de AD
    Media CRM para reforzar reconocimiento de producto, coherencia de marca y
    percepcion profesional en la seccion de infraestructura.
  </business_goal>

  <security>
    No se escribiran tokens, API keys, PITs ni secretos equivalentes en codigo,
    commits, prompts persistentes o archivos versionados. Cualquier secreto se
    manejara mediante `.env`, variables de entorno o el gestor de secretos de la
    plataforma correspondiente.
  </security>
</vibe_coding_protocol>

## Contexto Detectado

- Logo fuente recibido: `/Users/mariomorera/Downloads/LOGO_CRM.png`.
- Formato: PNG RGBA, `908 x 416`.
- El nodo central vive en `src/components/sections/BlueprintSection.tsx`.
- El cambio provisional actual usa `/brand/logo-full.png` mas una capsula `CRM`;
  ahora debe sustituirse por el logo real del CRM.

## Fase 1: Asset De Marca

- Copiar `LOGO_CRM.png` dentro de `public/brand/` con un nombre estable, por
  ejemplo `logo-crm.png`.
- No modificar ni borrar el archivo original en Downloads.

## Fase 2: Implementacion En UI

- Actualizar el nodo central de `BlueprintSection.tsx` para renderizar
  `/brand/logo-crm.png`.
- Ajustar dimensiones y `object-contain` para que respire dentro del recuadro
  sin recortes ni desbordes.
- Mantener el contenedor, animaciones y lineas de conexion existentes.

## Fase 3: Validacion

- Recargar `http://localhost:3000/#infraestructura`.
- Verificar visualmente que el logo real se ve centrado y completo.
- Ejecutar ESLint sobre `src/components/sections/BlueprintSection.tsx`.
- Subir el cambio al PR activo si la validacion pasa.

## Criterios De Aceptacion

- El nodo central muestra el logo real de AD Media CRM.
- El logo no aparece recortado ni demasiado pequeno.
- No se incluyen secretos ni archivos locales no relacionados.
