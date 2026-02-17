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
        hidden md:flex fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${scrolled
                    ? "py-3 glass-premium backdrop-blur-xl bg-background/60 border-b border-white/5 shadow-2xl"
                    : "py-5 bg-transparent border-transparent"
                }
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
                {/* Logo — Imagen real de la marca */}
                <Link href="/" className="flex items-center group relative">
                    <motion.div
                        animate={scrolled
                            ? { filter: "drop-shadow(0 0 8px rgba(0,212,230,0.25))" }
                            : { filter: "drop-shadow(0 0 0px rgba(0,212,230,0))" }
                        }
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute -inset-2 bg-[#00d4e6]/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Image
                            src="/brand/logo-full.png"
                            alt="Ad Media Solution"
                            width={140}
                            height={40}
                            className={`relative h-auto object-contain transition-all duration-500 ${scrolled ? "w-28 sm:w-32" : "w-32 sm:w-36"}`}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Navegación central (oculta en mobile) */}
                <div className="hidden md:flex items-center gap-8">
                    {["Servicios", "Portfolio", "Nosotros"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </div>

                {/* CTA — Auditoría IA */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#00d4e6] hover:bg-[#00d4e6]/90 transition-all duration-300 cursor-pointer shadow-md shadow-[#00d4e6]/10"
                >
                    {/* Glow pulsante */}
                    <span className="absolute inset-0 rounded-full bg-[#00d4e6]/10 animate-pulse" />
                    <span className="relative flex items-center gap-2">
                        <Sparkles className="size-4 text-white" />
                        Auditoría IA
                    </span>
                </motion.button>
            </div>
        </motion.nav>
    );
}

