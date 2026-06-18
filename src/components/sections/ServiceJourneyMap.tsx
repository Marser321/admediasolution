"use client";

import Image from "next/image";
import { useState, type ComponentType, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    JOURNEY_STAGES,
    JOURNEY_IMAGES_READY,
    type BackgroundKey,
} from "@/lib/data/serviceJourney";
import { getDeptTheme } from "@/lib/data/teamIdentity";
import type { ContextBackgroundProps } from "@/components/backgrounds/types";
import BlueprintLayer from "@/components/backgrounds/BlueprintLayer";
import ConstellationField from "@/components/backgrounds/ConstellationField";
import FlowField from "@/components/backgrounds/FlowField";
import MetricBurst from "@/components/backgrounds/MetricBurst";
import PresenceField from "@/components/backgrounds/PresenceField";
import SignalGrid from "@/components/backgrounds/SignalGrid";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

// ============================================================
// ServiceJourneyMap — Mapa interactivo del recorrido del servicio.
// Sendero orgánico que asciende sobre un terreno de mapa, dentro de un
// panel de cristal. Al tocar cada etapa florece detrás su fondo (imagen
// enfocada o, de respaldo, el campo animado de marca) y el sendero se
// ilumina hasta ahí. El detalle aparece como HUD inferior dentro del panel.
// ============================================================

const BG_MAP: Record<BackgroundKey, ComponentType<ContextBackgroundProps>> = {
    blueprint: BlueprintLayer,
    flow: FlowField,
    presence: PresenceField,
    aurora: AuroraBackground,
    constellation: ConstellationField,
    signal: SignalGrid,
    metric: MetricBurst,
};

// Espacio del mapa (el panel comparte este aspect ratio → alineación exacta).
const VB_W = 1200;
const VB_H = 460;

// Waypoints: x parejo (inset de bordes) + y en banda alta (deja el tercio
// inferior para el HUD). Zig-zag por paridad: pares abajo, impares arriba.
const WAYPOINTS: [number, number][] = [
    [95, 222],
    [240, 138],
    [385, 215],
    [530, 128],
    [675, 224],
    [820, 132],
    [965, 218],
    [1105, 150],
];

// Catmull-Rom → Bézier: curva suave y orgánica que pasa por todos los puntos.
function smoothPath(pts: [number, number][]): string {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0 : i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 < pts.length ? i + 2 : pts.length - 1];
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
    }
    return d;
}

// Curvas de nivel del "terreno de mapa": líneas onduladas estáticas.
function contourPath(baseY: number, amp: number, phase: number): string {
    let d = `M -20 ${baseY}`;
    for (let x = 0; x <= VB_W + 40; x += 40) {
        const y = baseY + Math.sin((x / 150) + phase) * amp;
        d += ` L ${x} ${y.toFixed(1)}`;
    }
    return d;
}

const PATH_D = smoothPath(WAYPOINTS);
const CONTOURS = [
    contourPath(95, 16, 0),
    contourPath(180, 20, 1.1),
    contourPath(265, 16, 2.2),
    contourPath(350, 20, 0.6),
    contourPath(420, 14, 1.7),
];

