"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
    Instagram,
    Facebook,
    Linkedin,
    Play,
    Aperture,
    BarChart3,
    TrendingUp,
    Users,
    Video,
    Target,
    Search,
    Megaphone,
    DollarSign,
    MousePointerClick,
    Database,
    Workflow,
    Bot,
    Mail,
    Phone,
    Camera,
    Palette,
    PenTool,
    ImagePlus,
    Figma,
    Zap,
    RefreshCcw,
    GitBranch,
    Settings,
    Globe,
    LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// Tipos de iconos — 7 variantes para cada sección
// ============================================================
type IconType = "social" | "services" | "analytics" | "marketing" | "crm" | "creative" | "automation";

interface FloatingIconsProps {
    type: IconType;
    className?: string;
}

export default function FloatingIcons({ type, className }: FloatingIconsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const icons = getIconsByType(type);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none z-0", className)}
        >
            {icons.map((item, i) => (
                <FloatingIcon
                    key={i}
                    icon={item.icon}
                    initialX={item.x}
                    initialY={item.y}
                    delay={item.delay}
                    scale={item.scale}
                    duration={item.duration}
                    scrollYProgress={scrollYProgress}
                    parallaxSpeed={item.parallaxSpeed}
                    color={item.color}
                />
            ))}
        </div>
    );
}

