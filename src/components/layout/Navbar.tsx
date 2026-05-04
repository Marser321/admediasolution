"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles } from "lucide-react";

// ============================================================
// Navbar flotante con efecto Glass + Scroll Shrink
// ============================================================
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`
        flex fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${scrolled
                    ? "py-3 glass-premium backdrop-blur-md bg-background/80 border-b border-primary/20 shadow-2xl shadow-primary/10"
                    : "py-5 bg-transparent border-transparent"
                }
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
                {/* Logo — Imagen real de la marca */}
                <Link href="/" className="flex items-center group relative">
                    <motion.div
                        animate={scrolled
                            ? { 
                                filter: "drop-shadow(0 0 15px rgba(72,142,255,0.4))",
                                scale: 1.02 
                              }
                            : { 
                                filter: "drop-shadow(0 0 10px rgba(72,142,255,0.25))",
                                scale: 1.05
                              }
                        }
                        whileHover={{ scale: 1.08, filter: "drop-shadow(0 0 25px rgba(72,142,255,0.6))" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    >
                        <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <Image
                            src="/brand/logo-full-white.png"
                            alt="Ad Media Solution"
                            width={180}
                            height={50}
                            className={`relative h-auto object-contain transition-all duration-500 ${scrolled ? "w-28 sm:w-36" : "w-32 sm:w-44"}`}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Navegación central (oculta en mobile) */}
                <div className="hidden md:flex items-center gap-8">
                    {["Servicios", "CRM", "Infraestructura", "Portafolio", "Nosotros"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group tracking-wide"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out" />
                        </a>
                    ))}
                </div>

                {/* CTA — Auditoría Experta */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.04 }}
                    className="relative group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-500 cursor-pointer shadow-lg shadow-primary/20 overflow-hidden"
                >
                    {/* Brillo dinámico al hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    
                    {/* Glow pulsante */}
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-slow" />
                    
                    <span className="relative flex items-center gap-2">
                        <Sparkles className="size-4 text-white fill-white/20" />
                        <span className="hidden sm:inline">Auditoría Experta</span>
                        <span className="inline sm:hidden">Auditoría</span>
                    </span>
                </motion.button>
            </div>
        </motion.nav>
    );
}

