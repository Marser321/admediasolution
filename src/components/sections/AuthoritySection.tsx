"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import FloatingIcons from "../ui/FloatingIcons";
import {
    Target,
    Search,
    Workflow,
    Globe,
    Camera,
    Code2,
    MessageSquare,
} from "lucide-react";

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
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

// ============================================================
// Herramientas que domina Danger
// ============================================================
const TOOLS = [
    { icon: Target, label: "Meta Ads", color: "#0668E1" },
    { icon: Search, label: "Google Ads", color: "#4285F4" },
    { icon: Workflow, label: "GoHighLevel", color: "#81E7FF" },
    { icon: MessageSquare, label: "WhatsApp Business", color: "#25D366" },
    { icon: Globe, label: "Desarrollo Web", color: "#488EFF" },
    { icon: Camera, label: "Foto & Video", color: "#f59e0b" },
    { icon: Code2, label: "CRM & Automatización", color: "#8b5cf6" },
];

// ============================================================
// Authority Section — Split Parallax Portrait
// ============================================================
export default function AuthoritySection() {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);
    const isQuoteInView = useInView(quoteRef, { once: true, margin: "-60px" });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mouse tracking for interactive background glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Badge glow intensifies at center
    const badgeGlow = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.3, 0]);

    // Badge glow box shadow transform
    const badgeBoxShadow = useTransform(badgeGlow, (v) =>
        `0 0 ${v * 40}px rgba(72,142,255,${v})`
    );

    // Split parallax — columns enter from opposite sides
    const photoX = useTransform(scrollYProgress, [0, 0.35], [-80, 0]);
    const photoOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
    const photoScale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);

    const copyX = useTransform(scrollYProgress, [0, 0.35], [80, 0]);
    const copyOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

    // Background grid parallax
    const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    // Blockquote bar extension
    const quoteBarHeight = useTransform(scrollYProgress, [0.3, 0.5], [0, 100]);

    return (
        <section 
            ref={sectionRef} 
            onMouseMove={handleMouseMove}
            className="relative py-20 sm:py-32 px-5 sm:px-6 bg-[#050505] overflow-hidden"
        >

            {/* Static Aggressive Auroras for Density */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(11,50,127,0.5)_0%,_transparent_70%)] mix-blend-screen pointer-events-none z-0 animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,_rgba(72,142,255,0.3)_0%,_transparent_70%)] mix-blend-screen pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(129,231,255,0.15)_0%,_transparent_70%)] mix-blend-screen pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '3s' }} />

            {/* Interactive Mouse Glow - Brand Blue Spotlight */}
            <motion.div
                className="absolute pointer-events-none z-0 mix-blend-screen"
                style={{
                    width: "1200px",
                    height: "1200px",
                    left: smoothX,
                    top: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(129,231,255,0.1) 0%, rgba(72,142,255,0.15) 20%, rgba(11,50,127,0.1) 50%, transparent 70%)",
                }}
            />

            {/* Iconos flotantes — Analytics */}
            <FloatingIcons type="analytics" className="z-0 opacity-40" />

            {/* Background Texture - Grid with parallax */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(#488EFF 1px, transparent 1px), linear-gradient(90deg, #488EFF 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Column 1: Visual + Badge — Slides from LEFT */}
                <motion.div
                    style={{
                        x: photoX,
                        opacity: photoOpacity,
                        scale: photoScale,
                    }}
                    className="relative order-2 lg:order-1 will-change-transform"
                >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-[#050505] border border-white/10 shadow-[0_0_40px_rgba(72,142,255,0.1)] group">
                        {/* Foto CEO */}
                        <Image
                            src="/team/ceo.png"
                            alt="Danger Fernandez - CEO"
                            fill
                            className="object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            quality={100}
                            priority
                        />

                        {/* Blue Lighting Overlay & Glass Fusion */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-[#488EFF]/40 mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(129,231,255,0.3)_0%,_rgba(72,142,255,0.2)_30%,_transparent_70%)] mix-blend-screen pointer-events-none" />

                        {/* Floating Badge — Glow intensifies at viewport center */}
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-bg-card/60 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    style={{
                                        boxShadow: badgeBoxShadow,
                                    }}
                                    className="size-10 rounded-full bg-accent-blue flex items-center justify-center text-black font-bold font-display text-sm"
                                >
                                    DF
                                </motion.div>
                                <div>
                                    <p className="text-sm font-bold text-text-primary">Danger Fernandez</p>
                                    <p className="text-xs text-accent-blue">Revenue Systems Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Column 2: Copy & Stats — Slides from RIGHT */}
                <motion.div
                    style={{
                        x: copyX,
                        opacity: copyOpacity,
                    }}
                    className="order-1 lg:order-2 will-change-transform"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.p variants={itemVariants} className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-blue mb-4">
                            CEO & Fundador
                        </motion.p>

                        <motion.h2 variants={itemVariants} className="font-display-heavy text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-text-primary">
                            Danger Fernandez.
                            <span className="block text-text-muted font-light mt-2 text-xl sm:text-2xl">Revenue Systems Engineer</span>
                        </motion.h2>

                        {/* Bio extendida */}
                        <motion.div variants={itemVariants} className="space-y-4 text-base sm:text-lg text-text-muted leading-relaxed mb-8">
                            <p>
                                No soy una agencia. Soy un <strong className="text-text-primary">ingeniero de sistemas de ingresos</strong>.
                            </p>
                            <p>
                                Diseñé y escalé +150 campañas de Meta Ads y Google Ads. Construí funnels completos en GoHighLevel. Automaticé CRMs de empresas que facturan 7 cifras. Y filmé el contenido yo mismo.
                            </p>
                        </motion.div>

                        {/* Quote — Bar extends first, then text fades in */}
                        <motion.blockquote
                            ref={quoteRef}
                            variants={itemVariants}
                            className="relative pl-5 mb-10 italic text-text-muted/80 overflow-hidden"
                        >
                            {/* Animated bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={isQuoteInView ? { height: "100%" } : { height: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute left-0 top-0 w-[2px] bg-accent-blue/40"
                            />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isQuoteInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                &ldquo;Si tu agencia actual no puede hacer eso con una sola persona, tenés un equipo — no tenés un sistema.&rdquo;
                            </motion.span>
                        </motion.blockquote>

                        {/* Stats Grid — Sequential reveal left to right */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-8 mb-8">
                            {[
                                { value: "+$10M", label: "Revenue Generado" },
                                { value: "150+", label: "Campañas" },
                                { value: "0%", label: "Churn 2025" },
                                { value: "4+", label: "Años de Exp." },
                            ].map((stat, i) => (
                                <StatItem key={i} stat={stat} index={i} sectionProgress={scrollYProgress} />
                            ))}
                        </motion.div>

                        {/* Fila de herramientas — Cascade entry */}
                        <motion.div variants={itemVariants}>
                            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted/60 mb-4">
                                Stack Operativo & Maestría
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {TOOLS.map((tool, i) => (
                                    <ToolBadge key={i} tool={tool} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

// ============================================================
// Stat Item — Reveals sequentially left-to-right on scroll
// ============================================================
function StatItem({
    stat,
    index,
    sectionProgress,
}: {
    stat: { value: string; label: string };
    index: number;
    sectionProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const threshold = 0.35 + index * 0.04;
    const opacity = useTransform(sectionProgress, [threshold, threshold + 0.08], [0, 1]);
    const y = useTransform(sectionProgress, [threshold, threshold + 0.1], [20, 0]);

    return (
        <motion.div style={{ opacity, y }} className="text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
                {stat.value}
            </p>
            <p className="text-[10px] text-accent-blue/80 uppercase tracking-wider mt-1">{stat.label}</p>
        </motion.div>
    );
}

// ============================================================
// Tool Badge — Cascading entry with micro-rotation
// ============================================================
function ToolBadge({
    tool,
    index,
}: {
    tool: (typeof TOOLS)[0];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                y: -2,
                backgroundColor: `${tool.color}15`,
                borderColor: `${tool.color}40`,
                color: tool.color
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-text-muted transition-all duration-300 cursor-default group"
        >
            <tool.icon className="size-4 transition-colors" style={{ color: tool.color }} />
            <span className="group-hover:text-text-primary transition-colors">{tool.label}</span>
        </motion.div>
    );
}
