"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useHydratedReducedMotion() {
    const prefersReducedMotion = useReducedMotion();
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setHasHydrated(true);
        });

        return () => window.cancelAnimationFrame(frame);
    }, []);

    return hasHydrated ? Boolean(prefersReducedMotion) : false;
}
