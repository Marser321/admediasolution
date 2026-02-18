import { Zap, Rocket, LineChart } from "lucide-react";

// ============================================================
// Datos Mock de Servicios
// ============================================================
export const SERVICES_DATA = {
    "ads-autopilot": {
        title: "Ads Autopilot",
        subtitle: "Publicidad Programática con IA",
        description: "Deja de quemar presupuesto. Nuestro motor de inteligencia artificial optimiza tus campañas en Meta, Google y TikTok las 24 horas del día, ajustando pujas y creativos en tiempo real.",
        features: [
            "Optimización de presupuesto en tiempo real",
            "A/B Testing automático de creativos",
            "Audience Targeting predictivo",
            "Dashboard de rendimiento unificado",
        ],
        stats: [
            { label: "ROAS Promedio", value: "4.5x" },
            { label: "Ahorro de Tiempo", value: "90%" },
            { label: "Reducción CPA", value: "-35%" },
        ],
        icon: Zap,
        gradient: "from-accent-warm to-accent-stone",
    },
    "contenido-generativo": {
        title: "Contenido Generativo",
        subtitle: "Fábrica de Contenidos Infinita",
        description: "Crea meses de contenido en minutos. Usamos modelos de lenguaje y generación de imagen avanzados para producir copy, social posts y videos que mantienen tu marca relevante.",
        features: [
            "Blog posts optimizados para SEO",
            "Copy persuasivo para Landing Pages",
            "Generación de imágenes de producto",
            "Calendario editorial automatizado",
        ],
        stats: [
            { label: "Posts / Mes", value: "100+" },
            { label: "Engagement", value: "+40%" },
            { label: "Costo / Pieza", value: "-80%" },
        ],
        icon: Rocket,
        gradient: "from-purple-500 to-indigo-500",
    },
    "embudos-neurales": {
        title: "Embudos Neurales",
        subtitle: "Conversión Inteligente",
        description: "Funnels que aprenden. Cada visitante es único, y nuestros embudos adaptan la oferta y el flujo en base al comportamiento del usuario para maximizar la probabilidad de conversión.",
        features: [
            "Personalización dinámica de ofertas",
            "Lead Scoring predictivo",
            "Email Marketing automatizado",
            "Recuperación de carritos con IA",
        ],
        stats: [
            { label: "Tasa de Conversión", value: "+12%" },
            { label: "Leads Calificados", value: "3x" },
            { label: "LTV del Cliente", value: "+25%" },
        ],
        icon: LineChart,
        gradient: "from-emerald-500 to-green-400",
    },
};
