"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { useVideoInView } from "@/lib/useVideoInView";
import type { VideoBackgroundProfile } from "@/components/ui/videoBackgroundProfiles";

interface VideoBackgroundProps {
    profile: VideoBackgroundProfile;
    src: string;
    poster: string;
    className?: string;
    posterClassName?: string;
    videoClassName?: string;
    children?: ReactNode;
}

export default function VideoBackground({
    profile,
    src,
    poster,
    className,
    posterClassName,
    videoClassName,
    children,
}: VideoBackgroundProps) {
    const shouldReduceMotion = useHydratedReducedMotion();
    const [canPlayVideo, setCanPlayVideo] = useState(false);
    // Una vez que el video reproduce, ocultamos el poster para que no se
    // transparente por debajo y duplique el logo. El poster queda solo como
    // fallback (reduced-motion o antes de que el video arranque).
    const [videoPlaying, setVideoPlaying] = useState(false);
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
            className={cn(
                "video-background absolute inset-0 isolate overflow-hidden pointer-events-none",
                className,
            )}
            data-video-profile={profile}
            aria-hidden="true"
        >
            <div
                className={cn(
                    "video-background__visual video-background__poster video-background__asset absolute inset-0 bg-cover bg-center transition-opacity duration-700",
                    posterClassName,
                )}
                data-video-layer="poster"
                style={{ backgroundImage: `url('${poster}')`, opacity: videoPlaying ? 0 : undefined }}
            />
            {canPlayVideo && (
                <div
                    className="video-background__visual video-background__motion absolute inset-0"
                    data-video-layer="video"
                >
                    <video
                        ref={videoRef}
                        className={cn(
                            "video-background__asset absolute inset-0 h-full w-full object-cover",
                            videoClassName,
                        )}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={poster}
                        aria-hidden="true"
                        onPlaying={() => setVideoPlaying(true)}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                </div>
            )}
            <div
                className="video-background__scrim absolute inset-0"
                data-video-layer="scrim"
            />
            {children}
        </div>
    );
}
