"use client";

import { useEffect, useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// CraftFrame — Marco de oficio sobre el retrato de cada perfil.
// Cada variante es una referencia visual al trabajo real de la persona:
// sello de fundador, retícula de segmentación, cita confirmada, flujo CRM,
// terminal, visor de cámara o marcas de corte de imprenta.
// Usa var(--member-accent) del slide; pointer-events-none siempre.
// ============================================================

export type CraftVariant =
    | "seal"
    | "crosshair"
    | "check"
    | "flow"
    | "caret"
    | "viewfinder"
    | "cropmarks";

interface CraftFrameProps {
    variant: CraftVariant;
    /** false = render estático (cards mobile / contextos sin presupuesto de motion). */
    animated?: boolean;
    className?: string;
}

const ACCENT = "var(--member-accent, var(--primary, #0066FF))";

export default function CraftFrame({
    variant,
    animated = true,
    className,
}: CraftFrameProps) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-10%" });
    // live: loops decorativos corriendo. draw: animaciones de entrada (una pasada).
    const live = animated && inView && !reduce;
    const draw = animated && !reduce;

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn("absolute inset-0 pointer-events-none", className)}
        >
            {variant === "seal" && <Seal live={live} />}
            {variant === "crosshair" && <CrosshairFrame draw={draw} live={live} inView={inView} />}
            {variant === "check" && <CheckSeal draw={draw} inView={inView} />}
            {variant === "flow" && <FlowEdge live={live} />}
            {variant === "caret" && <CaretPrompt live={live} />}
            {variant === "viewfinder" && <Viewfinder draw={draw} live={live} inView={inView} />}
            {variant === "cropmarks" && <CropMarks draw={draw} inView={inView} />}
        </div>
    );
}

// --- Dirección: sello circular de fundador girando lento -------------------
function Seal({ live }: { live: boolean }) {
    const id = useId();
    return (
        <svg viewBox="0 0 96 96" className="absolute bottom-3 right-3 size-20 sm:size-24 opacity-80">
            <defs>
                <path id={id} d="M 48 12 a 36 36 0 1 1 -0.01 0" fill="none" />
            </defs>
            <circle cx="48" cy="48" r="45" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 5" opacity="0.45" />
            <motion.g
                style={{ transformOrigin: "48px 48px" }}
                animate={live ? { rotate: 360 } : undefined}
                transition={live ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined}
            >
                <text
                    fontSize="9"
                    letterSpacing="2.4"
                    fill={ACCENT}
                    opacity="0.85"
                    style={{ fontFamily: "var(--font-mono, monospace)", textTransform: "uppercase" }}
                >
                    <textPath href={`#${id}`}>Fundador · AD Media · 2016 ·</textPath>
                </text>
            </motion.g>
            <circle cx="48" cy="48" r="3" fill={ACCENT} opacity="0.9" />
        </svg>
    );
}

// --- Marketing: retícula de segmentación que "enfoca" el retrato -----------
function CrosshairFrame({ draw, live, inView }: { draw: boolean; live: boolean; inView: boolean }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full opacity-70"
            initial={draw ? { scale: 1.14, opacity: 0 } : false}
            animate={draw ? (inView ? { scale: 1, opacity: 0.7 } : { scale: 1.14, opacity: 0 }) : undefined}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
        >
            {/* Esquinas de encuadre */}
            {[
                "M 16 28 V 16 H 28",
                "M 72 16 H 84 V 28",
                "M 84 72 V 84 H 72",
                "M 28 84 H 16 V 72",
            ].map((d) => (
                <path key={d} d={d} fill="none" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
            ))}
            {/* Cruz central de segmentación */}
            {["M 50 36 V 43", "M 50 57 V 64", "M 36 50 H 43", "M 57 50 H 64"].map((d) => (
                <path key={d} d={d} stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />
            ))}
            <motion.circle
                cx="50"
                cy="50"
                r="8"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.4"
                animate={live ? { opacity: [0.45, 1, 0.45] } : undefined}
                transition={live ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
        </motion.svg>
    );
}

// --- Comercial: cita confirmada que se dibuja -------------------------------
function CheckSeal({ draw, inView }: { draw: boolean; inView: boolean }) {
    return (
        <svg viewBox="0 0 40 40" className="absolute bottom-4 right-4 size-12 sm:size-14">
            <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
                opacity="0.9"
                initial={draw ? { pathLength: 0 } : false}
                animate={draw ? (inView ? { pathLength: 1 } : { pathLength: 0 }) : undefined}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
                d="M 12.5 20.5 L 17.5 25.5 L 28 14.5"
                fill="none"
                stroke={ACCENT}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={draw ? { pathLength: 0 } : false}
                animate={draw ? (inView ? { pathLength: 1 } : { pathLength: 0 }) : undefined}
                transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />
        </svg>
    );
}

// --- CRM & Automatización: leads entrando por el borde del marco -----------
function FlowEdge({ live }: { live: boolean }) {
    return (
        <svg viewBox="0 0 60 200" preserveAspectRatio="xMidYMid meet" className="absolute left-0 top-1/2 h-40 w-12 -translate-y-1/2 opacity-80">
            {[
                { d: "M 4 30 C 30 30, 30 100, 56 100", delay: 0 },
                { d: "M 4 100 H 56", delay: 0.6 },
                { d: "M 4 170 C 30 170, 30 100, 56 100", delay: 1.2 },
            ].map((p) => (
                <motion.path
                    key={p.d}
                    d={p.d}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeDasharray="4 7"
                    opacity="0.7"
                    animate={live ? { strokeDashoffset: [0, -44] } : undefined}
                    transition={live ? { duration: 3, repeat: Infinity, ease: "linear", delay: p.delay } : undefined}
                />
            ))}
            {[30, 100, 170].map((y) => (
                <circle key={y} cx="4" cy={y} r="2.5" fill={ACCENT} opacity="0.9" />
            ))}
            <circle cx="56" cy="100" r="4" fill={ACCENT} />
        </svg>
    );
}

