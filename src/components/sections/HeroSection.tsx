"use client";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import FloatingIcons from "../ui/FloatingIcons";
import { motion } from "framer-motion";
import { ArrowDown, PlayCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Load 3D Canvas dynamically
const OrbitalCore = dynamic(
    () => import("@/components/three/OrbitalCore"),
    { ssr: false }
);

// ============================================================
// Animation Variants — Cinematic & Slow
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Slightly faster stagger for engagement
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

// ============================================================
// Hero Section — "Revenue OS"
// ============================================================
export default function HeroSection() {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    const handleScrollToScanner = () => {
        const el = document.getElementById("scanner");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleScrollToServicios = () => {
        const el = document.getElementById("servicios");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="hero"
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* 1. Background Layer: Grain & Grid */}
            <div className="absolute inset-0 z-0 texture-travertine opacity-40 mix-blend-soft-light" />
            <FloatingIcons type="social" className="z-0 opacity-60" />
            <div className="bg-noise z-[1]" />

            {/* 2. Aurora Effects (Deep Space: Blue Electric & Dark Magenta) */}
            {/* Top Right - Blue Electric */}
            <div className="orb-glow top-[-10%] right-[-5%] bg-[#00d4e6]/15 animate-pulse-slow" />

            {/* Bottom Left - Dark Magenta */}
            <div className="orb-glow bottom-[-10%] left-[-5%] bg-[#8b008b]/20 animate-pulse-slow" style={{ animationDelay: "5s" }} />

            {/* 3. 3D Core Layer - Conditional Render */}
            {!isMobile && (
                <div className="absolute inset-0 z-[2] opacity-80 mix-blend-screen scale-90 sm:scale-100">
                    <OrbitalCore />
                </div>
            )}

            {/* Mobile Fallback Background */}
            {isMobile && (
                <div className="absolute inset-0 z-[2] opacity-60 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-blue/20 via-transparent to-transparent" />
            )}

            {/* 4. Vignette & Lighting */}
            <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 20%, #0a0a0a 100%)",
                }}
            />

            {/* 5. Content Layer (Logo eliminado — lo maneja el Navbar) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-0 sm:mt-10"
            >
                {/* Tech Badge */}
                <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md shadow-[0_0_10px_rgba(0,212,230,0.08)]">
                        <Zap className="size-3 text-primary fill-primary animate-pulse" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary text-glow-neon">
                            System v2.0 Online
                        </span>
                    </div>
                </motion.div>

                {/* H1 Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display-heavy text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1.1] sm:leading-[1.05] mb-8 text-white drop-shadow-2xl"
                >
                    No es marketing. <br className="hidden sm:block" />
                    Es <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary/80 text-glow-neon italic">Ingeniería de Ingresos</span>.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 sm:mb-14 leading-relaxed font-light"
                >
                    Deja de perseguir leads. Instala un <span className="text-white font-medium border-b border-primary/30">Protocolo de Conversión Automatizado</span> que opera 24/7 con precisión quirúrgica.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    {/* Primary CTA - Glass Neon */}
                    <Button
                        variant="primary"
                        size="lg"
                        glow
                        onClick={handleScrollToScanner}
                        className="group relative px-8 py-6 rounded-full text-lg shadow-[0_0_15px_rgba(0,212,230,0.1)] hover:shadow-[0_0_25px_rgba(0,212,230,0.15)] border border-primary/30"
                    >
                        <span className="relative flex items-center gap-3 font-semibold tracking-wide">
                            INICIAR AUDITORÍA
                            <PlayCircle className="size-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                        </span>
                    </Button>

                    {/* Secondary CTA - Minimal */}
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={handleScrollToServicios}
                        className="group flex items-center gap-2 text-muted-foreground hover:text-white transition-colors duration-300"
                    >
                        Explorar el Sistema
                        <ArrowDown className="size-4 opacity-50 group-hover:translate-y-1 group-hover:text-primary transition-all duration-300" />
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
            >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Scroll</div>
                <div className="h-12 w-[1px] bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
        </section>
    );
}
