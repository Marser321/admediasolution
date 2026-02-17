"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, MousePointerClick, Users, Rocket } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
} from "recharts";

// ============================================================
// Datos mock (siempre positivos, siempre impresionantes)
// ============================================================
const CHART_DATA = [
    { month: "Ene", actual: 2400, potencial: 4800 },
    { month: "Feb", actual: 2800, potencial: 5600 },
    { month: "Mar", actual: 3200, potencial: 6900 },
    { month: "Abr", actual: 2900, potencial: 7200 },
    { month: "May", actual: 3400, potencial: 8100 },
    { month: "Jun", actual: 3800, potencial: 9400 },
];

const METRICS = [
    {
        icon: TrendingUp,
        label: "ROI Proyectado",
        value: "+347%",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
    },
    {
        icon: DollarSign,
        label: "CPC Óptimo",
        value: "$0.42",
        color: "text-accent-blue",
        bg: "bg-accent-blue/10",
    },
    {
        icon: MousePointerClick,
        label: "CTR Estimado",
        value: "4.8%",
        color: "text-text-primary",
        bg: "bg-white/10",
    },
    {
        icon: Users,
        label: "Leads / Mes",
        value: "+127",
        color: "text-accent-light",
        bg: "bg-accent-light/10",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

// ============================================================
// Scanner Dashboard — Resultado impresionante
// ============================================================
export default function ScannerDashboard({
    onClaim,
}: {
    onClaim: () => void;
}) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Título del resultado */}
            <motion.div variants={itemVariants} className="text-center">
                <p className="text-xs tracking-[0.2em] uppercase text-emerald-500 font-semibold mb-2">
                    ✦ Análisis completado
                </p>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-1">
                    Potencial de Crecimiento
                </h3>
                <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                    className="text-5xl sm:text-6xl font-display font-extrabold bg-gradient-to-r from-emerald-400 via-accent-blue to-accent-light bg-clip-text text-transparent"
                >
                    450%
                </motion.p>
            </motion.div>

            {/* Métricas en grid */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3"
            >
                {METRICS.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={metric.label}
                            className="bg-bg-card/50 backdrop-blur-md p-4 flex flex-col gap-2 rounded-xl border border-white/5"
                        >
                            <div className={`w-8 h-8 rounded-lg ${metric.bg} flex items-center justify-center`}>
                                <Icon className={`size-4 ${metric.color}`} />
                            </div>
                            <p className="text-[11px] text-text-muted uppercase tracking-wider">
                                {metric.label}
                            </p>
                            <p className={`text-xl font-bold ${metric.color}`}>
                                {metric.value}
                            </p>
                        </div>
                    );
                })}
            </motion.div>

            {/* Gráfico de barras */}
            <motion.div variants={itemVariants} className="bg-bg-card/50 backdrop-blur-md p-4 rounded-xl border border-white/5">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
                    Proyección de Ingresos (USD)
                </p>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CHART_DATA} barGap={4}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.05)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "#666", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis hide />
                            <Bar
                                dataKey="actual"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={20}
                            >
                                {CHART_DATA.map((_, index) => (
                                    <Cell key={`actual-${index}`} fill="rgba(255,255,255,0.08)" />
                                ))}
                            </Bar>
                            <Bar
                                dataKey="potencial"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={20}
                            >
                                {CHART_DATA.map((_, index) => (
                                    <Cell
                                        key={`potencial-${index}`}
                                        fill={`rgba(14, 165, 233, ${0.4 + index * 0.1})`} // Accent blue rgba
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4 mt-2 justify-center">
                    <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
                        <span className="w-2.5 h-2.5 rounded-sm bg-white/10" />
                        Actual
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-accent-blue">
                        <span className="w-2.5 h-2.5 rounded-sm bg-accent-blue/60" />
                        Con Solution
                    </span>
                </div>
            </motion.div>

            {/* CTA Final */}
            <motion.div variants={itemVariants} className="text-center">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={onClaim}
                    className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-light cursor-pointer transition-all duration-300 shadow-md shadow-accent-blue/10"
                >
                    <span className="absolute inset-0 rounded-full bg-accent-blue opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500" />
                    <span className="relative flex items-center gap-2.5">
                        <Rocket className="size-5" />
                        Reclamar este Crecimiento
                    </span>
                </motion.button>
                <p className="text-xs text-text-muted mt-3">
                    Sin compromiso · Resultados en 72hs
                </p>
            </motion.div>
        </motion.div>
    );
}
