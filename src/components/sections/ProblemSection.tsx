"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import FloatingIcons from "../ui/FloatingIcons";
import { STAGES, StageData } from "@/data/funnel-stages";

// ============================================================
// Variants
// ============================================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    },
};

// ============================================================
// Connector Line Component (SVG)
// ============================================================
function ConnectorLine({ height = 24 }: { height?: number }) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[2px] bg-accent-blue/10 flex flex-col items-center justify-center overflow-hidden" style={{ height: `${height}px`, zIndex: 0 }}>
            <motion.div
                className="w-full bg-accent-blue/40"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

// ============================================================
// Funnel Stage Component
// ============================================================
function FunnelStage({
    data,
    isLast
}: {
    data: StageData;
    isLast: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    // Calculated widths for visual scaling
    // We use inline styles for precise control over the visual funnel taper
    const dynamicStyle = { width: `${data.widthPercent}%` };

    return (
        <div className="relative group flex flex-col items-center justify-center w-full z-10">

            {/* The Bar */}
            <motion.div
                layout
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative h-14 sm:h-16 rounded-xl border flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10",
                    data.hasLeak && !isHovered
                        ? "bg-red-500/5 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                        : "bg-accent-blue/5 border-accent-blue/10 group-hover:border-accent-blue/30 group-hover:bg-accent-blue/10"
                )}
                style={dynamicStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center gap-2 px-2 text-center">
                    <span className={cn(
                        "text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                        data.hasLeak && !isHovered ? "text-red-400" : "text-text-muted group-hover:text-accent-blue"
                    )}>
                        {data.label}
                    </span>

                    {/* Fixed Icon - appears on hover inside the bar */}
                    {data.hasLeak && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                            className="hidden sm:flex text-accent-blue"
                        >
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                    )}
                </div>

                {/* Leak Indicator (Right Side) */}
                <AnimatePresence>
                    {data.hasLeak && !isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+12px)] sm:translate-x-[calc(100%+20px)] flex items-center gap-3 w-max pointer-events-none"
                        >
                            {/* Animated Leak Stream */}
                            <div className="relative w-8 h-[2px] bg-gradient-to-r from-red-500/50 to-transparent rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-red-400/80 w-[50%]"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            {/* Label */}
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider">{data.leakLabel}</span>
                                <span className="text-[9px] sm:text-[10px] text-red-400/60 font-mono">{data.leakAmount}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Optimized Indicator (Right Side - Replaces Leak) */}
                <AnimatePresence>
                    {data.hasLeak && isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+12px)] sm:translate-x-[calc(100%+20px)] flex items-center gap-2 w-max"
                        >
                            <div className="w-8 h-[1px] bg-accent-blue/30" />
                            <span className="text-[10px] sm:text-xs font-bold text-accent-blue uppercase tracking-wider flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                                </span>
                                Solucionado
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>

            {/* Connector Line to next stage */}
            {!isLast && <ConnectorLine />}

            {/* Gap for spacing */}
            {!isLast && <div className="h-6 w-full" />}
        </div>
    );
}

// ============================================================
// Problem Section — "The Broken Bucket"
// ============================================================
export default function ProblemSection() {
    return (
        <section className="relative py-24 sm:py-32 px-5 sm:px-6 bg-bg-surface overflow-hidden">
            {/* Iconos flotantes — Marketing */}
            <FloatingIcons type="marketing" className="z-0 opacity-40" />
            {/* Background Texture Line/Grid - Fixed pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Soft gradients */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-deep to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-deep to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Column 1: NEPQ Copy */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="order-2 lg:order-1"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 p-2 pr-4 rounded-full bg-red-500/5 border border-red-500/10 w-fit">
                        <div className="bg-red-500/10 p-1 rounded-full">
                            <AlertCircle className="size-4 text-red-400" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest">
                            Diagnóstico Crítico
                        </span>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="font-display-heavy text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8">
                        ¿Tu problema es falta de leads, o es que tienes una <span className="text-red-400 relative inline-block">
                            fuga en el seguimiento
                            <svg className="absolute w-full h-2 bottom-0 left-0 translate-y-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="text-red-400/50" />
                            </svg>
                        </span>?
                    </motion.h2>

                    <motion.div variants={itemVariants} className="text-lg text-text-muted leading-relaxed mb-8 flex gap-4">
                        <div className="w-1 self-stretch bg-gradient-to-b from-red-500/30 to-transparent rounded-full" />
                        <p>
                            Invertir en Ads sin un sistema de retención es como echar agua en un <strong className="text-text-primary">balde roto</strong>.
                            El mercado no perdona la lentitud.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-2xl bg-bg-deep border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-base sm:text-lg text-text-primary font-light relative z-10">
                            ¿Cuánto te está costando realmente esa fuga cada mes?
                            <span className="block mt-3 text-sm text-text-muted font-mono border-t border-white/5 pt-3">
                                <span className="text-red-400 font-bold">DATO:</span> El 70% de los leads se pierden por no responder en los primeros 5 min.
                            </span>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Column 2: Visual Funnel Repaired */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative order-1 lg:order-2"
                >
                    {/* Visual Container */}
                    <div className="relative p-8 sm:p-12 pr-12 sm:pr-24 rounded-[2rem] bg-bg-deep/80 border border-white/5 shadow-2xl backdrop-blur-md">
                        {/* Header Funnel */}
                        <div className="text-center mb-10">
                            <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2">Tu Proceso Actual</p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-blue/5 border border-accent-blue/10">
                                <MousePointer2 className="w-3 h-3 text-accent-blue" />
                                <p className="text-[10px] text-accent-blue/80 font-medium">Pasá el mouse para reparar</p>
                            </div>
                        </div>

                        {/* Funnel Stack - Grid Layout implemented via Flex col + Widths */}
                        <div className="flex flex-col items-center w-full max-w-sm mx-auto">
                            {STAGES.map((stage, index) => (
                                <FunnelStage
                                    key={stage.id}
                                    data={stage}
                                    isLast={index === STAGES.length - 1}
                                />
                            ))}
                        </div>

                        {/* Bottom Result */}
                        <div className="mt-8 flex justify-center">
                            <div className="px-5 py-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs font-mono flex items-center gap-2 shadow-lg shadow-red-900/10">
                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                Rentabilidad: Crítica
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-blue/5 blur-[80px] rounded-full -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full -z-10" />

                    {/* Grid decorations */}
                    <svg className="absolute -z-10 top-0 right-0 w-32 h-32 opacity-20 text-accent-blue" viewBox="0 0 100 100" fill="none">
                        <path d="M10 10 H 90 V 90" stroke="currentColor" strokeDasharray="4 4" />
                    </svg>

                </motion.div>

            </div>
        </section>
    );
}
