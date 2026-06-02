"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Database, LifeBuoy, Megaphone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import IslandBar from "@/components/layout/IslandBar";
import FooterContact from "@/components/sections/FooterContact";

// ============================================================
// Detalle de servicios. Los slugs se conservan para no romper enlaces.
// PLACEHOLDER: validar las métricas (stats) con datos reales.
// ============================================================
const SERVICES_DATA = {
    "embudos-neurales": {
        title: "AD Media CRM",
        subtitle: "Tu sistema de ventas a medida",
        description: "Un CRM personalizado para tu negocio: centraliza a tus clientes, automatiza el seguimiento y agenda citas sin que se te escape ni uno. Tú vendes, el sistema organiza.",
        features: [
            "Embudo de ventas y etapas a tu medida",
            "Seguimiento automático por WhatsApp y email",
            "Agenda de citas integrada",
            "Reportes claros de tus ventas",
        ],
        stats: [
            { label: "Seguimiento", value: "24/7" },
            { label: "Clientes organizados", value: "100%" },
            { label: "Leads perdidos", value: "0" },
        ],
        icon: Database,
        gradient: "from-primary to-accent-light",
    },
    "ads-autopilot": {
        title: "Soporte y mantenimiento",
        subtitle: "Soporte real, no bots",
        description: "No te dejamos solo. Mantenemos tu CRM, tu web y tus campañas funcionando y actualizados, con un equipo que responde y resuelve de verdad.",
        features: [
            "Soporte por WhatsApp en horario laboral",
            "Mantenimiento de tu web y tu CRM",
            "Ajustes y mejoras continuas",
            "Reportes de rendimiento",
        ],
        stats: [
            { label: "Disponibilidad", value: "24/7" },
            { label: "Soporte humano", value: "Real" },
            { label: "Sistemas al día", value: "100%" },
        ],
        icon: LifeBuoy,
        gradient: "from-accent-warm to-accent-stone",
    },
    "contenido-generativo": {
        title: "Dirección de marketing",
        subtitle: "Meta, Google y redes con estrategia",
        description: "Te decimos qué hacer y lo ejecutamos: Meta Ads, Google Ads, redes sociales y contenido con una estrategia clara y orientada a resultados. Somos Business Partner de Meta.",
        features: [
            "Campañas en Meta y Google Ads",
            "Gestión de redes sociales (Instagram, Facebook)",
            "Producción de contenido por nicho",
            "Estrategia orientada a ROI",
        ],
        stats: [
            { label: "Foco en resultados", value: "ROI" },
            { label: "Business Partner", value: "Meta" },
            { label: "Plataformas", value: "+2" },
        ],
        icon: Megaphone,
        gradient: "from-primary to-accent-light",
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
