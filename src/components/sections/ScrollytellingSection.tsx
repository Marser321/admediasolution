"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import FloatingIcons from "../ui/FloatingIcons";
import { AuroraBackground } from "../ui/AuroraBackground";
import { Button } from "../ui/Button";
import dynamic from "next/dynamic";

// Lazy load del ecosistema orbital para mejor performance
const TechEcosystemOrbit = dynamic(
    () => import("@/components/animations/TechEcosystemOrbit"),
    { ssr: false }
);

// ============================================================
// Datos de las métricas KPI
// ============================================================
interface KPIData {
    value: number;
    suffix: string;
    prefix: string;
    label: string;
    description: string;
    techLabel: string;
}

const KPIS: KPIData[] = [
    {
        value: 127,
        prefix: "+",
        suffix: "%",
        label: "Crecimiento Mensual",
        description: "Escalado predecible con embudos automatizados y segmentación por IA.",
        techLabel: "Ads Engine + Escalado",
    },
    {
        value: 4.5,
        prefix: "",
        suffix: "x",
        label: "ROAS Promedio",
        description: "Optimización constante del retorno sobre inversión publicitaria.",
        techLabel: "Analytics + Targeting IA",
    },
    {
        value: 40,
        prefix: "-",
        suffix: "%",
        label: "Costo por Adquisición",
        description: "Reducción del CPA mediante automatización y retargeting inteligente.",
        techLabel: "Automatización + Retención",
    },
];

// ============================================================
// Componente de Contador Animado
// ============================================================
function AnimatedCounter({
    value,
    prefix,
    suffix,
    isInView,
}: {
    value: number;
    prefix: string;
    suffix: string;
    isInView: boolean;
}) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.01,
    });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            // Para decimales (4.5x), mostrar con un decimal
            if (value % 1 !== 0) {
                setDisplayValue(latest.toFixed(1));
            } else {
                setDisplayValue(Math.round(latest).toString());
            }
        });
        return unsubscribe;
    }, [springValue, value]);

    return (
        <span className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-primary tabular-nums">
            {prefix}{displayValue}{suffix}
        </span>
    );
}

