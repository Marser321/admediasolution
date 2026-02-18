import {
    Palette,
    Share2,
    Zap,
    ShoppingBag,
    Wand2,
    GitBranch,
    LucideIcon,
} from "lucide-react";

export interface Project {
    title: string;
    category: string;
    description: string;
    metrics: { label: string; value: string };
    icon: LucideIcon;
    gradient: string;
    bgGradient: string;
    size: "large" | "medium";
}

export const PROJECTS: Project[] = [
    {
        title: "Nova Estética",
        category: "Branding",
        description:
            "Rediseño completo de identidad visual para cadena premium de estética. Logotipo, paleta cromática y sistema de diseño.",
        metrics: { label: "Brand Recall", value: "+340%" },
        icon: Palette,
        gradient: "from-[#007AFF] via-[#00D4FF] to-[#0EA5E9]",
        bgGradient:
            "radial-gradient(ellipse at 30% 20%, rgba(0,122,255,0.15) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)",
        size: "large",
    },
    {
        title: "FitPulse App",
        category: "Social Media",
        description:
            "Estrategia integral de contenido para app fitness: 120 piezas mensuales optimizadas por IA con engagement orgánico récord.",
        metrics: { label: "Engagement", value: "+580%" },
        icon: Share2,
        gradient: "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
        bgGradient:
            "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "TechVault",
        category: "Performance Ads",
        description:
            "Campañas de Google Ads y Meta Ads con optimización automática. ROAS sostenido 6.2x durante 8 meses consecutivos.",
        metrics: { label: "ROAS", value: "6.2x" },
        icon: Zap,
        gradient: "from-[#F59E0B] via-[#F97316] to-[#EF4444]",
        bgGradient:
            "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Moda Urbana Store",
        category: "E-commerce",
        description:
            "Tienda online con embudo de conversión inteligente. De 0 a $85K USD en ventas mensuales en 6 meses de operación.",
        metrics: { label: "Ventas/Mes", value: "$85K" },
        icon: ShoppingBag,
        gradient: "from-[#10B981] via-[#34D399] to-[#6EE7B7]",
        bgGradient:
            "radial-gradient(ellipse at 40% 60%, rgba(16,185,129,0.12) 0%, rgba(52,211,153,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Sabor Artesanal",
        category: "Contenido IA",
        description:
            "Producción masiva de contenido generativo para restaurante gourmet: fotografía, copy y reels optimizados por IA.",
        metrics: { label: "Contenido/Mes", value: "200+" },
        icon: Wand2,
        gradient: "from-[#EC4899] via-[#F472B6] to-[#FB7185]",
        bgGradient:
            "radial-gradient(ellipse at 60% 40%, rgba(236,72,153,0.12) 0%, rgba(244,114,182,0.04) 50%, transparent 70%)",
        size: "medium",
    },
    {
        title: "Inmobiliaria Apex",
        category: "Funnels",
        description:
            "Embudo de captación de leads inmobiliarios automatizado. 3.200 leads calificados al mes con un CPA reducido 67%.",
        metrics: { label: "Leads/Mes", value: "3.2K" },
        icon: GitBranch,
        gradient: "from-[#06B6D4] via-[#22D3EE] to-[#67E8F9]",
        bgGradient:
            "radial-gradient(ellipse at 30% 70%, rgba(6,182,212,0.15) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)",
        size: "large",
    },
];
