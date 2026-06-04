"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { useVideoInView } from "@/lib/useVideoInView";

interface VideoBackgroundProps {
    src: string;
    poster: string;
    className?: string;
    posterClassName?: string;
    videoClassName?: string;
    children?: ReactNode;
}

export default function VideoBackground({
    src,
    poster,
    className,
    posterClassName,
    videoClassName,
    children,
}: VideoBackgroundProps) {
    const shouldReduceMotion = useHydratedReducedMotion();
    const [canPlayVideo, setCanPlayVideo] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            setCanPlayVideo(!shouldReduceMotion);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [shouldReduceMotion]);

    // Pausa el video cuando la sección sale del viewport (ahorra CPU/batería).
    useVideoInView(videoRef, canPlayVideo);

    return (
        <div
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
            aria-hidden="true"
        >
            <div
                className={cn("absolute inset-0 bg-cover bg-center", posterClassName)}
                style={{ backgroundImage: `url('${poster}')` }}
            />
            {canPlayVideo && (
                <video
                    ref={videoRef}
                    className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={poster}
                    aria-hidden="true"
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}
            {children}
        </div>
    );
}