// --- CRM & Sistemas: prompt de terminal con caret parpadeando ---------------
function CaretPrompt({ live }: { live: boolean }) {
    return (
        <>
            <div
                className="absolute left-3 top-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider"
                style={{ color: ACCENT }}
            >
                <span className="opacity-80">~/crm</span>
                <motion.span
                    className="inline-block h-[13px] w-[7px]"
                    style={{ background: ACCENT }}
                    animate={live ? { opacity: [1, 1, 0, 0] } : undefined}
                    transition={live ? { duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] } : undefined}
                />
            </div>
            {/* Esquinas finas estilo editor */}
            <div className="absolute left-2 top-2 h-5 w-5 border-l border-t opacity-50" style={{ borderColor: ACCENT }} />
            <div className="absolute bottom-2 right-2 h-5 w-5 border-b border-r opacity-50" style={{ borderColor: ACCENT }} />
        </>
    );
}

// --- Producción: visor de cámara con REC y timecode vivo --------------------
function Viewfinder({ draw, live, inView }: { draw: boolean; live: boolean; inView: boolean }) {
    const corners = [
        "left-2.5 top-2.5 border-l-2 border-t-2",
        "right-2.5 top-2.5 border-r-2 border-t-2",
        "right-2.5 bottom-2.5 border-r-2 border-b-2",
        "left-2.5 bottom-2.5 border-l-2 border-b-2",
    ];
    return (
        <>
            {corners.map((pos, i) => (
                <motion.div
                    key={pos}
                    className={cn("absolute h-6 w-6 sm:h-7 sm:w-7", pos)}
                    style={{ borderColor: ACCENT }}
                    initial={draw ? { opacity: 0, scale: 0.5 } : false}
                    animate={draw ? (inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.5 }) : undefined}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: [0, 0, 0.2, 1] }}
                />
            ))}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/90">
                <motion.span
                    className="size-2 rounded-full"
                    style={{ background: ACCENT }}
                    animate={live ? { opacity: [1, 0.25, 1] } : undefined}
                    transition={live ? { duration: 1.3, repeat: Infinity, ease: "easeInOut" } : undefined}
                />
                Rec
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] font-semibold tracking-[0.16em] text-foreground/80">
                <Timecode running={live} />
            </div>
        </>
    );
}

// Timecode 30fps vía rAF directo al DOM (cero re-renders). Congelado en un
// fotograma fijo cuando no corre (reduced-motion / fuera de vista).
function Timecode({ running }: { running: boolean }) {
    const spanRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!running) return;
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = (now - start) / 1000;
            const m = Math.floor(t / 60) % 60;
            const s = Math.floor(t) % 60;
            const f = Math.floor((t % 1) * 30);
            if (spanRef.current) {
                spanRef.current.textContent = `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [running]);
    return (
        <span ref={spanRef} className="tabular-nums">
            00:08:24:12
        </span>
    );
}

// --- Diseño & IA: marcas de corte de imprenta + muestras de color -----------
function CropMarks({ draw, inView }: { draw: boolean; inView: boolean }) {
    const marks = [
        { pos: "left-1.5 top-4", line: "h-px w-5" },
        { pos: "left-4 top-1.5", line: "h-5 w-px" },
        { pos: "right-1.5 top-4", line: "h-px w-5" },
        { pos: "right-4 top-1.5", line: "h-5 w-px" },
        { pos: "left-1.5 bottom-4", line: "h-px w-5" },
        { pos: "left-4 bottom-1.5", line: "h-5 w-px" },
        { pos: "right-1.5 bottom-4", line: "h-px w-5" },
        { pos: "right-4 bottom-1.5", line: "h-5 w-px" },
    ];
    const swatches = [ACCENT, "var(--chart-2, #7DD3FC)", "var(--foreground, #f8fafc)"];
    return (
        <>
            {marks.map((m, i) => (
                <motion.span
                    key={m.pos + m.line}
                    className={cn("absolute opacity-70", m.pos, m.line)}
                    style={{ background: ACCENT }}
                    initial={draw ? { opacity: 0 } : false}
                    animate={draw ? (inView ? { opacity: 0.7 } : { opacity: 0 }) : undefined}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                />
            ))}
            <div className="absolute bottom-3 left-3 flex gap-1.5">
                {swatches.map((color, i) => (
                    <motion.span
                        key={color}
                        className="size-3.5 rounded-[3px] border border-white/20 sm:size-4"
                        style={{ background: color, opacity: i === 0 ? 0.95 : 0.75 }}
                        initial={draw ? { opacity: 0, y: 8 } : false}
                        animate={draw ? (inView ? { opacity: i === 0 ? 0.95 : 0.75, y: 0 } : { opacity: 0, y: 8 }) : undefined}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: [0, 0, 0.2, 1] }}
                    />
                ))}
            </div>
        </>
    );
}
