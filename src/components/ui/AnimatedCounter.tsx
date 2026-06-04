"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// AnimatedCounter — Contador que cuenta hacia arriba al entrar en vista.
// Extraído de ScrollytellingSection para reutilizarlo en Casos, slug, etc.
// Si no se pasa `isInView`, se autogestiona con un ref interno.
// ============================================================

// Formatea respetando el redondeo del valor objetivo (decimales solo si el target los tiene).
function formatCount(latest: number, target: number) {
    return target % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
}

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    /** Si se controla desde fuera (p.ej. un KPI card). Si se omite, se autodetecta. */
    isInView?: boolean;
    className?: string;
    /**
     * Si es true, muestra el valor final de inmediato sin animar el conteo.
     * Útil en claims sensibles (p. ej. /casos) para que QA/screenshots no capturen
     * valores intermedios como `$56K` cuando el final esperado es `$80K`.
     */
    stable?: boolean;
}

export default function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    isInView,
    className,
    stable = false,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const autoInView = useInView(ref, { once: true, margin: "-10%" });
    const active = isInView ?? autoInView;

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 30,
        restDelta: 0.01,
    });
    const [displayValue, setDisplayValue] = useState(() =>
        stable ? formatCount(value, value) : "0"
    );

    useEffect(() => {
        if (active && !stable) motionValue.set(value);
    }, [active, value, motionValue, stable]);

    useEffect(() => {
        if (stable) return;
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(formatCount(latest, value));
        });
        return unsubscribe;
    }, [springValue, value, stable]);

    return (
        <span
            ref={ref}
            className={cn(
                "font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-primary tabular-nums",
                className
            )}
        >
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}
