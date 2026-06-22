"use client";

import Image from "next/image";
import type { CSSProperties, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { JOURNEY_STAGES } from "@/lib/data/serviceJourney";
import { getDeptTheme } from "@/lib/data/teamIdentity";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

interface ServiceJourneyMapProps {
    activeIndex: number;
    onActiveIndexChange: (index: number) => void;
}

export default function ServiceJourneyMap({
    activeIndex,
    onActiveIndexChange,
}: ServiceJourneyMapProps) {
    const reduce = useHydratedReducedMotion();
    const stage = JOURNEY_STAGES[activeIndex] ?? JOURNEY_STAGES[0];
    const n = JOURNEY_STAGES.length;

    const handleRailKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex: number | null = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % n;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + n) % n;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = n - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        onActiveIndexChange(nextIndex);
        const rail = event.currentTarget.parentElement;
        const nextButton = rail?.querySelector<HTMLButtonElement>(
            `[data-journey-index="${nextIndex}"]`
        );
        nextButton?.focus();
    };

    return (
        <div className="mx-auto mt-4 w-full max-w-4xl sm:mt-5">
            {/* Desktop / tablet: HUD compacto + rail numerado */}
            <div className="hidden md:block">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stage.id}
                        id="journey-stage-panel"
                        role="tabpanel"
                        aria-labelledby={`journey-tab-${stage.id}`}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                        transition={{ duration: reduce ? 0.18 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-premium mx-auto max-w-3xl rounded-3xl border border-white/15 bg-background/48 px-5 py-4 text-left shadow-2xl backdrop-blur-xl lg:px-6 lg:py-5"
                        style={{
                            "--stage-accent": getDeptTheme(stage.depts[0]).accent,
                        } as CSSProperties}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <span className="font-mono text-[10px] font-bold text-primary">
                                        Paso {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                                    </span>
                                    <h4 className="text-sm font-black uppercase tracking-[0.08em] text-foreground">
                                        {stage.title}
                                        <span className="text-primary"> — {stage.subtitle}</span>
                                    </h4>
                                </div>
                                <p className="mt-2 max-w-2xl text-xs font-light leading-relaxed text-muted-foreground lg:text-sm">
                                    {stage.desc}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {stage.deliverables.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-lg border border-primary/20 bg-background/45 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground/85"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex shrink-0 flex-col items-end gap-2">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                                    Quién interviene
                                </span>
                                {stage.depts.map((dept) => {
                                    const theme = getDeptTheme(dept);
                                    const DeptIcon = theme.motifIcon;
                                    return (
                                        <span
                                            key={dept}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/55 px-2.5 py-1 text-[10px] font-bold text-foreground"
                                        >
                                            <DeptIcon className="size-3" style={{ color: theme.accent }} />
                                            {dept}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div
                    role="tablist"
                    aria-label="Etapas del recorrido del servicio"
                    className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-1.5 rounded-full border border-white/10 bg-background/42 p-1.5 shadow-xl backdrop-blur-xl"
                >
                    {JOURNEY_STAGES.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                id={`journey-tab-${item.id}`}
                                aria-controls="journey-stage-panel"
                                aria-selected={isActive}
                                aria-current={isActive ? "step" : undefined}
                                aria-label={`${String(index + 1).padStart(2, "0")} — ${item.title}`}
                                tabIndex={isActive ? 0 : -1}
                                data-journey-index={index}
                                onMouseEnter={() => onActiveIndexChange(index)}
                                onFocus={() => onActiveIndexChange(index)}
                                onClick={() => onActiveIndexChange(index)}
                                onKeyDown={(event) => handleRailKeyDown(event, index)}
                                className={`relative flex min-h-10 flex-1 items-center justify-center rounded-full px-2 font-mono text-[10px] font-bold tracking-[0.12em] transition-colors duration-300 ${
                                    isActive
                                        ? "bg-primary text-white shadow-[0_0_24px_rgba(0,102,255,0.35)]"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Mobile: cada etapa usa su propio fondo local */}
            <div className="relative block space-y-4 text-left md:hidden">
                {JOURNEY_STAGES.map((item, index) => {
                    const ItemIcon = item.icon;
                    const accent = getDeptTheme(item.depts[0]).accent;

                    return (
                        <article
                            key={item.id}
                            className="relative min-h-[300px] overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-xl"
                            style={{ "--stage-accent": accent } as CSSProperties}
                        >
                            <Image
                                src={item.backgroundImage}
                                alt=""
                                fill
                                sizes="(max-width: 767px) 100vw, 0px"
                                className="object-cover"
                                style={{ objectPosition: item.backgroundPosition }}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.38)_0%,rgba(2,6,23,0.72)_42%,rgba(2,6,23,0.96)_100%)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />

                            <div className="relative z-10 flex min-h-[300px] flex-col justify-end p-5">
                                <div className="mb-auto flex items-center justify-between">
                                    <span className="flex size-11 items-center justify-center rounded-full border border-primary/40 bg-background/65 text-primary backdrop-blur-md">
                                        <ItemIcon className="size-5" />
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-background/55 px-3 py-1 font-mono text-xs font-bold text-primary backdrop-blur-md">
                                        {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                                    </span>
                                </div>

                                <h4 className="text-base font-black uppercase tracking-[0.06em] text-white">
                                    {item.title}
                                </h4>
                                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-sky-300">
                                    {item.subtitle} · {item.depts.join(" + ")}
                                </p>
                                <p className="mt-2 text-sm font-light leading-relaxed text-slate-200">
                                    {item.desc}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {item.deliverables.map((deliverable) => (
                                        <span
                                            key={deliverable}
                                            className="rounded-lg border border-white/15 bg-background/55 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md"
                                        >
                                            {deliverable}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