export default function ServiceJourneyMap() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState<number | null>(null);
    // Por imagen: marca las que fallaron al cargar para caer al respaldo SVG.
    const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});
    const n = JOURNEY_STAGES.length;

    const activeAccent =
        active !== null ? getDeptTheme(JOURNEY_STAGES[active].depts[0]).accent : "#0066FF";
    const progress = active !== null ? active / (n - 1) : 0;
    const stage = active !== null ? JOURNEY_STAGES[active] : null;

    // Clave de la capa de fondo activa (imagen si está lista, si no el campo SVG).
    const useImage = stage !== null && JOURNEY_IMAGES_READY && !imgFailed[stage.id];
    const bgKey = stage === null ? "default" : useImage ? `img-${stage.id}` : `svg-${stage.bg}`;
    const ActiveBg = stage !== null ? BG_MAP[stage.bg] : BlueprintLayer;

    return (
        <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-6">
            {/* ===== Desktop: panel de cristal con el sendero ===== */}
            <div
                className="relative mx-auto hidden w-full overflow-hidden rounded-3xl border border-primary/15 bg-card/20 shadow-2xl backdrop-blur-md md:block"
                style={{
                    aspectRatio: `${VB_W} / ${VB_H}`,
                    maxHeight: "min(46vh, 420px)",
                    "--stage-accent": activeAccent,
                } as CSSProperties}
            >
                {/* z0 — Fondo del área (imagen enfocada o campo animado de respaldo) */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={bgKey}
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: active !== null ? 0.9 : 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {useImage && stage ? (
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                data-motion-audit="decorative-background"
                                animate={reduce ? undefined : { scale: [1.04, 1.1], x: ["-1%", "1%"] }}
                                transition={
                                    reduce
                                        ? undefined
                                        : { duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                                }
                            >
                                <Image
                                    src={stage.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 1024px"
                                    className="object-cover"
                                    onError={() => setImgFailed((p) => ({ ...p, [stage.id]: true }))}
                                />
                            </motion.div>
                        ) : (
                            <ActiveBg intensity="strong" density="mid" opacity={1} />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Viñeta interior: funde el fondo hacia los bordes (profundidad) */}
                <div
                    className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 82% 78% at 50% 42%, transparent 38%, var(--background) 100%)",
                    }}
                />

                {/* z2 — Terreno de mapa (curvas de nivel, estático) */}
                <svg
                    viewBox={`0 0 ${VB_W} ${VB_H}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="absolute inset-0 z-[2] h-full w-full opacity-[0.07]"
                    aria-hidden="true"
                >
                    {CONTOURS.map((d, i) => (
                        <path key={i} d={d} fill="none" stroke="var(--primary, #0066FF)" strokeWidth="1.5" />
                    ))}
                </svg>

                {/* z3 — Bloom detrás del nodo activo */}
                {stage && (
                    <motion.div
                        key={`bloom-${active}`}
                        className="absolute z-[3] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[55px] pointer-events-none"
                        style={{
                            left: `${(WAYPOINTS[active!][0] / VB_W) * 100}%`,
                            top: `${(WAYPOINTS[active!][1] / VB_H) * 100}%`,
                            background: "var(--stage-accent)",
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                )}

                {/* z10 — Sendero */}
                <svg
                    viewBox={`0 0 ${VB_W} ${VB_H}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="absolute inset-0 z-10 h-full w-full"
                    data-motion-audit="decorative-background"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="journey-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0066FF" />
                            <stop offset="50%" stopColor="#7DD3FC" />
                            <stop offset="100%" stopColor="#488EFF" />
                        </linearGradient>
                    </defs>

                    <path d={PATH_D} fill="none" stroke="rgba(72,142,255,0.16)" strokeWidth="5" strokeLinecap="round" />

                    <motion.path
                        d={PATH_D}
                        fill="none"
                        stroke="url(#journey-trail)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.6 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        style={reduce ? { opacity: 0.6 } : undefined}
                    />

                    {/* Progreso "vas aquí": se ilumina hasta el nodo activo */}
                    <motion.path
                        d={PATH_D}
                        fill="none"
                        stroke="url(#journey-trail)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray={1}
                        initial={false}
                        animate={{ strokeDashoffset: 1 - progress, opacity: progress > 0 ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0 0 6px var(--stage-accent))" }}
                    />

                    {!reduce && (
                        <motion.circle
                            r="4.5"
                            fill="#7DD3FC"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            style={{
                                offsetPath: `path('${PATH_D}')`,
                                filter: "drop-shadow(0 0 7px var(--primary, #0066FF))",
                            }}
                        />
                    )}
                </svg>

                {/* z20 — Nodos waypoint */}
                {JOURNEY_STAGES.map((s, index) => {
                    const StageIcon = s.icon;
                    const [wx, wy] = WAYPOINTS[index];
                    const isActive = active === index;
                    // Alternancia estricta por paridad: pares (abajo) → label debajo;
                    // impares (arriba) → label arriba. Nunca comparten banda.
                    const labelBelow = index % 2 === 0;

                    return (
                        <div
                            key={s.id}
                            style={{
                                position: "absolute",
                                left: `${(wx / VB_W) * 100}%`,
                                top: `${(wy / VB_H) * 100}%`,
                                transform: "translate(-50%, -50%)",
                                zIndex: 20,
                            }}
                        >
                            <button
                                type="button"
                                aria-label={`${s.title} — ${s.subtitle}`}
                                aria-expanded={isActive}
                                onMouseEnter={() => setActive(index)}
                                onClick={() => setActive(isActive ? null : index)}
                                className="group relative block cursor-pointer"
                            >
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
                                    className={`glass-premium flex size-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                                        isActive
                                            ? "border-primary text-primary"
                                            : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
                                    }`}
                                >
                                    <StageIcon className="size-[18px]" />
                                </motion.span>
                                <span
                                    className={`absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border bg-background font-mono text-[9px] font-bold transition-colors duration-300 ${
                                        isActive ? "border-primary text-primary" : "border-border text-muted-foreground"
                                    }`}
                                >
                                    {index + 1}
                                </span>
                            </button>

                            {/* Solo el título bajo el nodo (el subtítulo vive en el HUD) */}
                            <div
                                className={`pointer-events-none absolute left-1/2 w-[124px] -translate-x-1/2 select-none text-center ${
                                    labelBelow ? "top-9" : "bottom-9"
                                }`}
                            >
                                <p
                                    className={`text-[11px] font-bold leading-tight transition-colors duration-300 ${
                                        isActive ? "text-primary" : "text-foreground"
                                    }`}
                                >
                                    {s.title}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* HUD inferior — detalle dentro del panel (no choca con la IslandBar) */}
                <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-3">
                    <AnimatePresence mode="wait">
                        {stage ? (
                            <motion.div
                                key={active}
                                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-premium rounded-2xl border border-primary/15 bg-card/55 p-3.5"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline gap-3">
                                            <span className="font-mono text-[10px] font-bold text-primary">
                                                Paso 0{active! + 1} / 0{n}
                                            </span>
                                            <h4 className="truncate text-xs font-bold uppercase tracking-wider text-foreground">
                                                {stage.title}
                                                <span className="text-primary"> — {stage.subtitle}</span>
                                            </h4>
                                        </div>
                                        <p className="mt-1.5 line-clamp-2 max-w-2xl text-[11px] font-light leading-relaxed text-muted-foreground">
                                            {stage.desc}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {stage.deliverables.map((item) => (
                                                <span
                                                    key={item}
                                                    className="rounded-md border border-primary/20 bg-primary/5 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground/80"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                                        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                                            Quién interviene
                                        </span>
                                        {stage.depts.map((dept) => {
                                            const theme = getDeptTheme(dept);
                                            const DeptIcon = theme.motifIcon;
                                            return (
                                                <span
                                                    key={dept}
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2 py-0.5 text-[10px] font-bold text-foreground/90"
                                                >
                                                    <DeptIcon className="size-3" style={{ color: theme.accent }} />
                                                    {dept}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.p
                                key="hint"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-2 text-center text-[11px] font-light italic text-muted-foreground/70"
                            >
                                Pasa el cursor por cada paso para ver qué hacemos y qué área lo ejecuta.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ===== Mobile: timeline vertical ===== */}
            <div className="relative mt-3 block space-y-4 pl-9 text-left md:hidden">
                <div className="absolute bottom-4 left-[21px] top-4 w-[2px] bg-primary/20" />

                {JOURNEY_STAGES.map((s, index) => {
                    const StageIcon = s.icon;
                    const accent = getDeptTheme(s.depts[0]).accent;
                    return (
                        <div
                            key={s.id}
                            className="glass-premium relative flex flex-col gap-2 rounded-2xl border border-l-2 border-primary/10 bg-card/30 p-4"
                            style={{ borderLeftColor: accent } as CSSProperties}
                        >
                            <div className="absolute -left-[35px] top-4 flex size-11 items-center justify-center rounded-full border border-primary bg-card text-primary shadow-md">
                                <StageIcon className="size-5" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-mono text-xs font-bold text-primary">0{index + 1}</span>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-primary">{s.title}</h4>
                            </div>
                            <p className="text-xs font-semibold uppercase leading-relaxed tracking-wider text-accent-light">
                                {s.subtitle} · {s.depts.join(" + ")}
                            </p>
                            <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">{s.desc}</p>
                            <div className="mt-1.5 flex flex-wrap gap-2">
                                {s.deliverables.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-lg border border-primary/15 bg-primary/5 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75"
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
