"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Home, Briefcase, Sparkles, MessageCircle, Moon, Sun } from "lucide-react";

// ============================================================
// Ítems de navegación
// ============================================================
const NAV_ITEMS = [
    { id: "hero", icon: Home, label: "Inicio" },
    { id: "servicios", icon: Briefcase, label: "Servicios" },
    { id: "portfolio", icon: Sparkles, label: "Portfolio" },
    { id: "contacto", icon: MessageCircle, label: "Contacto" },
];

// ============================================================
// Island Bar — Navegación flotante inferior (estilo Dynamic Island)
// ============================================================
export default function IslandBar() {
    const [expanded, setExpanded] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const [theme, setTheme] = useState<"luxury" | "classic" | "white">("luxury");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "luxury" | "classic" | "white";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.className = `theme-${savedTheme}`;
        }
    }, []);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("vibe-theme") as any;
        if (["luxury", "classic", "white"].includes(savedTheme)) {
            setTheme(savedTheme);
            if (savedTheme === "classic") document.documentElement.classList.add("theme-classic");
            if (savedTheme === "white") document.documentElement.classList.add("theme-white");
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prev => {
            let next: "luxury" | "classic" | "white";
            if (prev === "luxury") next = "classic";
            else if (prev === "classic") next = "white";
            else next = "luxury";

            // Clean up old classes
            document.documentElement.classList.remove("theme-classic", "theme-white");
            
            // Add new class if needed
            if (next === "classic") document.documentElement.classList.add("theme-classic");
            if (next === "white") document.documentElement.classList.add("theme-white");

            localStorage.setItem("vibe-theme", next);
            return next;
        });
    };

    // Detectar dirección de scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";
        setLastScrollY(latest);

        if (direction === "down" && latest > 100) {
            setExpanded(false);
        } else if (direction === "up") {
            setExpanded(true);
        }
    });

    // Detectar sección activa por IntersectionObserver
    useEffect(() => {
        const sections = NAV_ITEMS.map((item) =>
            document.getElementById(item.id)
        ).filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0, rootMargin: "-30% 0px -30% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <motion.div
                layout
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`
          flex items-center justify-center gap-0.5 sm:gap-1
          glass-premium rounded-full
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
                    relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${expanded ? "w-8 sm:w-10 opacity-100 mr-0.5 sm:mr-1" : "w-0 opacity-0 mr-0 overflow-hidden"}
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
                     h-4 w-px bg-primary/20 transition-all duration-500 delay-100
                     ${expanded ? "opacity-100 mr-1" : "opacity-0 mr-0 w-0"}
                `} />

                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.id}
                            layout
                            onClick={() => handleNavClick(item.id)}
                            whileTap={{ scale: 0.9 }}
                            className={`
                relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-full
                transition-colors duration-300 cursor-pointer
                ${isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }
              `}
                        >
                            {/* Indicador activo — glow detrás */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full bg-accent-blue/15 border border-accent-blue/25"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}

                            <Icon className="relative z-10 size-[18px] sm:size-5" />

                            {/* Label — solo visible cuando expanded */}
                            <AnimatePresence>
                                {expanded && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative z-10 text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden hidden sm:block"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            
                            {/* Mobile Label — Solo el activo para ahorrar espacio */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="relative z-10 text-[10px] font-medium whitespace-nowrap overflow-hidden sm:hidden ml-1"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}

                {/* Vertical Divider */}
                {expanded && <div className="w-px h-4 bg-white/10 mx-1" />}

                {/* Vibe Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`
                        relative flex items-center justify-center rounded-full transition-all duration-300
                        ${expanded ? "size-8 sm:size-9" : "size-8"}
                        ${theme === "luxury" ? "text-primary" : "text-muted-foreground"}
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
                            {theme === "luxury" && <Sparkles className="size-4 sm:size-5" />}
                            {theme === "classic" && <Moon className="size-4 sm:size-5" />}
                            {theme === "white" && <Sun className="size-4 sm:size-5" />}
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
    );
}
