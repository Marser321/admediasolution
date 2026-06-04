"use client";

import { useEffect } from "react";

/**
 * Pausa un <video> de fondo cuando sale del viewport y lo reanuda al volver.
 * Evita gastar CPU/batería reproduciendo videos que no se ven (p. ej. headers
 * de Servicios/Comunidad/About-us o el hero una vez que se hace scroll).
 *
 * - Respeta el gating de reduced-motion del componente: si `enabled` es false
 *   (o el video aún no está montado), no hace nada.
 * - Si el navegador no soporta IntersectionObserver, deja el comportamiento por
 *   defecto (autoPlay) intacto.
 *
 * @param videoRef ref al elemento <video>
 * @param enabled  normalmente el mismo flag que decide montar el video
 */
export function useVideoInView(
    videoRef: { current: HTMLVideoElement | null },
    enabled = true,
) {
    useEffect(() => {
        const video = videoRef.current;
        if (!enabled || !video) return;
        if (typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;
                if (entry.isIntersecting) {
                    // play() puede rechazar (políticas de autoplay); lo ignoramos.
                    void video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.05 },
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [videoRef, enabled]);
}
