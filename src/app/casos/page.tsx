"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";

// PLACEHOLDER: casos de ejemplo on-brand. Reemplazar con casos reales
// (empresa con permiso, métrica verificada). Mantener la estructura.
const CASES = [
    {
        client: "Tienda en línea",
        industry: "E-commerce",
        metric: "$80K",
        label: "Facturación al mes",
        description: "Ayudamos a esta empresa con su CRM personalizado y su seguimiento automático. Pasó de $25K a más de $80K al mes.",
        color: "bg-blue-500",
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
        icon: DollarSign,
        colSpan: "md:col-span-1",
    },
    {
        client: "Inmobiliaria",
        industry: "Inmobiliaria",
        metric: "x2",
        label: "Cierres",
        description: "Ayudamos a esta empresa con un CRM a medida y soporte continuo que duplicó sus cierres.",
        color: "bg-blue-500",
        icon: ArrowUpRight,
        colSpan: "md:col-span-2",
    },
];

export default function CasesPage() {
    return (
        <main className="bg-[#0a0a0a] min-h-screen">
            <Navbar />
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Header */}
            <section className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
                >
                    Resultados Reales.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-400"
                >
                    No vendemos humo. Ayudamos a empresas reales a vender más.
                </motion.p>
            </section>

            {/* Grid de Casos */}
            <section className="px-6 pb-24 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CASES.map((item, i) => (
                        <motion.div
                            key={item.client}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/5 p-8 hover:bg-white/[0.05] transition-colors duration-300 ${item.colSpan}`}
                        >
                            {/* Glow en hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.color} to-transparent pointer-events-none`} />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 mb-1">{item.industry}</p>
                                        <h3 className="text-2xl font-bold text-white">{item.client}</h3>
                                    </div>
                                    <div className={`p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors`}>
                                        <item.icon className="size-6 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <p className={`text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted mb-2`}>
                                        {item.metric}
                                    </p>
                                    <p className="text-lg font-medium text-accent-warm mb-4">{item.label}</p>
                                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="text-center pb-20">
                <Link
                    href="/"
                    className="text-slate-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                >
                    Volver al inicio
                </Link>
            </div>

            <FooterContact />
            <IslandBar />
        </main>
    );
}
