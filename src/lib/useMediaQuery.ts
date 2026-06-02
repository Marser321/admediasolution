"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hook de media query SSR-safe vía `useSyncExternalStore`.
 *
 * En servidor y durante la hidratación devuelve `false` (mobile-first), de modo
 * que el HTML hidratado coincide con el del servidor; tras la hidratación lee el
 * valor real de `matchMedia` y vuelve a renderizar si cambió. Sin `setState` en
 * efectos → sin renders en cascada ni mismatch de hidratación.
 *
 * @param query  Media query CSS, p.ej. "(min-width: 768px)".
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        [query]
    );

    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * `true` en viewports `md` o mayores (Tailwind md = 768px). Renderiza mobile-first
 * por defecto y conmuta a desktop tras la hidratación.
 */
export function useIsDesktop(): boolean {
    return useMediaQuery("(min-width: 768px)");
}
