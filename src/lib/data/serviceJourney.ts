import {
    CalendarCheck,
    Cog,
    Megaphone,
    Palette,
    PhoneCall,
    Presentation,
    TrendingUp,
    Workflow,
    type LucideIcon,
} from "lucide-react";

// ============================================================
// Recorrido del servicio — las etapas que vive un cliente desde
// la primera llamada hasta la optimización continua.
// PLACEHOLDER en burdo: textos y entregables pendientes de
// afinar con dirección; la estructura es la real.
// ============================================================

/** Fondo de marca que florece detrás del mapa al tocar la etapa. */
export type BackgroundKey =
    | "blueprint"
    | "flow"
    | "presence"
    | "aurora"
    | "constellation"
    | "signal"
    | "metric";

export interface JourneyStage {
    id: string;
    /** Nombre corto de la etapa (voz directa, sin jerga). */
    title: string;
    /** Qué momento del proceso es. */
    subtitle: string;
    /** Qué pasa en esta etapa, en una o dos frases. */
    desc: string;
    /** Áreas del equipo que la ejecutan (claves de teamIdentity). */
    depts: string[];
    icon: LucideIcon;
    /** Qué recibe o queda listo para el cliente. */
    deliverables: string[];
    /** Fondo animado de marca que se revela al tocar la etapa (respaldo). */
    bg: BackgroundKey;
    /** Imagen enfocada por paso (generada por fuera; ver docs/journey-background-prompts.md). */
    image: string;
}

/**
 * Bandera maestra: cuando las 8 imágenes estén en public/journey/, poner en
 * `true` para que el fondo del mapa use las imágenes (con Ken-Burns) en vez
 * del efecto animado de respaldo. En `false` no se solicita ninguna imagen
 * (sin 404; el audit rhythm de /equipo sigue limpio).
 */
export const JOURNEY_IMAGES_READY = true;

export const JOURNEY_STAGES: JourneyStage[] = [
    {
        id: "primera-llamada",
        title: "Primera llamada",
        subtitle: "Diagnóstico",
        desc: "Revisamos tu negocio, tu embudo actual y tus metas. Salimos de la llamada con una lectura clara de dónde estás y qué falta.",
        depts: ["Dirección"],
        icon: PhoneCall,
        deliverables: ["Lectura del negocio", "Metas claras", "Plan inicial"],
        bg: "blueprint",
        image: "/journey/primera-llamada.webp",
    },
    {
        id: "configuracion-crm",
        title: "Configuración del CRM",
        subtitle: "La base del sistema",
        desc: "Montamos tu CRM: pipelines, WhatsApp conectado, aprobación A2P y los flujos de seguimiento que no dejan escapar oportunidades.",
        depts: ["CRM & Automatización", "CRM & Sistemas"],
        icon: Workflow,
        deliverables: ["CRM operativo", "WhatsApp conectado", "A2P aprobado"],
        bg: "flow",
        image: "/journey/configuracion-crm.webp",
    },
    {
        id: "segunda-llamada",
        title: "Segunda llamada",
        subtitle: "Plan de acción",
        desc: "Te presentamos la estructura completa: oferta, presupuesto y calendario de trabajo. Acordamos cómo y cuándo arranca todo.",
        depts: ["Dirección", "Comercial"],
        icon: Presentation,
        deliverables: ["Oferta definida", "Presupuesto", "Calendario"],
        bg: "presence",
        image: "/journey/segunda-llamada.webp",
    },
    {
        id: "pila-de-arte",
        title: "Pila de arte",
        subtitle: "Identidad y creativos",
        desc: "Diseño y edición producen el material: piezas gráficas, videos y creativos listos para las campañas y tus canales.",
        depts: ["Diseño & IA", "Producción"],
        icon: Palette,
        deliverables: ["Piezas gráficas", "Videos editados", "Creativos de campaña"],
        bg: "aurora",
        image: "/journey/pila-de-arte.webp",
    },
    {
        id: "configuraciones-tecnicas",
        title: "Configuraciones técnicas",
        subtitle: "Todo conectado",
        desc: "Integraciones, dominios, tracking y conexiones entre plataformas. Lo técnico queda estable y monitoreado.",
        depts: ["CRM & Sistemas"],
        icon: Cog,
        deliverables: ["Integraciones activas", "Tracking instalado", "Monitoreo"],
        bg: "constellation",
        image: "/journey/configuraciones-tecnicas.webp",
    },
    {
        id: "presupuesto-pauta",
        title: "Presupuesto y pauta",
        subtitle: "Campañas al aire",
        desc: "Lanzamos las campañas en Meta y Google con el presupuesto acordado. Cada anuncio apunta a traer prospectos calificados.",
        depts: ["Marketing"],
        icon: Megaphone,
        deliverables: ["Campañas activas", "Segmentación", "Reportes de pauta"],
        bg: "signal",
        image: "/journey/presupuesto-pauta.webp",
    },
    {
        id: "lanzamiento-agenda",
        title: "Lanzamiento y agenda",
        subtitle: "Citas entrando",
        desc: "Las citas empiezan a caer en tu calendario. Ventas atiende, da seguimiento y acompaña cada oportunidad hasta el cierre.",
        depts: ["Comercial"],
        icon: CalendarCheck,
        deliverables: ["Agenda con citas", "Seguimiento activo", "Atención al prospecto"],
        bg: "metric",
        image: "/journey/lanzamiento-agenda.webp",
    },
    {
        id: "optimizacion",
        title: "Optimización continua",
        subtitle: "Crecer y ajustar",
        desc: "Medimos, ajustamos y mejoramos cada pieza del sistema. Todas las áreas trabajan sobre los números reales de tu operación.",
        depts: ["Dirección", "Marketing", "CRM & Automatización"],
        icon: TrendingUp,
        deliverables: ["Métricas mensuales", "Ajustes de campaña", "Soporte continuo"],
        bg: "presence",
        image: "/journey/optimizacion.webp",
    },
];
