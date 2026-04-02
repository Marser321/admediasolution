"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { FLOATING_ICONS_CONFIG, IconType } from "@/config/floatingIcons";

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

    const icons = FLOATING_ICONS_CONFIG[type] || [];

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
