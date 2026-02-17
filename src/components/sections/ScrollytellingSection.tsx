"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import FloatingIcons from "../ui/FloatingIcons";
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
        <span className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-accent-blue tabular-nums">
            {prefix}{displayValue}{suffix}
        </span>
    );
}

// ============================================================
// Card KPI Individual
// ============================================================
function KPICard({
    kpi,
    index,
    isInView,
}: {
    kpi: KPIData;
    index: number;
    isInView: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.7,
                delay: 0.4 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative p-6 rounded-2xl bg-bg-card/50 border border-white/5 backdrop-blur-sm hover:border-accent-blue/20 transition-all duration-500 overflow-hidden"
        >
            {/* Glow hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

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
// Scrollytelling Section — "Tecnología en Acción"
// ============================================================
export default function ScrollytellingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax suave para el fondo
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={sectionRef}
            id="estrategia"
            className="relative py-28 sm:py-36 px-5 sm:px-6 bg-bg-deep overflow-hidden"
        >
            {/* Background grid con parallax */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    y: bgY,
                }}
            />

            {/* Iconos flotantes */}
            <FloatingIcons type="crm" className="z-0 opacity-35" />

            {/* Divisor superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/10 to-transparent" />

            {/* Orbs de fondo */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-light/3 rounded-full blur-[100px] pointer-events-none" />

            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-blue mb-6 backdrop-blur-md"
                    >
                        Ecosistema de Crecimiento
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display-heavy text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-text-primary"
                    >
                        Tecnología que genera{" "}
                        <span className="text-accent-blue relative">
                            ingresos reales
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-blue to-accent-light"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                style={{ transformOrigin: "left" }}
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

                    {/* Columna izquierda: Animación orbital */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="order-2 lg:order-1 flex justify-center"
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

                        {/* Mini indicadores de proceso */}
                        <div className="space-y-4">
                            {[
                                { step: "01", text: "Diagnóstico y auditoría del negocio digital" },
                                { step: "02", text: "Despliegue de sistemas de adquisición multi-canal" },
                                { step: "03", text: "Optimización continua y escalado predecible" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <span className="text-xs font-bold text-accent-blue font-mono bg-accent-blue/5 border border-accent-blue/10 rounded-lg px-2.5 py-1.5 group-hover:bg-accent-blue/10 transition-colors">
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

                {/* === KPI Cards Grid === */}
                <div className="grid sm:grid-cols-3 gap-5 mb-20">
                    {KPIS.map((kpi, index) => (
                        <KPICard
                            key={kpi.label}
                            kpi={kpi}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>

                {/* CTA inferior */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <p className="text-sm text-text-muted mb-6 tracking-wide uppercase">
                        ¿Listo para activar este sistema?
                    </p>
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                            document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-bg-deep bg-text-primary hover:bg-white transition-all duration-300 cursor-pointer"
                    >
                        <span className="relative flex items-center gap-2.5">
                            <Rocket className="size-5" />
                            Escanear mi Negocio
                            <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
