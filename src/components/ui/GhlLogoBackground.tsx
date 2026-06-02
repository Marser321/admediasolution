"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GhlLogoBackgroundProps {
    className?: string;
    showGlow?: boolean;
}

export default function GhlLogoBackground({
    className = "absolute right-[-80px] sm:right-[-20px] top-[15%] w-[300px] sm:w-[500px] md:w-[600px] h-auto opacity-[0.07] sm:opacity-[0.09] filter drop-shadow-[0_0_80px_rgba(31,136,229,0.35)]",
    showGlow = true
}: GhlLogoBackgroundProps) {
    const shouldReduceMotion = useReducedMotion();
    const entranceInitial = (y: number) => shouldReduceMotion ? { y: 0, opacity: 1 } : { y, opacity: 0 };
    const entranceTransition = (delay: number) => shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 60, damping: 15, delay };
    const floatingAnimation = (offset: number) => shouldReduceMotion
        ? { y: 0 }
        : { y: [0, offset, 0] };
    const floatingTransition = (duration: number) => shouldReduceMotion
        ? { duration: 0 }
        : { duration, repeat: Infinity, ease: "easeInOut" as const };

    const svgContent = (
        <svg 
            viewBox="0 0 150 120" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* 1. Flecha Azul (Centro - Capa Trasera) */}
            <motion.g
                initial={entranceInitial(35)}
                animate={{ y: 0, opacity: 1 }}
                transition={entranceTransition(0.3)}
            >
                <motion.g
                    animate={floatingAnimation(-10)}
                    transition={floatingTransition(6.5)}
                >
                    {/* Cuerpo/Shaft Azul */}
                    <rect x="68" y="70" width="14" height="40" fill="#1F88E5" rx="1.5" />
                    {/* Sombra Doblada Azul */}
                    <path d="M82 70 L82 82 L75 70 Z" fill="#0D47A1" opacity="0.95" />
                    {/* Cabeza de Flecha Azul */}
                    <path d="M50 70 L75 42 L100 70 Z" fill="#1F88E5" />
                </motion.g>
            </motion.g>

            {/* 2. Flecha Amarilla (Izquierda - Capa Delantera) */}
            <motion.g
                initial={entranceInitial(45)}
                animate={{ y: 0, opacity: 1 }}
                transition={entranceTransition(0.1)}
            >
                <motion.g
                    animate={floatingAnimation(-15)}
                    transition={floatingTransition(8)}
                >
                    {/* Cuerpo/Shaft Amarillo */}
                    <rect x="25" y="45" width="14" height="65" fill="#F2B705" rx="1.5" />
                    {/* Sombra Doblada Amarilla */}
                    <path d="M39 45 L39 57 L32 45 Z" fill="#8C6500" opacity="0.95" />
                    {/* Cabeza de Flecha Amarilla */}
                    <path d="M7 45 L32 17 L57 45 Z" fill="#F2B705" />
                </motion.g>
            </motion.g>

            {/* 3. Flecha Verde (Derecha - Capa Delantera) */}
            <motion.g
                initial={entranceInitial(55)}
                animate={{ y: 0, opacity: 1 }}
                transition={entranceTransition(0.5)}
            >
                <motion.g
                    animate={floatingAnimation(-12)}
                    transition={floatingTransition(7.2)}
                >
                    {/* Cuerpo/Shaft Verde */}
                    <rect x="111" y="45" width="14" height="65" fill="#10D056" rx="1.5" />
                    {/* Sombra Doblada Verde */}
                    <path d="M125 45 L125 57 L118 45 Z" fill="#076B29" opacity="0.95" />
                    {/* Cabeza de Flecha Verde */}
                    <path d="M93 45 L118 17 L143 45 Z" fill="#10D056" />
                </motion.g>
            </motion.g>
        </svg>
    );

    if (!showGlow) {
        return svgContent;
    }

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Brillo de fondo (Glow Backdrop) detrás de las flechas */}
            <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-primary/10 blur-[130px] rounded-full mix-blend-screen animate-pulse-slow" />
            {svgContent}
        </div>
    );
}
