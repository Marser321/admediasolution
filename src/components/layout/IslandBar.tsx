"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
    Home,
    PlayCircle,
    Info,
    Layers,
    Globe,
    FolderOpen,
    Users,
    Calendar,
    Moon,
    Sun,
    Sparkles,
    CloudSun,
    MoreHorizontal,
    X,
} from "lucide-react";

// ============================================================
// Ítems de navegación
// ============================================================
const NAV_ITEMS = [
    { href: "/", icon: Home, label: "Inicio" },
    { href: "/#vsl-masterclass", icon: PlayCircle, label: "VSL" },
    { href: "/about-us", icon: Info, label: "Nosotros" },
    { href: "/servicios", icon: Layers, label: "Servicios" },
    { href: "/comunidad", icon: Globe, label: "Comunidad" },
    { href: "/casos", icon: FolderOpen, label: "Casos" },
    { href: "/equipo", icon: Users, label: "Equipo" },
    { href: "/planificacion", icon: Calendar, label: "Agenda" },
];

const MOBILE_PRIMARY_ITEMS = [
    { href: "/", icon: Home, label: "Inicio" },
    { href: "/servicios", icon: Layers, label: "Servicios" },
    { href: "/casos", icon: FolderOpen, label: "Casos" },
    { href: "/planificacion", icon: Calendar, label: "Agenda" },
];

const MOBILE_SECONDARY_ITEMS = [
    { href: "/#vsl-masterclass", icon: PlayCircle, label: "Ver VSL" },
    { href: "/about-us", icon: Info, label: "Nosotros" },
    { href: "/comunidad", icon: Globe, label: "Comunidad" },
    { href: "/equipo", icon: Users, label: "Equipo" },
];

type Theme = "luxury" | "classic" | "sky" | "white";
const THEMES: Theme[] = ["luxury", "classic", "sky", "white"];
const SCROLL_DELTA_THRESHOLD = 18;
const EXPAND_COLLAPSE_COOLDOWN = 420;
const FOOTER_LEGAL_SELECTOR = "[data-footer-legal]";

function isTheme(value: string | null): value is Theme {
    return value !== null && THEMES.includes(value as Theme);
}

function applyThemeClass(next: Theme) {
    document.documentElement.classList.remove("theme-classic", "theme-sky", "theme-white");
    if (next === "classic") document.documentElement.classList.add("theme-classic");
    if (next === "sky") document.documentElement.classList.add("theme-sky");
    if (next === "white") document.documentElement.classList.add("theme-white");
}

