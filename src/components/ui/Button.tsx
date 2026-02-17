"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ============================================================
// Button Component — "Everything Reacts"
// ============================================================

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
    glow?: boolean; // Enable extra glow effect
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {

        // Base styles
        const baseStyles = "relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden";

        // Variant styles
        const variants = {
            primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        };

        // Size styles
        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-9 px-4 py-2",
            lg: "h-10 px-8 text-lg",
            icon: "h-9 w-9",
        };

        // Framer Motion variants for tactile feedback
        const motionVariants = {
            tap: { scale: 0.96 },
            hover: {
                scale: 1.02,
                transition: { duration: 0.2 }
            }
        };

        return (
            <motion.button
                ref={ref}
                whileTap="tap"
                whileHover="hover"
                variants={motionVariants}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {/* Optional Glow Effect Background */}
                {glow && (
                    <motion.div
                        className="absolute inset-0 -z-10 bg-primary/10 blur-md"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
