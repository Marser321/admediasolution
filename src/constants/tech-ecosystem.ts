import {
    Target,
    Bot,
    BarChart3,
    Zap,
    RefreshCw,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";

export interface TechNode {
    icon: LucideIcon;
    label: string;
    color: string;
}

export const TECH_NODES: TechNode[] = [
    { icon: Target, label: "Targeting IA", color: "#00f3ff" },
    { icon: Bot, label: "Automatización", color: "#38bdf8" },
    { icon: BarChart3, label: "Analytics", color: "#00f3ff" },
    { icon: Zap, label: "Ads Engine", color: "#38bdf8" },
    { icon: RefreshCw, label: "Retención", color: "#00f3ff" },
    { icon: TrendingUp, label: "Escalado", color: "#38bdf8" },
];
