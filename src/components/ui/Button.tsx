"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { getButtonClassName, BUTTON_VARIANTS, BUTTON_SIZES } from "./button-styles";

// ============================================================
// Button Component — "Everything Reacts"
// ============================================================

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: keyof typeof BUTTON_VARIANTS;
    size?: keyof typeof BUTTON_SIZES;
    glow?: boolean; // Enable extra glow effect
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {

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
                className={getButtonClassName({ variant, size, className })}
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
