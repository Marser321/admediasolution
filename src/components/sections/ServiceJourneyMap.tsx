"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY_STAGES } from "@/lib/data/serviceJourney";
import { getDeptTheme } from "@/lib/data/teamIdentity";

// ============================================================
// ServiceJourneyMap — Mapa interactivo del recorrido del servicio.
// Evolución del antiguo mapa de sinergias: un camino serpenteante
// de 8 etapas (primera llamada → optimización) donde cada nodo
// muestra qué pasa, qué áreas intervienen y qué queda entregado.
// Todo en la familia azul/celeste de la marca.
// ============================================================

// Camino en S: 4 nodos arriba (izq→der), giro y 4 abajo (der→izq).
const PATH_D = "M 100 70 H 820 C 950 70, 950 230, 820 230 H 100";
const NODE_POS = [
    { x: 10, y: 23.3 },
    { x: 34, y: 23.3 },
    { x: 58, y: 23.3 },
    { x: 82, y: 23.3 },
    { x: 82, y: 76.7 },
    { x: 58, y: 76.7 },
    { x: 34, y: 76.7 },
    { x: 10, y: 76.7 },
];

export default function ServiceJourneyMap() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-10 px-4">
            {/* ===== Desktop: camino serpenteante interactivo ===== */}
            <div className="hidden md:block relative w-full h-[280px]">
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1000 300"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="journey-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#488EFF" />
                            <stop offset="50%" stopColor="#81E7FF" />
                            <stop offset="100%" stopColor="#488EFF" />
                        </linearGradient>
                    </defs>

                    {/* Traza estática de fondo */}
                    <path
                        d={PATH_D}
                        fill="none"
                        stroke="rgba(72, 142, 255, 0.12)"
                        strokeWidth="4"
                    />

                    {/* Trazo que se dibuja al entrar en vista */}
                    <motion.path
                        d={PATH_D}
                        fill="none"
                        stroke="url(#journey-glow)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.5 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        style={reduce ? { opacity: 0.5 } : undefined}
                    />

                    {/* Dash viajero: el sistema "circulando" */}
                    {!reduce && (
                        <motion.path
                            d={PATH_D}
                            fill="none"
                            stroke="url(#journey-glow)"
                            strokeWidth="3"
                            strokeDasharray="10, 18"
                            animate={{ strokeDashoffset: [0, -112] }}
                            transition={{ ease: "linear", duration: 9, repeat: Infinity }}
                        />
                    )}

                    {/* Pulso que recorre el camino completo */}
                    {!reduce && (
                        <motion.circle
                            r="5"
                            fill="#7DD3FC"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                            style={{
                                offsetPath: `path('${PATH_D}')`,
                                filter: "drop-shadow(0 0 8px var(--primary, #0066FF))",
                            }}
                        />
                    )}
                </svg>

                {/* Nodos de etapa */}
                {JOURNEY_STAGES.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const pos = NODE_POS[index];
                    const isActive = active === index;

                    return (
                        <div
                            key={stage.id}
                            style={{
                                position: "absolute",
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            className="z-20"
                        >
                            <button
                                type="button"
                                aria-label={`${stage.title} — ${stage.subtitle}`}
                                aria-expanded={isActive}
                                onMouseEnter={() => setActive(index)}
                                onClick={() => setActive(isActive ? null : index)}
                                className="group relative block cursor-pointer"
                            >
                                {/* Anillo pulsante del nodo activo */}
                                {isActive && !reduce && (
                                    <motion.span
                                        className="absolute -inset-2 rounded-full border-2 border-primary/50"
                                        initial={{ scale: 0.8, opacity: 0.6 }}
                                        animate={{ scale: 1.25, opacity: [0.5, 0.1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                                <motion.span
                                    animate={{
                                        scale: isActive ? 1.18 : 1,
                                        boxShadow: isActive
                                            ? "0 0 24px rgba(72, 142, 255, 0.55)"
                                            : "0 0 0px rgba(0,0,0,0)",
                                    }}
                                    className={`glass-premium flex size-12 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                                        isActive
                                            ? "border-primary text-primary"
                                            : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                                    }`}
                                >
                                    <StageIcon className="size-5" />
                                </motion.span>
                                {/* Número de paso */}
                                <span
                                    className={`absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border bg-background font-mono text-[9px] font-bold transition-colors duration-300 ${
                                        isActive ? "border-primary text-primary" : "border-border text-muted-foreground"
                                    }`}
                                >
                                    {index + 1}
                                </span>
                            </button>

                            {/* Título bajo el nodo */}
                            <div
                                className={`absolute left-1/2 w-[150px] -translate-x-1/2 select-none text-center ${
                                    pos.y < 50 ? "top-14" : "bottom-14"
                                }`}
                            >
                                <p
                                    className={`text-[11px] font-bold transition-colors duration-300 ${
                                        isActive ? "text-primary" : "text-foreground"
                                    }`}
                                >
                                    {stage.title}
                                </p>
                                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {stage.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tarjeta de detalle (desktop) */}
            <div className="hidden md:block mt-5 min-h-[132px] rounded-2xl border border-primary/10 bg-card/25 p-5 text-left backdrop-blur-md transition-all duration-300">
                {active !== null ? (
                    <motion.div
                        key={active}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto grid max-w-4xl grid-cols-[1fr_auto] items-start gap-6"
                    >
                        <div>
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-[10px] font-bold text-primary">
                                    Paso 0{active + 1} / 0{JOURNEY_STAGES.length}
                                </span>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                                    {JOURNEY_STAGES[active].title}
                                    <span className="text-primary"> — {JOURNEY_STAGES[active].subtitle}</span>
                                </h4>
                            </div>
                            <p className="mt-2 max-w-2xl text-xs font-light leading-relaxed text-muted-foreground">
                                {JOURNEY_STAGES[active].desc}
                            </p>
                            {/* Entregables */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {JOURNEY_STAGES[active].deliverables.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground/80"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Quién interviene */}
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Quién interviene
                            </span>
                            {JOURNEY_STAGES[active].depts.map((dept) => {
                                const theme = getDeptTheme(dept);
                                const DeptIcon = theme.motifIcon;
                                return (
                                    <span
                                        key={dept}
                                        className="glass-premium inline-flex items-center gap-1.5 rounded-full bg-card/60 px-2.5 py-1 text-[10px] font-bold text-foreground/90"
                                    >
                                        <DeptIcon className="size-3" style={{ color: theme.accent }} />
                                        {dept}
                                    </span>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex h-full min-h-[92px] items-center justify-center text-xs font-light italic text-muted-foreground">
                        Pasa el cursor por cada paso del recorrido para ver qué hacemos y qué área lo ejecuta.
                    </div>
                )}
            </div>

            {/* ===== Mobile: timeline vertical ===== */}
            <div className="relative mt-6 block space-y-4 pl-8 text-left md:hidden">
                {/* Línea vertical conectora */}
                <div className="absolute bottom-4 left-[17px] top-4 w-[2px] bg-primary/20" />

                {JOURNEY_STAGES.map((stage, index) => {
                    const StageIcon = stage.icon;
                    return (
                        <div
                            key={stage.id}
                            className="glass-premium relative flex flex-col gap-1.5 rounded-xl border border-primary/10 bg-card/30 p-3"
                        >
                            {/* Nodo en la línea */}
                            <div className="absolute -left-[31px] top-3.5 flex size-8 items-center justify-center rounded-full border border-primary bg-card text-primary shadow-md">
                                <StageIcon className="size-4" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-mono text-[9px] font-bold text-primary">0{index + 1}</span>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                                    {stage.title}
                                </h4>
                            </div>
                            <p className="text-[9px] font-semibold uppercase tracking-wider text-accent-light">
                                {stage.subtitle} · {stage.depts.join(" + ")}
                            </p>
                            <p className="mt-1 text-xs font-light leading-relaxed text-muted-foreground">
                                {stage.desc}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {stage.deliverables.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-primary/15 bg-primary/5 px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-foreground/75"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
