"use client";

import * as React from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ============================================================
// Internal Components — The "Uroboros" Polish
// ============================================================

const Shimmer = () => (
    <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{
            repeat: Infinity,
            repeatDelay: 1,
            duration: 1.5,
            ease: "linear",
        }}
        style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
    />
);

const AuroraEffect = () => (
    <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 sm:opacity-40 will-change-transform"
        initial={{ x: "0%", rotate: 0 }}
        animate={{ 
            x: ["-15%", "15%", "-15%"],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
        }}
        style={{
            background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, #0066FF 40%, transparent 80%)",
            filter: "blur(20px)",
            mixBlendMode: "normal", // Changed from screen for better visibility on all themes
            transform: "translateZ(0)"
        }}
    />
);

const ButtonGlow = ({ color = "var(--primary)" }) => (
    <motion.div
        className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.4 }}
        style={{ 
            backgroundColor: color,
            transform: "translateZ(0)"
        }}
    />
);

// ============================================================
// Button Component — "Quiet Luxury" Interactions
// ============================================================

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "glass";
    size?: "sm" | "md" | "lg" | "icon";
    glow?: boolean;
    shimmer?: boolean;
    aurora?: boolean;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", glow = false, shimmer = true, aurora = true, children, ...props }, ref) => {

        // Base styles — High-density typography
        const baseStyles = cn(
            "relative inline-flex items-center justify-center rounded-full transition-all duration-700",
            "font-sans font-bold tracking-tight antialiased transform-gpu",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "disabled:pointer-events-none disabled:opacity-50 overflow-hidden select-none",
            "group"
        );

        // Variant styles — Blue Luxury Evolution
        const variants = {
            primary: "bg-gradient-to-br from-[#0066FF] via-[#0044CC] to-[#020617] text-white shadow-[0_8px_30px_-5px_rgba(0,102,255,0.4)] hover:shadow-[0_15px_45px_-5px_rgba(0,102,255,0.6)] border border-white/10",
            secondary: "bg-[#1e293b] text-[#f8fafc] border border-white/5 hover:bg-[#334155]",
            ghost: "hover:bg-white/5 text-muted-foreground hover:text-foreground",
            outline: "border border-white/20 bg-transparent hover:bg-white/5 hover:border-primary/30 hover:text-white",
            glass: "glass-premium bg-white/5 border-white/10 hover:border-primary/40 text-white shadow-2xl",
        };

        // Size styles
        const sizes = {
            sm: "h-9 px-4 text-[13px]",
            md: "h-11 px-7 py-3 text-[14px]",
            lg: "h-14 px-10 text-[16px]",
            icon: "h-11 w-11",
        };

        // Spring configurations for organic feel
        const springTransition = {
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
            mass: 0.8
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                transition={springTransition}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {/* Visual Layers — Aurora for Primary and Glass */}
                <AnimatePresence mode="wait">
                    {aurora && (variant === "primary" || variant === "glass") && <AuroraEffect key="aurora" />}
                    {shimmer && variant !== "ghost" && <Shimmer key="shimmer" />}
                </AnimatePresence>
                
                {glow && <ButtonGlow key="glow" color={variant === "primary" ? "rgba(0, 102, 255, 0.4)" : "rgba(125, 211, 252, 0.2)"} />}

                {/* Content Layer */}
                <span className="relative z-20 flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] pointer-events-none">
                    {children}
                </span>

                {/* Glass Inner Highlight (White Fusion Effect) */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Internal Glow Pulse — Light Fused */}
                {(variant === "primary" || variant === "glass") && (
                    <motion.div 
                        className="absolute inset-0 z-10 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        animate={{ opacity: [0, 0.12, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                )}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
