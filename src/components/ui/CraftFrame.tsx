"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CraftChip } from "@/lib/data/teamIdentity";

// ============================================================
// CraftChips — Chips de cristal con el oficio de cada perfil.
// Reemplazan a los antiguos marcos sobre la foto: nada tapa el
// retrato; los chips se anclan al borde inferior de la tarjeta.
// Todo en la familia azul de la marca vía var(--member-accent).
// ============================================================

interface CraftChipsProps {
    chips: CraftChip[];
    /** Chip extra con timecode corriendo (solo Producción). */
    timecode?: boolean;
    /** false = render estático (cards mobile / sin presupuesto de motion). */
    animated?: boolean;
    className?: string;
}

const ACCENT = "var(--member-accent, var(--primary, #0066FF))";

export default function CraftChips({
    chips,
    timecode = false,
    animated = true,
    className,
}: CraftChipsProps) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-10%" });
    const live = animated && inView && !reduce;
    const draw = animated && !reduce;

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-x-0 -bottom-3 flex flex-wrap items-center justify-center gap-2 px-3",
                className
            )}
        >
            {chips.map((chip, i) => {
                const ChipIcon = chip.icon;
                return (
                    <motion.span
                        key={chip.label}
                        className="glass-premium inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/85 shadow-lg"
                        initial={draw ? { opacity: 0, y: 10 } : false}
                        animate={
                            draw
                                ? inView
                                    ? live
                                        ? { opacity: 1, y: [0, -3, 0] }
                                        : { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                                : undefined
                        }
                        transition={
                            live
                                ? {
                                      opacity: { duration: 0.4, delay: 0.3 + i * 0.12 },
                                      y: {
                                          duration: 4.2,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                          delay: 0.3 + i * 0.6,
                                      },
                                  }
                                : { duration: 0.4, delay: 0.3 + i * 0.12, ease: [0, 0, 0.2, 1] }
                        }
                    >
                        <ChipIcon className="size-3" style={{ color: ACCENT }} />
                        {chip.label}
                    </motion.span>
                );
            })}

            {timecode && (
                <motion.span
                    className="glass-premium inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] text-foreground/85 shadow-lg"
                    initial={draw ? { opacity: 0, y: 10 } : false}
                    animate={draw ? (inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }) : undefined}
                    transition={{ duration: 0.4, delay: 0.3 + chips.length * 0.12, ease: [0, 0, 0.2, 1] }}
                >
                    <motion.span
                        className="size-1.5 rounded-full"
                        style={{ background: ACCENT }}
                        animate={live ? { opacity: [1, 0.3, 1] } : undefined}
                        transition={live ? { duration: 1.3, repeat: Infinity, ease: "easeInOut" } : undefined}
                    />
                    <Timecode running={live} />
                </motion.span>
            )}
        </div>
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
