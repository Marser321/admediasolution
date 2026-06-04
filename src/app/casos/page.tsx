"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface CaseItem {
    client: string;
    industry: string;
    metric: string;
    /** Si la métrica es numérica, se anima con contador. */
    value?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    description: string;
    color: string;
    accent: string;
    icon: ComponentType<{ className?: string }>;
    colSpan: string;
}

// PLACEHOLDER: casos de ejemplo on-brand. Reemplazar con casos reales
// (empresa con permiso, métrica verificada). Mantener la estructura.
const CASES: CaseItem[] = [
    {
        client: "Tienda en línea",
        industry: "E-commerce",
        metric: "$80K",
        value: 80,
        prefix: "$",
        suffix: "K",
        label: "Facturación al mes",
        description: "Ayudamos a esta empresa con su CRM personalizado y su seguimiento automático. Pasó de $25K a más de $80K al mes.",
        color: "bg-blue-500",
        accent: "#3b82f6",
        icon: TrendingUp,
        colSpan: "md:col-span-2",
    },
    {
        client: "Negocio de salud",
        industry: "Salud y bienestar",
        metric: "Agenda",
        label: "Citas que llegan solas",
        description: "Ayudamos a esta empresa con su dirección de marketing y campañas en Meta Ads para llenar su agenda.",
        color: "bg-sky-500",
        accent: "#0ea5e9",
        icon: Users,
        colSpan: "md:col-span-1",
    },
    {
        client: "Empresa de servicios",
        industry: "Servicios",
        metric: "ROI",
        label: "Inversión con retorno",
        description: "Ayudamos a esta empresa con su pauta en Google y Meta, midiendo cada dólar invertido.",
        color: "bg-orange-500",
        accent: "#f97316",
        icon: DollarSign,
        colSpan: "md:col-span-1",
    },
    {
        client: "Inmobiliaria",
        industry: "Inmobiliaria",
        metric: "x2",
        value: 2,
        prefix: "x",
        suffix: "",
        label: "Cierres",
        description: "Ayudamos a esta empresa con un CRM a medida y soporte continuo que duplicó sus cierres.",
        color: "bg-blue-500",
        accent: "#3b82f6",
        icon: ArrowUpRight,
        colSpan: "md:col-span-2",
    },
];

export default function CasesPage() {
    return (
        <main className="bg-background text-foreground min-h-screen">
            <Navbar />
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Header */}
            <section className="pt-24 sm:pt-28 pb-8 sm:pb-10 px-5 sm:px-6 text-center max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 sm:mb-5 leading-tight"
                >
                    Resultados Reales.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base sm:text-xl text-muted-foreground leading-relaxed"
                >
                    No vendemos humo. Ayudamos a empresas reales a vender más.
                </motion.p>
            </section>

            {/* Grid de Casos */}
            <section className="px-5 sm:px-6 pb-12 sm:pb-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {CASES.map((item, i) => (
                        <motion.div
                            key={item.client}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, type: "spring", stiffness: 70, damping: 16 }}
                            className={`group relative overflow-hidden rounded-3xl bg-card/40 border border-border p-6 sm:p-8 hover:bg-card/60 transition-colors duration-300 ${item.colSpan}`}
                        >
                            {/* Fondo: curva de crecimiento que se traza al entrar en vista */}
                            <MetricBurst color={item.accent} intensity="soft" density="low" />

                            {/* Glow en hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.color} to-transparent pointer-events-none`} />

                            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                {/* Top: industria como chip + icono */}
                                <div className="flex justify-between items-start">
                                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1 rounded-full bg-muted/40 border border-border">
                                        {item.industry}
                                    </span>
                                    <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                        <item.icon className="size-6 text-primary" />
                                    </div>
                                </div>

                                {/* La métrica manda */}
                                <div>
                                    {item.value != null ? (
                                        <AnimatedCounter
                                            value={item.value}
                                            prefix={item.prefix}
                                            suffix={item.suffix}
                                            className="block font-display font-bold leading-none text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted mb-2"
                                        />
                                    ) : (
                                        <p className="text-4xl sm:text-5xl font-display font-bold leading-none break-words text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted mb-2">
                                            {item.metric}
                                        </p>
                                    )}
                                    <p className="text-lg font-medium text-accent-warm">{item.label}</p>
                                    <p className="text-sm font-semibold text-foreground mt-3">{item.client}</p>
                                    {/* Descripción larga: 2 líneas por defecto, completa en hover */}
                                    <p className="text-muted-foreground leading-relaxed text-sm mt-1 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="text-center pb-12 sm:pb-16">
                <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                >
                    Volver al inicio
                </Link>
            </div>

            <FooterContact />
            <IslandBar />
        </main>
    );
}
