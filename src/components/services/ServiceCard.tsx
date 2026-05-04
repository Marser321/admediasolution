"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

// ============================================================
// ServiceCard — Tarjeta holográfica con Tilt 3D + Shimmer
// ============================================================
export default function ServiceCard({
    icon: Icon,
    title,
    description,
    gradient,
    index,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Motion values para el tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
        stiffness: 200,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
        stiffness: 200,
        damping: 30,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileTap={{ scale: 0.97 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformPerspective: 800,
            }}
            className={`
        relative group cursor-pointer
        min-w-[280px] sm:min-w-0
        glass-card p-6 sm:p-8
        ${isMobile ? "shimmer-effect" : ""}
        transition-all duration-500
        hover:border-white/15 hover:bg-white/[0.06]
      `}
        >
            {/* Glow hover (solo desktop) */}
            <div
                className={`
          absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-700 pointer-events-none hidden md:block
          bg-gradient-to-br ${gradient}
        `}
                style={{ filter: "blur(20px)" }}
            />

            {/* Contenido */}
            <div className="relative z-10">
                {/* Icono */}
                <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5`}
                >
                    <Icon className="size-6 text-primary" />
                </div>

                {/* Texto */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>

                {/* Pseudo-link */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-text-muted group-hover:text-accent-blue transition-colors duration-300">
                    <span>Descubrir más</span>
                    <motion.span
                        className="inline-block"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        →
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}
