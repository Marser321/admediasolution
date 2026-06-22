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
    /** Fondo cinematográfico full-width de la etapa. */
    backgroundImage: string;
    /** Punto de anclaje para conservar el sujeto al recortar en tablet y móvil. */
    backgroundPosition: "left center" | "right center";
}

export const JOURNEY_STAGES: JourneyStage[] = [
    {
        id: "primera-llamada",
        title: "Primera llamada",
        subtitle: "Diagnóstico",
        desc: "Revisamos tu negocio, tu embudo actual y tus metas. Salimos de la llamada con una lectura clara de dónde estás y qué falta.",
        depts: ["Dirección"],
        icon: PhoneCall,
        deliverables: ["Lectura del negocio", "Metas claras", "Plan inicial"],
        backgroundImage: "/journey/exterior/primera-llamada.webp",
        backgroundPosition: "right center",
    },
    {
        id: "configuracion-crm",
        title: "Configuración del CRM",
        subtitle: "La base del sistema",
        desc: "Montamos tu CRM: pipelines, WhatsApp conectado, aprobación A2P y los flujos de seguimiento que no dejan escapar oportunidades.",
        depts: ["CRM & Automatización", "CRM & Sistemas"],
        icon: Workflow,
        deliverables: ["CRM operativo", "WhatsApp conectado", "A2P aprobado"],
        backgroundImage: "/journey/exterior/configuracion-crm.webp",
        backgroundPosition: "left center",
    },
    {
        id: "segunda-llamada",
        title: "Segunda llamada",
        subtitle: "Plan de acción",
        desc: "Te presentamos la estructura completa: oferta, presupuesto y calendario de trabajo. Acordamos cómo y cuándo arranca todo.",
        depts: ["Dirección", "Comercial"],
        icon: Presentation,
        deliverables: ["Oferta definida", "Presupuesto", "Calendario"],
        backgroundImage: "/journey/exterior/segunda-llamada.webp",
        backgroundPosition: "right center",
    },
    {
        id: "pila-de-arte",
        title: "Pila de arte",
        subtitle: "Identidad y creativos",
        desc: "Diseño y edición producen el material: piezas gráficas, videos y creativos listos para las campañas y tus canales.",
        depts: ["Diseño & IA", "Producción"],
        icon: Palette,
        deliverables: ["Piezas gráficas", "Videos editados", "Creativos de campaña"],
        backgroundImage: "/journey/exterior/pila-de-arte.webp",
        backgroundPosition: "left center",
    },
    {
        id: "configuraciones-tecnicas",
        title: "Configuraciones técnicas",
        subtitle: "Todo conectado",
        desc: "Integraciones, dominios, tracking y conexiones entre plataformas. Lo técnico queda estable y monitoreado.",
        depts: ["CRM & Sistemas"],
        icon: Cog,
        deliverables: ["Integraciones activas", "Tracking instalado", "Monitoreo"],
        backgroundImage: "/journey/exterior/configuraciones-tecnicas.webp",
        backgroundPosition: "right center",
    },
    {
        id: "presupuesto-pauta",
        title: "Presupuesto y pauta",
        subtitle: "Campañas al aire",
        desc: "Lanzamos las campañas en Meta y Google con el presupuesto acordado. Cada anuncio apunta a traer prospectos calificados.",
        depts: ["Marketing"],
        icon: Megaphone,
        deliverables: ["Campañas activas", "Segmentación", "Reportes de pauta"],
        backgroundImage: "/journey/exterior/presupuesto-pauta.webp",
        backgroundPosition: "left center",
    },
    {
        id: "lanzamiento-agenda",
        title: "Lanzamiento y agenda",
        subtitle: "Citas entrando",
        desc: "Las citas empiezan a caer en tu calendario. Ventas atiende, da seguimiento y acompaña cada oportunidad hasta el cierre.",
        depts: ["Comercial"],
        icon: CalendarCheck,
        deliverables: ["Agenda con citas", "Seguimiento activo", "Atención al prospecto"],
        backgroundImage: "/journey/exterior/lanzamiento-agenda.webp",
        backgroundPosition: "right center",
    },
    {
        id: "optimizacion",
        title: "Optimización continua",
        subtitle: "Crecer y ajustar",
        desc: "Medimos, ajustamos y mejoramos cada pieza del sistema. Todas las áreas trabajan sobre los números reales de tu operación.",
        depts: ["Dirección", "Marketing", "CRM & Automatización"],
        icon: TrendingUp,
        deliverables: ["Métricas mensuales", "Ajustes de campaña", "Soporte continuo"],
        backgroundImage: "/journey/exterior/optimizacion.webp",
        backgroundPosition: "left center",
    },
];