// ============================================================
// Configuración de iconos por tipo de sección
// ============================================================
function getIconsByType(type: IconType) {
    switch (type) {
        // --- Redes Sociales (Hero) ---
        case "social":
            return [
                { icon: Instagram, x: "10%", y: "20%", delay: 0, scale: 1.2, duration: 8, parallaxSpeed: 0.2, color: "text-pink-500/15" },
                { icon: Facebook, x: "85%", y: "15%", delay: 2, scale: 1.5, duration: 10, parallaxSpeed: 0.1, color: "text-blue-500/15" },
                { icon: Linkedin, x: "15%", y: "70%", delay: 1, scale: 1.1, duration: 9, parallaxSpeed: 0.3, color: "text-blue-400/15" },
                { icon: Play, x: "75%", y: "75%", delay: 3, scale: 1.3, duration: 11, parallaxSpeed: 0.15, color: "text-red-500/10" },
            ];

        // --- Servicios (ServicesSection) ---
        case "services":
            return [
                { icon: Video, x: "80%", y: "30%", delay: 0, scale: 2.0, duration: 12, parallaxSpeed: 0.15, color: "text-cyan-400/10" },
                { icon: Aperture, x: "20%", y: "60%", delay: 1.5, scale: 1.8, duration: 14, parallaxSpeed: 0.25, color: "text-purple-400/10" },
                { icon: Play, x: "50%", y: "85%", delay: 3, scale: 1.5, duration: 10, parallaxSpeed: 0.1, color: "text-white/8" },
            ];

        // --- Analytics (AuthoritySection) ---
        case "analytics":
            return [
                { icon: BarChart3, x: "8%", y: "25%", delay: 0, scale: 1.5, duration: 9, parallaxSpeed: 0.2, color: "text-green-400/10" },
                { icon: TrendingUp, x: "88%", y: "55%", delay: 2, scale: 1.8, duration: 11, parallaxSpeed: 0.15, color: "text-emerald-400/10" },
                { icon: Users, x: "42%", y: "15%", delay: 1, scale: 1.2, duration: 13, parallaxSpeed: 0.25, color: "text-cyan-300/10" },
                { icon: DollarSign, x: "75%", y: "80%", delay: 3, scale: 1.4, duration: 10, parallaxSpeed: 0.18, color: "text-green-300/8" },
            ];

        // --- Marketing Ads (ProblemSection) — Meta Ads, Google Ads ---
        case "marketing":
            return [
                { icon: Target, x: "12%", y: "18%", delay: 0, scale: 1.6, duration: 10, parallaxSpeed: 0.2, color: "text-blue-500/10" },
                { icon: Search, x: "82%", y: "22%", delay: 1.5, scale: 1.4, duration: 12, parallaxSpeed: 0.15, color: "text-yellow-400/10" },
                { icon: Megaphone, x: "18%", y: "72%", delay: 2.5, scale: 1.8, duration: 14, parallaxSpeed: 0.25, color: "text-orange-400/8" },
                { icon: DollarSign, x: "78%", y: "65%", delay: 0.8, scale: 1.3, duration: 9, parallaxSpeed: 0.12, color: "text-green-400/10" },
                { icon: MousePointerClick, x: "50%", y: "88%", delay: 3.5, scale: 1.5, duration: 11, parallaxSpeed: 0.18, color: "text-cyan-300/8" },
            ];

        // --- CRM & Automatización (ScrollytellingSection) — GoHighLevel, CRMs ---
        case "crm":
            return [
                { icon: Database, x: "10%", y: "30%", delay: 0, scale: 1.5, duration: 11, parallaxSpeed: 0.2, color: "text-purple-400/10" },
                { icon: Workflow, x: "85%", y: "20%", delay: 1.5, scale: 1.7, duration: 13, parallaxSpeed: 0.15, color: "text-cyan-400/10" },
                { icon: Bot, x: "22%", y: "75%", delay: 2, scale: 1.4, duration: 10, parallaxSpeed: 0.22, color: "text-blue-300/10" },
                { icon: Mail, x: "72%", y: "68%", delay: 3, scale: 1.3, duration: 12, parallaxSpeed: 0.18, color: "text-amber-400/8" },
                { icon: Phone, x: "48%", y: "12%", delay: 0.5, scale: 1.2, duration: 9, parallaxSpeed: 0.1, color: "text-green-400/8" },
            ];

        // --- Creativos (ProjectsGallery) — Foto, Diseño, Desarrollo ---
        case "creative":
            return [
                { icon: Camera, x: "15%", y: "22%", delay: 0, scale: 1.6, duration: 12, parallaxSpeed: 0.2, color: "text-amber-400/10" },
                { icon: Palette, x: "80%", y: "18%", delay: 1, scale: 1.4, duration: 10, parallaxSpeed: 0.15, color: "text-pink-400/10" },
                { icon: Figma, x: "25%", y: "78%", delay: 2.5, scale: 1.3, duration: 14, parallaxSpeed: 0.25, color: "text-violet-400/8" },
                { icon: PenTool, x: "70%", y: "72%", delay: 1.5, scale: 1.5, duration: 11, parallaxSpeed: 0.12, color: "text-blue-400/10" },
                { icon: ImagePlus, x: "52%", y: "90%", delay: 3, scale: 1.2, duration: 9, parallaxSpeed: 0.18, color: "text-cyan-300/8" },
            ];

        // --- Automation & Tech (ScannerSection) ---
        case "automation":
            return [
                { icon: Zap, x: "12%", y: "20%", delay: 0, scale: 1.5, duration: 10, parallaxSpeed: 0.2, color: "text-yellow-400/10" },
                { icon: RefreshCcw, x: "82%", y: "28%", delay: 1.5, scale: 1.4, duration: 12, parallaxSpeed: 0.15, color: "text-cyan-400/10" },
                { icon: GitBranch, x: "20%", y: "70%", delay: 2, scale: 1.7, duration: 14, parallaxSpeed: 0.22, color: "text-purple-400/8" },
                { icon: Settings, x: "75%", y: "75%", delay: 0.8, scale: 1.3, duration: 9, parallaxSpeed: 0.1, color: "text-slate-400/10" },
                { icon: Globe, x: "50%", y: "85%", delay: 3, scale: 1.6, duration: 11, parallaxSpeed: 0.18, color: "text-blue-400/8" },
            ];

        default:
            return [];
    }
}

// ============================================================
// FloatingIcon — Componente individual con parallax
// ============================================================
interface FloatingIconProps {
    icon: LucideIcon;
    initialX: string;
    initialY: string;
    delay: number;
    scale: number;
    duration: number;
    scrollYProgress: MotionValue<number>;
    parallaxSpeed: number;
    color: string;
}

function FloatingIcon({
    icon: Icon,
    initialX,
    initialY,
    delay,
    scale,
    duration,
    scrollYProgress,
    parallaxSpeed,
    color
}: FloatingIconProps) {
    const yRange = useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxSpeed]);

    return (
        <motion.div
            style={{
                left: initialX,
                top: initialY,
                y: yRange
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: scale,
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
            }}
            transition={{
                opacity: { duration: 1, delay: delay },
                scale: { duration: 1, delay: delay },
                y: {
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                },
                rotate: {
                    duration: duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }
            }}
            className={cn("absolute", color)}
        >
            <Icon size={48} strokeWidth={1.5} />
        </motion.div>
    );
}
