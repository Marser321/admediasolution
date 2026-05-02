"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Home, Briefcase, Sparkles, MessageCircle } from "lucide-react";

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
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

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
          flex items-center justify-center gap-1
          glass-premium rounded-full
          ${expanded
                        ? "px-3 py-2.5 rounded-[1.75rem] sm:px-6 sm:py-3"
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
                    ${expanded ? "w-10 opacity-100 mr-1" : "w-0 opacity-0 mr-0 overflow-hidden"}
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
                     h-4 w-px bg-white/10 transition-all duration-500 delay-100
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
                relative flex items-center gap-2 px-3 py-2 rounded-full
                transition-colors duration-300 cursor-pointer
                ${isActive
                                    ? "text-white"
                                    : "text-slate-500 hover:text-slate-300"
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
                                        className="relative z-10 text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </motion.div>
        </motion.nav>
    );
}
