"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// AnimatedCounter — Contador que cuenta hacia arriba al entrar en vista.
// Extraído de ScrollytellingSection para reutilizarlo en Casos, slug, etc.
// Si no se pasa `isInView`, se autogestiona con un ref interno.
// ============================================================
interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    /** Si se controla desde fuera (p.ej. un KPI card). Si se omite, se autodetecta. */
    isInView?: boolean;
    className?: string;
}

export default function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    isInView,
    className,
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
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (active) motionValue.set(value);
    }, [active, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (value % 1 !== 0) {
                setDisplayValue(latest.toFixed(1));
            } else {
                setDisplayValue(Math.round(latest).toString());
            }
        });
        return unsubscribe;
    }, [springValue, value]);

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
