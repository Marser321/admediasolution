import { TrendingUp, DollarSign, MousePointerClick, Users } from "lucide-react";

// ============================================================
// Datos mock (siempre positivos, siempre impresionantes)
// ============================================================
export const CHART_DATA = [
    { month: "Ene", actual: 2400, potencial: 4800 },
    { month: "Feb", actual: 2800, potencial: 5600 },
    { month: "Mar", actual: 3200, potencial: 6900 },
    { month: "Abr", actual: 2900, potencial: 7200 },
    { month: "May", actual: 3400, potencial: 8100 },
    { month: "Jun", actual: 3800, potencial: 9400 },
];

export const METRICS = [
    {
        icon: TrendingUp,
        label: "ROI Proyectado",
        value: "+347%",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
    },
    {
        icon: DollarSign,
        label: "CPC Óptimo",
        value: "$0.42",
        color: "text-accent-blue",
        bg: "bg-accent-blue/10",
    },
    {
        icon: MousePointerClick,
        label: "CTR Estimado",
        value: "4.8%",
        color: "text-text-primary",
        bg: "bg-white/10",
    },
    {
        icon: Users,
        label: "Leads / Mes",
        value: "+127",
        color: "text-accent-light",
        bg: "bg-accent-light/10",
    },
];
