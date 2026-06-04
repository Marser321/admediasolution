"use client";

import { motion } from "framer-motion";
import { 
    Shield,
    Gem,
    TrendingUp,
    Heart,
    Cpu,
    Globe,
    FileText,
    Home,
    Briefcase,
    DollarSign,
} from "lucide-react";

const CLIENT_BRANDS = [
    { name: "Del Toro Insurance", icon: Shield, color: "#3b82f6" },
    { name: "Ventura Joyería", icon: Gem, color: "#d97706" },
    { name: "EcomScale", icon: TrendingUp, color: "#10b981" },
    { name: "HealthFit", icon: Heart, color: "#ef4444" },
    { name: "LogiTec", icon: Cpu, color: "#6366f1" },
    { name: "AC Global Agency", icon: Globe, color: "#0ea5e9" },
    { name: "Abech", icon: FileText, color: "#10b981" },
    { name: "Realtor Laury", icon: Home, color: "#ec4899" },
    { name: "Empire Finest Group", icon: Briefcase, color: "#f59e0b" },
    { name: "Capital Ganador", icon: DollarSign, color: "#22c55e" },
];

const PARTNERS = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

export default function LogoMarquee() {
    return (
        <div className="relative w-full py-10 overflow-hidden">
            <div className="flex flex-col items-center mb-8">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/70 mb-2">
                    Marcas que confían en nosotros
                </span>
                <div className="h-px w-12 bg-primary/30" />
            </div>

            <motion.div 
                className="flex gap-6 items-center transform-gpu"
                animate={{ 
                    x: ["0%", "-50%"] 
                }}
                transition={{ 
                    duration: 35, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            >
                {PARTNERS.map((partner, i) => (
                    <div 
                        key={i}
                        className="flex-shrink-0 flex items-center gap-2.5 mx-8 group cursor-default opacity-60 hover:opacity-100 transition-all duration-500"
                    >
                        <partner.icon 
                            className="size-7 transition-transform duration-500 group-hover:scale-110" 
                            style={{ color: partner.color }} 
                        />
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors">
                            {partner.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