// ============================================================
// Card KPI Individual — Dashboard Loading Effect
// ============================================================
function KPICard({
    kpi,
    index,
    isInView,
    sectionProgress,
}: {
    kpi: KPIData;
    index: number;
    isInView: boolean;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    // Scroll-linked dashboard loading effect
    const threshold = 0.4 + index * 0.06;
    const cardOpacity = useTransform(sectionProgress, [threshold, threshold + 0.1], [0, 1]);
    const cardY = useTransform(sectionProgress, [threshold, threshold + 0.12], [100, 0]); // Increased parallax
    const cardScale = useTransform(sectionProgress, [threshold, threshold + 0.1], [0.9, 1]);

    // Progress bar fill animation
    const barFill = useTransform(sectionProgress, [threshold + 0.05, threshold + 0.18], [0, 1]);

    return (
        <motion.div
            style={{
                opacity: cardOpacity,
                y: cardY,
                scale: cardScale,
            }}
            className="group relative p-6 rounded-2xl bg-background border border-primary/25 hover:border-primary/50 transition-all duration-500 overflow-hidden sm:shadow-2xl will-change-transform"
        >
            {/* Glow hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            {/* Loading progress bar */}
            <motion.div
                style={{ scaleX: barFill, transformOrigin: "left" }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-light"
            />

            <div className="relative z-10">
                {/* Contador */}
                <div className="mb-3">
                    <AnimatedCounter
                        value={kpi.value}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix}
                        isInView={isInView}
                    />
                </div>

                {/* Label principal */}
                <p className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-2">
                    {kpi.label}
                </p>

                {/* Descripción */}
                <p className="text-sm text-text-muted leading-relaxed mb-4 font-light">
                    {kpi.description}
                </p>

                {/* Tech tag */}
                <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/20 to-transparent" />
                    <span className="text-[10px] font-mono text-accent-blue/60 uppercase tracking-wider whitespace-nowrap">
                        {kpi.techLabel}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ============================================================
// Scrollytelling Section — "Immersive Data Theater"
// ============================================================
export default function ScrollytellingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-100px" });
    const stepsRef = useRef<HTMLDivElement>(null);
    const isStepsInView = useInView(stepsRef, { once: true, margin: "-40px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax layers
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Background orbs — opposite directions for depth
    const orbTopY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const orbTopX = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const orbBottomY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const orbBottomX = useTransform(scrollYProgress, [0, 1], [0, -30]);

    // TechEcosystem scale on scroll
    const orbitScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1.2]); // More scale range
    const orbitOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
    const orbitY = useTransform(scrollYProgress, [0, 1], [40, -40]); // Vertical parallax

    // Underline draw for "ingresos reales"
    const underlineDraw = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

    // Timeline connector line between steps
    const timelineHeight = useTransform(scrollYProgress, [0.25, 0.5], ["0%", "100%"]);

    // CTA gravity drop
    const ctaY = useTransform(scrollYProgress, [0.7, 0.85], [-30, 0]);
    const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="estrategia"
            className="relative py-20 sm:py-32 px-5 sm:px-6 bg-background overflow-hidden"
        >
            {/* Background grid con parallax */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <div className="texture-grid" />
            </motion.div>

            {/* Iconos flotantes */}
            <FloatingIcons type="crm" className="z-0 opacity-[var(--floating-icon-opacity)]" />

            {/* Global Aurora Background */}
            <AuroraBackground intensity="medium" className="opacity-15" />
            
            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />

            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-6 backdrop-blur-md"
                    >
                        Ecosistema de Crecimiento
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display-heavy text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-text-primary"
                    >
                        Tecnología que genera{" "}
                        <span className="text-primary relative inline-block drop-shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            ingresos reales
                            {/* Scroll-drawn underline */}
                            <motion.div
                                className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent-light shadow-[0_2px_10px_rgba(0,102,255,0.4)]"
                                style={{ scaleX: underlineDraw, transformOrigin: "left" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        Un ecosistema de herramientas que trabajan en sinergia.
                        Cada componente potencia al siguiente para escalar tu negocio con certeza.
                    </motion.p>
                </div>

                {/* === Layout principal: 2 columnas === */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

                    {/* Columna izquierda: Animación orbital — Scale up on scroll */}
                    <motion.div
                        style={{ scale: orbitScale, opacity: orbitOpacity, y: orbitY }}
                        className="order-2 lg:order-1 flex justify-center will-change-transform drop-shadow-[0_0_50px_rgba(0,102,255,0.15)]"
                    >
                        <TechEcosystemOrbit />
                    </motion.div>

                    {/* Columna derecha: Descripción + mini-stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <div className="space-y-5">
                            <h3 className="font-display-heavy text-2xl sm:text-3xl text-text-primary leading-tight">
                                Cada pieza del sistema<br />
                                <span className="text-accent-light">amplifica los resultados.</span>
                            </h3>

                            <p className="text-base text-text-muted leading-relaxed font-light">
                                No es una herramienta. Es un ecosistema integrado donde la inteligencia artificial
                                supervisa cada interacción, optimiza cada peso invertido, y escala lo que funciona
                                — con certeza matemática.
                            </p>
                        </div>

                        {/* Mini indicadores de proceso — Timeline connector */}
                        <div ref={stepsRef} className="space-y-4 relative">
                            {/* Vertical timeline connector */}
                            <motion.div
                                style={{ height: timelineHeight }}
                                className="absolute left-[18px] top-[12px] w-[1px] bg-gradient-to-b from-accent-blue/30 to-accent-blue/5"
                            />
                            {[
                                { step: "01", text: "Diagnóstico y auditoría del negocio digital" },
                                { step: "02", text: "Despliegue de sistemas de adquisición multi-canal" },
                                { step: "03", text: "Optimización continua y escalado predecible" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isStepsInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                                    className="flex items-center gap-4 group relative z-10"
                                >
                                    <span className="text-xs font-bold text-primary font-mono bg-primary/5 border border-primary/20 rounded-lg px-2.5 py-1.5 group-hover:bg-primary/10 transition-colors">
                                        {item.step}
                                    </span>
                                    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* === KPI Cards Grid — Dashboard loading effect === */}
                <div className="grid sm:grid-cols-3 gap-5 mb-20">
                    {KPIS.map((kpi, index) => (
                        <KPICard
                            key={kpi.label}
                            kpi={kpi}
                            index={index}
                            isInView={isInView}
                            sectionProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* CTA inferior — Gravity drop */}
                <motion.div
                    style={{ y: ctaY, opacity: ctaOpacity }}
                    className="text-center"
                >
                    <p className="text-sm text-text-muted mb-6 tracking-wide uppercase">
                        ¿Listo para activar este sistema?
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        glow
                        aurora
                        onClick={() => {
                            document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group h-14 px-10"
                    >
                        <Rocket className="size-5" />
                        Escanear mi Negocio
                        <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