// ============================================================
// Island Bar — Navegación flotante inferior (estilo Dynamic Island)
// ============================================================
export default function IslandBar() {
    const [expanded, setExpanded] = useState(true);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isFooterLegalVisible, setIsFooterLegalVisible] = useState(false);
    const [theme, setTheme] = useState<Theme>("classic");
    const expandedRef = useRef(expanded);
    const lastScrollYRef = useRef(0);
    const lastToggleAtRef = useRef(0);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const savedTheme = localStorage.getItem("vibe-theme") ?? localStorage.getItem("theme");
        if (isTheme(savedTheme)) {
            applyThemeClass(savedTheme);
            queueMicrotask(() => setTheme(savedTheme));
        } else {
            applyThemeClass("classic");
            queueMicrotask(() => setTheme("classic"));
        }
    }, []);
    const { scrollY } = useScroll();

    const setExpandedStable = (next: boolean) => {
        if (expandedRef.current === next) return;
        expandedRef.current = next;
        setExpanded(next);
    };

    const toggleTheme = () => {
        setTheme(prev => {
            let next: Theme;
            if (prev === "luxury") next = "classic";
            else if (prev === "classic") next = "sky";
            else if (prev === "sky") next = "white";
            else next = "luxury";

            applyThemeClass(next);
            localStorage.setItem("vibe-theme", next);
            return next;
        });
    };

    // Detectar dirección de scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollYRef.current;
        const delta = latest - previous;
        if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return;

        lastScrollYRef.current = latest;

        const now = performance.now();
        if (now - lastToggleAtRef.current < EXPAND_COLLAPSE_COOLDOWN) return;

        if (delta > 0 && latest > 160) {
            lastToggleAtRef.current = now;
            setExpandedStable(false);
        } else if (delta < 0) {
            lastToggleAtRef.current = now;
            setExpandedStable(true);
        }
    });

    useEffect(() => {
        const legalFooter = document.querySelector(FOOTER_LEGAL_SELECTOR);
        if (!legalFooter) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterLegalVisible(entry.isIntersecting);
                if (entry.isIntersecting) setIsMoreOpen(false);
            },
            { threshold: 0.01 }
        );

        observer.observe(legalFooter);
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (href: string) => {
        setIsMoreOpen(false);

        if (href === "/") {
            if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                router.push("/");
            }
            return;
        }

        // Anclas a la home (ej. "/#vsl-masterclass"): scroll suave si ya estamos
        // en home, o navegar a la home dejando que el navegador salte al ancla.
        if (href.startsWith("/#")) {
            const targetId = href.slice(2);
            if (pathname === "/") {
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
            } else {
                router.push(href);
            }
            return;
        }

        router.push(href);
    };

    const isActiveHref = (href: string) =>
        href === "/"
            ? pathname === "/"
            : href.startsWith("/#")
                ? false
                : pathname?.startsWith(href);

    const ThemeIcon =
        theme === "luxury" ? Sparkles : theme === "classic" ? Moon : theme === "sky" ? CloudSun : Sun;

    return (
        <>
            <AnimatePresence>
                {isMoreOpen && !isFooterLegalVisible && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Cerrar navegación adicional"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMoreOpen(false)}
                            className="fixed inset-0 z-40 bg-background/35 backdrop-blur-[2px] lg:hidden"
                        />
                        <motion.div
                            role="dialog"
                            aria-label="Navegación adicional"
                            initial={{ opacity: 0, y: 18, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 18, scale: 0.98 }}
                            className="glass-premium fixed bottom-[5.75rem] left-1/2 z-50 w-[calc(100vw-1rem)] max-w-sm -translate-x-1/2 rounded-3xl border border-primary/20 p-3 shadow-2xl lg:hidden"
                        >
                            <div className="mb-2 flex items-center justify-between px-2">
                                <p className="text-sm font-bold text-foreground">Más opciones</p>
                                <button
                                    type="button"
                                    onClick={() => setIsMoreOpen(false)}
                                    className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                                    aria-label="Cerrar menú"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {MOBILE_SECONDARY_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActiveHref(item.href);
                                    return (
                                        <button
                                            key={item.href}
                                            type="button"
                                            onClick={() => handleNavClick(item.href)}
                                            className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                                                active
                                                    ? "bg-primary/15 text-primary"
                                                    : "text-foreground hover:bg-primary/10"
                                            }`}
                                        >
                                            <Icon className="size-5 shrink-0" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="mt-2 flex min-h-12 w-full items-center justify-between rounded-2xl border border-primary/15 bg-card/60 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10"
                            >
                                <span className="flex items-center gap-3">
                                    <ThemeIcon className="size-5 text-primary" />
                                    Cambiar estilo visual
                                </span>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">{theme}</span>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: isFooterLegalVisible ? 110 : 0, opacity: isFooterLegalVisible ? 0 : 1 }}
                transition={{ delay: isFooterLegalVisible ? 0 : 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={isFooterLegalVisible}
                aria-label="Navegación principal móvil"
                className={`fixed bottom-2 left-1/2 z-50 w-[calc(100vw-1rem)] max-w-sm -translate-x-1/2 lg:hidden ${
                    isFooterLegalVisible ? "pointer-events-none" : ""
                }`}
            >
                <div className="glass-premium grid grid-cols-5 rounded-[1.5rem] border border-primary/20 p-1.5 shadow-2xl">
                    {MOBILE_PRIMARY_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActiveHref(item.href);
                        return (
                            <button
                                key={item.href}
                                type="button"
                                onClick={() => handleNavClick(item.href)}
                                aria-label={item.label}
                                aria-current={active ? "page" : undefined}
                                className={`relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-semibold transition-colors ${
                                    active ? "bg-primary/15 text-primary" : "nav-link-contrast"
                                }`}
                            >
                                <Icon className="size-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        onClick={() => setIsMoreOpen((open) => !open)}
                        aria-label={isMoreOpen ? "Cerrar más opciones" : "Abrir más opciones"}
                        aria-expanded={isMoreOpen}
                        className={`relative flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-xs font-semibold transition-colors ${
                            isMoreOpen ? "bg-primary/15 text-primary" : "nav-link-contrast"
                        }`}
                    >
                        {isMoreOpen ? <X className="size-5" /> : <MoreHorizontal className="size-5" />}
                        <span>Más</span>
                    </button>
                </div>
            </motion.nav>

            <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isFooterLegalVisible ? 96 : 0, opacity: isFooterLegalVisible ? 0 : 1 }}
            transition={{ delay: isFooterLegalVisible ? 0 : 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={isFooterLegalVisible}
            aria-label="Navegación principal"
            className={`fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:block ${isFooterLegalVisible ? "pointer-events-none" : ""}`}
        >
            <motion.div
                className={`
          flex items-center justify-center gap-0.5 sm:gap-1
          glass-premium rounded-full transform-gpu
          transition-[padding,border-radius,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          max-w-[calc(100vw-1.5rem)] sm:max-w-none
          ${expanded
                        ? "px-2 py-2 rounded-[1.75rem] sm:px-6 sm:py-3"
                        : "px-2 py-2 rounded-full"
                    }
        `}
            >
                {/* Logo integrado en la isla */}
                <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                    hidden sm:flex relative items-center justify-center overflow-hidden transition-[width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${expanded ? "sm:w-10 opacity-100 sm:mr-1" : "w-0 opacity-0 mr-0"}
                `}>
                    <Image
                        src="/brand/logo-icon.png"
                        alt="Logo"
                        width={28}
                        height={28}
                        className="object-contain drop-shadow-[0_0_6px_rgba(0,212,230,0.25)]"
                    />
                </motion.div>

                {/* Separator */}
                <div className={`
                     hidden sm:block h-4 w-px bg-primary/20 transition-[width,opacity,margin] duration-500 delay-100
                     ${expanded ? "opacity-100 mr-1" : "opacity-0 mr-0 w-0"}
                `} />

                {NAV_ITEMS.map((item) => {
                    const isActive = isActiveHref(item.href);
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            whileTap={{ scale: 0.9 }}
                            className={`
                relative flex min-h-11 shrink-0 items-center justify-center rounded-full py-2
                transition-[width,min-width,padding,color,background-color] duration-300 cursor-pointer transform-gpu
                min-w-11 px-0
                ${expanded ? "w-auto px-3" : "w-11"}
                ${isActive
                                    ? "text-primary"
                                    : "nav-link-contrast"
                                }
              `}
                            aria-label={item.label}
                        >
                            {/* Indicador activo — glow detrás */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full bg-accent-blue/15 border border-accent-blue/25"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}

                            <span className="relative z-10 flex size-5 shrink-0 items-center justify-center">
                                <Icon className="size-full" />
                            </span>

                            {/* Label — solo visible cuando expanded */}
                            <span
                                className={`
                                    relative z-10 inline-block text-sm font-medium whitespace-nowrap overflow-hidden
                                    transition-[max-width,opacity,transform,margin] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                                    ${expanded ? "ml-2 max-w-24 opacity-100 translate-x-0" : "ml-0 max-w-0 opacity-0 -translate-x-1"}
                                `}
                            >
                                {item.label}
                            </span>
                            
                        </motion.button>
                    );
                })}

                {/* Vertical Divider */}
                <div className={`
                    hidden sm:block h-4 bg-primary/20 transition-[width,opacity,margin] duration-300
                    ${expanded ? "w-px opacity-100 mx-1" : "w-0 opacity-0 mx-0"}
                `} />

                {/* Vibe Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`
                        relative flex size-11 items-center justify-center rounded-full transition-[color,background-color] duration-300
                        ${theme === "luxury" ? "text-primary" : "nav-link-contrast"}
                    `}
                    title={`Switch Vibe (Current: ${theme})`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                        >
                            {theme === "luxury" && <Sparkles className="size-5" />}
                            {theme === "classic" && <Moon className="size-5" />}
                            {theme === "sky" && <CloudSun className="size-5" />}
                            {theme === "white" && <Sun className="size-5" />}
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Pulsing indicator for Luxury mode */}
                    {theme === "luxury" && (
                        <motion.span 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-0 right-0 size-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,102,255,0.8)]" 
                        />
                    )}
                </motion.button>
            </motion.div>
            </motion.nav>
        </>
    );
}
