"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Rocket, LineChart } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";

// ============================================================
// Datos Mock de Servicios
// ============================================================
const SERVICES_DATA = {
    "ads-autopilot": {
        title: "Ads Autopilot",
        subtitle: "Publicidad Programática con IA",
        description: "Deja de quemar presupuesto. Nuestro motor de inteligencia artificial optimiza tus campañas en Meta, Google y TikTok las 24 horas del día, ajustando pujas y creativos en tiempo real.",
        features: [
            "Optimización de presupuesto en tiempo real",
            "A/B Testing automático de creativos",
            "Audience Targeting predictivo",
            "Dashboard de rendimiento unificado",
        ],
        stats: [
            { label: "ROAS Promedio", value: "4.5x" },
            { label: "Ahorro de Tiempo", value: "90%" },
            { label: "Reducción CPA", value: "-35%" },
        ],
        icon: Zap,
        gradient: "from-accent-warm to-accent-stone",
    },
    "contenido-generativo": {
        title: "Contenido Generativo",
        subtitle: "Fábrica de Contenidos Infinita",
        description: "Crea meses de contenido en minutos. Usamos modelos de lenguaje y generación de imagen avanzados para producir copy, social posts y videos que mantienen tu marca relevante.",
        features: [
            "Blog posts optimizados para SEO",
            "Copy persuasivo para Landing Pages",
            "Generación de imágenes de producto",
            "Calendario editorial automatizado",
        ],
        stats: [
            { label: "Posts / Mes", value: "100+" },
            { label: "Engagement", value: "+40%" },
            { label: "Costo / Pieza", value: "-80%" },
        ],
        icon: Rocket,
        gradient: "from-purple-500 to-indigo-500",
    },
    "embudos-neurales": {
        title: "Embudos Neurales",
        subtitle: "Conversión Inteligente",
        description: "Funnels que aprenden. Cada visitante es único, y nuestros embudos adaptan la oferta y el flujo en base al comportamiento del usuario para maximizar la probabilidad de conversión.",
        features: [
            "Personalización dinámica de ofertas",
            "Lead Scoring predictivo",
            "Email Marketing automatizado",
            "Recuperación de carritos con IA",
        ],
        stats: [
            { label: "Tasa de Conversión", value: "+12%" },
            { label: "Leads Calificados", value: "3x" },
            { label: "LTV del Cliente", value: "+25%" },
        ],
        icon: LineChart,
        gradient: "from-emerald-500 to-green-400",
    },
};

export default function ServiceDetail() {
    const params = useParams();
    const slug = params?.slug as string;
    const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-deep text-text-primary">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-slate-400 mb-8">Servicio no encontrado.</p>
                    <Link href="/" className="text-accent-warm hover:underline">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <main className="bg-bg-deep min-h-screen">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${service.gradient} opacity-20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
            </div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 bg-opacity-20`}>
                        <Icon className="size-8 text-white" />
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary mb-6">
                        {service.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed">
                        {service.description}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
                    {service.stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="glass-card p-6 border border-white/5 bg-white/[0.02]"
                        >
                            <p className="text-4xl font-bold text-text-primary mb-2">{stat.value}</p>
                            <p className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-display font-bold text-text-primary mb-12">Características Clave</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {service.features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle2 className="size-4 text-emerald-400" />
                                </div>
                                <p className="text-lg text-text-muted">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterContact />
            <IslandBar />
        </main>
    );
}
